<script lang="ts">
	// import { fly, slide } from 'svelte/transition';
	// import { enhance } from '$app/forms';
	import { getRoles } from '$lib/token';

	import AddTournamentForm from '$lib/components/AddTournamentForm.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import TournamentList from '$lib/components/TournamentList.svelte';

	import { userToken } from '$lib/stores';
	import { handleError } from '$lib/errorHandler';

	let handleInsert: () => void;

	$: isLeader = getRoles($userToken).includes('LEADER');
</script>

{#if isLeader}
	<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />

	<Separator />
{/if}

<TournamentList on:error={handleError} bind:handleInsert {isLeader} />
