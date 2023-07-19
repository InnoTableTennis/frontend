<script lang="ts">
	export let name: string;
	export let placeholder: string;
	export let defaultValue = 0;
	export let minValue = 0;
	export let maxValue = 10;
	export let inputVal = 0;
	export const reset = () => {
		inputVal = defaultValue;
	};

	$: inputVal = defaultValue;
</script>

<input type="number" min={minValue} max={maxValue} {name} bind:value={inputVal} {placeholder} />

<style>
	input {
		width: 100%;
		height: 100%;
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
