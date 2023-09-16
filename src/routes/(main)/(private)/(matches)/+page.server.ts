import * as db from '$lib/server/requests';

export const prerender = false;

export async function load() {
	const matches = await db.getMatches();
    return {
		matches,
        title: 'Matches',
	};
}

export const actions = {
	create: async ({request}) => {
		const data = await request.formData();
		console.log(data);
		// await db.createMatch()
	},
	edit: async ({request}) => {
		const data = await request.formData();
		console.log(data);
		// await db.createMatch()
	},
	delete: async ({request}) => {
		const data = await request.formData();
		console.log(data);
		// await db.createMatch()
	},
	sort: async ({request}) => {
		const data = await request.formData();
		console.log(data);
		// await db.createMatch()
	}
}