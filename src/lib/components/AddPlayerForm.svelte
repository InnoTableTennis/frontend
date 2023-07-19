<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';
	import { AddPlayerFormStore } from '$lib/formStores';

	import { createEventDispatcher, onMount } from 'svelte';

	import * as db from '$lib/requests';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import TextInput from '$lib/components/base/TextInput.svelte';
	import NumberInput from '$lib/components/base/NumberInput.svelte';

	const dispatch = createEventDispatcher();

	let name = $AddPlayerFormStore.name;
	let telegramAlias = $AddPlayerFormStore.telegramAlias;
	let initialRating = $AddPlayerFormStore.initialRating;
	let firstInput: HTMLInputElement;

	let isSubmissionDisabled = true;

	$: {
		console.log(name, initialRating, telegramAlias);
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
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<TextInput
				name="name"
				required={true}
				placeholder="Player's name"
				bind:inputVal={name}
				bind:firstInput
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<TextInput name="telegramAlias" defaultValue={telegramAlias} placeholder="Player's alias" />
		</label>
	</div>
	<div class="column-1-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<NumberInput
				minValue={0}
				maxValue={1000}
				name="rating"
				placeholder="Rating"
				defaultValue={initialRating}
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
		.last-box {
			grid-column: 2;
		}
	}
	.margin-top {
		margin-top: 1em;
	}
</style>
