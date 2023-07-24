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

	export let data;

	const dispatch = createEventDispatcher();

	let stage:
		| 'create'
		| 'addParticipants'
		| 'numberGroups'
		| 'groups'
		| 'continue'
		| 'numberFinals'
		| 'finalsDistribution'
		| 'secondStage' = 'create';
	let tournament: Tournament = {} as Tournament;
	let participants: Player[] = [];
	let numberParticipants = 0;
	let numberGroups = 1;
	let numberFinals = 1;

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

{#await requestTournament() then}
	{#if stage === 'create'}
		<CreateTournament {tournament} bind:stage />
	{:else if stage == 'addParticipants'}
		<AddParticipants bind:tournament bind:stage bind:numberParticipants bind:participants />
	{:else if stage == 'numberGroups'}
		<NumberGroups bind:tournament bind:participants bind:stage />
	{:else if stage == 'groups'}
		<Groups bind:tournament bind:numberGroups bind:numberParticipants bind:stage />
	{:else if stage == 'continue'}
		<Continue bind:stage />
	{:else if stage == 'numberFinals'}
		<NumberFinals bind:numberFinals bind:stage />
	{:else if stage == 'finalsDistribution'}
		<FinalsDistribution bind:numberFinals bind:numberGroups bind:numberParticipants bind:stage />
	{:else if stage == 'secondStage'}
		<SecondStage bind:numberFinals bind:stage />
	{/if}
{/await}
