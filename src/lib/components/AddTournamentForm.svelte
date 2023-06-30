<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import { convertDateToStringDash } from '$lib/helper';
	// import Error from './Error.svelte';

	let title = '';
	let startDateString = convertDateToStringDash(new Date());
	let endDateString = convertDateToStringDash(new Date());

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

	function resetForm() {
		title = '';
		startDateString = convertDateToStringDash(new Date());
	}

	onMount(() => {
		firstInput.focus();
	});
</script>

<h2>Add Tournament</h2>

<form on:submit={addTournament}>
	<div class="line-3-elems">
		<label class="elem1">
			<span class="form-label">Title</span>
			<input
				name="title"
				bind:value={title}
				bind:this={firstInput}
				required
				autocomplete="off"
				placeholder="Tournament Title"
				class="full-width"
			/>
		</label>
		<label class="elem2">
			<span class="form-label">Start Date</span>
			<input
				type="date"
				name="startDateString"
				bind:value={startDateString}
				class="text-center full-width"
			/>
		</label>
		<label class="elem3">
			<span class="form-label">End Date</span>
			<input
				type="date"
				name="endDateString"
				bind:value={endDateString}
				class="text-center full-width"
			/>
		</label>
	</div>
	<div class="line-3-elems">
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
	}

	form {
		max-width: 800px;
		margin: 0 auto 3em;
		font-size: var(--fontsize-medium2);
	}
	.line-3-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
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
		outline: solid var(--secondary-color);
	}
	.last-box {
		grid-column: 3;
	}
	.full-width {
		width: 100%;
	}
	.form-label {
		display: inline-block;
		margin-bottom: 0.25em;
	}

	@media (max-width: 800px) {
		.line-3-elems {
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
