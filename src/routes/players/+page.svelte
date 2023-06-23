<script lang="ts">
	import AddPlayerForm from '$lib/components/AddPlayerForm.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import type { Error } from '$lib/types/types';

	let errors: Error[] = [];
	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');

	function handleError(event: CustomEvent) {
		errors = [...errors, event.detail];
	}
</script>

<PageWrapper {errors}>
	{#if isLeader}
		<AddPlayerForm on:error={handleError} on:update={() => handleInsert()} />

		<Separator />
	{/if}

	<PlayersList on:error={handleError} bind:handleInsert {isLeader} />
</PageWrapper>
