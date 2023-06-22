<script>
	export let dark = false;
	export let disabled = false;
	export let type = 'button';
</script>

<button {disabled} {type} class:dark on:click><slot /></button>

<style>
	button {
		border-radius: 10px;
		outline: none;
		border: 0;
		padding: 0.8em 1em;
		background-color: #c4d6b0;
		color: rgba(0, 0, 0, 0.8);
		font-weight: 600;
		transition: 0.1s;
		width: 100%;
		height: 100%;
	}

	button:hover {
		box-shadow: 0px 4px 4px 2px rgba(105, 105, 105, 0.4);
		cursor: pointer;
	}

	.dark {
		background-color: #212121;
		color: #fff;
		font-weight: 500;
	}

	button.dark:hover {
		box-shadow: 0px 4px 4px 2px rgba(33, 33, 33, 0.4);
	}
	button:disabled,
	button[disabled] {
		/* border: 1px solid #444; */
		background-color: #666666;
		color: #222;
		box-shadow: none;
		cursor: auto;
	}
</style>
