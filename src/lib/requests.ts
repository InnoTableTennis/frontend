import { handleGetErrors, handleModifyErrors } from '$lib/errorHandler';

import { userToken } from '$lib/stores';

import type { Player, Match, Tournament } from '$lib/types/types';
import type { TournamentState } from '$lib/types/tournamentTypes';

import type { Stats, ProfileData } from '$lib/types/profileTypes';

import { dev } from '$app/environment';
import { PUBLIC_DEV_SERVER_URL, PUBLIC_PROD_SERVER_URL } from '$env/static/public';

/**
 * This file contains functions for making API requests.
 */

let token = '';

userToken.subscribe((value: string) => {
	token = value;
});

const serverPath = dev ? PUBLIC_DEV_SERVER_URL : PUBLIC_PROD_SERVER_URL;
const serverAPI: string = serverPath + '/api';

/**
 * Creates a new match.
 * @param firstPlayerName - The name of the first player.
 * @param secondPlayerName - The name of the second player.
 * @param firstPlayerScore - The score of the first player.
 * @param secondPlayerScore - The score of the second player.
 * @param tournamentTitle - The title of the tournament.
 * @param localDateString - The local date string.
 * @returns The created match data.
 */
export async function createMatch(
	firstPlayerName: string,
	secondPlayerName: string,
	firstPlayerScore: number,
	secondPlayerScore: number,
	tournamentTitle: string,
	localDateString: string | null = null,
): Promise<Match> {
	if (localDateString !== null) {
		localDateString = new Date(localDateString).toLocaleDateString('ru');
	} else {
		localDateString = new Date().toLocaleDateString('ru');
	}

	const response: Response = await fetch(serverAPI + '/matches', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			firstPlayerName,
			secondPlayerName,
			firstPlayerScore,
			secondPlayerScore,
			localDateString,
			tournamentTitle,
		}),
	});

	await handleModifyErrors(response, token);

	const data = await response.json();
	return data;
}

export async function editMatch(
	id: string,
	firstPlayerName: string,
	secondPlayerName: string,
	firstPlayerScore: number,
	secondPlayerScore: number,
	tournamentTitle: string,
	localDateString: string | null = null,
): Promise<void> {
	if (localDateString !== null) {
		localDateString = new Date(localDateString).toLocaleDateString('ru');
	} else {
		localDateString = new Date().toLocaleDateString('ru');
	}

	const response: Response = await fetch(serverAPI + '/matches/' + id, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			firstPlayerScore,
			secondPlayerScore,
			tournamentTitle,
			firstPlayerName,
			secondPlayerName,
			localDateString,
		}),
	});
	await handleModifyErrors(response, token);
}

/**
 * Retrieves players from the API.
 * @param sortBy - The sorting type either by name or by rating.
 * @param descending - The sorting order.
 * @param name - The string that players has in their name.
 * @param alias - The string that players has in their alias.
 * @param minRating - The minimum rating of showed players.
 * @param maxRating - The maximum rating of showed players.
 * @param pageNumber - The page number.
 * @param pageSize - The page size.
 * @returns The players data and total number of pages.
 */
