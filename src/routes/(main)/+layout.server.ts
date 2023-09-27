
import { userToken } from '$lib/stores';
import { getRoles } from '$lib/token';
import type { LayoutServerLoad } from './$types';


// export async function load: PageLoad({ url, cookies }) {
// 	const token = cookies.get('userToken') || '';
// 	userToken.set(token);
// }

export const load: LayoutServerLoad = ({ cookies }) => {
	const token = cookies.get('userToken') ?? '';
	
	userToken.set(token);

	const userRoles = getRoles(token)

	const isAuthorized = userRoles.includes('USER');
	const isLeader = userRoles.includes('LEADER');
	
	console.log(isAuthorized);
	console.log(isLeader);
	
	return {
		isAuthorized,
		isLeader
	};
};