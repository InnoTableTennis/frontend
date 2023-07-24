import type { TSMap } from 'typescript-map';
import type { Match, Player } from './types';

export interface readData {
	init: boolean;
	type: 'SingleEliminationBracket';
	playersList: Player[];
	matchesNetwork: TSMap<string, string>;
	rounds: number[][];
	winner: string;
	leaderBoard: Player[];
	inProgressMatches: number[];
	finishedMatches: number[];
	allMatches: Match[];
}
