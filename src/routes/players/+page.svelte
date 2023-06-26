<script lang="ts">
	import AddPlayerForm from '$lib/components/AddPlayerForm.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
</script>

{#if isLeader}
	<AddPlayerForm on:error={handleError} on:update={() => handleInsert()} />

	<Separator />
{/if}

<PlayersList on:error={handleError} bind:handleInsert {isLeader} />
