<script lang="ts">
	// import { enhance } from '$app/forms';
	import Button from '$lib/components/base/Button.svelte';
	import { AddPlayerFormStore } from '$lib/formStores';

	import { createEventDispatcher } from 'svelte';

	import * as db from '$lib/requests';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import { countNameWords } from '$lib/helper';

	const dispatch = createEventDispatcher();

	let name = $AddPlayerFormStore.name;
	let telegramAlias = $AddPlayerFormStore.telegramAlias;
	let initialRating = $AddPlayerFormStore.initialRating;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(countNameWords(name) >= 2);
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
</script>

<div class="header-line">
	<h2>Add Player</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={addPlayer} on:change={saveForm}>
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="name"
				placeholder="Player's name"
				required={true}
				isFirst={true}
				bind:stringVal={name}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="telegramAlias"
				bind:stringVal={telegramAlias}
				placeholder="Player's alias"
			/>
		</label>
	</div>
	<div class="column-1-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="number"
				min="0"
				max="1000"
				name="rating"
				placeholder="Rating"
				defaultNumValue={initialRating}
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
		font-size: var(--fontsize-large);
		margin: 0.9em 0;
		font-weight: var(--fontweight-1);
		color: var(--title-color);
	}

	form {
		max-width: 800px;
		font-size: var(--fontsize-medium2);
	}
	.column-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		align-items: end;
	}
	.column-1-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		align-items: end;
	}
	.line-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		align-items: end;
	}
	.header-line {
		display: flex;
	}

	.last-box {
		grid-column: 2;
		margin-top: 1.5em;
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
