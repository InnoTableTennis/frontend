<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Match, Player } from '$lib/types/types';
	import * as db from '$lib/requests';
	import { Play, Dot } from 'lucide-svelte';
	import { convertDateToStringDash } from '$lib/helper';
	import { alertPopup } from '$lib/popupHandler';
	import { isLeader } from '$lib/stores';
	import { alertInputPopup } from '$lib/inputPopupHandler';
	
	interface bracketData {
		playersAmount: number;
		rounds: Match[][];
		winner: string;
		matchesNetwork: Map<Match, Match>;
		inProgressMatches: Match[],
		finishedMatches: Match[]
	}

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

	export let data: bracketData = { 
		playersAmount: 0, 
		rounds: [],
		finishedMatches: [],
		inProgressMatches: [],
		matchesNetwork: new Map<Match, Match>(), 
		winner: ""} as bracketData;
	export let playersList: Player[] = [];

	const isPowerOfTwo = (x: number) => {
		while (x > 1) {
			if (x % 2) return false;
			x /= 2;
		}
		return true;
	};
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
		for (let i=0;i<firstLayer.length;i++){
			if (firstLayer[i]===-1){
				ret.push(emptyPlayer);
			}
			else {
				ret.push(players[firstLayer[i]-1]);
			}
		}
		return ret;
	};

	function createMatch(firstPlayer: Player, secondPlayer: Player): Match {
		return {
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
			tournamentTitle: tournamentTitle,
		};
	}

	function generateFirstRound(): void {
		const roundMatches: Match[] = [];
		let changePlaces = false;
		for (let i = 0; i < playersList.length / 2; i++) {
			let firstPlayer = playersList[i];
			let secondPlayer = playersList[playersList.length - i - 1];

			if (changePlaces) {
				[firstPlayer, secondPlayer] = [secondPlayer, firstPlayer];
			}
			changePlaces = !changePlaces;

			if (!secondPlayer) {
				data.rounds[1].push(createMatch(firstPlayer, emptyPlayer));
			} else {
				roundMatches.push(createMatch(firstPlayer, secondPlayer));
			}
		}
		data.rounds[0] = roundMatches;
	}

	function createLayout(): void {
		generateFirstRound();
		for (let i = 0; i < roundAmount - 1; i++) {
			arrangeMatches(data.rounds[i], i);
		}
	}

	function arrangeMatches(matchesList: Match[], round: number): void {
		let nextMatch: Match = createMatch(emptyPlayer, emptyPlayer);
		let updateMatch = false;

		data.matchesNetwork.set(matchesList[0], nextMatch);
		data.rounds[round + 1].push(nextMatch);
		for (let i = 1; i < matchesList.length; i++) {
			if (updateMatch) {
				nextMatch = createMatch(emptyPlayer, emptyPlayer);
				data.rounds[round + 1].push(nextMatch);
			}
			updateMatch = !updateMatch;
			data.matchesNetwork.set(matchesList[i], nextMatch);
		}
		data=data;
	}

	function isFirstWinner(initMatch: Match, nextMatch: Match) {
		let keys = Array.from(data.matchesNetwork.keys());

		let initIndex = 0;
		let neighbourIndex = 0;
		for (let i = 0; i < keys.length; i++) {
			let currentValue = data.matchesNetwork.get(keys[i]);
			if (currentValue === nextMatch) {
				if (keys[i] === initMatch) {
					initIndex = i;
				} else {
					neighbourIndex = i;
				}
			}
		}

		return initIndex < neighbourIndex;
	}

	async function handleMatchStart(match: Match) {
		let isConfirmed = await alertPopup('Are you sure that you want to start this match?');
		if (!isConfirmed) return;
		data.inProgressMatches = [...data.inProgressMatches, match];
	}

	function setWinner(match: Match): void {
		let winner =
			match.firstPlayerScore > match.secondPlayerScore
				? match.firstPlayerName
				: match.secondPlayerName;

		let matchToUpdate = data.matchesNetwork.get(match);

		if (winner !== match.firstPlayerName && winner !== match.secondPlayerName) {
			console.log('Bad winner name');
			return;
		}

		if (matchToUpdate) {
			if (isFirstWinner(match, matchToUpdate)) {
				matchToUpdate.firstPlayerName = winner;
			} else {
				matchToUpdate.secondPlayerName = winner;
			}
			data = data;
		}

		else {
			data.winner = winner;
			console.log(data);
		}
		
	}

	async function handleMatchEnd(match: Match) {
		let scores = await alertInputPopup(
			'Please input the results of the match',
			match.firstPlayerName,
			match.secondPlayerName,
		);
		match.firstPlayerScore = Number(scores[0]);
		match.secondPlayerScore = Number(scores[1]);

		data.inProgressMatches.splice(data.inProgressMatches.indexOf(match), 1);

		setWinner(match);
		
		data.finishedMatches = [...data.finishedMatches, match];
		data.inProgressMatches = data.inProgressMatches;
	}


	let localDateString = convertDateToStringDash(new Date());
	let tournamentTitle = 'test';

	let roundCounter = 0;
	let roundAmount = Math.ceil(Math.log2(playersList.length));

	if (data.playersAmount === 0) {
		data.playersAmount = playersList.length;

		for (let i = 0; i < roundAmount; i++) {
			data.rounds.push([]);
		}
	}

	createLayout();
</script>

<div class="bracket-wrapper">
	<div class="bracket">
		{#each data.rounds as round}
			<ul>
				{#each round as match}
					<li>
						<div class="names-wrapper">
							<p>{match.firstPlayerName}</p>
							<p>{match.secondPlayerName}</p>
						</div>

						{#if $isLeader}
							{#if match.firstPlayerName !== '' && match.secondPlayerName !== '' && !data.finishedMatches.includes(match)}
								<button
									on:click={() => {
										if (!data.inProgressMatches.includes(match)) {
											handleMatchStart(match);
										} else {
											handleMatchEnd(match);
										}
									}}
								>
									{#if data.inProgressMatches.includes(match)}
										<Dot />
									{:else}
										<Play />
									{/if}
								</button>
							{/if}
						{/if}

						{#if data.finishedMatches.includes(match)}
							<div class="scores-wrapper">
								{match.firstPlayerScore} :
								{match.secondPlayerScore}
							</div>
						{/if}
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
</div>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;
		border-radius: 5px;
		background-color: var(--secondary-bg-color);
		cursor: pointer;
	}

	.bracket {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		list-style: none;
		gap: 2rem;
	}

	ul li {
		display: flex;
		flex-direction: row;
		position: relative;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 2rem;
		flex-grow: 0.5;
		height: 3rem;
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

	.names-wrapper {
		width: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		height: 2rem;
	}

	p {
		text-align: center;
		width: 100%;
		border-bottom: 2px solid var(--secondary-bg-color);
	}
</style>
