<script lang="ts">
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import { SortFilterPlayerFormStore } from '$lib/formStores';
	import type { Player } from '$lib/types/types';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';

	export let isLeader = false;
	let players: Player[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;


	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	async function requestNewPage() {
		let sortBy = $SortFilterPlayerFormStore.sortBy;
		let descending = $SortFilterPlayerFormStore.descending;
		let name = $SortFilterPlayerFormStore.name;
		let alias = $SortFilterPlayerFormStore.telegramAlias;
		let minRating = $SortFilterPlayerFormStore.minRating;
		let maxRating = $SortFilterPlayerFormStore.maxRating;
		await db
			.getPlayers(
				sortBy,
				descending,
				name,
				alias,
				parseInt(minRating),
				parseInt(maxRating),
				currentPageNumber,
				currentPageSize,
			)
			.then((result) => {
				players = result.data;
				lastPageNumber = result.totalPages;
			})
			.catch((error) => {
				dispatch('error', error);
			});
	}

	function handleRequest(event: CustomEvent) {
		currentPageNumber = event.detail.currentPageNumber;
		currentPageSize = event.detail.currentPageSize;
		requestNewPage();
	}

	function getAlias(alias: string) {
		if (alias) {
			return '@' + alias;
		}
		return '-';
	}
</script>

{#await requestNewPage() then}
	{#if players.length}
		<Pagination {lastPageNumber} on:request={handleRequest}>
			<div class="scroll">
				<section class="games-list">
					<div class="table-header" class:not-leader={!isLeader}>
						<span>#</span>
						<span>Name</span>
						<span>Telegram Alias</span>
						<span>Delta</span>
						<span>Rating</span>
						<!-- <span>Additional Info</span> -->
						<span />
					</div>

					{#each players as player, i}
                        <div class="players-grid" class:not-leader={!isLeader}>
                            <div>
                                <span class="position bold"
                                    >{(currentPageNumber - 1) * currentPageSize + i + 1}</span
                                >
                            </div>
                            <div class="no-wrap bold">{player.name}</div>
                            <div class="no-wrap">{getAlias(player.telegramAlias)}</div>
                            <div class="no-wrap">{player.numberOfGames}</div>
                            <div class="rating bold">{player.rating}</div>
                        </div>
					{/each}
				</section>
			</div></Pagination
		>
	{:else}
		<p class="details">Oops! There is not a single entity satisfying the query</p>
	{/if}
{/await}

<style>
	.details {
		font-size: var(--fontsize-medium1);
		margin: 2rem;
	}
	.games-list {
		max-width: 900px;
		min-width: 700px;

		height: 30.5rem;
		margin-top: 1rem;
		font-size: var(--fontsize-medium1);
		overflow-y: scroll;
	}
	.games-list::-webkit-scrollbar {
		display: none;
	}
	.scroll::-webkit-scrollbar {
		display: none;
	}
	.scroll {
		overflow-x: scroll;
	}
	.players-grid {
		display: grid;
		grid-template-columns: 1.8rem 1fr 1fr 6.2rem 4.8rem;
		gap: 1rem 1rem;
		color: var(--content-color);
		font-size: var(--fontsize-medium1);
		height: 1.25rem;
	}

	.no-wrap {
		display: flex;
		align-items: center;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.table-header {
		display: grid;
		grid-template-columns: 1.8rem 1fr 1fr 6.2rem 4.8rem;
		font-weight: var(--fontweight-1);
		gap: 1rem 1rem;
	}

	.table-header span {
		color: var(--content-color);
		font-size: var(--fontsize-large);
	}
	.position {
		color: var(--content-color);
		display: inline-block;
		text-align: left;
		width: 100%;
	}
	.rating {
		display: inline-block;
		text-align: right;
		width: 100%;
	}
	.bold {
		font-weight: var(--fontweight-1);
	}

	.players-grid.not-leader,
	.table-header.not-leader {
		grid-template-columns: 1.8rem 1fr 1fr 6rem 4.6rem;
	}
</style>
