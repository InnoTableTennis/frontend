<script lang="ts">
	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import * as db from '$lib/requests';

	import AddMatchForm from '$lib/components/AddMatchForm.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import MatchesList from '$lib/components/MatchesList.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import type { Error } from '$lib/types/types';

	let errors: Error[] = [];
	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');

	function handleError(event: CustomEvent) {
		errors = [...errors, event.detail];
	}

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

<PageWrapper {errors}>
	{#if isLeader}
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

	<MatchesList on:error={handleError} {isLeader} bind:handleInsert />
</PageWrapper>
