import * as db from '$lib/server/requests';

import { userToken } from '$lib/stores';

export const prerender = false;

export async function load({ url, cookies }) {
	const token = cookies.get('userToken') || '';
	userToken.set(token);

	const searchParams = url.searchParams;

	const data = await db.getMatches(
		searchParams.get('descending') !== 'false',
		searchParams.get('name') || '',
		searchParams.get('score') || '',
		searchParams.get('minDateString') || '',
		searchParams.get('maxDateString') || '',
		Number(searchParams.get('currentPageNumber') || 0),
		Number(searchParams.get('currentPageSize') || 0),
	);

	return {
		...data,
		title: 'Matches',
	};
}

export const actions = {
	createMatch: async ({ request }) => {
		const data = await request.formData();
		await db.createMatch(
			String(data.get('firstPlayerName') || ''),
			String(data.get('secondPlayerName') || ''),
			Number(data.get('firstPlayerScore')),
			Number(data.get('secondPlayerScore')),
			String(data.get('tournamentTitle') || ''),
			String(data.get('localDateString') || ''),
		);
	},
	editMatch: async ({ request }) => {
		const data = await request.formData();

		await db.editMatch(
			String(data.get('matchId') || ''),
			String(data.get('firstPlayerName') || ''),
			String(data.get('secondPlayerName') || ''),
			Number(data.get('firstPlayerScore')),
			Number(data.get('secondPlayerScore')),
			String(data.get('tournamentTitle') || ''),
			String(data.get('localDateString') || ''),
		);
	},
	deleteMatch: async ({ request }) => {
		const data = await request.formData();
		
		await db.deleteMatch(
			String(data.get('matchId') || ''),
		)
	}
};