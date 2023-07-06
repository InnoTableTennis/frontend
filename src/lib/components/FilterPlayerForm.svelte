<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';

	import { onMount } from 'svelte';

	let name = '';
	let telegramAlias = '';
	let minRating = '';
	let maxRating = '';
	let firstInput: HTMLInputElement;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(name || telegramAlias || minRating || maxRating);
	}

	const searchPlayer = function () {
		console.log(name, telegramAlias, minRating, maxRating);
	};

	/* function resetForm() {
		name = '';
		telegramAlias = '';
		minRating = '';
		maxRating = '';
	} */

	onMount(() => {
		firstInput.focus();
	});
</script>

<h2>Filters</h2>

<form on:submit={searchPlayer}>
	<div class="column-2-elems">
		<label>
			<input
				name="name"
				bind:value={name}
				bind:this={firstInput}
				autocomplete="off"
				placeholder="Search by name"
				class="full-width"
			/>
		</label>
		<label>
			<input
				name="telegramAlias"
				bind:value={telegramAlias}
				autocomplete="off"
				placeholder="Search by alias"
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
				name="minRating"
				bind:value={minRating}
				autocomplete="off"
				placeholder="Min rating"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="maxRating"
				bind:value={maxRating}
				autocomplete="off"
				placeholder="Max rating"
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
