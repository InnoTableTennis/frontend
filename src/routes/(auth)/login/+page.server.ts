import * as db from '$lib/server/requests';

export const prerender = false;

export function load() {
	return {
		title: 'Login',
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const token = await db.authenticate(
			String(data.get('username') || ''),
			String(data.get('password') || ''),
		);
		cookies.set('userToken', token, {path:'/'})
	}
}