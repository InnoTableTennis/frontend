<script lang="ts">
	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import * as db from '$lib/requests';

	import AddMatchForm from '$lib/components/AddMatchForm.svelte';
	import MatchesList from '$lib/components/MatchesList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import { handleError } from '$lib/errorHandler';
	import SortFilterMatchForm from '$lib/components/SortFilterMatchForm.svelte';
	import EditSwitchBar from '$lib/components/navigation/EditSwitchBar.svelte';
	import EditMatchForm from '$lib/components/EditMatchForm.svelte';
	import type { Matches } from '$lib/types/types';

	let handleInsert: () => void;
	let editData: Matches = {} as Matches;
	let isEditing = false;
	let chosenId = -1;
	let mode = 'add';
	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isChoosing = (mode === 'edit' || mode === 'delete') && isEditing;

	async function getFormData() {
		const playersPromise = db.getPlayers('rating', true, '', '', null, null, 1, 1000000);
		const tournamentsPromise = db.getTournaments('date', true, '', null, null, '', '', 1, 1000000);
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

<div class="form-list-layout">
	{#if isEditing}
		{#await getFormData() then resp}
			{#if mode === 'add'}
				<div class="form">
					<AddMatchForm
						players={resp.players}
						tournaments={resp.tournaments}
						on:error={handleError}
						on:update={() => handleInsert()}
					/>
				</div>
			{:else if mode === 'edit'}
				{#if chosenId === -1}
					Please choose a match to edit
				{:else}
					<div class="form">
						<EditMatchForm
							players={resp.players}
							tournaments={resp.tournaments}
							on:error={handleError}
							on:update={() => handleInsert()}
							bind:match={editData}
							bind:chosenId
						/>
					</div>
				{/if}
			{:else if mode === 'delete'}
				Please choose a match to delete
			{/if}
		{/await}
	{:else}
		<div class="form">
			<SortFilterMatchForm on:error={handleError} on:update={() => handleInsert()} />
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
	.edit-mode {
		text-align: right;
		margin-top: 2rem;
	}
	.matches-list {
		max-width: 900px;
	}

	@media (max-width: 1100px) {
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.form-list-layout {
			display: block;
		}
		.matches-list {
			margin: 0 auto;
		}
	}
</style>
