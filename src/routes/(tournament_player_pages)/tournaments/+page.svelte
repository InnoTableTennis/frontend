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
	import type { Tournaments } from '$lib/types/types';
	import EditSwitchBar from '$lib/components/navigation/EditSwitchBar.svelte';
	import EditTornamentForm from '$lib/components/EditTornamentForm.svelte';

	let handleInsert: () => void;
	let editData: Tournaments = {} as Tournaments;
	let isEditing = false;
	let chosenId = -1;
	let mode = 'add';
	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isChoosing = (mode === 'edit' || mode === 'delete') && isEditing;
</script>

<div class="page">
	{#if isLeader}
		<div class="edit-mode">
			<ToggleCheckboxButton
				bind:checked={isEditing}
				bind:chosenId
				bind:editData
				bind:mode
				label={'Edit Mode'}
			/>
			<span />
		</div>
	{/if}

	{#if isEditing}
		<div class="edit-switch-bar">
			<EditSwitchBar bind:mode bind:chosenId bind:editData />
		</div>
	{/if}

	<div class="wrapper">
		{#if isEditing}
			{#if mode === 'add'}
				<div class="form">
					<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />
				</div>
			{:else if mode === 'edit'}
				{#if chosenId === -1}
					Please choose a tournament to edit
				{:else}
					<div class="form">
						<EditTornamentForm
							on:error={handleError}
							on:update={() => handleInsert()}
							bind:tournament={editData}
							bind:chosenId
						/>
					</div>
				{/if}
			{:else if mode === 'delete'}
				Please choose a tournament to delete
			{/if}
		{:else}
			<div class="form">
				<SortFilterTournamentForm on:error={handleError} on:update={() => handleInsert()} />
			</div>
		{/if}
		<div class="tournaments-list">
			<TournamentList
				on:error={handleError}
				bind:handleInsert
				{isLeader}
				bind:isChoosing
				bind:chosenId
				bind:editData
			/>
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
		grid-template-columns: 1fr 2fr;
	}
	.form {
		max-width: 350px;
		margin-right: 2rem;
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
			margin: 0;
		}
		.tournaments-list {
			margin: 0;
		}
	}
</style>
