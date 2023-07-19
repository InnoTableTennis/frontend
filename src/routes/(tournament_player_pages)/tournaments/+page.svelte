<script lang="ts">
	// import { fly, slide } from 'svelte/transition';
	// import { enhance } from '$app/forms';
	import { getRoles } from '$lib/token';

	import AddTournamentForm from '$lib/components/AddTournamentForm.svelte';
	import TournamentList from '$lib/components/TournamentList.svelte';
	// import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import SortFilterTournamentForm from '$lib/components/SortFilterTournamentForm.svelte';

	import { userToken } from '$lib/stores';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;
	let isEditing = false;
	$: isLeader = getRoles($userToken).includes('LEADER');
</script>

{#if isLeader}
	<div class="edit-mode">
		<!-- <ToggleCheckboxButton 
			bind:checked={isEditing} 
			label={'Edit Mode'} 
		/> -->
		<span />
	</div>
{/if}

<div class="form-list-layout">
	{#if isEditing}
		<div class="form">
			<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{:else}
		<div class="form">
			<SortFilterTournamentForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div class="tournaments-list">
		<TournamentList on:error={handleError} bind:handleInsert {isLeader} />
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
	.tournaments-list {
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
			margin: 0;
		}
		.tournaments-list {
			margin: 0 auto;
		}
	}
</style>
