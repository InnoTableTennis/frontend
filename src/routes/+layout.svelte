<script lang="ts">
	import { page } from '$app/stores';

	import { beforeUpdate, onDestroy } from 'svelte';

	import Errors from '$lib/components/error/Errors.svelte';

	import { loadedPage, userToken } from '$lib/stores';
	import PopupCaller from '$lib/components/popup/PopupCaller.svelte';

	let isLoaded = false;

	$: if ($loadedPage == $page.data.title || $loadedPage === null) {
		isLoaded = true;
		$loadedPage = $page.data.title;
	}

	beforeUpdate(() => {
		const token = localStorage.getItem('token');
		userToken.set(token ?? '');
	});

	onDestroy(() => {
		isLoaded = false;
		$loadedPage = null;
	});
</script>

<svelte:head>
	<title>InnoTableTennis | {$page.data.title}</title>
	<meta name="author" content="InnoTableTennis club" />
	<meta
		name="description"
		content="Welcome to InnoTableTennis Club! Stay updated with exciting table tennis matches, tournaments, and player statistics. Join us at Innopolis University for a thrilling table tennis experience."
	/>
	<meta
		name="keywords"
		content="table tennis, tennis, Innopolis, Inno, University, InnoTableTennis, Innopolis University, Club, Table tennis club"
	/>
	<link rel="canonical" href="https://tabletennis.innopolis.university/" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="InnoTableTennis | Profile" />
	<meta
		property="og:description"
		content="Explore your table tennis statistics at InnoTableTennis Club. View the number of tournaments played, win/loss records, rating history, graphs, and a complete list of all your played games. Track your progress and achievements in the club."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tabletennis.innopolis.university/players" />
	<meta property="og:image" content="%sveltekit.assets%/favicon.png" />
</svelte:head>

{#if isLoaded}
	<PopupCaller />
	<slot />
	<Errors />
{/if}

<style>
	@media (max-width: 800px) {
		* {
			font-size: var(--fontsize-medium2);
		}
	}
</style>
