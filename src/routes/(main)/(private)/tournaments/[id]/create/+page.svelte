<script lang="ts">
	import AddParticipants from '$lib/components/tournament/tournamentConstructor/AddParticipants.svelte';
	import Continue from '$lib/components/tournament/tournamentConstructor/Continue.svelte';
	import CreateTournament from '$lib/components/tournament/tournamentConstructor/CreateTournament.svelte';
	import FinalsDistribution from '$lib/components/tournament/tournamentConstructor/FinalsDistribution.svelte';
	import Groups from '$lib/components/tournament/tournamentConstructor/Groups.svelte';
	import NumberGroups from '$lib/components/tournament/tournamentConstructor/NumberGroups.svelte';
	import NumberFinals from '$lib/components/tournament/tournamentConstructor/NumberFinals.svelte';
	import type { Player } from '$lib/types/types';
	import type { TournamentStage } from '$lib/types/tournamentTypes';
	import SecondStage from '$lib/components/tournament/tournamentConstructor/SecondStage.svelte';
	import { handleError } from '$lib/errorHandler';

	export let data;

	$: tournament = data.tournament;

	let stage: TournamentStage = 'create';
	let finals: Player[][];
	let numberFinals = 1;
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

{#if stage === 'create'}
	<CreateTournament {tournament} bind:stage />
{:else if stage === 'addParticipants'}
	<AddParticipants {tournament} bind:stage />
{:else if stage === 'numberGroups'}
	<NumberGroups {tournament} bind:stage />
{:else if stage === 'groups'}
	<Groups {tournament} bind:stage bind:finals />
{:else if stage === 'continue'}
	<Continue bind:stage />
{:else if stage === 'numberFinals'}
	<NumberFinals {tournament} bind:numberFinals bind:stage />
{:else if stage === 'finalsDistribution'}
	<FinalsDistribution bind:numberFinals bind:stage {tournament} bind:finals />
{:else if stage === 'secondStage'}
	<SecondStage bind:numberFinals bind:stage {tournament} on:error={handleError} />
{/if}
