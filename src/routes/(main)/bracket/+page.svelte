<script lang="ts">
	import TournamentBracket from '$lib/components/bracketComponent/TournamentBracket.svelte';
	import { handleError } from '$lib/errorHandler';
	import type { readData } from '$lib/types/bracketTypes';
	import type { Player, Tournament } from '$lib/types/types';

	let players: Player[] = [
		{
			id: 1,
			name: 'AbdelRagman Abounegmweo',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 2,
			name: 'Nikita Boris',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Nur Islam',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Mikhail K',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 2,
			name: 'Ivan Ivan',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Ma Long',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Anvar Anvar',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 1,
			name: 'AbdelRagman Abounegmweo',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 2,
			name: 'Nikita Boris',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Nur Islam',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Mikhail K',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 2,
			name: 'Ivan Ivan',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Ma Long',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},
		{
			id: 1,
			name: 'Anvar Anvar',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 1000,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 2,
			name: 'Bulat Bulat',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 2,
			name: 'Forwarded name',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},
	];

	let data: readData = {
		init: true,
		type: 'SingleEliminationBracket',
		playersList: players,
	} as readData;

	function updateData(event: CustomEvent) {
		data = event.detail;
	}

	function printLeaderBoard(event: CustomEvent) {
		// console.log(event.detail);
	}

	let tournament = {
		title: 'test',
		finished: false,
	} as Tournament;
</script>

<TournamentBracket
	on:finalize={printLeaderBoard}
	on:update={updateData}
	on:error={handleError}
	{data}
	{tournament}
/>
