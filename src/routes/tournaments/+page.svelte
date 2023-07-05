<script lang="ts">
	// import { fly, slide } from 'svelte/transition';
	// import { enhance } from '$app/forms';
	import { getRoles } from '$lib/token';

	import AddTournamentForm from '$lib/components/AddTournamentForm.svelte';
	import Separator from '$lib/components/decorations/Separator.svelte';
	import TournamentList from '$lib/components/TournamentList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import FilterTournamentsForm from '$lib/components/FilterTournamentsForm.svelte';

	import { userToken } from '$lib/stores';
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
			<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{:else}
		<div>
			<FilterTournamentsForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div>
		<TournamentList on:error={handleError} bind:handleInsert {isLeader} />
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
