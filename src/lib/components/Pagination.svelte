<script lang='ts'>
	import PaginationBar from '$lib/components/PaginationBar.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let currentPageNumber;
	let currentPageSize;
	export let lastPageNumber = 100;

	function requestNewPage() {
		dispatch('request', { currentPageNumber: currentPageNumber, currentPageSize: currentPageSize });
	}
</script>

<PaginationBar
	bind:currentPageNumber
	bind:currentPageSize
	on:click={requestNewPage}
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
