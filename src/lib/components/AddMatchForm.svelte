<script lang="ts">
	// import { enhance } from '$app/forms';

	import Button from '$lib/components/base/Button.svelte';
	import { get } from 'svelte/store';
	import { AddMatchFormStore } from '$lib/stores';

	import * as db from '$lib/requests';
	import { convertDateToStringDash } from '$lib/helper';
	import DropdownInput from '$lib/components/base/DropdownInput.svelte';

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

	let firstPlayerName = get(AddMatchFormStore).firstPlayerName;
	let secondPlayerName = get(AddMatchFormStore).secondPlayerName;
	let tournamentTitle = get(AddMatchFormStore).tournamentTitle;
	let firstPlayerScore = get(AddMatchFormStore).firstPlayerScore;
	let secondPlayerScore = get(AddMatchFormStore).secondPlayerScore;
	
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

	const saveForm = function () {
		console.log(get(AddMatchFormStore).firstPlayerName, get(AddMatchFormStore).secondPlayerName);
		AddMatchFormStore.set({ firstPlayerName: firstPlayerName, secondPlayerName: secondPlayerName, tournamentTitle: tournamentTitle, firstPlayerScore: firstPlayerScore, secondPlayerScore: secondPlayerScore });
	}

	let dropdownResets = new Array(2);

	function resetForm() {
		AddMatchFormStore.set({ firstPlayerName: '', secondPlayerName: '', tournamentTitle: '', firstPlayerScore: 0, secondPlayerScore: 0 });
		firstPlayerScore = firstPlayerScore;
		secondPlayerScore = secondPlayerScore;
		dropdownResets.forEach((reset) => {
			reset();
		});
	}

	function handleSelectFirstPlayerName(event: CustomEvent) {
		firstPlayerName = event.detail;
		saveForm();
	}
	function handleSelectSecondPlayerName(event: CustomEvent) {
		secondPlayerName = event.detail;
		saveForm();
	}
	function handleSelectTournament(event: CustomEvent) {
		tournamentTitle = event.detail;
		changeDateByTournamentTitle(tournamentTitle);
		saveForm();
	}

	function changeDateByTournamentTitle(tournamentTitle: string) {
		const tournament = tournaments.find((tournament) => tournament.title === tournamentTitle);
		if (tournament) {
			const dateString = tournament.startDateString;
			const year = Number(dateString.slice(6, 10));
			const month = Number(dateString.slice(3, 5)) - 1;
			const day = Number(dateString.slice(0, 2));
			localDateString = convertDateToStringDash(new Date(year, month, day));
		}
	}
</script>

<h2>Add Match</h2>

<form on:submit={addMatch} on:change={saveForm}>
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="firstPlayerName"
				placeholder="First player"
				options={playerNames}
				on:select={handleSelectFirstPlayerName}
				isFirstInput={true}
				defaultValue={firstPlayerName}
				bind:reset={dropdownResets[0]}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="secondPlayerName"
				placeholder="Second player"
				options={playerNames}
				on:select={handleSelectSecondPlayerName}
				defaultValue={secondPlayerName}
				bind:reset={dropdownResets[1]}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<label>
			<input
				type="number"
				min="0"
				max="10"
				name="firstPlayerScore"
				placeholder="First score"
				bind:value={firstPlayerScore}
				class="full-width"
				required
			/>
		</label>
		<label>
			<input
				type="number"
				min="0"
				max="10"
				name="secondPlayerScore"
				placeholder="Second score"
				bind:value={secondPlayerScore}
				class="full-width"
				required
			/>
		</label>
	</div>
	<div class="column-2-elems">
		<label>
			<input
				type="date"
				name="localDateString"
				placeholder="Date"
				bind:value={localDateString}
				class="full-width"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="tournamentTitle"
				placeholder="Tournament"
				defaultValue={latestTournamentTitle}
				options={tournamentTitles}
				on:select={handleSelectTournament}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width">
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Add match</Button>
		</div>
	</div>
</form>

<style>
	h2 {
		text-transform: uppercase;
		font-size: var(--fontsize-medium1);
		margin: 1.5em 0;
		font-weight: var(--fontweight-1);
		color: var(--title-color);
	}

	form {
		max-width: 800px;
		margin: 0 auto 3em;
		font-size: var(--fontsize-medium2);
	}
	.column-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.25rem;
		align-items: end;
	}
	.line-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
		align-items: end;
	}

	input {
		box-sizing: border-box;
		border: none;
		border-bottom: 5px solid var(--tertiary-color);
		padding: 0.8em 1em;
		color: var(--tertiary-font-color);
		background-color: var(--main-color);
		transition: 0.1s;
	}
	input:focus {
		outline: none;
		color: var(--content-color);
		border-bottom: 5px solid var(--secondary-color);
	}
	input:disabled {
		background-color: var(--tertiary-color);
		color: var(--tertiary-font-color);
		box-shadow: none;
		cursor: default;
	}
	.last-box {
		grid-column: 2;
		margin-top: 1.5em;
	}
	.full-width {
		width: 100%;
	}

	@media (max-width: 800px) {
		.line-2-elems {
			grid-template-columns: repeat(2, 1fr);
		}
		.last-box {
			grid-column: 2;
		}
	}
</style>
