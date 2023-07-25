<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import { changeDateFormat } from '$lib/helper';
	import type { Tournament } from '$lib/types/types';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import { alertPopup } from '$lib/popupHandler';

	let title = '';
	let startDateString = '';
	let endDateString = '';

	export let tournament: Tournament;
	export let chosenId = -1;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(title && startDateString && endDateString);
	}

	$: {
		endDateString = startDateString;
	}

	const editTournament = async (e: Event) => {
		let isConfirmed = await alertPopup('Are you sure that you want to edit this tournament?');
		if (!isConfirmed) return;
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
				dispatch('error', error);
			});
		tournament = {} as Tournament;
		chosenId = -1;
	};
</script>

<h2>Edit Tournament</h2>

<form on:submit={editTournament}>
	<div class="column-1-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="title"
				placeholder="Tournament title"
				required={true}
				isFirst={true}
				defaultValue={tournament.title}
				bind:stringVal={title}
			/>
		</label>
	</div>
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->

		<label>
			<InputTemplate
				type="date"
				name="startDateString"
				placeholder="Start date"
				defaultValue={changeDateFormat(tournament.startDateString)}
				bind:stringVal={startDateString}
			/>
		</label>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="date"
				name="endDateString"
				placeholder="End date"
				defaultValue={changeDateFormat(tournament.endDateString)}
				bind:stringVal={endDateString}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
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
