<script lang="ts">
	import MatchHeader from '$lib/components/MatchHeader.svelte';
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import type { Matches } from '$lib/types/types';

	import * as db from '$lib/requests';

	import { createEventDispatcher } from 'svelte';
	import { alertPopup } from "$lib/popupHandler";

	const dispatch = createEventDispatcher();

	export let isLeader = false;

	let matches: Matches[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	async function requestNewPage() {
		await db
			.getMatches(currentPageNumber, currentPageSize)
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

	const deleteMatch = async (e: Event) => {
		let isConfirmed = await alertPopup('Are you sure that you want to delete this match?');
		if (!isConfirmed) return;

		const data = new FormData(e.target as HTMLFormElement);

		await db.deleteMatch(data.get('id') as string).catch((error) => {
			dispatch('error', error);
		});

		requestNewPage();
	};
</script>

<!-- {@debug matches} -->
{#await requestNewPage() then}
	{#if matches.length}
		<Pagination {lastPageNumber} on:request={handleRequest}>
			<section class="games-list">
				<MatchHeader title={matches[0].tournamentTitle} isMain={true} {isLeader} />
				<MatchHeader title={matches[0].localDateString} {isLeader} />

				{#each matches as match, i}
					{#if i != 0 && matches[i].tournamentTitle != matches[i - 1].tournamentTitle}
						<MatchHeader title={matches[i].tournamentTitle} isMain={true} {isLeader} />
						<MatchHeader title={matches[i].localDateString} {isLeader} />
					{:else if i != 0 && matches[i].localDateString != matches[i - 1].localDateString}
						<MatchHeader title={matches[i].localDateString} {isLeader} />
					{/if}

					<div class="matches-grid">
						<div class="no-wrap">
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
						<div class="no-wrap">
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
						<div class="score">
							{match.firstPlayerScore}
							:
							{match.secondPlayerScore}
						</div>
						{#if isLeader}
							<form on:submit|preventDefault={deleteMatch}>
								<input type="hidden" name="id" value={match.id} />
								<button type="submit" aria-label="Delete" class="delete-btn"><DeleteIcon /></button>
							</form>
						{/if}
					</div>
				{/each}
			</section>
		</Pagination>
	{:else}
		<p class="details">Oops! That page doesn't exist or it is private</p>
	{/if}
{/await}

<style>
	.details {
		font-size: var(--fontsize-medium1);
		margin: 2rem;
	}
	.games-list {
		max-width: 800px;
		margin: 3em auto;
		font-size: var(--fontsize-medium1);
	}
	.matches-grid {
		height: 1.1em;
		display: grid;
		grid-template-columns: 1fr 1fr 2rem auto;
		gap: 1rem 1rem;
		color: var(--content-color);
		margin-bottom: 1rem;
	}
	.score {
		white-space: nowrap;
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
	.rating .positive {
		color: var(--rating-positive-color);
	}
	.rating .negative {
		color: var(--rating-negative-color);
	}
</style>
