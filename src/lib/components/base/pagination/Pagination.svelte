<script lang="ts">
	import PaginationBar from '$lib/components/base/pagination/PaginationBar.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let currentPageNumber: number;
	let currentPageSize: number;
	export let lastPageNumber = 100;
	export let isTopHidden = false;

	function requestNewPage() {
		dispatch('request', { currentPageNumber: currentPageNumber, currentPageSize: currentPageSize });
	}
</script>

<PaginationBar
	bind:currentPageNumber
	bind:currentPageSize
	on:click={requestNewPage}
	{isTopHidden}
	{lastPageNumber}
/>
<slot />
<PaginationBar
	bind:currentPageNumber
	bind:currentPageSize
	on:click={requestNewPage}
	isTop={false}
	{lastPageNumber}
/>
