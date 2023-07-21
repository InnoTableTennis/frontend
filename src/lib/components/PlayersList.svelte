<script lang="ts">
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import { SortFilterPlayerFormStore } from '$lib/formStores';
	import type { Players } from '$lib/types/types';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';
	import { alertPopup } from '$lib/popupHandler';

	export let isLeader = false;
	let players: Players[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export let chosenId = -1;
	export let isChoosing = false;
	export let editData: Players;
	export let mode: string;

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

	// onMount(() => {
	// 	requestNewPage();
	// });

	function getAlias(alias: string) {
		if (alias) {
			return '@' + alias;
		}
		return '-';
	}

	async function deletePlayer(id: string) {
		let isConfirmed = await alertPopup('Are you sure that you want to delete this player?');
		if (!isConfirmed) return;
		await db.deletePlayer(id as string).catch((error) => {
			dispatch('error', error);
		});
		requestNewPage();
	}
</script>

<!-- {@debug matches} -->

{#await requestNewPage() then}
	{#if players.length}
		<Pagination {lastPageNumber} on:request={handleRequest}>
			<div class="scroll">
				<section class="games-list">
					<div class="table-header" class:not-leader={!isLeader}>
						<span>#</span>
						<span>Name</span>
						<span>Telegram Alias</span>
						<span>W/L</span>
						<span>Rating</span>
						<!-- <span>Additional Info</span> -->
						<span />
					</div>

					{#each players as player, i}
						<button
							class="player-line"
							class:selected={chosenId === player.id}
							on:click|preventDefault={() => {
								chosenId = player.id;
								if (mode === 'delete') {
									deletePlayer(player.id.toString());
								} else {
									editData = player;
								}
							}}
							disabled={!isChoosing || chosenId === player.id}
						>
							<div class="players-grid" class:not-leader={!isLeader}>
								<div>
									<span class="position bold"
										>{(currentPageNumber - 1) * currentPageSize + i + 1}</span
									>
								</div>
								<div class="no-wrap bold">{player.name}</div>
								<div class="no-wrap">{getAlias(player.telegramAlias)}</div>
								<div class="no-wrap">{player.numberOfWins}/{player.numberOfLosses}</div>
								<div class="rating bold">{player.rating}</div>
							</div>
						</button>
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

	.player-line {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		width: 100%;
		height: 1.3rem;
		margin-bottom: 0.4rem;
	}
	.player-line:disabled {
		cursor: default;
	}

	.player-line:enabled:hover {
		background-color: var(--secondary-bg-color);
		border-radius: 3px;
	}

	.selected {
		background-color: var(--secondary-color);
		border-radius: 3px;
	}

	.selected .position {
		color: var(--main-color);
	}

	.selected .no-wrap {
		color: var(--main-color);
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
