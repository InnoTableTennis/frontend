<script lang="ts">
	import TournamentBracket from '$lib/components/bracketComponent/TournamentBracket.svelte';
	import { handleError } from '$lib/errorHandler';
	import type { Match, Player } from '$lib/types/types';
	interface inputData {
		matchesNetwork: object;
		playersAmount: number;
		rounds: number[][];
		winner: string;
		inProgressMatches: number[];
		finishedMatches: number[];
		allMatches: Match[];
	}

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
			id: 3,
			name: 'Nur Islamov',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 4,
			name: 'Nail Min',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 5,
			name: 'Mikhail K',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 1,
			name: 'Mikhail Kalinin',
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
			id: 3,
			name: 'Nur Islamov',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 4,
			name: 'Nail Min',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 5,
			name: 'Mikhail K',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},
	];

	let data: inputData | null = null;
	function updateData(event : CustomEvent) {
		data = event.detail;
	}


</script>

<TournamentBracket
	on:update={updateData}
	on:error={handleError}
	playersList={players}
	tournamentTitle="BracketTournament1"
/>

<TournamentBracket
	on:update={updateData}
	on:error={handleError}
	bracketJSON={data}
	tournamentTitle="BracketTournament1"
/>
