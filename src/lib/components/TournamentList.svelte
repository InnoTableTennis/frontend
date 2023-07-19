<script lang="ts">
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import FinishIcon from '$lib/components/icons/FinishIcon.svelte';
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import { SortFilterTournamentFormStore } from '$lib/formStores';
	import type { Tournaments } from '$lib/types/types';

	import * as db from '$lib/requests';

	import { createEventDispatcher } from 'svelte';
	import PlayersIcon from './icons/PlayersIcon.svelte';
	import { alertPopup } from '$lib/popupHandler';

	const dispatch = createEventDispatcher();

	export let isLeader = false;
	let tournaments: Tournaments[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	export let chosenId = -1;
	export let isChoosing = false;
	export let editData;

	async function requestNewPage() {
		let title = $SortFilterTournamentFormStore.title;
		let minParticipants = $SortFilterTournamentFormStore.minParticipants;
		let maxParticipants = $SortFilterTournamentFormStore.maxParticipants;
		let startDateString = $SortFilterTournamentFormStore.startDateString;
		let endDateString = $SortFilterTournamentFormStore.endDateString;
		let sortBy = $SortFilterTournamentFormStore.sortBy;
		let descending = $SortFilterTournamentFormStore.descending;
		await db
			.getTournaments(
				sortBy,
				descending,
				title,
				parseInt(minParticipants),
				parseInt(maxParticipants),
				startDateString,
				endDateString,
				currentPageNumber,
				currentPageSize,
			)
			.then((result) => {
				tournaments = result.data;
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

	const deleteTournament = async (e: Event) => {
		let isConfirmed = await alertPopup('Are you sure that you want to delete this tournament?');
		if (!isConfirmed) return;

		const data = new FormData(e.target as HTMLFormElement);

		await db.deleteTournament(data.get('id') as string).catch((error) => {
			dispatch('error', error);
		});

		requestNewPage();
	};

	const finishTournament = async (e: Event) => {
		let isConfirmed = await alertPopup(`Are you sure that you want to finish this tournament?`);
		if (!isConfirmed) return;

		const data = new FormData(e.target as HTMLFormElement);

		await db.finishTournament(data.get('id') as string).catch((error) => {
			dispatch('error', error);
		});

		requestNewPage();
	};
</script>

{#await requestNewPage() then}
	{#if tournaments.length}
		<Pagination {lastPageNumber} on:request={handleRequest}>
			<div class="scroll">
				<section class="games-list">
					<div class="table-header" class:not-leader={!isLeader}>
						<span>Title</span>
						<span>Dates</span>
						<span>Kf</span>
						<span>Players</span>
						<span />
					</div>

					{#each tournaments as tournament}
						<button
							class="tournament-line"
							class:selected={chosenId === tournament.id}
							on:click|preventDefault={() => {
								chosenId = tournament.id;
								editData = tournament;
							}}
							disabled={!isChoosing || chosenId === tournament.id}
						>
							<div class="tournaments-grid" class:not-leader={!isLeader}>
								<div class="no-wrap">{tournament.title}</div>
								<div class="no-wrap">{tournament.startDateString}-{tournament.endDateString}</div>
								<div class="no-wrap">{tournament.coefficient}</div>
								<div class="no-wrap" style="text-align: right;">
									{tournament.players}
									<PlayersIcon />
								</div>
								{#if isLeader}
									<form on:submit|preventDefault={deleteTournament}>
										<input type="hidden" name="id" value={tournament.id} />
										<button aria-label="Delete" class="delete-btn"><DeleteIcon /></button>
									</form>
									{#if !tournament.finished}
										<form on:submit|preventDefault={finishTournament}>
											<input type="hidden" name="id" value={tournament.id} />
											<button aria-label="Delete" class="finish-btn"><FinishIcon /></button>
										</form>
									{/if}
								{/if}
							</div>
						</button>
					{/each}
				</section>
			</div>
		</Pagination>
	{:else}
		<p class="details">Oops! There is not a single entity satisfying the query</p>
	{/if}
{/await}

<style>
	.games-list {
		max-width: 900px;
		min-width: 700px;

		height: 30rem;
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
	.tournaments-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 3.5em 3em 1em 1em;
		gap: 1rem 1.5rem;
		color: var(--content-color);
		margin-bottom: 0.65rem;
		height: 1.1em;
	}

	.tournament-line {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0 5px;
		border: none;
		width: 100%;
		height: 1.3rem;
		margin-bottom: 0.6rem;
	}
	.tournament-line:disabled {
		cursor: default;
	}

	.selected {
		background-color: var(--secondary-color);
		border-radius: 3px;
	}

	.selected .no-wrap {
		color: var(--main-color);
	}

	.tournament-line:enabled:hover {
		background-color: var(--secondary-bg-color);
		border-radius: 3px;
	}

	.delete-btn,
	.finish-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		height: 1em;
		width: 1em;
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
		grid-template-columns: 1fr 1fr 3.7em 1em 3em 1em;
		gap: 1rem 1rem;
		padding-bottom: 1rem;
	}
	.table-header span {
		color: var(--content-color);
		font-size: var(--fontsize-large);
	}

	.details {
		font-size: var(--fontsize-medium1);
		margin: 2rem;
	}

	.tournaments-grid.not-leader,
	.table-header.not-leader {
		grid-template-columns: 1fr 1fr 6em 5.5em;
		padding: 0;
	}
</style>
