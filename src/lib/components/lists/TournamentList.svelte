<script lang="ts">
	import FinishIcon from '$lib/components/icons/FinishIcon.svelte';
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import { SortFilterTournamentFormStore } from '$lib/formStores';
	import type { Tournament } from '$lib/types/types';

	import * as db from '$lib/requests';

	import { createEventDispatcher } from 'svelte';
	import PlayersIcon from '$lib/components/icons/PlayersIcon.svelte';
	import { alertPopup } from '$lib/popupHandler';
	import { goto } from '$app/navigation';

	const dispatch = createEventDispatcher();

	export let isLeader = false;
	let tournaments: Tournament[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	export let chosenId = -1;
	export let isChoosing = false;
	export let editData: Tournament;
	export let mode: string;

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

	async function deleteTournament(id: string) {
		let isConfirmed = await alertPopup('Are you sure that you want to delete this tournament?');
		if (!isConfirmed) return;
		await db.deleteTournament(id as string).catch((error) => {
			dispatch('error', error);
		});
		requestNewPage();
	}

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
								if (mode === 'delete') {
									deleteTournament(tournament.id.toString());
								} else if (mode === 'create' && tournament.finished === false) {
									goto(`/tournaments/create/${tournament.id}`);
								} else if ((mode === 'create' && tournament.finished === true) || mode === 'view') {
									goto(`/tournaments/view/${tournament.id}`);
								} else {
									editData = tournament;
								}
							}}
							disabled={!isChoosing || chosenId === tournament.id}
						>
							<div class="tournaments-grid" class:not-leader={!isLeader}>
								<div class="no-wrap content">{tournament.title}</div>
								<div class="no-wrap content">
									{tournament.startDateString}-{tournament.endDateString}
								</div>
								<div class="no-wrap content">{tournament.coefficient}</div>
								<div class="content" style="text-align: right;">
									{tournament.numberOfPlayers}
									<PlayersIcon />
								</div>
								{#if isLeader && !tournament.finished && mode === 'add'}
									<form on:submit|preventDefault={finishTournament}>
										<input type="hidden" name="id" value={tournament.id} />
										<button aria-label="Finish" class="finish-btn"><FinishIcon /></button>
									</form>
								{/if}
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
	.tournaments-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 6.5rem 3rem 1rem;
		gap: 1rem 1rem;
		color: var(--content-color);
		height: 1.1rem;
	}

	.tournament-line {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		width: 100%;
		height: 1.3rem;
		margin-bottom: 0.4rem;
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

	.finish-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		height: 1rem;
		width: 1rem;
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
		grid-template-columns: 1fr 1fr 6.5rem 5rem;
		gap: 1rem 1rem;
	}
	.table-header span {
		color: var(--content-color);
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
	}

	.details {
		font-size: var(--fontsize-medium1);
		margin: 2rem;
	}

	.tournaments-grid.not-leader,
	.table-header.not-leader {
		grid-template-columns: 1fr 1fr 6.5rem 5rem;
		padding: 0;
	}
</style>
