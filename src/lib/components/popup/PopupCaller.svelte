<script lang="ts">
	import { overlayText } from '$lib/stores';
	import Popup from '$lib/components/popup/Popup.svelte';
	import { inputOverlayText } from '$lib/stores.js';
	import InputPopup from '$lib/components/popup/InputPopup.svelte';
</script>

<div class="popup-container">
	{#if $overlayText != null}
		<Popup popupText={$overlayText} />
	{/if}
	{#if $inputOverlayText != null}
		<InputPopup
			popupText={$inputOverlayText[0]}
			firstPlayer={$inputOverlayText[1]}
			secondPlayer={$inputOverlayText[2]}
		/>
	{/if}
</div>
