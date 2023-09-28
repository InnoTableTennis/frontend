import * as db from '$lib/server/requests';

export const prerender = false;

export async function load({ url }) {
	const searchParams = url.searchParams;

	const title = searchParams.get('title');
    const minParticipants = searchParams.get('minParticipants')
    const maxParticipants = searchParams.get('maxParticipants')
	const startDateString = searchParams.get('startDateString');
	const endDateString = searchParams.get('endDateString');
	const descending = searchParams.get('descending');
	const sortBy = searchParams.get('sortBy');
	const currentPageNumber = searchParams.get('currentPageNumber');
	const currentPageSize = searchParams.get('currentPageSize');

	const data = await db.getTournaments(
        sortBy as 'date' | 'kf' | 'players',
        descending !== null ? descending=='true' : null,
        title,
        minParticipants ? Number(minParticipants) : null,
        maxParticipants ? Number(maxParticipants) : null,
        startDateString,
        endDateString,
        currentPageNumber ? Number(currentPageNumber) : null,
        currentPageSize ? Number(currentPageSize) : null,
	);

	return {
		...data,
		title: 'Tournaments',
	};
}

export const actions = {
	createTournament: async ({ request }) => {
		const data = await request.formData();
		await db.createTournament(
            String(data.get('title') || ''),
            String(data.get('startDateString') || ''),
            String(data.get('endDateString') || '')
		);
	},
	editTournament: async ({ request }) => {
		const data = await request.formData();

		await db.editTournament(
			String(data.get('tournamentId') || ''),
			String(data.get('title') || ''),
            String(data.get('startDateString') || ''),
            String(data.get('endDateString') || '')
		);
	},
	deleteTournament: async ({ request }) => {
		const data = await request.formData();

		await db.deleteTournament(String(data.get('tournamentId') || ''));
	},
	finishTournament: async ({ request }) => {
		const data = await request.formData();

		await db.finishTournament(String(data.get('tournamentId') || ''));
	},
};
