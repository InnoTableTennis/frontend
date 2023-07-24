export interface Error {
	message: string;
	status: number;
}

export interface DecodedJWT {
	exp: number;
	iat: number;
	roles: ('LEADER' | 'ADMIN' | 'USER')[];
	sub: string;
}

export interface Player {
	id: number;
	name: string;
	numberOfGames: number;
	numberOfLosses: number;
	numberOfWins: number;
	rating: number;
	telegramAlias: string;
	winRate: number;
}

export interface Match {
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

export interface Tournament {
	coefficient: number;
	endDateString: string;
	finished: boolean;
	id: number;
	numberOfPlayers: number;
	startDateString: string;
	title: string;
	matches: Match[];
	state: TournamentState;
}

export interface Group {
	type: 'Group';
	tournamentTitle: string;
	players: Player[];
	matches: Match[];
	id: number;
}

export interface SingleEliminationBracket {
	type: 'SingleEliminationBracket';
	matchesNetwork: object;
	playersAmount: number;
	rounds: number[][];
	winner: string;
	inProgressMatches: number[];
	finishedMatches: number[];
	allMatches: Match[];
}

export type Final = Group | SingleEliminationBracket;

export interface TournamentState {
	participants: Player[];
	firstStage: Group[] | null;
	secondStage: Final[] | null;
}
//TO DO groups not null
