
import { userToken } from '$lib/stores';
import { getRoles } from '$lib/token';
import type { LayoutServerLoad } from './$types';

export const prerender = false;

export const load: LayoutServerLoad = ({ cookies }) => {
	const token = cookies.get('userToken') ?? '';
	
	userToken.set(token);

	const userRoles = getRoles(token)

	const isAuthorized = userRoles.includes('USER');
	const isLeader = userRoles.includes('LEADER');
	
	return {
		isAuthorized,
		isLeader
	};
};