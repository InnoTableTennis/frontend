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
		padding: 0.8em 1em;
		background-color: var(--accent-color);
		color: var(--main-back-color);
		font-weight: var(--fontweight-button);
		transition: 0.1s;
		width: 100%;
		height: 100%;
	}

	button:hover {
		box-shadow: 0px 4px 4px 2px var(--light-shadow-color);
		cursor: pointer;
	}

	.dark {
		background-color: var(--main-back-color);
		color: var(--button-text-color);
		font-weight: var(--fontweight-button-dark);
	}

	button.dark:hover {
		box-shadow: 0px 4px 4px 2px var(--dark-shadow-color);
	}
	button:disabled,
	button[disabled] {
		/* border: 1px solid #444; */
		background-color: var(--inactive-button-back-color);
		color: var(--inactive-button-text-color);
		box-shadow: none;
		cursor: auto;
	}
</style>
