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

<h2>Add Player</h2>

<form on:submit={addPlayer}>
	<div class="line-4-elems">
		<label>
			<span class="form-label">Player Name</span>
			<input
				name="firstName"
				bind:value={firstName}
				bind:this={firstInput}
				required
				autocomplete="off"
				placeholder="Player Name"
				class="full-width"
			/>
		</label>
		<label>
			<span class="form-label">Player Surname</span>
			<input
				name="secondName"
				bind:value={secondName}
				required
				autocomplete="off"
				placeholder="Player Surname"
				class="full-width"
			/>
		</label>
		<label>
			<span class="form-label">Telegram Alias</span>
			<input
				name="telegramAlias"
				bind:value={telegramAlias}
				autocomplete="off"
				placeholder="@telegram_alias"
				class="full-width"
			/>
		</label>
		<label>
			<span class="form-label">Initial Rating</span>
			<input
				type="number"
				min="0"
				max="1000"
				name="rating"
				bind:value={initialRating}
				class="text-center full-width"
			/>
		</label>
	</div>
	<div class="line-4-elems">
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
	}

	form {
		max-width: 800px;
		margin: 0 auto 3em;
		font-size: var(--fontsize-medium2);
	}
	.line-4-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
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
		grid-column: 4;
	}
	.full-width {
		width: 100%;
	}
	.form-label {
		display: inline-block;
		margin-bottom: 0.25em;
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
