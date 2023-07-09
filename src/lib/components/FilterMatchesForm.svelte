<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';

	let firstName = '';
	let secondName = '';
	let telegramAlias = '';
	let initialRating = 100;
	let firstInput: HTMLInputElement;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(firstName && secondName);
	}

	const addPlayer = async (e: Event) => {
		const data = new FormData(e.target as HTMLFormElement);

		const firstName = data.get('firstName') as string;
		const secondName = data.get('secondName') as string;

		const name = firstName.trim() + ' ' + secondName.trim();
		db.createPlayer(name, data.get('telegramAlias') as string, Number(data.get('rating')))
			.then(() => {
				dispatch('update');
				resetForm();
			})
			.catch((error) => {
				dispatch('error', error);
			});
	};

	function resetForm() {
		firstName = '';
		secondName = '';
		telegramAlias = '';
		initialRating = 100;
	}

	onMount(() => {
		firstInput.focus();
	});
</script>

<h2>Filters</h2>

<form on:submit={addPlayer}>
	<div class="line-4-elems">
		<label>
			<input
				name="firstName"
				bind:value={firstName}
				bind:this={firstInput}
				required
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
		<label>
			<input
				name="telegramAlias"
				bind:value={telegramAlias}
				autocomplete="off"
				placeholder="Min rating"
				class="full-width"
			/>
		</label>
		<label>
			<input
				name="telegramAlias"
				bind:value={telegramAlias}
				autocomplete="off"
				placeholder="Max rating"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="rating"
				bind:value={initialRating}
				placeholder="Rating"
				class="full-width"
			/>
		</label>
	</div>
	<div class="line-4-elems">
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
	.line-4-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
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
		grid-column: 4;
	}
	.full-width {
		width: 100%;
	}

	@media (max-width: 800px) {
		.line-4-elems {
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
