export interface Error {
	message: string;
}

export interface DecodedJWT {
	exp: number;
	iat: number;
	roles: ('LEADER' | 'ADMIN' | 'USER')[];
	sub: string;
}

export interface Players {
	id: number;
	name: string;
	numberOfGames: number;
	numberOfLosses: number;
	numberOfWins: number;
	rating: number;
	telegramAlias: string;
	winRate: number;
}

export interface Matches {
	firstPlayerScore: number;
	secondPlayerScore: number;
	firstPlayerName: string;
	secondPlayerName: string;
	localDateString: string;
	id: number;
	firstPlayerRatingDelta: number;
	secondPlayerRatingDelta: number;
	firstPlayerRatingBefore: number;
	secondPlayerRatingBefore: number;
	tournamentTitle: string;
}

export interface Tournaments {
	coefficient: number;
	endDateString: string;
	finished: boolean;
	id: number;
	startDateString: string;
	title: string;
}

export interface sortFilterPlayerFormStore {
    name: string;
    telegramAlias: string;
    minRating: string;
    maxRating: string;
	descending: boolean;
	sortBy: "rating" | "name";
}

export interface sortFilterTournamentFormStore {
    title: string;
	minParticipants: string;
	maxParticipants: string;
	startDateString: string;
	endDateString: string;
	descending: boolean;
	sortBy: "date" | "numberOfPlayers" | "kf";
}

export interface sortFilterMatchFormStore {
    name: string;
	score: string;
	minDateString: string;
	maxDateString: string;
	descending: boolean;
	sortBy: "date";
}

export interface addPlayerFormStore {
    name: string;
	telegramAlias: string;
	initialRating: number;
}

export interface addTournamentFormStore {
    title: string;
	startDateString: string;
	endDateString: string;
}

export interface addMatchFormStore {
    firstPlayerName: string;
	secondPlayerName: string;
	tournamentTitle: string;
	firstPlayerScore: number;
	secondPlayerScore: number;
}