<script lang="ts">
	// import { fly, slide } from 'svelte/transition';
	// import { enhance } from '$app/forms';
	import { getRoles } from '$lib/token';

	import AddTournamentForm from '$lib/components/AddTournamentForm.svelte';
	import TournamentList from '$lib/components/TournamentList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import SortFilterTournamentForm from '$lib/components/SortFilterTournamentForm.svelte';

	import { userToken } from '$lib/stores';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isEditing = false;
</script>

<div class="page">
	{#if isLeader}
		<div class="edit-mode">
			<ToggleCheckboxButton 
				bind:checked={isEditing} 
				label={'Edit Mode'} 
			/>
			<span />
		</div>
	{/if}

	<div class="wrapper">
		{#if isEditing}
			<div class="form">
				<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />
			</div>
		{:else if $userToken}
			<div class="form">
				<SortFilterTournamentForm on:error={handleError} on:update={() => handleInsert()} />
			</div>
		{/if}
		<div class="tournaments-list">
			<TournamentList on:error={handleError} bind:handleInsert {isLeader} />
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
	}
	.tournaments-list {
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
		.tournaments-list {
			margin: 0;
		}
	}
</style>
