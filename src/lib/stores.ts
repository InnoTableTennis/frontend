import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Error } from './types/types';
import type { filterPlayerFormStore, filterTournamentFormStore, filterMatchFormStore, addPlayerFormStore, addTournamentFormStore, addMatchFormStore } from "../lib/types/types";
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

const FILTER_PLAYER_FORM: filterPlayerFormStore = { name: '', telegramAlias: '', minRating: '', maxRating: '' };
const FILTER_TOURNAMENT_FORM: filterTournamentFormStore = { title: '', minParticipants: '', maxParticipants: '', startDateString: '', endDateString: '' };
const FILTER_MATCH_FORM: filterMatchFormStore = { name: '', score: '', minDateString: '', maxDateString: '' };
const ADD_PLAYER_FORM: addPlayerFormStore = { name: '', telegramAlias: '', initialRating: 100 };
const ADD_TOURNAMENT_FORM: addTournamentFormStore = { title: '', startDateString: convertDateToStringDash(new Date()), endDateString: convertDateToStringDash(new Date()) };
const ADD_MATCH_FORM: addMatchFormStore = { firstPlayerName: '', secondPlayerName: '', tournamentTitle: '', firstPlayerScore: 0, secondPlayerScore: 0 };

export const FilterPlayerFormStore = writable(FILTER_PLAYER_FORM);
export const FilterTournamentFormStore = writable(FILTER_TOURNAMENT_FORM);
export const FilterMatchFormStore = writable(FILTER_MATCH_FORM);
export const AddPlayerFormStore = writable(ADD_PLAYER_FORM);
export const AddTournamentFormStore = writable(ADD_TOURNAMENT_FORM);
export const AddMatchFormStore = writable(ADD_MATCH_FORM);

