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
