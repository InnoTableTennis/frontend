import type { Match, Player } from '$lib/types/types';

export interface Group {
	type: 'Group';
	tournamentTitle: string;
	players: Player[];
	matches: Match[];
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

export type TournamentStage =
	| 'create'
	| 'addParticipants'
	| 'numberGroups'
	| 'groups'
	| 'continue'
	| 'numberFinals'
	| 'finalsDistribution'
	| 'secondStage';
	
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
