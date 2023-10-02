import * as db from '$lib/server/requests';

import { userToken } from '$lib/server/stores';
import { getExpirationDate, getRoles, getUsername } from '$lib/server/token';
import type { LayoutServerLoad } from './$types';

export const prerender = false;

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('userToken') ?? '';

	const isTokenExpired = getExpirationDate(token) < new Date();

	if (isTokenExpired) {
		token == '';
		cookies.delete('userToken');
	}	

	userToken.set(token);

	const userRoles = getRoles(token);
	const username = getUsername(token);

	const isAuthorized = userRoles.includes('USER');
	const isLeader = userRoles.includes('LEADER') && isAuthorized;

	let playerInfo;
	if (isAuthorized) {
		playerInfo = await db.getProfileData(username);
	}

	return {
		isAuthorized,
		isLeader,
		playerInfo,
	};
};
