<script lang="ts">
	export let name: string;
	export let placeholder: string;
	export let defaultValue = '';
	export const reset = () => {
		inputVal = defaultValue;
	};

	let inputVal: string;

	$: {
		inputVal = defaultValue;
	}
</script>

<input type="date" {name} {placeholder} bind:value={inputVal} />

<style>
	input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	input {
		box-sizing: border-box;
		border: none;
		border-bottom: 5px solid var(--secondary-bg-color);
		padding: 0.8em 0;
		color: var(--not-chosen-font-color);
		background-color: var(--main-color);
		transition: 0.1s;
	}

	input:focus {
		outline: none;
		color: var(--content-color);
		border-bottom: 5px solid var(--secondary-color);
	}
	input:disabled {
		background-color: var(--secondary-bg-color);
		color: var(--not-chosen-font-color);
		box-shadow: none;
		cursor: default;
	}
</style>
