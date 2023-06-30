<script lang="ts">
	import { page } from '$app/stores';

	import { beforeUpdate, onDestroy } from 'svelte';

	import Errors from '$lib/components/error/Errors.svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';

	import { loadedPage, userToken } from '$lib/stores';

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
</svelte:head>

<header>
	<NavBar />
</header>

{#if isLoaded}
	<main>
		<slot />
	</main>
	<Errors />
{/if}

<style>
	header {
		height: 4em;
		background-color: var(--accent-color);
	}
	main {
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 2em;
	}

	@media (max-width: 800px) {
		* {
			font-size: var(--fontsize-medium2);
		}
		main {
			padding: 0 1em;
		}
	}
</style>
