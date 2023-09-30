import type { PageServerLoad } from "./$types";

import * as db from '$lib/server/requests';

export const prerender = false;
export const ssr = true;

export const load : PageServerLoad = async ({ params }) => {
	
	const profileData = await db.getProfileData(params.id);

	const profileStats = await db.getStatistics(profileData.id);

	return {
		id: params.id,
		title: profileData.name,
		profileData,
		profileStats
	};
};
