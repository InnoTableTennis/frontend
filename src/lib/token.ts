/**
 * This file contains utility functions for working with JWT tokens.
 */

import jwt_decode from 'jwt-decode';
import type { DecodedJWT } from './types/types';

/**
 * Retrieves the roles from a token.
 *
 * @param token - The JWT token.
 * @returns An array of roles extracted from the token.
 */
export function getRoles(token: string): string[] {
	let roles: string[];
	try {
		roles = (<DecodedJWT>jwt_decode(token)).roles;
	} catch (error) {
		roles = [];
	}
	return roles;
}

export function getUsername(token: string): string {
	let username: string;
	try {
		username = (<DecodedJWT>jwt_decode(token)).sub;
	} catch (error) {
		username = '';
	}
	return username;
}

/**
 * Retrieves the expiration date from a token.
 *
 * @param token - The JWT token.
 * @returns The expiration date of the token as a Date object, or null if the date cannot be determined.
 */
export function getExpirationDate(token: string): Date | null {
	let expDate: Date | null;
	try {
		expDate = new Date((<DecodedJWT>jwt_decode(token)).exp * 1000);
	} catch (error) {
		expDate = null;
	}
	return expDate;
}
