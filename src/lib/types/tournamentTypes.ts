export interface tournamentSortFilterPlayerFormStore {
	name: string;
	telegramAlias: string;
	minRating: string;
	maxRating: string;
	descending: boolean;
	sortBy: 'rating' | 'place' | 'delta';
}

export interface tournamentSortFilterMatchFormStore {
	name: string;
	score: string;
}

export interface Participant {
	place: number;
	delta: number;
	id: number;
	name: string;
	numberOfGames: number;
	numberOfLosses: number;
	numberOfWins: number;
	rating: number;
	telegramAlias: string;
	winRate: number;
}
