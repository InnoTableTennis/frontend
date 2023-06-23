/**
 * This file contains functions that mock API requests. In case there is no access to the public API
 */

/**
 * Retrieves matches from local storage.
 * @returns The matches data.
 */
export async function getMatches(): Promise<any[]> {
	const matches = JSON.parse(localStorage.getItem('matches') as string) || [];
	return matches;
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

	const matches = JSON.parse(localStorage.getItem('matches') as string) || [];

	const newMatch = {
		id: matches.length ? matches[matches.length - 1].id + 1 : 0,
		firstPlayerName,
		secondPlayerName,
		firstPlayerScore,
		secondPlayerScore,
		localDateString,
		tournamentTitle,
	};
	matches.push(newMatch);
	localStorage.setItem('matches', JSON.stringify(matches));
	return newMatch;
}

/**
 * Deletes a match.
 * @param matchID - The ID of the match.
 */
export async function deleteMatch(matchID: number): Promise<void> {
	const matches = JSON.parse(localStorage.getItem('matches') as string) || [];
	const idx = matches.findIndex((match: any) => {
		return match.id == matchID;
	});
	matches.splice(idx, 1);
	localStorage.setItem('matches', JSON.stringify(matches));
}

/**
 * Retrieves players from local storage.
 * @returns The players data.
 */
export async function getPlayers(): Promise<any[]> {
	const players = JSON.parse(localStorage.getItem('players') as string) || [];
	return players;
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
	const players = JSON.parse(localStorage.getItem('players') as string) || [];
	const newPlayer = {
		id: players.length ? players[players.length - 1].id + 1 : 0,
		name,
		telegramAlias,
		rating,
	};
	players.push(newPlayer);
	localStorage.setItem('players', JSON.stringify(players));
	return newPlayer;
}

/**
 * Deletes a player.
 * @param playerID - The ID of the player.
 */
export async function deletePlayer(playerID: number): Promise<void> {
	const players = JSON.parse(localStorage.getItem('players') as string) || [];
	const idx = players.findIndex((player: any) => {
		return player.id == playerID;
	});
	players.splice(idx, 1);
	localStorage.setItem('players', JSON.stringify(players));
	return;
}

/**
 * Authenticates a user.
 * @param username - The username.
 * @param password - The password.
 * @returns The authentication token.
 */
export async function authenticate(username: string, password: string): Promise<string> {
	return username + '&' + password;
}

/**
 * Retrieves tournaments from local storage.
 * @returns The tournaments data.
 */
export async function getTournaments(): Promise<any[]> {
	const tournaments = JSON.parse(localStorage.getItem('tournaments') as string) || [];
	return tournaments;
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
	const tournaments = JSON.parse(localStorage.getItem('tournaments') as string) || [];
	const newTournament = {
		id: tournaments.length ? tournaments[tournaments.length - 1].id + 1 : 0,
		title,
		startDateString,
		endDateString,
	};
	tournaments.push(newTournament);
	localStorage.setItem('tournaments', JSON.stringify(tournaments));
	return newTournament;
}

/**
 * Deletes a tournament.
 * @param tournamentID - The ID of the tournament.
 */
export async function deleteTournament(tournamentID: number): Promise<void> {
	const tournaments = JSON.parse(localStorage.getItem('tournaments') as string) || [];
	const idx = tournaments.findIndex((tournament: any) => {
		return tournament.id == tournamentID;
	});
	tournaments.splice(idx, 1);
	localStorage.setItem('tournaments', JSON.stringify(tournaments));
}
