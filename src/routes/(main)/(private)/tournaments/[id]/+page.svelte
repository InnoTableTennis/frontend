<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as db from '$lib/requests';
	import type { Tournament } from "$lib/types/types.js";
	import ViewTournament from '$lib/components/ViewTournament.svelte';

	export let data;

	const dispatch = createEventDispatcher();

	let isOnline = false;
	let tournament: Tournament= {} as Tournament; 

	async function requestTournament() {
		let id = Number(data.id);
		await db
			.getTournament(
				id
			)
			.then((result) => {
				tournament = result.data;
			})
			.catch((error) => {
				dispatch('error', error);
			});
	}
</script>

{#await requestTournament() then}
	{#if isOnline}
		<h1>{tournament.title}</h1>
	{:else}
		<ViewTournament
			bind:tournament
		/>
	{/if}
{/await}

<style>
	h1 {
		font-size: var(--fontsize-x-large);
	}
</style>
