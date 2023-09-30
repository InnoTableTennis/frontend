import * as db from '$lib/server/requests';
import { getRoles } from '$lib/token';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export async function load({ cookies }) {
	const token = cookies.get('userToken') ?? '';
	const userRoles = getRoles(token);
	const isLeader = userRoles.includes('LEADER');
	if (!isLeader) {
		throw redirect(308, '/');
	}

	const leaders = await db.getLeaders();		

	return {
		leaders,
		title: 'Admin Panel',
	};
}

export const actions = {
	promoteLeader: async ({ request }) => {
		const data = await request.formData();

		console.log(data)

		await db.promoteLeader(String(data.get('telegramAlias') || ''));
	},
	demoteLeader: async ({ request }) => {
		const data = await request.formData();

		console.log(data);

		await db.demoteLeader(String(data.get('id') || ''));
	},
	broadcastMessage: async ({ request }) => {
		const data = await request.formData();

		const message = data.get('message');

		if (message) await db.broadcastMessage(String(message));
	},
};
