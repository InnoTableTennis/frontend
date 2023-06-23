<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LeftArrow from '$lib/components/icons/LeftArrow.svelte';
	import RightArrow from '$lib/components/icons/RightArrow.svelte';

	const dispatch = createEventDispatcher();

	let firstPageNumber = 1;
	let middlePageNumber: number;
	let visiblePages: number[];
	let currentPageIndex = 0;

	let sizes = [10, 20, 50, 100, 200];

	export let isTop = true;
	export let currentPageNumber = firstPageNumber;
	export let currentPageSize = sizes[0];
	export let lastPageNumber = 100;

	$: isSmall = lastPageNumber - firstPageNumber < 3;

	$: currentPageNumber = currentPageNumber < lastPageNumber ? currentPageNumber : lastPageNumber;

	$: {
		if (lastPageNumber - firstPageNumber >= 2)
			visiblePages = [middlePageNumber - 1, middlePageNumber, middlePageNumber + 1];
		else {
			if (lastPageNumber - firstPageNumber == 2) visiblePages = [firstPageNumber];
			else if (lastPageNumber - firstPageNumber == 1) {
				visiblePages = [firstPageNumber, lastPageNumber];
			}
		}
	}

	$: {
		if (currentPageNumber == firstPageNumber) {
			middlePageNumber = firstPageNumber + 1;
			currentPageIndex = 0;
		} else if (currentPageNumber == lastPageNumber) {
			middlePageNumber = lastPageNumber - 1;
			currentPageIndex = 2;
		} else {
			middlePageNumber = currentPageNumber;
			currentPageIndex = 1;
		}
		if (lastPageNumber - firstPageNumber >= 2)
			visiblePages = [middlePageNumber - 1, middlePageNumber, middlePageNumber + 1];
		else if (lastPageNumber - firstPageNumber == 0) visiblePages = [firstPageNumber];
		else if (lastPageNumber - firstPageNumber == 1) {
			visiblePages = [firstPageNumber, lastPageNumber];
			currentPageIndex = Number(!(currentPageNumber == firstPageNumber));
		}
	}

	function handleLeftClick() {
		if (currentPageNumber > firstPageNumber) {
			currentPageNumber -= 1;
		}
		dispatch('click');
	}
	function handleRightClick() {
		if (currentPageNumber < lastPageNumber) {
			currentPageNumber += 1;
		}
		dispatch('click');
	}

	function handleClick(event: Event) {
		currentPageNumber = Number((<HTMLInputElement>event.target).value);
		dispatch('click');
	}

	function handleSizeClick(event: Event) {
		currentPageSize = Number((<HTMLInputElement>event.target).value);
		currentPageNumber = firstPageNumber;
		dispatch('click');
	}
</script>

<div class="container" class:isTop>
	<div class="pages">
		<button class="arrow" on:click={handleLeftClick}>
			<LeftArrow />
		</button>

		{#if !isSmall}
			<button
				class="first number"
				class:invisible={currentPageNumber - firstPageNumber < 2}
				on:click={handleClick}
				value={firstPageNumber}>{firstPageNumber}</button
			>
			<span class="ellipses" class:invisible={currentPageNumber - firstPageNumber < 2}>...</span>
		{/if}
		{#each visiblePages as visiblePage, i}
			<button
				class="number"
				class:current={currentPageIndex == i}
				on:click={handleClick}
				value={visiblePage}>{visiblePage}</button
			>
		{/each}
		{#if !isSmall}
			<span class="ellipses" class:invisible={lastPageNumber - currentPageNumber < 2}>...</span>
			<button
				class="last number"
				class:invisible={lastPageNumber - currentPageNumber < 2}
				on:click={handleClick}
				value={lastPageNumber}>{lastPageNumber}</button
			>
		{/if}
		<button class="arrow" on:click={handleRightClick}>
			<RightArrow />
		</button>
	</div>
	<div class="sizes">
		<span class="sizes-label">Show by</span>
		{#each sizes as size}
			<button
				class="number"
				class:current={size === currentPageSize}
				on:click={handleSizeClick}
				value={size}>{size}</button
			>
		{/each}
	</div>
</div>

<style>
	.sizes-label {
		color: #c4d6b0;
		margin-right: 0.8rem;
	}
	.container {
		max-width: 800px;
		margin: 0 auto;
		margin-bottom: 3em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: default;
	}
	.isTop {
		margin-top: 3em;
		margin-bottom: 0;
	}
	.number {
		color: #c4d6b0;
		outline: none;
		border: none;
		background: none;
		font-weight: 600;
		transition: 0.1s;
	}
	.ellipses {
		font-size: 1em;
		color: #c4d6b0;
		cursor: default;
	}
	.sizes .number {
		border-radius: 10px;
	}
	.pages .number {
		border-radius: 50%;
	}
	.arrow {
		background: none;
		border: none;
		transition: 0.1s;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.arrow,
	.number {
		font-size: 1em;
		width: 2.5rem;
		height: 2.5rem;
	}
	.number:hover {
		/* box-shadow: 0px 4px 4px 2px rgba(105, 105, 105, 0.7); */
		transform: scale(1.1);
		cursor: pointer;
	}
	.arrow:hover {
		transform: scale(1.1);
		cursor: pointer;
	}
	.invisible {
		visibility: hidden;
	}
	.current {
		background-color: #c4d6b0;
		color: rgba(0, 0, 0, 0.8);
	}
	.number.current:hover {
		box-shadow: none;
		cursor: default;
		transform: none;
	}
	.pages {
		display: flex;
		align-items: center;
	}
	.sizes {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	@media (max-width: 800px) {
		.container {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
