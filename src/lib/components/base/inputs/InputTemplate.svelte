<script lang="ts">
	import { onMount } from 'svelte';

	export let type: string;
	export let name: string;
	export let placeholder: string;

	export let defaultValue = '';
	export let defaultNumValue: number | string = 0;
	export let required = false;
	export let isFirst = false;

	export let min = '0';
	export let max = '10';

	export let stringVal = '';
	export let numberVal: number | string = 0;

	export let textAlignCenter = false;

	export const reset = () => {
		stringVal = defaultValue;
		numberVal = defaultNumValue;
	};

	$: stringVal = defaultValue;
	$: numberVal = defaultNumValue;

	let input: HTMLInputElement;

	onMount(() => {
		if (isFirst) input.focus();
	});

	$: isEmpty = stringVal == '' ? true : false;
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
		class:text-center={textAlignCenter}
	/>
{:else if type === 'text'}
	<input type="text" {name} bind:value={stringVal} {placeholder} {required} bind:this={input} class:text-center={textAlignCenter} />
{:else if type === 'date'}
	<div class="date-container">
		<input type="text" {placeholder} />
		<input
			type="date"
			{name}
			bind:value={stringVal}
			{placeholder}
			{required}
			bind:this={input}
			class="date"
			class:isEmpty
			class:text-center={textAlignCenter}
		/>
	</div>
{/if}

<style>
	input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: none;
		border-bottom: 5px solid var(--secondary-bg-color);
		padding: 0.5em 0;
		color: var(--not-chosen-font-color);
		background-color: var(--main-color);
		font-size: var(--fontsize-medium1);
		transition: 0.2s linear;
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
	.date-container {
		height: 2.8rem;
	}
	.date {
		position: relative;
		top: -2.8rem;
	}
	.isEmpty {
		opacity: 0;
	}
	.date:focus {
		opacity: 1;
	}
	.text-center {
		text-align: center;
	}
</style>
