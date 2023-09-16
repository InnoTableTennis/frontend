<script lang="ts">
	// import { enhance } from '$app/forms';

	import Button from '$lib/components/base/Button.svelte';

	import * as db from '$lib/requests';
	import { convertDateToStringDash, changeDateFormat } from '$lib/helper';
	import DropdownInput from '$lib/components/base/inputs/DropdownInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Match, Player, Tournament } from '$lib/types/types';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import { alertPopup } from '$lib/popupHandler';

	const dispatch = createEventDispatcher();

	export let players: Player[];
	export let tournaments: Tournament[];

	export let match: Match;

	export let chosenId = -1;
	let selectedDate = '';

	let tournamentTitles = [''];
	let latestTournamentTitle = '';

	let isSubmissionDisabled = true;

	let firstPlayerName = '';
	let secondPlayerName = '';
	let tournamentTitle = '';
	let firstPlayerScore = 0;
	let secondPlayerScore = 0;

	$: {
		isSubmissionDisabled = !(
			firstPlayerName &&
			secondPlayerName &&
			(firstPlayerScore !== 0 || secondPlayerScore !== 0) &&
			tournamentTitle !== null
		);
	}

	$: playerNames = players.map((player) => player.name);
	$: {
		tournamentTitles = tournaments.map((tournament) => tournament.title);
		latestTournamentTitle = tournamentTitles[0];
		if (!tournamentTitle) {
			tournamentTitle = latestTournamentTitle;
			changeDateByTournamentTitle(tournamentTitle);
		}
	}

	$: tournamentTitle = match.tournamentTitle;

	let localDateString = '';

	$: selectedDate = changeDateFormat(match.localDateString);
	$: localDateString = selectedDate;

	const editMatch = async (e: Event) => {
		let isConfirmed = await alertPopup('Are you sure that you want to edit this match?');
		if (!isConfirmed) return;
		const data = new FormData(e.target as HTMLFormElement);
		if (
			!players.find((player) => player.name === firstPlayerName) ||
			!players.find((player) => player.name === secondPlayerName)
		) {
			dispatch('error', 'There are no such players!');
		} else if (!tournaments.find((tournament) => tournament.title === tournamentTitle)) {
			dispatch('error', 'There is no such tournament!');
		} else {
			db.editMatch(
				match.id.toString(),
				data.get('firstPlayerName') as string,
				data.get('secondPlayerName') as string,
				Number(data.get('firstPlayerScore')),
				Number(data.get('secondPlayerScore')),
				data.get('tournamentTitle') as string,
				data.get('localDateString') as string,
			)
				.then(() => {
					dispatch('update');
				})
				.catch((error) => {
					dispatch('error', error);
				});
		}
		match = {} as Match;
		chosenId = -1;
	};

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
			const year = Number(dateString.slice(6, 10));
			const month = Number(dateString.slice(3, 5)) - 1;
			const day = Number(dateString.slice(0, 2));
			localDateString = convertDateToStringDash(new Date(year, month, day));
		}
	}
</script>

<h2>Edit Match</h2>

<form on:submit={editMatch} action="?/edit">
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="firstPlayerName"
				placeholder="First player"
				options={playerNames}
				on:select={handleSelectFirstPlayerName}
				defaultValue={match.firstPlayerName}
				bind:inputVal={firstPlayerName}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="secondPlayerName"
				placeholder="Second player"
				options={playerNames}
				on:select={handleSelectSecondPlayerName}
				defaultValue={match.secondPlayerName}
				bind:inputVal={secondPlayerName}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="number"
				name="firstPlayerScore"
				placeholder="First score"
				defaultNumValue={match.firstPlayerScore}
				bind:numberVal={firstPlayerScore}
			/>
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="number"
				name="secondPlayerScore"
				placeholder="Second score"
				defaultNumValue={match.secondPlayerScore}
				bind:numberVal={secondPlayerScore}
			/>
		</label>
	</div>
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="date"
				name="localDateString"
				placeholder="Date"
				defaultValue={localDateString}
			/>
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="tournamentTitle"
				placeholder="Tournament"
				options={tournamentTitles}
				on:select={handleSelectTournament}
				defaultValue={tournamentTitle}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width">
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Save</Button>
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

	.last-box {
		grid-column: 2;
		margin-top: 1.5em;
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
