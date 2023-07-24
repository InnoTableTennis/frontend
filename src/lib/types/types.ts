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
	players: number;
	startDateString: string;
	title: string;
}

export interface Stats {
	matchesPlayed: number;
	tournamentsParticipated: number;
	matchesWon: number;
	matchesLost: number;
	winPercentage: number;
	pointsWon: number;
	pointsLost: number;
	averageMatchDuration: number;
	averageMatchPoints: number;
	winningStreak: number;
	losingStreak: number;
	highestMatchDelta: number;
	lowestMatchDelta: number;
	averageMatchDelta: number;
	highestTornamentsDelta: number;
	lowestTornamentsDelta: number;
	averageTornamentsDelta: number;
	ranking: number;
	rating: number;
}

export interface ProfileInfo {
	data: ProfileData;
}
export interface ProfileMatch {
	opponentName: string;
	opponentRatingBefore: number;
	delta: number;
	score: string;
	date: string;
	tournamentTitle: string;
}
export interface ProfileData {
	name: string;
	telegramAlias: string;
	statistics: Stats;
	matches: ProfileMatch[];
	graph: RatingHistoryItemTest[];
}
export interface RatingHistoryItem {
	date: string;
	rating: number;
	name: string;
	delta: number;
}

export interface RatingHistoryItemTest {
	date: string;
	rating: number;
	tournamentTitle: string;
	delta: number;
}
