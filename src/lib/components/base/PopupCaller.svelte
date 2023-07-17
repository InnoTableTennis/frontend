<script lang="ts">
    import {overlayText} from "$lib/stores";
    import Popup from "$lib/components/base/Popup.svelte";
</script>
<div class="popup-container">
    {#if $overlayText != null}
        <Popup popupText={$overlayText} />
    {/if}
</div>
