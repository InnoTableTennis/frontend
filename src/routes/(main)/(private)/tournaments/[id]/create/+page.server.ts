import type { PageServerLoad } from './$types';

import * as db from '$lib/server/requests';

export const load: PageServerLoad = async ({ params }) => {
	const id = +params.id
	const tournament = await db.getTournament(id)
	return {
		title: `${tournament.title} Constructor`,
		tournament,
	};
};