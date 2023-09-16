import * as db from '$lib/server/requests';

export async function load() {
	const matches = await db.getMatches();
    return {
		matches,
        title: 'Matches',
	};
}