<script lang="ts">
	import { isLeader } from '$lib/stores';
	import * as db from '$lib/requests';

	import AddMatchForm from '$lib/components/AddMatchForm.svelte';
	import Separator from '$lib/components/decorations/Separator.svelte';
	import MatchesList from '$lib/components/MatchesList.svelte';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

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

{#if $isLeader}
	{#await getFormData() then resp}
		<AddMatchForm
			players={resp.players}
			tournaments={resp.tournaments}
			on:error={handleError}
			on:update={() => handleInsert()}
		/>

		<Separator />
	{/await}
{/if}

<MatchesList on:error={handleError} bind:handleInsert />
