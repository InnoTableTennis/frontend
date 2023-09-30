<script lang="ts">
	import Pagination from '$lib/components/base/pagination/Pagination.svelte';
	import { TournamentSortFilterParticpantsFormStore } from '$lib/client/stores/stores.tournaments';
	import type { Participant } from '$lib/types/tournamentTypes';
	import type { Player } from '$lib/types/types';

	export let participants: Player[];
	export let deltas: number[] = [];
	export const handleInsert = () => {
		sortFilter();
	};

	let initialParticipants: Participant[] = [];
	let sortedParticipants: Participant[] = [];

	function constructParticipants() {
		for (let i = 0; i < participants.length; i++) {
			initialParticipants[i] = participants[i] as Participant;
			initialParticipants[i].delta = deltas[i];
			initialParticipants[i].place = i + 1;
			initialParticipants[i].rating = initialParticipants[i].rating + initialParticipants[i].delta;
		}
		handleInsert();
	}

	function sortFilter() {
		sortedParticipants = [];
		filter();
		let sortBy = $TournamentSortFilterParticpantsFormStore.sortBy;
		let descending = $TournamentSortFilterParticpantsFormStore.descending;
		if (sortBy == 'place') sortPlace(sortedParticipants, descending);
		if (sortBy == 'rating') sortRating(sortedParticipants, descending);
		if (sortBy == 'delta') sortDelta(sortedParticipants, descending);
	}

	function getAlias(alias: string) {
		if (alias) {
			return '@' + alias;
		}
		return '-';
	}

	function filter() {
		let name = $TournamentSortFilterParticpantsFormStore.name;
		let alias = $TournamentSortFilterParticpantsFormStore.telegramAlias;
		let minRating = $TournamentSortFilterParticpantsFormStore.minRating;
		let maxRating = $TournamentSortFilterParticpantsFormStore.maxRating;

		for (let i = 0; i < initialParticipants.length; i++) {
			if (name === '' && alias === '' && minRating === '' && maxRating === '') {
				sortedParticipants.push(initialParticipants[i]);
			} else if (name === '' && alias === '' && minRating === '') {
				if (initialParticipants[i].rating < Number(maxRating)) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (name === '' && alias === '' && maxRating === '') {
				if (initialParticipants[i].rating > Number(minRating)) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (name === '' && minRating === '' && maxRating === '') {
				if (initialParticipants[i].telegramAlias.includes(alias)) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (alias === '' && minRating === '' && maxRating === '') {
				if (initialParticipants[i].name.includes(name)) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (name === '' && alias === '') {
				if (
					initialParticipants[i].rating < Number(maxRating) &&
					initialParticipants[i].rating > Number(minRating)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (name === '' && minRating === '') {
				if (
					initialParticipants[i].rating < Number(maxRating) &&
					initialParticipants[i].telegramAlias.includes(alias)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (name === '' && maxRating === '') {
				if (
					initialParticipants[i].rating > Number(minRating) &&
					initialParticipants[i].telegramAlias.includes(alias)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (alias === '' && minRating === '') {
				if (
					initialParticipants[i].name.includes(name) &&
					initialParticipants[i].rating < Number(maxRating)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (alias === '' && maxRating === '') {
				if (
					initialParticipants[i].rating > Number(minRating) &&
					initialParticipants[i].name.includes(name)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (minRating === '' && maxRating === '') {
				if (
					initialParticipants[i].telegramAlias.includes(alias) &&
					initialParticipants[i].name.includes(name)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (name === '') {
				if (
					initialParticipants[i].rating < Number(maxRating) &&
					initialParticipants[i].telegramAlias.includes(alias) &&
					initialParticipants[i].rating > Number(minRating)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (alias === '') {
				if (
					initialParticipants[i].rating < Number(maxRating) &&
					initialParticipants[i].name.includes(name) &&
					initialParticipants[i].rating > Number(minRating)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (minRating === '') {
				if (
					initialParticipants[i].rating < Number(maxRating) &&
					initialParticipants[i].telegramAlias.includes(alias) &&
					initialParticipants[i].name.includes(name)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else if (maxRating === '') {
				if (
					initialParticipants[i].telegramAlias.includes(alias) &&
					initialParticipants[i].name.includes(name) &&
					initialParticipants[i].rating > Number(minRating)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			} else {
				if (
					initialParticipants[i].rating < Number(maxRating) &&
					initialParticipants[i].telegramAlias.includes(alias) &&
					initialParticipants[i].name.includes(name) &&
					initialParticipants[i].rating > Number(minRating)
				) {
					sortedParticipants.push(initialParticipants[i]);
				}
			}
		}
	}

	function sortPlace(participantsArray: Participant[], descending: boolean) {
		participantsArray.sort(function (player1, player2) {
			if (player1.place < player2.place) {
				if (descending) return 1;
				return -1;
			} else if (player1.place === player2.place) {
				return 0;
			} else {
				if (descending) return -1;
				return 1;
			}
		});
	}

	function sortRating(participantsArray: Participant[], descending: boolean) {
		participantsArray.sort(function (player1, player2) {
			if (player1.rating < player2.rating) {
				if (descending) return 1;
				return -1;
			} else if (player1.rating === player2.rating) {
				return 0;
			} else {
				if (descending) return -1;
				return 1;
			}
		});
	}

	function sortDelta(participantsArray: Participant[], descending: boolean) {
		participantsArray.sort(function (player1, player2) {
			if (player1.delta < player2.delta) {
				if (descending) return 1;
				return -1;
			} else if (player1.delta === player2.delta) {
				return 0;
			} else {
				if (descending) return -1;
				return 1;
			}
		});
	}
</script>

{#await constructParticipants() then}
	<Pagination isTopHidden={true}>
		<div class="scroll">
			<section class="games-list">
				<div class="table-header">
					<span>#</span>
					<span>Name</span>
					<span>Telegram Alias</span>
					<span>Delta</span>
					<span>Rating</span>
					<!-- <span>Additional Info</span> -->
					<span />
				</div>

				{#each sortedParticipants as player}
					<div class="players-grid">
						<div>
							<span class="position bold">{player.place}</span>
						</div>
						<div class="no-wrap bold">{player.name}</div>
						<div class="no-wrap">{getAlias(player.telegramAlias)}</div>
						<div class="no-wrap" class:green={player.delta > 0} class:red={player.delta < 0}>
							{player.delta > 0 ? '+' : ''}{player.delta}
						</div>
						<div class="rating bold">{Math.floor(player.rating * 100) / 100}</div>
					</div>
				{/each}
			</section>
		</div>
	</Pagination>
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
	.green {
		color: var(--rating-positive-color);
	}
	.red {
		color: var(--rating-negative-color);
	}
</style>
