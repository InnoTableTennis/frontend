<script>
	// import { fly, slide } from 'svelte/transition';
	// import { enhance } from '$app/forms';
	import { getRoles } from '$lib/token';

	import AddTournamentForm from '$lib/components/AddTournamentForm.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import TournamentList from '$lib/components/TournamentList.svelte';

	import { userToken } from '$lib/stores';

	import PageWrapper from '../../lib/components/PageWrapper.svelte';

	let errors = [];
	let handleInsert;

	$: isLeader = getRoles($userToken).includes('LEADER');

	function handleError(event) {
		errors = [...errors, event.detail];
	}
</script>

<PageWrapper {errors}>
	{#if isLeader}
		<AddTournamentForm on:error={handleError} on:update={() => handleInsert()} />

		<Separator />
	{/if}

	<TournamentList on:error={handleError} bind:handleInsert {isLeader} />
</PageWrapper>
