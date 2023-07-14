<script lang="ts">
	export let dark = false;
	export let disabled = false;
	export let type: 'button' | 'reset' | 'submit' = 'button';
</script>

<button {disabled} {type} class:dark on:click><slot /></button>

<style>
	button {
		border-radius: 10px;
		outline: none;
		border: 0;
		padding: 0.8em 1rem;
		background-color: var(--secondary-color);
		color: var(--main-color);
		font-weight: var(--fontweight-2);
		transition: 0.1s;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 800px) {
		button {
		padding: 0.5em 0.5rem;
	}
	}

	button:hover {
		box-shadow: 0px 4px 4px 2px var(--tertiary-color);
		cursor: pointer;
	}

	.dark {
		background-color: var(--main-color);
		color: var(--content-color);
		font-weight: var(--fontweight-2);
	}

	button.dark:hover {
		box-shadow: 0px 4px 4px 2px var(--tertiary-color);
	}
	button:disabled,
	button[disabled] {
		/* border: 1px solid #444; */
		background-color: var(--tertiary-color);
		color: var(--tertiary-font-color);
		box-shadow: none;
		cursor: auto;
	}
</style>
