<script lang="ts">
	import ViewTournament from '$lib/components/tournament/ViewTournament.svelte';

	export let data;

	let id = Number(data.id);
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

<ViewTournament bind:id />
