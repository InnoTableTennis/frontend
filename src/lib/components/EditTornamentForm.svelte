<script lang="ts">
	// import { enhance } from '$app/forms';
	import { get } from 'svelte/store';
	import { AddTournamentFormStore } from '$lib/stores';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import { changeDateFormat } from '$lib/helper';
	import type { Tournaments } from '$lib/types/types';
	import DateInput from './base/DateInput.svelte';
	import TextInput from './base/TextInput.svelte';

	let title = get(AddTournamentFormStore).title;
	let startDateString = get(AddTournamentFormStore).startDateString;
	let endDateString = get(AddTournamentFormStore).endDateString;

	export let tournament: Tournaments;
	export let chosenId = -1;

	$: {
		endDateString = startDateString;
	}

	const editTournament = async (e: Event) => {
		const data = new FormData(e.target as HTMLFormElement);

		db.editTournament(
			tournament.id.toString() as string,
			data.get('title') as string,
			data.get('startDateString') as string,
			data.get('endDateString') as string,
		)
			.then(() => {
				dispatch('update');
			})
			.catch((error) => {
				console.log(error);
				dispatch('error', error);
			});
		tournament = {} as Tournaments;
		chosenId = -1;
	};

	const saveForm = function () {
		AddTournamentFormStore.set({
			title: title,
			startDateString: startDateString,
			endDateString: endDateString,
		});
	};
</script>

<h2>Edit Tournament</h2>

<form on:submit={editTournament} on:change={saveForm}>
	<div class="column-1-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<TextInput
				name="title"
				placeholder="Tournament title"
				defaultValue={tournament.title}
				required={true}
			/>
		</label>
	</div>
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->

		<label>
			<DateInput
				name="startDateString"
				placeholder="Start date"
				defaultValue={changeDateFormat(tournament.startDateString)}
			/>
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DateInput
				name="endDateString"
				placeholder="End date"
				defaultValue={changeDateFormat(tournament.endDateString)}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} type={'submit'}>Save</Button>
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
	.column-1-elems {
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
	.margin-top {
		margin-top: 1em;
	}
</style>
