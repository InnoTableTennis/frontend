import * as db from '$lib/server/requests';

export const prerender = false;

export async function load({ url }) {
	const searchParams = url.searchParams;

	const name = searchParams.get('name');
    const telegramAlias = searchParams.get('telegramAlias')
    const minRating = searchParams.get('minRating')
	const maxRating = searchParams.get('maxRating');
	const descending = searchParams.get('descending');
	const sortBy = searchParams.get('sortBy');
	const currentPageNumber = searchParams.get('currentPageNumber');
	const currentPageSize = searchParams.get('currentPageSize');

	const data = await db.getPlayers(
        sortBy as 'name' | 'rating',
        descending !== null ? descending=='true' : null,
        name,
        telegramAlias,
        minRating ? Number(minRating) : null,
		maxRating ? Number(maxRating) : null,
        currentPageNumber ? Number(currentPageNumber) : null,
        currentPageSize ? Number(currentPageSize) : null,
	);

	return {
		...data,
		title: 'Players',
	};
}

export const actions = {
	createPlayer: async ({ request }) => {
		const data = await request.formData();
		await db.createPlayer(
			String(data.get('name') || ''),
            String(data.get('telegramAlias') || ''),
            Number(data.get('rating') || '0')
		);
	},
	editPlayer: async ({ request }) => {
		const data = await request.formData();

		await db.editPlayer(
			String(data.get('playerId') || ''),
			String(data.get('name') || ''),
            String(data.get('telegramAlias') || ''),
            Number(data.get('rating') || '0')
		);
	},
	deletePlayer: async ({ request }) => {
		const data = await request.formData();

		await db.deletePlayer(String(data.get('playerId') || ''));
	}
};
