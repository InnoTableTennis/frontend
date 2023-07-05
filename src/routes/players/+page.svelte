<script lang="ts">
	import AddPlayerForm from '$lib/components/AddPlayerForm.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';
	import FilterPlayersForm from '$lib/components/FilterMatchesForm.svelte';
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
		<ToggleCheckboxButton bind:checked={isEditing} label={'Edit Mode'} />
		<span></span>
	</div>
{/if}

<div class="wrapper">
	{#if isEditing}
		<div>
			<AddPlayerForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{:else}
		<div>
			<FilterPlayersForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div>
		<PlayersList on:error={handleError} bind:handleInsert {isLeader} />
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 2fr;
	}
	@media (max-width: 800px) {
		.wrapper {
			display: block;
		}
	}
	
	.edit-mode {
		display: inline;
	}
</style>