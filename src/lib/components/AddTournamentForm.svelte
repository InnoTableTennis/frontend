<script lang="ts">
	// import { enhance } from '$app/forms';
	import { AddTournamentFormStore } from '$lib/formStores';
	import Button from '$lib/components/base/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import * as db from '$lib/requests';
	import { convertDateToStringDash } from '$lib/helper';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';

	const dispatch = createEventDispatcher();

	let title = $AddTournamentFormStore.title;
	let startDateString = $AddTournamentFormStore.startDateString;
	let endDateString = $AddTournamentFormStore.endDateString;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(title && startDateString && endDateString);
	}

	$: {
		endDateString = startDateString;
	}
	const addTournament = async (e: Event) => {
		const data = new FormData(e.target as HTMLFormElement);
		db.createTournament(
			data.get('title') as string,
			data.get('startDateString') as string,
			data.get('endDateString') as string,
		)
			.then(() => {
				dispatch('update');
				resetForm();
			})
			.catch((error) => {
				dispatch('error', error);
			});
	};

	const saveForm = function () {
		AddTournamentFormStore.set({
			title: title,
			startDateString: startDateString,
			endDateString: endDateString,
		});
	};

	function resetForm() {
		title = '';
		startDateString = convertDateToStringDash(new Date());
		endDateString = convertDateToStringDash(new Date());
		saveForm();
	}
</script>

<div class="line-2-elems">
	<h2>Add Tournament</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={addTournament} on:change={saveForm}>
	<div class="column-1-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="elem1">
			<InputTemplate
				type="text"
				name="title"
				placeholder="Tournament title"
				required={true}
				isFirst={true}
				bind:stringVal={title}
			/>
		</label>
	</div>
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="elem2">
			<InputTemplate
				type="date"
				name="startDateString"
				placeholder="Start date"
				bind:stringVal={startDateString}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="elem3">
			<InputTemplate
				type="date"
				name="endDateString"
				placeholder="End date"
				bind:stringVal={endDateString}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Add tournament</Button>
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
		.elem1 {
			display: inline-block;
			grid-column-start: 1;
			grid-column-end: 3;
		}
		.last-box {
			grid-column: 2;
		}
	}
	.margin-top {
		margin-top: 1em;
	}
</style>
