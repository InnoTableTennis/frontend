import { getExpirationDate, getRoles } from '$lib/token';
import { userToken } from '$lib/stores';

/**
 * This file contains error handling functions for handling API response errors.
 */

/**
 * Handles errors for GET requests.
 * @param response - The response object from the API.
 * @param token - The user token.
 * @throws An error if the response is not successful or unauthorized.
 */
export async function handleGetErrors(response: Response, token: string): Promise<void> {
	if (!response.ok) {
		checkExpiration(response, token);

		if (response.status == 403) {
			let errorMessage = 'You are not authorized to see the content of this page.';
			if (token == '') errorMessage += ' Please Log In first!';
			throw new Error(errorMessage);
		}
		const errorResponse = await response.json();
		throw errorResponse;
	}
}

/**
 * Handles errors for modify requests.
 * @param response - The response object from the API.
 * @param token - The user token.
 * @throws An error if the response is not successful or unauthorized.
 */
export async function handleModifyErrors(response: Response, token: string): Promise<void> {
	if (!response.ok) {
		checkExpiration(response, token);

		if (response.status == 403) {
			let errorMessage = 'You do not have rights to perform this action.';
			if (token == '') errorMessage += ' Please Log In first!';
			else if (getRoles(token).includes('USER'))
				errorMessage += ' Only club leaders may perform this action.';
			throw new Error(errorMessage);
		}
		const errorResponse = await response.json();
		throw errorResponse;
	}
}

/**
 * Checks the expiration status of the token and performs necessary actions.
 * @param response - The response object from the API.
 * @param token - The user token.
 * @throws An error if the token has expired.
 */
function checkExpiration(response: Response, token: string): void {
	if (response.status == 401) {
		const expDate = getExpirationDate(token);
		if (expDate && expDate < new Date()) {
			localStorage.removeItem('token');
			userToken.set('');
			throw new Error('Your login session is over. Please log in again!');
		}
	}
}
