<script lang="ts">
	import AddPlayerForm from '$lib/components/AddPlayerForm.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';
	import FilterPlayerForm from '$lib/components/FilterPlayerForm.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isEditing = false;
</script>

{#if isLeader}
	<div class="edit-mode">
		<!-- <ToggleCheckboxButton bind:checked={isEditing} label={'Edit Mode'}/> -->
	</div>
{/if}

<div class="wrapper">
	{#if isEditing}
		<div>
			<AddPlayerForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{:else if $userToken}
		<div>
			<FilterPlayerForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div class="players-list">
		<PlayersList on:error={handleError} bind:handleInsert {isLeader} />
	</div>
</div>

<style>
	.wrapper {
		height: 600px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		align-items: center;
	}
	.players-list {
		margin-left: 3rem;
	}
	.edit-mode {
		text-align: right;
		margin-top: 2rem;
	}

	@media (max-width: 800px) {
		.wrapper {
			display: block;
		}
		.players-list {
			margin: 0;
		}
	}
</style>