export async function getPlayers(
	sortBy: 'name' | 'rating' = 'rating',
	descending: boolean | null = null,
	name: string | null = null,
	alias: string | null = null,
	minRating: number | null = null,
	maxRating: number | null = null,
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: Player[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/players';
	if (sortBy) {
		url += '?sortBy=' + sortBy;
		if (descending != null) url += '&descending=' + descending;
		if (alias) url += '&aliasHas=' + alias;
		if (name) url += '&nameHas=' + name;
		if (minRating != null && !isNaN(minRating)) url += '&minRating=' + minRating;
		if (maxRating != null && !isNaN(maxRating)) url += '&maxRating=' + maxRating;
		if (pageNumber) url += '&page=' + pageNumber;
		if (pageSize) url += '&size=' + pageSize;
	}	

	const response: Response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	

	await handleGetErrors(response, token);

	const totalPages: number = parseInt(response.headers.get('X-Total-Pages') ?? '100', 10);

	const data = await response.json();
	

	return { data, totalPages };
}


/**
 * Retrieves tournaments from the API.
 * @param sortBy - The sorting type either by name or by rating.
 * @param descending - The sorting order.
 * @param title - The string that tournaments has in their title.
 * @param minParticipants - The minimum number of players in tournament.
 * @param maxParticipants - The maximum number of players in tournament.
 * @param startDateString - The start date of showed tournaments.
 * @param endDateString - The end date of showed tournaments.
 * @param pageNumber - The page number.
 * @param pageSize - The page size.
 * @returns The tournaments data and total number of pages.
 */
export async function getTournaments(
	sortBy: 'date' | 'kf' | 'players' = 'date',
	descending: boolean | null = null,
	title: string | null = null,
	minParticipants: number | null = null,
	maxParticipants: number | null = null,
	startDateString: string | null = null,
	endDateString: string | null = null,
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: Tournament[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/tournaments';
	if (sortBy) {
		url += '?sortBy=' + sortBy;
		if (descending != null) url += '&descending=' + descending;
		if (title) url += '&titleHas=' + title;
		if (startDateString) url += '&minEndDate=' + startDateString;
		if (endDateString) url += '&maxEndDate=' + endDateString;
		if (minParticipants != null && !isNaN(minParticipants)) url += '&minPlayers=' + minParticipants;
		if (maxParticipants != null && !isNaN(maxParticipants)) url += '&maxPlayers=' + maxParticipants;
		if (pageNumber) url += '&page=' + pageNumber;
		if (pageSize) url += '&size=' + pageSize;
	}

	const response: Response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	const totalPages: number = parseInt(response.headers.get('X-Total-Pages') ?? '100', 10);

	const data = await response.json();

	return { data, totalPages };
}

/**
 * Retrieves tournament from the API.
 * @param id - The id of the tournament that you want to get.
 * @returns The tournament data.
 */
export async function getTournament(id: number | null = null): Promise<{
	data: Tournament;
}> {
	let url: string = serverAPI + '/tournaments';
	if (id) {
		url += '/' + id;
	}

	const response: Response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	let data = await response.json();
	data = data.data;
	data.state = JSON.parse(data.state);

	return { data };
}

/**
 * Updates state of the tournament.
 * @param tournamentID - The ID of the tournament.
 */
export async function updateTournament(
	tournamentID: number,
	state: TournamentState | null,
): Promise<void> {
	const response: Response = await fetch(serverAPI + '/tournaments/' + tournamentID + '/state', {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			state: JSON.stringify(state),
		}),
	});

	await handleModifyErrors(response, token);
}

export async function getStatistics(playerID: number | null = null): Promise<{
	data: Stats;
}> {
	const url: string = serverAPI + '/players/' + playerID + '/stats';

	const response: Response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	const data = await response.json();
	
	return { data };
}

/**
 * Retrieves leaders list from the API.
 * @returns The leaders data.
 */
export async function getLeaders(): Promise<{
	data: Player[];
}> {
	const url: string = serverAPI + '/leaders';

	const response: Response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	const data = await response.json();

	return { data };
}

/**
 * Promotes player to leaders through their telegram alias.
 * @param telegramAlias - The Telegram alias of the player.
 * @returns Data of the promoted leader.
 */
export async function promoteLeader(telegramAlias: string): Promise<Player> {
	if (telegramAlias[0] == '@') telegramAlias = telegramAlias.slice(1);

	const response: Response = await fetch(serverAPI + '/leaders', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			telegramAlias,
		}),
	});

	await handleModifyErrors(response, token);

	const data = await response.json();

	return data;
}

/**
 * Demote leader to .
 * @param leaderId - The ID of the leader.
 */
export async function demoteLeader(leaderId: string): Promise<void> {
	const response: Response = await fetch(serverAPI + '/leaders/' + leaderId, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	await handleModifyErrors(response, token);
}

/**
 * Broadcasts message to all other players via telegram bot.
 * @param message - message to broadcast.
 */
export async function broadcastMessage(message: string): Promise<void> {
	const response: Response = await fetch(serverAPI + '/telegram', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			message,
		}),
	});

	await handleModifyErrors(response, token);
}

export async function getProfileData(playerID: number | string): Promise<ProfileData> {
	const url: string = serverAPI + '/players/' + playerID;

	const response: Response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	await handleGetErrors(response, token);

	const resp = await response.json();

	const data = resp.data as ProfileData;

	return data;
}
