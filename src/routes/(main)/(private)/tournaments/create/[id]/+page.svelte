<script lang="ts">
	import AddParticipants from '$lib/components/tournament/tournamentConstructor/AddParticipants.svelte';
	import Continue from '$lib/components/tournament/tournamentConstructor/Continue.svelte';
	import CreateTournament from '$lib/components/tournament/tournamentConstructor/CreateTournament.svelte';
	import FinalsDistribution from '$lib/components/tournament/tournamentConstructor/FinalsDistribution.svelte';
	import Groups from '$lib/components/tournament/tournamentConstructor/Groups.svelte';
	import NumberGroups from '$lib/components/tournament/tournamentConstructor/NumberGroups.svelte';
	import NumberFinals from '$lib/components/tournament/tournamentConstructor/NumberFinals.svelte';
	import * as db from '$lib/requests';
	import { createEventDispatcher } from 'svelte';
	import type { Player, Tournament } from '$lib/types/types';
	import type { TournamentStage } from '$lib/types/tournamentTypes';
	import SecondStage from '$lib/components/tournament/tournamentConstructor/SecondStage.svelte';

	export let data;

	const dispatch = createEventDispatcher();

	let stage: TournamentStage = 'create';
	let tournament: Tournament = {} as Tournament;
	let numberParticipants = 0;
	let numberGroups = 1;
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

<svelte:head>
	<meta
		name="description"
		content="Create and manage table tennis tournaments with the Tournament Constructor at InnoTableTennis Club. Set up participants, organize games in groups, and progress to the finals with the easy-to-use constructor tool."
	/>
	<meta
		name="keywords"
		content="tournament constructor, InnoTableTennis Club, create tournaments, manage tournaments, group games, tournament net, table tennis"
	/>
</svelte:head>

{#await requestTournament() then}
	{#if stage === 'create'}
		<CreateTournament bind:id bind:stage />
	{:else if stage === 'addParticipants'}
		<AddParticipants bind:id={tournament.id} bind:stage />
	{:else if stage === 'numberGroups'}
		<NumberGroups bind:id={tournament.id} bind:stage />
	{:else if stage === 'groups'}
		<Groups bind:id={tournament.id} bind:stage bind:finals />
	{:else if stage === 'continue'}
		<Continue bind:stage />
	{:else if stage === 'numberFinals'}
		<NumberFinals id={tournament.id} bind:numberFinals bind:stage />
	{:else if stage === 'finalsDistribution'}
		<FinalsDistribution bind:numberFinals bind:stage bind:id={tournament.id} bind:finals />
	{:else if stage === 'secondStage'}
		<SecondStage bind:numberFinals bind:stage bind:id={tournament.id} on:error={handleError} />
	{/if}
{/await}
