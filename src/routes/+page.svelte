<script lang="ts">
	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import * as db from '$lib/requests';

	import AddMatchForm from '$lib/components/AddMatchForm.svelte';
	import MatchesList from '$lib/components/MatchesList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import { handleError } from '$lib/errorHandler';
	import FilterMatchForm from '$lib/components/FilterMatchForm.svelte';
	import EditSwitchBar from '$lib/components/navigation/EditSwitchBar.svelte';
	import EditMatchForm from '$lib/components/EditMatchForm.svelte';
	import type { Matches } from '$lib/types/types';

	let handleInsert: () => void;
	let editData: Matches = {} as Matches;
	$: editData;
	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isEditing = false;
	$: mode = 'add';
	$: isChoosing = (mode === 'edit' || mode === 'delete') && isEditing;
	$: chosenId = -1;

	async function getFormData() {
		const playersPromise = db.getPlayers(1, 1000000);
		const tournamentsPromise = db.getTournaments(1, 1000000);

		const [playersResponse, tournamentsResponse] = await Promise.all([
			playersPromise,
			tournamentsPromise,
		]);
		return { players: playersResponse.data, tournaments: tournamentsResponse.data };
	}
</script>

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
		{#await getFormData() then resp}
			{#if mode === 'add'}
				<div>
					<AddMatchForm
						players={resp.players}
						tournaments={resp.tournaments}
						on:error={handleError}
						on:update={() => handleInsert()}
					/>
				</div>
			{:else if mode === 'edit'}
				<div>
					<EditMatchForm
						players={resp.players}
						tournaments={resp.tournaments}
						on:error={handleError}
						on:update={() => handleInsert()}
						bind:match={editData}
					/>
				</div>
			{:else if mode === 'delete'}
				Please choose a match to delete
			{/if}
		{/await}
	{:else}
		<div>
			<FilterMatchForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div class="matches-list">
		<MatchesList
			on:error={handleError}
			bind:handleInsert
			{isLeader}
			bind:isChoosing
			bind:chosenId
			bind:editData
		/>
	</div>
</div>

<style>
	.wrapper {
		height: 600px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		align-items: center;
	}
	.edit-mode {
		text-align: right;
		margin-top: 2rem;
	}
	.matches-list {
		margin-left: 3rem;
	}

	@media (max-width: 800px) {
		.wrapper {
			display: block;
		}
		.matches-list {
			margin: 0;
		}
	}
</style>
