import {inputOverlayText, outputOverlayText} from "$lib/stores";
import {get} from "svelte/store";

/**
 * Calls a popup for input.
 * @param message text shown in popup.
 * @param firstName name of the first player.
 * @param secondName name of the second player.
 * @return array of two values - points of first player and points of second player.
 */
async function waitForAnswer() {
    return new Promise<number[] | null>((resolve) => {
        setInterval(() => {
            if (get(outputOverlayText)) {
                resolve(get(outputOverlayText));
            }
        }, 50);
    }).then((value: number[] | null) => {
        outputOverlayText.set(null);
        return value;
    })
}
export async function alertInputPopup (message: string, firstName: string, secondName: string)  {
    inputOverlayText.set([message, firstName, secondName]);
    return await waitForAnswer();
}