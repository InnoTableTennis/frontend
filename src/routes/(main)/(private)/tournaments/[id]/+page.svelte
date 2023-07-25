<script lang="ts">
	import ViewTournament from '$lib/components/ViewTournament.svelte';

	export let data;

	let id = Number(data.id);
</script>

<ViewTournament bind:id />
