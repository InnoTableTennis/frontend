<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PaginationBar from '$lib/components/base/pagination/PaginationBar.svelte';

	const url = new URL($page.url);

	let currentPageNumber: number = Number(url.searchParams.get('currentPageNumber') || 1);
	let currentPageSize: number = Number(url.searchParams.get('currentPageSize') || 10);

	export let lastPageNumber = 1;
	export let isTopHidden = false;

	function requestNewPage() {
		const url = new URL($page.url);

		url.searchParams.delete('currentPageNumber')
		url.searchParams.delete('currentPageSize')
		
		const searchParams = new URLSearchParams({
			currentPageNumber: String(currentPageNumber),
			currentPageSize: String(currentPageSize),
		}).toString();


		const new_url = new URL(`${url.origin}${url.pathname}?${searchParams}&${url.searchParams}`);
		goto(new_url.href, { replaceState: true });
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
