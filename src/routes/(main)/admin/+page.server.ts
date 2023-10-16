import * as db from '$lib/server/requests';
import { getRoles } from '$lib/server/token';
import type { Player } from '$lib/types/types';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export async function load({ cookies }) {
	const token = cookies.get('userToken') ?? '';
	const userRoles = getRoles(token);
	const isLeader = userRoles.includes('LEADER');
	if (!isLeader) {
		throw redirect(308, '/');
	}

	let leaders: Player[] = [];
	let error: string | undefined;

	try {
		leaders = await db.getLeaders();
	} catch (e) {
		if (typeof e === 'string') {
			error = e;
		} else if (e instanceof Error) {
			error = e.message;
		}
	}

	return {
		leaders,
		error,
		title: 'Admin Panel',
	};
}

export const actions = {
	promoteLeader: async ({ request }) => {
		const data = await request.formData();

		await db.promoteLeader(String(data.get('telegramAlias') || ''));
	},
	demoteLeader: async ({ request }) => {
		const data = await request.formData();

		await db.demoteLeader(String(data.get('id') || ''));
	},
	broadcastMessage: async ({ request }) => {
		const data = await request.formData();

		const message = data.get('message');

		if (message) await db.broadcastMessage(String(message));
	},
};
