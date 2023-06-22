<script>
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let options;
	export let name;
	export let placeholder;
	export let defaultValue = '';
	export let isFirstInput = false;

	export const reset = () => {
		inputVal = defaultValue;
		selectedOption = '';
		filteredOptions = options;
	};

	let filteredOptions = [];
	let selectedOption = '';
	let isVisible = false;
	let selectedIndex = -1;
	let unorderedList;
	let inputVal = '';

	let input;

	$: {
		inputVal = defaultValue;
		filteredOptions = options;
		dispatch('select', defaultValue);
	}

	function handleInput(event) {
		inputVal = event.target.value;

		filteredOptions = options.filter(
			(option) =>
				option.toLowerCase().includes(inputVal.toLocaleLowerCase()) &&
				option.toLowerCase() != inputVal.toLocaleLowerCase()
		);

		selectedOption = '';
	}

	function handleSelect(event) {
		selectedOption = event.target.textContent.trim();
		inputVal = selectedOption;
		dispatch('select', selectedOption);
	}

	function handleKeyDown(event) {
		const lastIndex = filteredOptions.length - 1;

		if (event.key === 'ArrowUp' && selectedIndex > 0) {
			event.preventDefault();
			selectedIndex--;

			if (unorderedList)
				[...unorderedList.childNodes]
					.filter((node) => node.nodeType === Node.ELEMENT_NODE)
					[selectedIndex].focus();
			return;
		} else if (event.key === 'ArrowDown' && selectedIndex < lastIndex) {
			event.preventDefault();
			selectedIndex++;

			if (unorderedList)
				[...unorderedList.childNodes]
					.filter((node) => node.nodeType === Node.ELEMENT_NODE)
					[selectedIndex].focus();
			return;
		} else if (event.key === 'Enter') {
			selectedOption = filteredOptions[selectedIndex];
			if (selectedOption) inputVal = selectedOption;
			else selectedOption = inputVal;
			dispatch('select', selectedOption);
			selectedIndex = -1;
			document.activeElement.blur();
			event.preventDefault();
			filteredOptions = [];
			return;
		}
	}

	function showOptions() {
		isVisible = true;
		selectedIndex = -1;
	}
	function hideOptions(event) {
		if (!event.target.closest('.component-wrapper')) {
			isVisible = false;
		}
	}

	onMount(() => {
		if (isFirstInput) input.focus();

		window.addEventListener('click', hideOptions);

		return () => {
			window.removeEventListener('click', hideOptions);
		};
	});
</script>

<div class="component-wrapper">
	<input
		type="text"
		on:input={handleInput}
		bind:this={input}
		list="options"
		on:focus={showOptions}
		value={inputVal}
		required
		{name}
		{placeholder}
		autocomplete="off"
		on:keydown={(e) => handleKeyDown(e)}
	/>
	<!-- {#if !('list' in document.createElement('input'))} -->
	{#if isVisible}
		<ul bind:this={unorderedList}>
			{#each filteredOptions as option, index}
				{#if option.indexOf(selectedOption) !== -1}
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<li on:click={handleSelect} tabindex="0" on:keydown={(e) => handleKeyDown(e)}>
						{option}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
	<!-- <datalist id="options">
		{#each options as option}
			<option value={option} />
		{/each}
	</datalist> -->
</div>

<style>
	ul {
		position: absolute;
		width: 100%;
		background-color: rgb(43, 43, 50);
		list-style-type: none;
		margin: 0;
		padding: 0;
		max-height: 100px;
		overflow-y: auto;
		box-sizing: border-box;
		border: 0.01em solid #7a7989;
		font-size: 0.8em;
		z-index: 10;
	}
	li {
		padding: 4px;
		cursor: pointer;
	}
	li:hover {
		background-color: #65666f;
	}
	li:focus {
		background-color: #728cd4;
	}
	div,
	input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	div {
		position: relative;
	}

	input {
		box-sizing: border-box;
		border: none;
		padding: 0.8em 1em;
		border-radius: 10px;
		transition: 0.1s;
	}
	input:focus {
		outline: solid #c4d6b0;
	}
</style>
