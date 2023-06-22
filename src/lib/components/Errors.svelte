<script>
	import Error from '$lib/components/Error.svelte';

	export let errors = [];
</script>

<div class="errors-container">
	{#each errors as error}
		<Error message={error.message} />
	{/each}
</div>

<style>
	div.errors-container {
		position: absolute;
		bottom: 2em;
		/* width: 20em; */
		display: flex;
		flex-direction: column-reverse;
		gap: 0.5rem;
	}
</style>
