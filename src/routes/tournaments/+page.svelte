<script lang="ts">
	// import { fly, slide } from 'svelte/transition';
	// import { enhance } from '$app/forms';
	import { getRoles } from '$lib/token';

	import AddTournamentForm from '$lib/components/AddTournamentForm.svelte';
	import TournamentList from '$lib/components/TournamentList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import FilterTournamentForm from '$lib/components/FilterTournamentForm.svelte';

	import { userToken } from '$lib/stores';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isEditing = false;
</script>

{#if isLeader}
	<div class="edit-mode">
		<ToggleCheckboxButton bind:checked={isEditing} label={'Edit Mode'} />
		<span />
	</div>
{/if}

<div class="wrapper">
	{#if isEditing}
		<div>
			<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{:else if $userToken}
		<div>
			<FilterTournamentForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div class="tournaments-list">
		<TournamentList on:error={handleError} bind:handleInsert {isLeader} />
	</div>
</div>

<style>
	.wrapper {
		height: 600px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		align-items: center;
	}
	.tournaments-list {
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
		.tournaments-list {
			margin: 0;
		}
	}
</style>
