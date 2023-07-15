<script lang="ts">
	// import { enhance } from '$app/forms';
	import { get } from 'svelte/store';
	import { AddTournamentFormStore } from '$lib/stores';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import { convertDateToStringDash } from '$lib/helper';
	import ResetButton from '$lib/components/base/ResetButton.svelte';

	let title = get(AddTournamentFormStore).title;
	let startDateString = get(AddTournamentFormStore).startDateString;
	let endDateString = get(AddTournamentFormStore).endDateString;

	let isSubmissionDisabled = true;

	let firstInput: HTMLInputElement;

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

	onMount(() => {
		firstInput.focus();
	});
</script>

<div class="line-2-elems">
	<h2>Add Tournament</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={addTournament} on:change={saveForm}>
	<div class="column-1-elems">
		<label class="elem1">
			<input
				name="title"
				bind:value={title}
				bind:this={firstInput}
				required
				autocomplete="off"
				placeholder="Tournament title"
				class="full-width"
			/>
		</label>
	</div>
	<div class="column-2-elems">
		<label class="elem2">
			<input
				type="date"
				name="startDateString"
				bind:value={startDateString}
				placeholder="Start date"
				class="full-width"
			/>
		</label>
		<label class="elem3">
			<input
				type="date"
				name="endDateString"
				placeholder="End date"
				bind:value={endDateString}
				class="full-width"
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

	input {
		box-sizing: border-box;
		border: none;
		border-bottom: 5px solid var(--tertiary-color);
		padding: 0.8em 0;
		color: var(--tertiary-font-color);
		background-color: var(--main-color);
		transition: 0.1s;
	}
	input:focus {
		outline: none;
		color: var(--content-color);
		border-bottom: 5px solid var(--secondary-color);
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
