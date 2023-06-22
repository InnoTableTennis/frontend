<script lang='ts'>
	import Errors from '$lib/components/Errors.svelte';

	import { loadedPage } from '$lib/stores';
	import { page } from '$app/stores';

	import { onDestroy } from 'svelte';
	export let errors;

	let isLoaded = false;

	$: if ($loadedPage == $page.data.title || $loadedPage === null) {
		isLoaded = true;
		$loadedPage = $page.data.title;
	}

	onDestroy(() => {
		isLoaded = false;
		$loadedPage = null;
	});
</script>

{#if isLoaded}
	<slot />

	<Errors {errors} />
{/if}
