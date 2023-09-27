import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('userToken');
		throw redirect(308, '/');
	}
}