<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as db from '$lib/requests';
	import type { Tournament } from '$lib/types/types.js';
	import ViewTournament from '$lib/components/tournament/ViewTournament.svelte';

	export let data;

	const dispatch = createEventDispatcher();

	let isOnline = false;
	let tournament: Tournament = {} as Tournament;

	async function requestTournament() {
		let id = Number(data.id);
		await db
			.getTournament(id)
			.then((result) => {
				tournament = result.data;
			})
			.catch((error) => {
				dispatch('error', error);
			});
	}
</script>

<svelte:head>
	<meta
		name="description"
		content="Explore the statistics, list of participants, groups, and tournament net and matches of the Tournament Name at InnoTableTennis Club. Stay updated with exciting table tennis games and see who emerges as the winner."
	/>
	<meta
		name="keywords"
		content="tournament name, InnoTableTennis Club, tournament statistics, list of participants, groups, tournament net, table tennis matches"
	/>
</svelte:head>

{#await requestTournament() then}
	{#if isOnline}
		<h1>{tournament.title}</h1>
	{:else}
		<ViewTournament bind:tournament />
	{/if}
{/await}

<style>
	h1 {
		font-size: var(--fontsize-x-large);
	}
</style>
