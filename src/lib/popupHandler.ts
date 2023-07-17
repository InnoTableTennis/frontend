import {overlayText} from "$lib/stores";

function getPromiseFromEvent(item: HTMLDivElement, event: string) {
    return new Promise((resolve) => {
        const listener = () => {
            item.removeEventListener(event, listener);
            resolve();
        }
        item.addEventListener(event, listener);
    }).then(() => {
        return item.classList.item(0);
    })
}

async function waitFor(selector: string) {
    return new Promise(resolve => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
        } else {
            const observer = new MutationObserver((mutationsList, observer) => {
                const targetElement = document.querySelector(selector);
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
    const yesButton = await waitFor(".overlay-button-yes");
    const noButton = await waitFor(".overlay-button-no");
    const background = await waitFor(".overlay-background");
    return await Promise.race([getPromiseFromEvent(yesButton, "click"),
        getPromiseFromEvent(noButton, "click"), getPromiseFromEvent(background, "click")]);
}

/**
 * Calls a popup for confirmation.
 * @param message text shown in popup.
 * @return true - user clicked 'Yes', otherwise - false.
 */
export async function alertPopup (message: string) {
    overlayText.set(message);
    return await waitForClick() == "overlay-button-yes";
}