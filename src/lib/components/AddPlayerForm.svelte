<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';
	import { get } from 'svelte/store';
	import { AddPlayerFormStore } from '$lib/stores';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import ResetButton from '$lib/components/base/ResetButton.svelte';

	let name = get(AddPlayerFormStore).name;
	let telegramAlias = get(AddPlayerFormStore).telegramAlias;
	let initialRating = get(AddPlayerFormStore).initialRating;
	let firstInput: HTMLInputElement;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(countNameWords(name) >= 2);
	}

	function countNameWords(name: string): number {
		const arrayStrings: string[] = name.split(/\W+/);
		let counter = 0;
		arrayStrings.forEach((element) => {
			if (element !== '') counter++;
		});
		return counter;
	}

	const addPlayer = async (e: Event) => {
		const data = new FormData(e.target as HTMLFormElement);

		const name = data.get('name') as string;

		db.createPlayer(name, data.get('telegramAlias') as string, Number(data.get('rating')))
			.then(() => {
				dispatch('update');
				resetForm();
			})
			.catch((error) => {
				dispatch('error', error);
			});
	};

	const saveForm = function () {
		AddPlayerFormStore.set({
			name: name,
			telegramAlias: telegramAlias,
			initialRating: initialRating,
		});
	};

	function resetForm() {
		name = '';
		telegramAlias = '';
		initialRating = 100;
		saveForm();
	}

	onMount(() => {
		firstInput.focus();
	});
</script>

<div class="line-2-elems">
	<h2>Add Player</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={addPlayer} on:change={saveForm}>
	<div class="column-2-elems">
		<label>
			<input
				name="name"
				bind:value={name}
				bind:this={firstInput}
				required
				autocomplete="off"
				placeholder="Player's Name"
				class="full-width"
			/>
		</label>
		<label>
			<input
				name="telegramAlias"
				bind:value={telegramAlias}
				autocomplete="off"
				placeholder="Player's alias"
				class="full-width"
			/>
		</label>
	</div>
	<div class="column-1-elems">
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="rating"
				bind:value={initialRating}
				placeholder="Rating"
				class="full-width text-center"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Add player</Button>
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
		.column-2-elems {
			grid-template-columns: repeat(2, 1fr);
		}
		.text-center {
			text-align: center;
		}
		.last-box {
			grid-column: 2;
		}
	}
	.margin-top {
		margin-top: 1em;
	}
</style>
