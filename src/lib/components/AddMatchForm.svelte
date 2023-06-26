<script lang="ts">
	// import { enhance } from '$app/forms';

	import Button from '$lib/components/Button.svelte';

	import * as db from '$lib/requests';
	import { convertDateToStringDash } from '$lib/helper';
	import DropdownInput from '$lib/components/DropdownInput.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { Players, Tournaments } from '$lib/types/types';

	const dispatch = createEventDispatcher();

	export let players: Players[];
	export let tournaments: Tournaments[];

	let tournamentTitles = [''];
	let latestTournamentTitle = '';

	$: playerNames = players.map((player) => player.name);
	$: {
		tournamentTitles = tournaments.map((tournament) => tournament.title);
		latestTournamentTitle = tournamentTitles[0];
		if (!tournamentTitle) {
			tournamentTitle = latestTournamentTitle;
			changeDateByTournamentTitle(tournamentTitle);
		}
	}

	let firstPlayerName = '';
	let secondPlayerName = '';
	let tournamentTitle = '';
	let firstPlayerScore = 0;
	let secondPlayerScore = 0;
	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(
			firstPlayerName &&
			secondPlayerName &&
			firstPlayerScore !== null &&
			secondPlayerScore !== null &&
			tournamentTitle !== null
		);
	}

	let localDateString = convertDateToStringDash(new Date());

	const addMatch = async (e: Event) => {
		const data = new FormData(e.target as HTMLFormElement);

		if (
			!players.find((player) => player.name === firstPlayerName) ||
			!players.find((player) => player.name === secondPlayerName)
		) {
			dispatch('error', 'There are no such players!');
		} else if (!tournaments.find((tournament) => tournament.title === tournamentTitle)) {
			dispatch('error', 'There is no such tournament!');
		} else {
			db.createMatch(
				data.get('firstPlayerName') as string,
				data.get('secondPlayerName') as string,
				Number(data.get('firstPlayerScore')),
				Number(data.get('secondPlayerScore')),
				data.get('tournamentTitle') as string,
				data.get('localDateString') as string,
			)
				.then(() => {
					dispatch('update');
					resetForm();
				})
				.catch((error) => {
					dispatch('error', error);
				});
		}
	};

	let dropdownResets = new Array(2);

	function resetForm() {
		firstPlayerScore = 0;
		secondPlayerScore = 0;
		dropdownResets.forEach((reset) => {
			reset();
		});
	}

	function handleSelectFirstPlayerName(event: CustomEvent) {
		firstPlayerName = event.detail;
	}
	function handleSelectSecondPlayerName(event: CustomEvent) {
		secondPlayerName = event.detail;
	}
	function handleSelectTournament(event: CustomEvent) {
		tournamentTitle = event.detail;
		changeDateByTournamentTitle(tournamentTitle);
	}

	function changeDateByTournamentTitle(tournamentTitle: string) {
		const tournament = tournaments.find((tournament) => tournament.title === tournamentTitle);
		if (tournament) {
			const dateString = tournament.startDateString;
			const year = dateString.slice(6, 10);
			const month = dateString.slice(3, 5) - 1;
			const day = dateString.slice(0, 2);
			localDateString = convertDateToStringDash(new Date(year, month, day));
		}
	}
</script>

<h2>Add Match</h2>

<form on:submit={addMatch}>
	<div class="line-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span class="form-label">First Player Name</span>
			<DropdownInput
				name="firstPlayerName"
				placeholder="First Player"
				options={playerNames}
				on:select={handleSelectFirstPlayerName}
				isFirstInput={true}
				bind:reset={dropdownResets[0]}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span class="form-label">Second Player Name</span>
			<DropdownInput
				name="secondPlayerName"
				placeholder="Second Player"
				options={playerNames}
				on:select={handleSelectSecondPlayerName}
				bind:reset={dropdownResets[1]}
			/>
		</label>
	</div>
	<div class="line-4-elems">
		<label>
			<span class="form-label">First Player Score</span>
			<input
				type="number"
				min="0"
				max="10"
				name="firstPlayerScore"
				bind:value={firstPlayerScore}
				required
				class="text-center full-width"
				placeholder="0"
			/>
		</label>
		<label>
			<span class="form-label">Second Player Score</span>
			<input
				type="number"
				min="0"
				max="10"
				name="secondPlayerScore"
				bind:value={secondPlayerScore}
				class="text-center full-width"
				required
				placeholder="0"
			/>
		</label>
		<label>
			<span class="form-label">Date</span>
			<input
				type="date"
				name="localDateString"
				bind:value={localDateString}
				class="text-center full-width"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span class="form-label">Tournament</span>
			<DropdownInput
				name="tournamentTitle"
				placeholder="Tournament"
				defaultValue={latestTournamentTitle}
				options={tournamentTitles}
				on:select={handleSelectTournament}
			/>
		</label>
	</div>
	<div class="line-4-elems">
		<div class="last-box full-width">
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Add match</Button>
		</div>
	</div>
</form>

<style>
	h2 {
		text-transform: uppercase;
		font-size: 1.5em;
		margin: 1.5em 0;
		font-weight: bold;
	}

	form {
		max-width: 800px;
		margin: 0 auto 3em;
		font-size: 0.9em;
	}
	.line-2-elems {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
		align-items: end;
	}
	.line-4-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
		align-items: end;
	}
	.text-center {
		text-align: center;
	}

	input {
		box-sizing: border-box;
		border: none;
		padding: 0.8em 1em;
		border-radius: 10px;
		transition: 0.1s;
	}
	input:focus {
		outline: solid #c4d6b0;
	}
	input:disabled {
		background-color: #666666;
		color: #222;
		box-shadow: none;
		cursor: default;
	}
	.last-box {
		grid-column: 4;
		margin-top: 1.5em;
	}
	.full-width {
		width: 100%;
	}
	.form-label {
		display: inline-block;
		margin-bottom: 0.25em;
	}

	@media (max-width: 800px) {
		.line-4-elems {
			grid-template-columns: repeat(2, 1fr);
		}
		.last-box {
			grid-column: 2;
		}
	}
</style>
