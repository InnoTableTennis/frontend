import { handleGetErrors, handleModifyErrors } from '$lib/errorHandler';

import { userToken } from '$lib/stores';

import type { Player, Match, Tournament } from '$lib/types/types';
import type { TournamentState } from '$lib/types/tournamentTypes';

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

export async function getAllPlayers(): Promise<{ players: Player[] }> {
	const response = await fetch(serverAPI + '/getAllPlayers');

	//TODO: Handle errors

	const players = await response.json();

	return { players };
}

export async function getAllTournaments(): Promise<{ tournaments: Tournament[] }> {
	const response = await fetch(serverAPI + '/getAllTournaments/');

	//TODO: Handle errors

	const tournaments = await response.json();

	return { tournaments };
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