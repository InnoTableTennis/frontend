
import * as db from '$lib/server/requests';

import { userToken } from '$lib/server/stores';
import { getRoles, getUsername } from '$lib/token';
import type { LayoutServerLoad } from './$types';


export const prerender = false;

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('userToken') ?? '';
	
	userToken.set(token);
	
	const userRoles = getRoles(token)
	const username = getUsername(token)

	const isAuthorized = userRoles.includes('USER');
	const isLeader = userRoles.includes('LEADER');

	let playerInfo
	if (isAuthorized) {
		playerInfo = await db.getProfileData(username);
	}

	return {
		isAuthorized,
		isLeader,
		playerInfo
	};
};