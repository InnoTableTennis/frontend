<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';

	import { onMount } from 'svelte';

	let title = '';
	let minParticipants = '';
	let maxParticipants = '';
	let startDateString = '';
	let endDateString = '';
	let firstInput: HTMLInputElement;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(
			title ||
			minParticipants ||
			maxParticipants ||
			startDateString ||
			endDateString
		);
	}

	const searchTournament = function () {
		console.log(title, minParticipants, maxParticipants, startDateString, endDateString);
	};

	/* function resetForm() {
		let title = '';
		let minParticipants = '';
		let maxParticipants = '';
		let startDateString = '';
		let endDateString = '';
	} */

	onMount(() => {
		firstInput.focus();
	});
</script>

<h2>Filters</h2>

<form on:submit={searchTournament}>
	<div class="column-1-elems">
		<label>
			<input
				name="title"
				bind:value={title}
				bind:this={firstInput}
				autocomplete="off"
				placeholder="Search by title"
				class="full-width"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="minParticipants"
				bind:value={minParticipants}
				autocomplete="off"
				placeholder="Min participants"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="maxParticipants"
				bind:value={maxParticipants}
				autocomplete="off"
				placeholder="Max participants"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="date"
				name="startDateString"
				bind:value={startDateString}
				autocomplete="off"
				placeholder="Start date"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="date"
				name="endDateString"
				bind:value={endDateString}
				placeholder="End date"
				class="full-width"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Search</Button>
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
		padding: 0.8em 1em;
		color: var(--tertiary-font-color);
		background-color: var(--main-color);
		transition: 0.1s;
	}
	input:focus {
		outline: none;
		color: var(--content-color);
		border-bottom: 5px solid var(--secondary-color);
		/* outline: solid var(--secondary-color); */
	}
	.last-box {
		grid-column: 2;
	}
	.full-width {
		width: 100%;
	}

	.margin-top {
		margin-top: 1em;
	}
</style>
