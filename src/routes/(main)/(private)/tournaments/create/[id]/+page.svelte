<script lang="ts">
	import AddParticipants from '$lib/components/createTournament/AddParticipants.svelte';
	import Continue from '$lib/components/createTournament/Continue.svelte';
	import CreateTournament from '$lib/components/createTournament/CreateTournament.svelte';
	import FinalsDistribution from '$lib/components/createTournament/FinalsDistribution.svelte';
	import Groups from '$lib/components/createTournament/Groups.svelte';
	import NumberGroups from '$lib/components/createTournament/NumberGroups.svelte';
	import NumberFinals from '$lib/components/createTournament/NumberFinals.svelte';
	import * as db from '$lib/requests';
	import { createEventDispatcher } from 'svelte';
	import type { Player, Tournament } from '$lib/types/types.js';
	import SecondStage from '$lib/components/createTournament/SecondStage.svelte';
	import {handleError} from "$lib/errorHandler";

	export let data;

	const dispatch = createEventDispatcher();

	let stage:
		'create'
		| 'addParticipants'
		| 'numberGroups'
		| 'groups'
		| 'continue'
		| 'numberFinals'
		| 'finalsDistribution'
		| 'secondStage' = 'create';
	let id: number;
	let tournament: Tournament = {} as Tournament;
	let finals: Player[][];
	let numberFinals = 1;

	async function requestTournament() {
		id = Number(data.id);
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

{#await requestTournament() then}
	{#if stage === 'create'}
		<CreateTournament bind:id bind:stage />
	{:else if stage === 'addParticipants'}
		<AddParticipants bind:id={tournament.id} bind:stage />
	{:else if stage === 'numberGroups'}
		<NumberGroups bind:id={tournament.id} bind:stage />
	{:else if stage === 'groups'}
		<Groups bind:id={tournament.id} bind:stage bind:finals/>
	{:else if stage === 'continue'}
		<Continue bind:stage />
	{:else if stage === 'numberFinals'}
		<NumberFinals bind:id={tournament.id} bind:numberFinals bind:stage />
	{:else if stage === 'finalsDistribution'}
		<FinalsDistribution bind:numberFinals bind:stage bind:id={tournament.id} bind:finals/>
	{:else if stage === 'secondStage'}
		<SecondStage bind:numberFinals bind:stage bind:id={tournament.id} on:error={handleError}/>
	{/if}
{/await}
