<script lang="ts">
	import TournamentBracket from '$lib/components/bracketComponent/TournamentBracket.svelte';
	import type { Player } from '$lib/types/types';

	let players: Player[] = [
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
			name: 'Nikita Borisov',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 900,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 3,
			name: 'Nur Islam',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 4,
			name: 'John Doe',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 5,
			name: 'Jane Doe',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 6,
			name: 'Robert Paulson',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 7,
			name: 'Frank Lane',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 8,
			name: 'Petya Ivanov',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 9,
			name: 'Senya Polyakov',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 10,
			name: 'Ron Philips',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 11,
			name: 'Richard Test',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 12,
			name: 'Bob Brown',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 13,
			name: 'Garry Kim',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 14,
			name: 'Lena Osetrova',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 15,
			name: 'Peter Home',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},

		{
			id: 16,
			name: 'Alexandr Rybov',
			numberOfGames: 5,
			numberOfLosses: 2,
			numberOfWins: 3,
			rating: 105,
			telegramAlias: '',
			winRate: 10,
		},
	];
</script>

<TournamentBracket playersList={players} />
