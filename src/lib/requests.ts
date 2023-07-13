import { titleCase } from '$lib/helper';
import { handleGetErrors, handleModifyErrors } from '$lib/errorHandler';

import { dev } from '$app/environment';

import { userToken } from '$lib/stores';

import type { Players, Matches, Tournaments } from '$lib/types/types';

/**
 * This file contains functions for making API requests.
 */

let token = '';

userToken.subscribe((value: string) => {
	token = value;
});

const serverAPI: string = dev ? 'http://10.90.138.217:8080' : '';

console.log(serverAPI);

/**
 * Retrieves matches from the API.
 * @param sortBy - The sorting type either by name or by rating.
 * @param descending - The sorting order.
 * @param name - The string that player has in their name in match.
 * @param score - The score of the match.
 * @param startDateString - The start date of showed matches.
 * @param endDateString - The end date of showed matches.
 * @param pageNumber - The page number.
 * @param pageSize - The page size.
 * @returns The matches data and total number of pages.
 */
export async function getMatches(
	descending: boolean | null = null,
	name: string | null = null,
	score: string | null = null,
	minDateString: string | null = null,
	maxDateString: string | null = null,
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: Matches[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/api/matches';
	if (descending != null) {
		url += '?descending=' + descending;
		if (name) url += '&hasPlayerWith=' + name;
		if (minDateString) url += '&startDate=' + minDateString;
		if (maxDateString) url += '&endDate=' + maxDateString;
		if (score) url += '&score=' + score;
		if (pageNumber) url += '&page=' + pageNumber;
		if (pageSize) url += '&size=' + pageSize;
	}

	const response: Response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	const totalPages: number = parseInt(response.headers.get('X-Total-Pages') ?? '999', 10);

	const data = await response.json();

	return { data, totalPages };
}

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
): Promise<Matches> {
	if (localDateString !== null) {
		localDateString = new Date(localDateString).toLocaleDateString('ru');
	} else {
		localDateString = new Date().toLocaleDateString('ru');
	}

	const response: Response = await fetch(serverAPI + '/api/matches', {
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

/**
 * Deletes a match.
 * @param matchID - The ID of the match.
 */
export async function deleteMatch(matchID: string): Promise<void> {
	const response: Response = await fetch(serverAPI + '/api/matches/' + matchID, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
		},
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
	sortBy: "name" | "rating" = "rating",
	descending: boolean | null = null,
	name: string | null = null,
	alias: string | null = null,
	minRating: number | null = null,
	maxRating: number | null = null,
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: Players[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/api/players';
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
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	const totalPages: number = parseInt(response.headers.get('X-Total-Pages') ?? '100', 10);

	const data = await response.json();

	return { data, totalPages };
}

/**
 * Creates a new player.
 * @param name - The name of the player.
 * @param telegramAlias - The Telegram alias of the player.
 * @param rating - The rating of the player.
 * @returns The created player data.
 */
export async function createPlayer(
	name: string,
	telegramAlias: string | null = null,
	rating: number | null = null,
): Promise<Players> {
	name = name.trim();

	if (telegramAlias !== null) {
		telegramAlias = telegramAlias.trim();
		if (telegramAlias === '') telegramAlias = null;
	}

	if (telegramAlias !== null) {
		if (telegramAlias[0] == '@') telegramAlias = telegramAlias.slice(1);
		if (!/^[A-Za-z0-9_]*$/.test(telegramAlias)) {
			throw new Error('telegram alias must consist only of latin alphabet letters and digits! ');
		}
	}

	if (!/^[A-Za-z ().]*$/.test(name)) {
		throw new Error('name must consist only of latin alphabet letters!');
	}

	if (name.split(' ').length < 2) {
		throw new Error('Name must consist of at least two parts!');
	}

	name = titleCase(name);

	const response: Response = await fetch(serverAPI + '/api/players', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			name,
			telegramAlias,
			rating,
		}),
	});

	await handleModifyErrors(response, token);

	const data = await response.json();
	return data;
}

/**
 * Deletes a player.
 * @param playerID - The ID of the player.
 */
export async function deletePlayer(playerID: string): Promise<void> {
	const response: Response = await fetch(serverAPI + '/api/players/' + playerID, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	await handleModifyErrors(response, token);
}

/**
 * Authenticates a user.
 * @param username - The username.
 * @param password - The password.
 * @returns The user token.
 */
export async function authenticate(username: string, password: string): Promise<string> {
	let telegramAlias: string = username.trim();

	if (telegramAlias !== null) {
		if (telegramAlias[0] == '@') telegramAlias = telegramAlias.slice(1);
		if (!/^[A-Za-z0-9_]*$/.test(telegramAlias)) {
			throw new Error('telegram alias must consist only of latin alphabet letters and digits! ');
		}
	}

	const response: Response = await fetch(serverAPI + '/auth/authenticate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: telegramAlias,
			password,
		}),
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		throw errorResponse;
	}

	const data = await response.json();
	return data.token;
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
	sortBy: "date" | "kf" | "numberOfPlayers" = "date",
	descending: boolean | null = null,
	title: string | null = null,
	minParticipants: number | null = null,
	maxParticipants: number | null = null,
	startDateString: string | null = null,
	endDateString: string | null = null,
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: Tournaments[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/api/tournaments';
	console.log(minParticipants, maxParticipants, sortBy);
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
			Authorization: `Bearer ${token}`,
		},
	});

	await handleGetErrors(response, token);

	const totalPages: number = parseInt(response.headers.get('X-Total-Pages') ?? '100', 10);

	const data = await response.json();
	return { data, totalPages };
}

/**
 * Creates a new tournament.
 * @param title - The title of the tournament.
 * @param startDateString - The start date string.
 * @param endDateString - The end date string.
 * @returns The created tournament data.
 */
export async function createTournament(
	title: string,
	startDateString: string,
	endDateString: string,
): Promise<Tournaments> {
	startDateString = new Date(startDateString).toLocaleDateString('ru');
	endDateString = new Date(endDateString).toLocaleDateString('ru');

	const response: Response = await fetch(serverAPI + '/api/tournaments', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			title,
			startDateString,
			endDateString,
		}),
	});

	await handleModifyErrors(response, token);

	const data = await response.json();
	return data;
}

/**
 * Deletes a tournament.
 * @param tournamentID - The ID of the tournament.
 */
export async function deleteTournament(tournamentID: string): Promise<void> {
	const response: Response = await fetch(serverAPI + '/api/tournaments/' + tournamentID, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	await handleModifyErrors(response, token);
}

/**
 * Finishes a tournament.
 * @param tournamentID - The ID of the tournament.
 */
export async function finishTournament(tournamentID: string): Promise<void> {
	const response: Response = await fetch(serverAPI + '/api/tournaments/' + tournamentID, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	await handleModifyErrors(response, token);
}
