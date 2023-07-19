<script lang="ts">
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import { SortFilterPlayerFormStore } from '$lib/formStores';
	import type { Players } from '$lib/types/types';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';

	export let isLeader = false;
	let players: Players[] = [];

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

	// onMount(() => {
	// 	requestNewPage();
	// });

	function getAlias(alias: string) {
		if (alias) {
			return '@' + alias;
		}
		return '-';
	}

	const deletePlayer = async (e: Event) => {
		let isConfirmed = confirm('Are you sure that you want to delete this player?');
		if (!isConfirmed) return;

		const data = new FormData(e.target as HTMLFormElement);

		await db.deletePlayer(data.get('id') as string).catch((error) => {
			dispatch('error', error);
		});

		requestNewPage();
	};
</script>

<!-- {@debug matches} -->

{#await requestNewPage() then}
	{#if players.length}
		<Pagination {lastPageNumber} on:request={handleRequest}>
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
					<div class="players-grid" class:not-leader={!isLeader}>
						<div>
							<span class="position">{(currentPageNumber - 1) * currentPageSize + i + 1}</span>
						</div>
						<div class="no-wrap">{player.name}</div>
						<div class="no-wrap">{getAlias(player.telegramAlias)}</div>
						<div class="no-wrap">{player.numberOfWins}/{player.numberOfLosses}</div>
						<div class="rating">{player.rating}</div>
						{#if isLeader}
							<form on:submit|preventDefault={deletePlayer}>
								<input type="hidden" name="id" value={player.id} />
								<button aria-label="Delete" class="delete-btn"><DeleteIcon /></button>
							</form>
						{/if}
					</div>
				{/each}
			</section>
		</Pagination>
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
		height: 30rem;
		margin-top: 1rem;
		font-size: var(--fontsize-medium1);
	}
	.players-grid {
		display: grid;
		grid-template-columns: 1.8em 1fr 1fr 3.2em 3.3em 1em;
		gap: 1rem 1rem;
		color: var(--content-color);
		margin-bottom: 0.65rem;
		height: 1.1em;
	}
	.delete-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		height: 1em;
		width: 1em;
	}
	.no-wrap {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.table-header {
		display: grid;
		grid-template-columns: 1.8em 1fr 1fr 3.8em 3.3em 0.5em;
		gap: 1rem 1rem;
		padding-bottom: 1rem;
	}

	.table-header span {
		color: var(--content-color);
		font-size: var(--fontsize-large);
	}
	.position {
		color: var(--content-color);
		display: inline-block;
		width: 100%;
	}
	.rating {
		display: inline-block;
		text-align: right;
		width: 100%;
	}

	.players-grid.not-leader,
	.table-header.not-leader {
		grid-template-columns: 1.8em 1fr 1fr 6em 5em;
		padding: 0;
	}
</style>
