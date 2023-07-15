<script lang="ts">
	export let label: string;
	export let onClick: () => void;
</script>

<button on:click={onClick}>{label}</button>

<style>
	button {
		color: var(--secondary-color);
		width: max-content;
		margin: 1.5em 0 1.5em auto;
		text-decoration: underline;
		background: none;
		border: none;
		cursor: pointer;
		outline: none;
	}
</style>
