<script lang="ts">
	import * as db from '$lib/requests';
	import type { Match, Player, Tournament } from '$lib/types/types';
	import { Play, Dot } from 'lucide-svelte';
	import { convertDateToStringDash } from '$lib/helper';
	import { alertPopup } from '$lib/popupHandler';
	import { isLeader } from '$lib/stores';
	import { alertInputPopup } from '$lib/inputPopupHandler';
	import { TSMap } from 'typescript-map';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { readData } from '$lib/types/bracketTypes';
	import { isEqual } from 'lodash';

	const dispatch = createEventDispatcher();

	let emptyPlayer = {
		id: 0,
		name: '',
		numberOfGames: 0,
		numberOfLosses: 0,
		numberOfWins: 0,
		rating: 0,
		telegramAlias: '',
		winRate: 0,
	} as Player;

	const isPowerOfTwo = (x: number) => {
		while (x > 1) {
			if (x % 2) return false;
			x /= 2;
		}
		return true;
	};

	// function to sort players for the first round
	const sortPlayers = (players: Player[]) => {
		let firstLayer: number[] = [1, -1];
		let id = 2,
			len = players.length;
		while (id <= len) {
			if (isPowerOfTwo(id - 1) && id > 2) {
				let tmp: number[] = [];
				for (let i = 0; i < firstLayer.length; i++) {
					tmp.push(firstLayer[i]);
					tmp.push(-1);
				}
				firstLayer = [...tmp];
			}
			let idx = 0,
				mxValue = -1;
			for (let i = 0; i < firstLayer.length; i += 2) {
				if (firstLayer[i + 1] == -1 && firstLayer[i] > mxValue) {
					mxValue = firstLayer[i];
					idx = i + 1;
				}
			}
			firstLayer[idx] = id;
			id++;
		}
		const ret: Player[] = [];
		for (let i = 0; i < firstLayer.length; i++) {
			if (firstLayer[i] === -1) {
				ret.push(emptyPlayer);
			} else {
				ret.push(players[firstLayer[i] - 1]);
			}
		}
		return ret;
	};

	// function to create raw matches
	function createMatch(firstPlayer: Player, secondPlayer: Player): Match {
		let localDateString = convertDateToStringDash(new Date());
		let newMatch = {
			firstPlayerScore: 0,
			secondPlayerScore: 0,
			firstPlayerName: firstPlayer.name,
			secondPlayerName: secondPlayer.name,
			localDateString: localDateString,
			id: 0,
			firstPlayerRatingDelta: 0,
			secondPlayerRatingDelta: 0,
			firstPlayerRatingBefore: 0,
			secondPlayerRatingBefore: 0,
			tournamentTitle: tournament.title,
		};
		return newMatch;
	}

	// function to add finished matches to database
	async function addMatchToDB(matchIdx: number) {
		let round = findRound(matchIdx);
		let matchToAdd = data.rounds[round][matchIdx];
		let localDateString = convertDateToStringDash(new Date());
		let createdMatch = await db.createMatch(
			matchToAdd.firstPlayerName,
			matchToAdd.secondPlayerName,
			matchToAdd.firstPlayerScore,
			matchToAdd.secondPlayerScore,
			matchToAdd.tournamentTitle,
			localDateString,
		);
		data.rounds[round][matchIdx] = createdMatch;
		dispatch('update', data);
	}

	// function to create layout for empty bracket
	function createLayout(): void {
		for (let i = 0; i < roundAmount; i++) {
			data.rounds.push([]);
			data.finishedMatches.push([]);
			data.inProgressMatches.push([]);
			for (let j = 0; j < roundAmount * 2 + 1; j++) {
				data.rounds[i].push(createMatch(emptyPlayer, emptyPlayer));
			}
		}

		let idx = 0;
		for (let i = 0; i < data.players.length - 1; i += 2) {
			let firstPlayer = data.players[i];
			let secondPlayer = data.players[i + 1];
			let newMatch = createMatch(firstPlayer, secondPlayer);
			data.rounds[0][idx] = newMatch;
			idx += 2;
		}

		for (let i = 0; i < roundAmount * 2 - 1; i += 2) {
			let currentMatch = data.rounds[0][i];

			if (currentMatch.firstPlayerName === '' || currentMatch.secondPlayerName === '') {
				console.log(currentMatch);
				setWinner(0, i);
				data.rounds[0][i] = createMatch(emptyPlayer, emptyPlayer);
			}
		}
	}

	function findRound(matchIdx: number) {
		let roundProgression = [1];
		for (let i = 1; i < roundAmount; i++) {
			roundProgression.push(roundProgression[i - 1] * 2 + 1);
		}
		for (let round = 0; round < roundAmount; round++) {
			let startingPosition = 0;
			if (round !== 0) {
				startingPosition = roundProgression[round - 1];
			}
			for (let j = startingPosition; j < roundAmount * 2 - 1; j += 1 + roundProgression[round]) {
				if (isEqual(data.rounds[round][j], data.rounds[round][matchIdx])) {
					return j;
				}
			}
		}
		console.log('match not found : find round function');
		return -1;
	}

	// function to mark the match as being in progress
	async function handleMatchStart(matchIdx: number) {
		let isConfirmed = await alertPopup('Are you sure that you want to start this match?');
		if (!isConfirmed) return;

		let round = findRound(matchIdx);

		data.inProgressMatches[round].push(matchIdx);
		dispatch('update', data);
	}

	function findPlayer(name: string): Player {
		for (let i = 0; i < data.players.length; i++) {
			if (data.players[i].name === name) {
				return data.players[i];
			}
		}
		return {} as Player;
	}

	function getNeighbour(round: number, matchIdx: number) {
		let roundProgression = [1];
		for (let i = 1; i < roundAmount; i++) {
			roundProgression.push(roundProgression[i - 1] * 2 + 1);
		}

		let firstPosition = true;

		let startingPosition = 0;
		if (round !== 0) {
			startingPosition = roundProgression[round - 1];
		}

		for (let i = startingPosition; i < roundAmount * 2 - 1; i += 1 + roundProgression[round]) {
			if (matchIdx === i) {
				break;
			}
			firstPosition = !firstPosition;
		}

		let neighbourIndex = 0;
		if (firstPosition) {
			neighbourIndex = matchIdx + 1 + roundProgression[round];
		} else {
			neighbourIndex = matchIdx - 1 - roundProgression[round - 1];
		}

		return neighbourIndex;
	}
	// function to set a winner of the match
	// and forward the name of the winner to the next one
	function setWinner(round: number, matchIdx: number): void {
		let neighbourIdx = getNeighbour(round, matchIdx);

		let initMatch = data.rounds[round][matchIdx];

		let nextMatch = data.rounds[round + 1][(matchIdx + neighbourIdx) / 2];

		let winner = '';

		if (initMatch.firstPlayerName === '') {
			winner = data.rounds[round][matchIdx].secondPlayerName;
		} else if (initMatch.secondPlayerName === '') {
			winner = data.rounds[round][matchIdx].firstPlayerName;
		} else {
			if (initMatch.firstPlayerScore > initMatch.secondPlayerScore) {
				winner = initMatch.firstPlayerName;
				data.leaderBoard.push(findPlayer(initMatch.secondPlayerName));
			} else {
				winner = initMatch.secondPlayerName;
				data.leaderBoard.push(findPlayer(initMatch.firstPlayerName));
			}
		}

		// if there is no next match, set the winner of the final
		if (nextMatch) {
			if (matchIdx < neighbourIdx) {
				nextMatch.firstPlayerName = winner;
			} else {
				nextMatch.secondPlayerName = winner;
			}
		} else {
			data.winner = winner;
			data.leaderBoard.push(findPlayer(winner));
			dispatch('finalize', data.leaderBoard);
		}
		dispatch('update', data);
	}

	async function handleMatchEdit(matchIdx: number) {
		let round = findRound(matchIdx);
		let neighbourIdx = getNeighbour(round, matchIdx);
		let nextMatchIdx = (matchIdx + neighbourIdx) / 2;

		if (data.inProgressMatches[round].includes(nextMatchIdx)) {
			dispatch('error', 'The next match is in progress, cannot edit');
			return;
		} else if (data.finishedMatches[round].includes(nextMatchIdx)) {
			dispatch('error', 'The next match is finished, cannot edit');
			return;
		}

		let scores = await alertInputPopup(
			'Please input the new results of the match',
			data.rounds[round][matchIdx].firstPlayerName,
			data.rounds[round][matchIdx].secondPlayerName,
		);

		let matchToEdit = data.rounds[round][matchIdx];

		if (scores) {
			matchToEdit.firstPlayerScore = Number(scores[0]);
			matchToEdit.secondPlayerScore = Number(scores[1]);

			setWinner(round, matchIdx);

			db.editMatch(
				matchToEdit.id.toString(),
				matchToEdit.firstPlayerName,
				matchToEdit.secondPlayerName,
				matchToEdit.firstPlayerScore,
				matchToEdit.secondPlayerScore,
				matchToEdit.tournamentTitle,
				matchToEdit.localDateString,
			);
			dispatch('update', data);
		}
	}

	// function to finish the match
	async function handleMatchEnd(matchIdx: number) {
		let round = findRound(matchIdx);
		// show the form in a popup
		let scores = await alertInputPopup(
			'Please input the results of the match',
			data.rounds[round][matchIdx].firstPlayerName,
			data.rounds[round][matchIdx].secondPlayerName,
		);

		if (scores) {
			if (scores[0] == 0 && scores[1] === 0) {
				dispatch('error', 'Cannot set both scores to zero!');
				return;
			}
			// set the scores
			data.rounds[round][matchIdx].firstPlayerScore = Number(scores[0]);
			data.rounds[round][matchIdx].secondPlayerScore = Number(scores[1]);

			// delete the match from in prgress matches
			data.inProgressMatches[round].splice(data.inProgressMatches[round].indexOf(matchIdx), 1);

			// set the winner of the match
			setWinner(round, matchIdx);

			data.finishedMatches[round] = [...data.finishedMatches[round], matchIdx];
			data.inProgressMatches = data.inProgressMatches;

			addMatchToDB(matchIdx);
			dispatch('update', data);
		}
	}

	function isHidden(match: number, round: number) {
		if (
			data.rounds[round][match].firstPlayerName === '' &&
			data.rounds[round][match].secondPlayerName &&
			round === 0
		) {
			return true;
		}
		return false;
	}

	export let tournament: Tournament;

	export let data: readData;

	if (data.rounds === undefined) {
		data.leaderBoard = [];
		data.finishedMatches = [];
		data.inProgressMatches = [];
		data.rounds = [];
		data.winner = '';
	}

	let isBuilt = false;

	function build() {
		data.players = sortPlayers(data.players);
		data.init = false;
		roundAmount = Math.ceil(Math.log2(data.players.length));
		console.log(data.rounds);
		createLayout();
		dispatch('update', data);

		console.log(data.rounds.length);
		console.log(data.rounds[0].length);

		for (let i = 0; i < data.rounds.length; i++) {
			rows.push(i);
		}

		for (let i = 0; i < data.rounds[0].length; i++) {
			cols.push(i);
		}
		console.log(rows, cols);

		isBuilt = true;
	}

	function transposeTable(table: Match[][]): Match[][] {
		const numRows = table.length;
		const numCols = table[0].length;

		// Initialize the transposed table with the correct dimensions
		const transposedTable: Match[][] = new Array(numCols);
		for (let i = 0; i < numCols; i++) {
			transposedTable[i] = new Array(numRows);
		}

		// Populate the transposed table with the values from the original table
		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				transposedTable[j][i] = table[i][j];
			}
		}

		return transposedTable;
	}

	let roundAmount = 0;

	onMount(() => {
		if (data.init) {
			console.log(data.players.length);
			build();
		}
	});

	let rows: number[] = [];
	let cols: number[] = [];

	$: console.log(data.rounds);
