<script lang="ts">
	import MatchHeader from '$lib/components/MatchHeader.svelte';
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import type { Match } from '$lib/types/types';

	import * as db from '$lib/requests';

	import { createEventDispatcher } from 'svelte';
	import { isLeader } from '$lib/stores';
	import { SortFilterMatchFormStore } from '$lib/formStores';
	import { alertPopup } from '$lib/popupHandler';

	const dispatch = createEventDispatcher();

	export let chosenId = -1;
	export let isChoosing = false;
	export let mode: string;
	export let editData: Match;

	let matches: Match[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	async function requestNewPage() {
		let name = $SortFilterMatchFormStore.name;
		let score = $SortFilterMatchFormStore.score;
		let minDateString = $SortFilterMatchFormStore.minDateString;
		let maxDateString = $SortFilterMatchFormStore.maxDateString;
		let descending = $SortFilterMatchFormStore.descending;
		await db
			.getMatches(
				descending,
				name,
				score,
				minDateString,
				maxDateString,
				currentPageNumber,
				currentPageSize,
			)
			.then((result) => {
				matches = result.data;
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

	async function deleteMatch(id: string) {
		let isConfirmed = await alertPopup('Are you sure that you want to delete this match?');
		if (!isConfirmed) return;
		await db.deleteMatch(id as string).catch((error) => {
			dispatch('error', error);
		});
		requestNewPage();
	}
</script>

<!-- {@debug matches} -->
{#await requestNewPage() then}
	{#if matches.length}
		<Pagination {lastPageNumber} on:request={handleRequest}>
			<div class="scroll">
				<section class="games-list">
					<div class="table-header" class:not-leader={!$isLeader}>
						<span>First Player</span>
						<span>Second Player</span>
						<span>Score</span>
						<span />
					</div>
					<MatchHeader title={matches[0].tournamentTitle} isMain={true} />
					<MatchHeader title={matches[0].localDateString} />

					{#each matches as match, i}
						{#if i != 0 && matches[i].tournamentTitle != matches[i - 1].tournamentTitle}
							<MatchHeader title={matches[i].tournamentTitle} isMain={true} />
							<MatchHeader title={matches[i].localDateString} />
						{:else if i != 0 && matches[i].localDateString != matches[i - 1].localDateString}
							<MatchHeader title={matches[i].localDateString} />
						{/if}
						<button
							class="match-line"
							class:selected={chosenId === match.id}
							on:click|preventDefault={() => {
								chosenId = match.id;
								if (mode === 'delete') {
									deleteMatch(match.id.toString());
								} else {
									editData = match;
								}
							}}
							disabled={!isChoosing || chosenId === match.id}
						>
							<div class="matches-grid">
								<div class="no-wrap content">
									{match.firstPlayerName}
									<span class="rating">
										{#if match.firstPlayerRatingDelta}
											({match.firstPlayerRatingBefore})
											{#if match.firstPlayerRatingDelta > 0}
												<span class="positive">+{match.firstPlayerRatingDelta}</span>
											{:else}
												<span class="negative">{match.firstPlayerRatingDelta}</span>
											{/if}
										{/if}
									</span>
								</div>
								<div class="no-wrap content">
									{match.secondPlayerName}
									<span class="rating">
										{#if match.secondPlayerRatingDelta}
											({match.secondPlayerRatingBefore})
											{#if match.secondPlayerRatingDelta > 0}
												<span class="positive">+{match.secondPlayerRatingDelta}</span>
											{:else}
												<span class="negative">{match.secondPlayerRatingDelta}</span>
											{/if}
										{/if}
									</span>
								</div>
								<div class="score content">
									{match.firstPlayerScore}
									:
									{match.secondPlayerScore}
								</div>
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
	.matches-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 2rem auto;
		gap: 1rem 1rem;
		color: var(--content-color);
		height: 1.1em;
	}
	.match-line {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		width: 100%;
		height: 1.3rem;
		margin-bottom: 0.2rem;
	}
	.match-line:disabled {
		cursor: default;
	}

	.match-line:enabled:hover {
		background-color: var(--secondary-bg-color);
		border-radius: 3px;
	}

	.selected {
		background-color: var(--secondary-color);
		border-radius: 3px;
	}

	.selected .no-wrap {
		color: var(--main-color);
	}

	.selected .score {
		color: var(--main-color);
	}

	.score {
		white-space: nowrap;
	}

	.no-wrap {
		display: flex;
		align-items: center;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.content {
		font-size: var(--fontsize-medium1);
	}
	.table-header {
		display: grid;
		grid-template-columns: 1fr 1fr 4rem;
		gap: 1rem 1rem;
	}
	.table-header span {
		color: var(--content-color);
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
	}

	.rating .positive {
		color: var(--rating-positive-color);
	}
	.rating .negative {
		color: var(--rating-negative-color);
	}
</style>
