<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { AddPlayerFormStore } from '$lib/formStores';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import type { Players } from '$lib/types/types';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import { countNameWords } from '$lib/helper';
	import { alertPopup } from '$lib/popupHandler';

	let name = $AddPlayerFormStore.name;
	let telegramAlias = $AddPlayerFormStore.telegramAlias;
	let initialRating = $AddPlayerFormStore.initialRating;

	export let player: Players;
	export let chosenId = -1;

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(countNameWords(name) >= 2);
	}

	const editPlayer = async (e: Event) => {
		let isConfirmed = await alertPopup('Are you sure that you want to edit this match?');
		if (!isConfirmed) return;
		const data = new FormData(e.target as HTMLFormElement);

		db.editPlayer(
			player.id.toString() as string,
			data.get('name') as string,
			data.get('telegramAlias') as string,
			Number(data.get('rating')),
		)
			.then(() => {
				dispatch('update');
			})
			.catch((error) => {
				dispatch('error', error);
			});
		player = {} as Players;
		chosenId = -1;
	};

	const saveForm = function () {
		AddPlayerFormStore.set({
			name: name,
			telegramAlias: telegramAlias,
			initialRating: initialRating,
		});
	};
</script>

<h2>Edit Player</h2>

<form on:submit={editPlayer} on:change={saveForm}>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="name"
				placeholder="Player's name"
				required={true}
				isFirst={true}
				defaultValue={player.name}
				bind:stringVal={name}
			/>
		</label>
		<label>
			<InputTemplate
				type="text"
				name="telegramAlias"
				placeholder="Player's alias"
				defaultValue={player.telegramAlias}
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
				defaultNumValue={player.rating}
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
