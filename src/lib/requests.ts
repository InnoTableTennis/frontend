import { titleCase } from '$lib/helper';
import { handleGetErrors, handleModifyErrors } from '$lib/errorHandler';

import { dev } from '$app/environment';

import { userToken } from '$lib/stores';

/**
 * This file contains functions for making API requests.
 */

let token = '';

userToken.subscribe((value: string) => {
	token = value;
});

const serverAPI: string = dev ? 'http://10.90.138.217:8080' : '';

/**
 * Retrieves matches from the API.
 * @param pageNumber - The page number.
 * @param pageSize - The page size.
 * @returns The matches data and total number of pages.
 */
export async function getMatches(
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: any[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/api/matches';
	if (pageNumber) {
		url += '?page=' + pageNumber;
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
): Promise<any> {
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
 * @param pageNumber - The page number.
 * @param pageSize - The page size.
 * @returns The players data and total number of pages.
 */
export async function getPlayers(
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: any[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/api/players';
	if (pageNumber) {
		url += '?page=' + pageNumber;
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
): Promise<any> {
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
 * @param pageNumber - The page number.
 * @param pageSize - The page size.
 * @returns The tournaments data and total number of pages.
 */
export async function getTournaments(
	pageNumber: number | null = null,
	pageSize: number | null = null,
): Promise<{
	data: any[];
	totalPages: number;
}> {
	let url: string = serverAPI + '/api/tournaments';
	if (pageNumber) {
		url += '?page=' + pageNumber;
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
): Promise<any> {
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
