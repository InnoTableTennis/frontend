import type { PageServerLoad } from './$types';

import * as db from '$lib/server/requests';
import { countDeltas } from '$lib/server/tournament.utils';

export const load: PageServerLoad = async ({ params }) => {

	const id = +params.id
	const tournament = await db.getTournament(id)

	const deltas = countDeltas(tournament)

	return {
		title: tournament.title,
		tournament,
		deltas,
	};
};
