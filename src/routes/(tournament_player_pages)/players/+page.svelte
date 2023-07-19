<script lang="ts">
	import AddPlayerForm from '$lib/components/AddPlayerForm.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';
	import SortFilterPlayerForm from '$lib/components/SortFilterPlayerForm.svelte';
	// import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;
	let isEditing = false;
	$: isLeader = getRoles($userToken).includes('LEADER');
</script>

<div class="info">
	{#if isLeader}
		<div class="edit-mode">
			<!-- <ToggleCheckboxButton 
				bind:checked={isEditing} 
				label={'Edit Mode'}
			/> -->
		</div>
	{/if}
</div>

<div class="form-list-layout">
	{#if isEditing}
		<div class="form">
			<AddPlayerForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{:else}
		<div class="form">
			<SortFilterPlayerForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div class="players-list">
		<PlayersList on:error={handleError} bind:handleInsert {isLeader} />
	</div>
</div>

<style>
	.form-list-layout {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		grid-template-columns: 1fr 2fr;
	}
	.form {
		max-width: 350px;
		margin-right: 2rem;
	}
	.players-list {
		max-width: 900px;
	}
	.edit-mode {
		text-align: right;
		margin-top: 2rem;
	}

	@media (max-width: 1100px) {
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.form-list-layout {
			display: block;
		}
		.players-list {
			margin: 0 auto;
		}
	}
</style>
