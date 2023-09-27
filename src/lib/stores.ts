import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Error } from '$lib/types/types';
import { browser } from '$app/environment';
// import { getRoles } from '$lib/token';

/**
 * Represents the user token store.
 * Stores the user token value.
 */
export const userToken: Writable<string> = writable('');
export const isLeader: Writable<boolean> = writable(false);
// export const isLeader = derived(userToken, ($userToken) => getRoles($userToken).includes('LEADER'));

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
export const theme = writable((browser && localStorage.getItem('color-scheme')) ?? 'light');
export const overlayText: Writable<string | null> = writable(null);
export const inputOverlayText: Writable<string[] | null> = writable(null);
export const outputOverlayText: Writable<number[] | null> = writable(null);
