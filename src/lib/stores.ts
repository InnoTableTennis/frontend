import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Error } from './types/types';
import { browser } from '$app/environment';

/**
 * Represents the user token store.
 * Stores the user token value.
 */
export const userToken: Writable<string> = writable('');

/**
 * Represents the loaded page store.
 * Stores the title of the loaded page, if any page is loaded.
 */
export const loadedPage: Writable<string | null> = writable(null);

export const errors: Writable<Error[]> = writable([]);

/**
 * Represents the color-scheme store.
 * Stores the color-scheme value.
 */
const userTheme = browser && localStorage.getItem('color-scheme');
export const theme = writable(userTheme ?? 'dark');

export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('color-scheme', newTheme);
		localStorage.setItem('color-scheme', newTheme);
		return newTheme;
	});
}
