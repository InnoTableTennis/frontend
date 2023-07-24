<script lang="ts">
	import { AddPlayerFormStore } from '$lib/formStores';
	import type { Player } from '$lib/types/types';
	import Button from '$lib/components/base/Button.svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import DropdownInput from '$lib/components/base/inputs/DropdownInput.svelte';

	export let player: Player;
	export let players: Player[];
	export let participants: Player[] = [];
	export let numberParticipants = 0;

	let name = $AddPlayerFormStore.name;
	$: playerNames = players.map((player) => player.name);

	function resetForm() {
		name = '';
	}

	function handleSelectPlayerName(event: CustomEvent) {
		name = event.detail;
	}

	function addParticipant() {
		for (let i = 0; i < players.length; i++) {
			if (players[i].name === name) {
				if (!participants.includes(players[i])) {
					participants = [...participants, players[i]];
					numberParticipants++;
				}
			}
		}
	}

	function removeParticipant() {
		for (let i = 0; i < participants.length; i++) {
			if (participants[i].name === name) {
				participants.splice(i, 1);
				participants = participants;
				numberParticipants--;
			}
		}
	}
</script>

<div class="header-line">
	<h2>Add Participant</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={addParticipant}>
	<div class="input">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<DropdownInput
				name="name"
				placeholder="Player's name"
				options={playerNames}
				on:select={handleSelectPlayerName}
				isFirstInput={true}
				defaultValue={player.name}
				bind:inputVal={name}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<Button on:click={() => removeParticipant()}>Remove</Button>
		<Button on:click={() => addParticipant()}>Add</Button>
	</div>
</form>

<style>
	.input {
		margin-top: 1rem;
	}
	.line-2-elems {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	.header-line {
		display: flex;
	}

	h2 {
		margin: 0.9em 0;
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
		color: var(--title-color);
	}
</style>
