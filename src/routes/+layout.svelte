<script lang="ts">
	import { page } from '$app/stores';

	import { beforeUpdate, onDestroy } from 'svelte';

	import Errors from '$lib/components/error/Errors.svelte';

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

{#if isLoaded}
	<main>
		<slot />
	</main>
	<Errors />
{/if}

<style>
	main {
		align-items: center;
		margin: 0 auto;
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
