import { writable } from 'svelte/store';
import type {
	sortFilterPlayerFormStore,
	sortFilterTournamentFormStore,
	sortFilterMatchFormStore,
	addPlayerFormStore,
	addTournamentFormStore,
	addMatchFormStore,
} from '$lib/types/formTypes';
import { convertDateToStringDash } from '$lib/helper';

const SORT_FILTER_PLAYER_FORM: sortFilterPlayerFormStore = {
	name: '',
	telegramAlias: '',
	minRating: '',
	maxRating: '',
	descending: true,
	sortBy: 'rating',
};
const SORT_FILTER_TOURNAMENT_FORM: sortFilterTournamentFormStore = {
	title: '',
	minParticipants: '',
	maxParticipants: '',
	startDateString: '',
	endDateString: '',
	descending: true,
	sortBy: 'date',
};
export const SORT_FILTER_MATCH_FORM: sortFilterMatchFormStore = {
	name: '',
	score: '',
	minDateString: '',
	maxDateString: '',
	descending: true,
	sortBy: 'date',
};
const ADD_PLAYER_FORM: addPlayerFormStore = { name: '', telegramAlias: '', initialRating: 0 };
const ADD_TOURNAMENT_FORM: addTournamentFormStore = {
	title: '',
	startDateString: convertDateToStringDash(new Date()),
	endDateString: convertDateToStringDash(new Date()),
};
export const ADD_MATCH_FORM: addMatchFormStore = {
	firstPlayerName: '',
	secondPlayerName: '',
	tournamentTitle: '',
	firstPlayerScore: 0,
	secondPlayerScore: 0,
	localDateString: ''
};

export const SortFilterPlayerFormStore = writable(structuredClone(SORT_FILTER_PLAYER_FORM));
export const SortFilterTournamentFormStore = writable(structuredClone(SORT_FILTER_TOURNAMENT_FORM));
export const SortFilterMatchFormStore = writable(structuredClone(SORT_FILTER_MATCH_FORM));
export const SortFilterProfileMatchFormStore = writable(structuredClone(SORT_FILTER_MATCH_FORM));
export const AddPlayerFormStore = writable(structuredClone(ADD_PLAYER_FORM));
export const AddTournamentFormStore = writable(structuredClone(ADD_TOURNAMENT_FORM));
export const AddMatchFormStore = writable(structuredClone(ADD_MATCH_FORM));
