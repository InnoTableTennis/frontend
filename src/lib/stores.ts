import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Error } from './types/types';
import type { sortFilterPlayerFormStore, sortFilterTournamentFormStore, sortFilterMatchFormStore, addPlayerFormStore, addTournamentFormStore, addMatchFormStore } from "../lib/types/types";
import { convertDateToStringDash } from '$lib/helper';


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

const SORT_FILTER_PLAYER_FORM: sortFilterPlayerFormStore = { name: '', telegramAlias: '', minRating: '', maxRating: '', descending: true, sortBy: "rating" };
const SORT_FILTER_TOURNAMENT_FORM: sortFilterTournamentFormStore = { title: '', minParticipants: '', maxParticipants: '', startDateString: '', endDateString: '', descending: true, sortBy: "date" };
const SORT_FILTER_MATCH_FORM: sortFilterMatchFormStore = { name: '', score: '', minDateString: '', maxDateString: '', descending: true, sortBy: "date" };
const ADD_PLAYER_FORM: addPlayerFormStore = { name: '', telegramAlias: '', initialRating: 100 };
const ADD_TOURNAMENT_FORM: addTournamentFormStore = { title: '', startDateString: convertDateToStringDash(new Date()), endDateString: convertDateToStringDash(new Date()) };
const ADD_MATCH_FORM: addMatchFormStore = { firstPlayerName: '', secondPlayerName: '', tournamentTitle: '', firstPlayerScore: 0, secondPlayerScore: 0 };

export const SortFilterPlayerFormStore = writable(SORT_FILTER_PLAYER_FORM);
export const SortFilterTournamentFormStore = writable(SORT_FILTER_TOURNAMENT_FORM);
export const SortFilterMatchFormStore = writable(SORT_FILTER_MATCH_FORM);
export const AddPlayerFormStore = writable(ADD_PLAYER_FORM);
export const AddTournamentFormStore = writable(ADD_TOURNAMENT_FORM);
export const AddMatchFormStore = writable(ADD_MATCH_FORM);

