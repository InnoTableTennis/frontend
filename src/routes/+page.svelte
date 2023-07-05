<script lang="ts">
	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import * as db from '$lib/requests';

	import AddMatchForm from '$lib/components/AddMatchForm.svelte';
	import Separator from '$lib/components/decorations/Separator.svelte';
	import MatchesList from '$lib/components/MatchesList.svelte';
	import ToggleCheckboxButton from '$lib/components/base/ToggleCheckboxButton.svelte';
	import { handleError } from '$lib/errorHandler';
	import FilterMatchesForm from '$lib/components/FilterMatchesForm.svelte';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
	$: isEditing = false;

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
		<ToggleCheckboxButton bind:checked={isEditing} label={'Edit Mode'} />
		<span></span>
	</div>
{/if}

<div class="wrapper">
	{#if isEditing}
		{#await getFormData() then resp}
			<div>
				<AddMatchForm
					players={resp.players}
					tournaments={resp.tournaments}
					on:error={handleError}
					on:update={() => handleInsert()}
				/>
			</div>
		{/await}
	{:else}
		<div>
			<FilterMatchesForm on:error={handleError} on:update={() => handleInsert()} />
		</div>
	{/if}
	<div>
		<MatchesList on:error={handleError} bind:handleInsert {isLeader} />
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