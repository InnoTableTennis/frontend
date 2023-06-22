<script lang='ts'>
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import * as db from '$lib/requests';

	export let isLeader = false;
	let players = [];

	let lastPageNumber;
	let currentPageNumber = 1;
	let currentPageSize = 10;

	export const handleInsert = () => {
		currentPageNumber = 1;
		requestNewPage();
	};

	async function requestNewPage() {
		await db
			.getPlayers(currentPageNumber, currentPageSize)
			.then((result) => {
				players = result.data;
				lastPageNumber = result.totalPages;
			})
			.catch((error) => {
				dispatch('error', error);
			});
	}

	function handleRequest(event) {
		currentPageNumber = event.detail.currentPageNumber;
		currentPageSize = event.detail.currentPageSize;
		requestNewPage();
	}

	// onMount(() => {
	// 	requestNewPage();
	// });

	function getAlias(alias) {
		if (alias) {
			return '@' + alias;
		}
		return '-';
	}

	const deletePlayer = async (e) => {
		let isConfirmed = confirm('Are you sure that you want to delete this player?');
		if (!isConfirmed) return;

		const data = new FormData(e.target);

		await db.deletePlayer(data.get('id')).catch((error) => {
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
				<div class="table-header">
					<span />
					<span>Name</span>
					<span>Telegram Alias</span>
					<span>Rating</span>
					<!-- <span>Additional Info</span> -->
					<span />
				</div>

				{#each players as player, i}
					<div class="players-grid">
						<div>
							<span class="position">{(currentPageNumber - 1) * currentPageSize + i + 1}</span>
						</div>
						<div class="no-wrap">{player.name}</div>
						<div class="no-wrap">{getAlias(player.telegramAlias)}</div>
						<div>{player.rating}</div>
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
		<p class="details">Oops! That page doesn't exist or it is private</p>
	{/if}
{/await}

<style>
	.details {
		font-size: large;
		margin: 2rem;
	}
	.games-list {
		max-width: 800px;
		margin: 3em auto;
		font-size: 1em;
	}
	.players-grid {
		height: 1.1em;
		display: grid;
		grid-template-columns: 1.8em 1fr 1fr 3.2em 1em;
		gap: 1rem 1rem;
		color: #fff;
		margin-bottom: 1rem;
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
		grid-template-columns: 1.8em 1fr 1fr 3.2em 1em;
		gap: 1rem 1rem;
		margin-bottom: 1.25rem;
	}

	.table-header span {
		color: #c4d6b0;
	}
	.position {
		color: #c4d6b0;
		text-align: right;
		display: inline-block;
		width: 100%;
	}
</style>
