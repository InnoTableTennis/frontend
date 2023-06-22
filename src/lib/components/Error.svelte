<script>
	import { fade } from 'svelte/transition';

	import { onMount } from 'svelte';

	export let message = 'Unexpected Error Happened';

	let showError = true;

	onMount(async () => {
		setTimeout(() => {
			showError = false;
		}, 5000);
	});
</script>

{#if showError}
	<div class="message" transition:fade>{message}</div>
{/if}

<style>
	div.message {
		/* word-break: break-all; */
		border-radius: 0px 15px 15px 0px;
		padding: 1em 2em;
		text-align: left;
		background-color: rgba(150, 0, 0, 0.7);
		color: #ffffff;
		min-width: 7em;
		max-width: 20em;
	}
</style>
