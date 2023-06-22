import { writable } from 'svelte/store';

/**
 * Represents the user token store.
 * Stores the user token value.
 */
export const userToken: writable<string> = writable('');

/**
 * Represents the loaded page store.
 * Stores the title of the loaded page, if any page is loaded.
 */
export const loadedPage: writable<string | null> = writable(null);
