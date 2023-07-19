<script lang="ts">
	import { onMount } from 'svelte';

	export let type: string;
	export let name: string;
	export let placeholder: string;

	export let defaultValue = '';
	export let defaultNumValue = 0;
	export let required = false;
	export let isFirst = false;

	export let min = '0';
	export let max = '10';

	export let stringVal = '';
	export let numberVal = 0;

	export const reset = () => {
		stringVal = defaultValue;
		numberVal = 0;
	};

	$: stringVal = defaultValue;
	$: numberVal = defaultNumValue;

	let input: HTMLInputElement;

	onMount(() => {
		if (isFirst) input.focus();
	});
</script>

{#if type === 'number'}
	<input
		type="number"
		{min}
		{max}
		{name}
		bind:value={numberVal}
		{placeholder}
		{required}
		bind:this={input}
	/>
{:else if type === 'text'}
	<input type="text" {name} bind:value={stringVal} {placeholder} {required} bind:this={input} />
{:else if type === 'date'}
	<input type="date" {name} bind:value={stringVal} {placeholder} {required} bind:this={input} />
{/if}

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
