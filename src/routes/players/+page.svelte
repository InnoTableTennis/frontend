<script lang="ts">
	import AddPlayerForm from '$lib/components/AddPlayerForm.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';
	import SortFilterPlayerForm from '$lib/components/SortFilterPlayerForm.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isEditing = false;
</script>

<div class="page">
	{#if isLeader}
		<div class="edit-mode">
			<!-- <ToggleCheckboxButton 
				bind:checked={isEditing} 
				label={'Edit Mode'}
			/> -->
		</div>
	{/if}

	<div class="wrapper">
		{#if isEditing}
			<div class="form">
				<AddPlayerForm on:error={handleError} on:update={() => handleInsert()} />
			</div>
		{:else if $userToken}
			<div class="form">
				<SortFilterPlayerForm on:error={handleError} on:update={() => handleInsert()}/>
			</div>
		{/if}
		<div class="players-list">
			<PlayersList on:error={handleError} bind:handleInsert {isLeader} />
		</div>
	</div>
</div>

<style>
	.page {
		padding: 0 5%;
	}
	.wrapper {
		height: 600px;
		display: grid;
		grid-auto-flow: column;
		align-items: center;

	}
	.form {
		max-width: 350px;
		margin-right: 2rem;
	}
	.players-list {
		margin-right: 0;
		max-width: 900px;
	}
	.edit-mode {
		text-align: right;
		margin-top: 2rem;
	}

	@media (max-width: 1300px) {
		.page {
			padding: 0;
		}
		.form {
			margin-right: 2rem;
		}
	}
	@media (max-width: 1000px) {
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.wrapper {
			display: block;
		}
		.players-list {
			margin: 0;
		}
	}
</style>
