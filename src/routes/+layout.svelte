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
