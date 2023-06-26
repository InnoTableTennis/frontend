<script lang="ts">
	import { fade } from 'svelte/transition';
	export let message = 'Unexpected Error Happened';
</script>

<div class="message" transition:fade>{message}</div>

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
