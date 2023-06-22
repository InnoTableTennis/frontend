/**
 * This file contains helper functions for manipulating strings and dates.
 */

/**
 * Converts a phrase to title case.
 * @param phrase - The input phrase to convert.
 * @returns The converted phrase in title case.
 */
export function titleCase(phrase: string): string {
	return phrase
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/**
 * Converts a date to a formatted string in the format "dd.mm.yyyy".
 * @param date - The input date to convert.
 * @returns The formatted date string.
 */
export const convertDateToString = (date: Date): string => {
	date = new Date(date);
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedDate = dd + '.' + mm + '.' + yyyy;
	return formattedDate;
};

/**
 * Converts a date to a formatted string in the format "yyyy-mm-dd".
 * @param date - The input date to convert.
 * @returns The formatted date string.
 */
export const convertDateToStringDash = (date: Date): string => {
	date = new Date(date);
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedDate = yyyy + '-' + mm + '-' + dd;
	return formattedDate;
};

/**
 * Retrieves a shorter name by taking the first name and the last name initial.
 * @param name - The input name to shorten.
 * @returns The shorter version of the name.
 */
export const getShorterName = (name: string): string => {
	const arr = name.split(' ');
	const firstName = arr[0];
	const secondName = arr.splice(1).join(' ');
	return firstName[0] + '. ' + secondName;
};
