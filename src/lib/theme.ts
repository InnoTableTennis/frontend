import { theme } from '$lib/stores';

export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('color-scheme', newTheme);
		localStorage.setItem('color-scheme', newTheme);
		return newTheme;
	});
}
