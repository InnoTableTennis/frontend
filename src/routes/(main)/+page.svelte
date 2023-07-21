<script lang="ts">
	import { isLeader } from '$lib/stores';
	import * as db from '$lib/requests';

	import AddMatchForm from '$lib/components/forms/AddMatchForm.svelte';
	import MatchesList from '$lib/components/MatchesList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import { handleError } from '$lib/errorHandler';
	import SortFilterMatchForm from '$lib/components/forms/SortFilterMatchForm.svelte';
	import EditSwitchBar from '$lib/components/navigation/EditSwitchBar.svelte';
	import EditMatchForm from '$lib/components/forms/EditMatchForm.svelte';
	import type { Match } from '$lib/types/types';

	let handleInsert: () => void;

	let editData: Match = {} as Match;
	let isEditing = false;
	let chosenId = -1;
	let mode = 'add';
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

{#if $isLeader}
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
			bind:mode
			bind:isChoosing
			bind:chosenId
			bind:editData
		/>
	</div>
</div>

<MatchesList on:error={handleError} bind:handleInsert />
