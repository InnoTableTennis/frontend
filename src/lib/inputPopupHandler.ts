import { inputOverlayText } from '$lib/stores';

function getPromiseFromEvent(item: HTMLDivElement | HTMLButtonElement, event: string) {
	return new Promise<void>((resolve) => {
		const listener = () => {
			item.removeEventListener(event, listener);
			resolve();
		};
		item.addEventListener(event, listener);
	}).then(() => {
		return item.classList.item(0);
	});
}

async function waitFor<T extends HTMLElement>(selector: string): Promise<T> {
	return new Promise<T>((resolve) => {
		const element = document.querySelector(selector) as T;
		if (element) {
			resolve(element);
		} else {
			const observer = new MutationObserver((mutationsList, observer) => {
				const targetElement = document.querySelector(selector) as T;
				if (targetElement) {
					observer.disconnect();
					resolve(targetElement);
				}
			});
			observer.observe(document.documentElement, { childList: true, subtree: true });
		}
	});
}

async function waitForClick() {
	const okButton: HTMLDivElement = await waitFor('.overlay-button');
	const firstScore: HTMLInputElement = await waitFor('#first-score');
	const secondScore: HTMLInputElement = await waitFor('#second-score');
	const background: HTMLButtonElement = await waitFor('.overlay-background');
	await Promise.race([
		getPromiseFromEvent(okButton, 'click'),
		getPromiseFromEvent(background, 'click'),
	]);
	return [firstScore.value ? firstScore.value : 0, secondScore.value ? secondScore.value : 0];
}

/**
 * Calls a popup for input.
 * @param message text shown in popup.
 * @param firstName name of the first player.
 * @param secondName name of the second player.
 * @return array of two values - points of first player and points of second player.
 */
export async function alertInputPopup(message: string, firstName: string, secondName: string) {
	inputOverlayText.set([message, firstName, secondName]);
	return await waitForClick();
}
