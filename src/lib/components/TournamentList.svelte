<script lang="ts">
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import FinishIcon from '$lib/components/icons/FinishIcon.svelte';
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';

	import * as db from '$lib/requests';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let isLeader = false;
	let tournaments: any[] = [];

	let lastPageNumber: number;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	async function requestNewPage() {
		await db
			.getTournaments(currentPageNumber, currentPageSize)
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
		let isConfirmed = confirm('Are you sure that you want to delete this tournament?');
		if (!isConfirmed) return;

		const data = new FormData(e.target as HTMLFormElement);

		await db.deleteTournament(data.get('id') as string).catch((error) => {
			dispatch('error', error);
		});

		requestNewPage();
	};

	const finishTournament = async (e: Event) => {
		let isConfirmed = confirm(`Are you sure that you want to finish this tournament?`);
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
			<section class="games-list">
				<div class="table-header" class:not-leader={!isLeader}>
					<span>Title</span>
					<span>Start Date</span>
					<span>End Date</span>
					<span>Status</span>
					<span />
				</div>

				{#each tournaments as tournament}
					<div class="tournaments-grid" class:not-leader={!isLeader}>
						<div class="no-wrap">{tournament.title}</div>
						<div class="no-wrap">{tournament.startDateString}</div>
						<div class="no-wrap">{tournament.endDateString}</div>
						<div class="no-wrap">{tournament.finished ? 'Finished' : 'In progress'}</div>
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
				{/each}
			</section>
		</Pagination>
	{:else}
		<p class="details">Oops! That page doesn't exist or it is private</p>
	{/if}
{/await}

<style>
	.games-list {
		max-width: 800px;
		margin: 3em auto;
		font-size: var(--fontsize-table-list);
	}
	.tournaments-grid {
		display: grid;
		grid-template-columns: 1fr 5.7em 5.7em 5.7em 1em 1em;
		gap: 1rem 1rem;
		color: var(--table-grid-color);
		margin-bottom: 1rem;
		height: 1.1em;
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
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.table-header {
		display: grid;
		grid-template-columns: 1fr 5.7em 5.7em 5.7em 1em 1em;
		gap: 1rem 1rem;
		margin-bottom: 1.25rem;
	}

	.details {
		font-size: var(--fontsize-table-list-details);
		margin: 2rem;
	}

	.tournaments-grid.not-leader,
	.table-header.not-leader {
		grid-template-columns: 1fr 5.7em 5.7em 5.7em;
	}

	.table-header span {
		color: var(--accent-color);
	}
</style>
