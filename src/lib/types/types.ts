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
	playersAmount: number;
	startDateString: string;
	title: string;
}