</script>

{@debug rows, cols}
{#if data.rounds || data.rounds?.length > 0}
	<table>
		{#each rows as round}
			<tr>
				{#each cols as match}
					<td class:hidden={isHidden(match, round)}>
						<p>{data.rounds[match][round].firstPlayerName}</p>
						<p>{data.rounds[match][round].secondPlayerName}</p>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
{/if}

<!-- <div class="bracket-wrapper">

	<div class="bracket" 
	>
		{#each data.rounds as round}
			<ul>
				{#each round as matchIdx}
					<li class:hidden={isHidden(round, matchIdx)}>
						<div class="names-wrapper">
							<p>{data.allMatches[matchIdx].firstPlayerName}</p>
							<p>{data.allMatches[matchIdx].secondPlayerName}</p>
						</div>

						<button
							class:hidden={tournament.finished ||
								data.allMatches[matchIdx].firstPlayerName === '' ||
								data.allMatches[matchIdx].secondPlayerName === '' ||
								(!$isLeader &&
									data.allMatches[matchIdx].firstPlayerScore === 0 &&
									data.allMatches[matchIdx].secondPlayerScore === 0)}
							disabled={!$isLeader}
							on:click={() => {
								if (data.inProgressMatches.includes(matchIdx)) {
									handleMatchEnd(matchIdx);
								} else if (data.finishedMatches.includes(matchIdx)) {
									handleMatchEdit(matchIdx);
								} else {
									handleMatchStart(matchIdx);
								}
							}}
						>
							{#if data.inProgressMatches.includes(matchIdx) && $isLeader}
								<Dot />
							{:else if data.finishedMatches.includes(matchIdx)}
								<div class="scores-wrapper">
									{data.allMatches[matchIdx].firstPlayerScore}:{data.allMatches[matchIdx]
										.secondPlayerScore}
								</div>
							{:else if $isLeader}
								<Play />
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		{/each}
		<ul>
			<li>
				<p>{data.winner}</p>
			</li>
		</ul>
	</div>
</div> -->

<style>
	.hidden {
		visibility: hidden;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px;
		font-weight: inherit;
		font-size: var(--fontsize-medium1);
		border: none;
		box-shadow: none;
		overflow: hidden;
		border-radius: 5px;
		background-color: var(--secondary-bg-color);
		color: var(--content-color);
		cursor: pointer;
		height: 1.5rem;
	}

	.scores-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px;
		font-weight: inherit;
		font-size: var(--fontsize-medium1);
		border: none;
		box-shadow: none;
		overflow: hidden;
		border-radius: 5px;
		background-color: var(--secondary-bg-color);
		color: var(--content-color);
		cursor: pointer;
		height: 1.5rem;
	}

	.bracket {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		flex-grow: 1;
	}

	ul li {
		width: 90%;
		margin: auto;
		max-height: 50px;
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
	}

	.names-wrapper {
		min-width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 2rem;
		gap: 1rem;
	}

	p {
		min-width: 15rem;
		min-height: 1rem;
		border-bottom: 2px solid var(--secondary-bg-color);
	}

	.bracket-wrapper {
		overflow-x: scroll;
		overflow-y: scroll;
		max-width: 900px;
		min-width: 700px;
		height: 30.5rem;
		margin-top: 1rem;
		font-size: var(--fontsize-medium1);
	}

	.bracket-wrapper::-webkit-scrollbar {
		display: none;
	}
</style>
