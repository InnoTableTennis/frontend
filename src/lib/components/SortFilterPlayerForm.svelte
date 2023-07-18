<script lang="ts">
	// import { enhance } from '$app/forms';
	import { get } from 'svelte/store';
	import { SortFilterPlayerFormStore } from '$lib/stores';
	import Button from '$lib/components/base/Button.svelte';
	import DescendingIcon from '$lib/components/icons/DescendingIcon.svelte';
	import AscendingIcon from '$lib/components/icons/AscendingIcon.svelte';
	import RadioGroup from '$lib/components/base/RadioGroup.svelte';

	import { createEventDispatcher, onMount } from 'svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';

	const dispatch = createEventDispatcher();

	let name = get(SortFilterPlayerFormStore).name;
	let telegramAlias = get(SortFilterPlayerFormStore).telegramAlias;
	let minRating = get(SortFilterPlayerFormStore).minRating;
	let maxRating = get(SortFilterPlayerFormStore).maxRating;
	let sortBy = 'rating';
	let isDescending = true;
	let firstInput: HTMLInputElement;

	let radioValues = ['rating', 'name'];
	let radioLabels = ['Sort by rating', 'Sort by name'];

	const sortPlayer = () => {
		dispatch('update');
	};

	const saveForm = function () {
		const sortby: 'name' | 'rating' = sortBy === 'name' ? 'name' : 'rating';
		SortFilterPlayerFormStore.set({
			name: name,
			telegramAlias: telegramAlias,
			minRating: minRating,
			maxRating: maxRating,
			descending: isDescending,
			sortBy: sortby,
		});
	};

	const resetForm = function () {
		name = '';
		telegramAlias = '';
		minRating = '';
		maxRating = '';
		sortBy = 'rating';
		isDescending = true;
		saveForm();
	};

	function updateValue(event: CustomEvent) {
		sortBy = event.detail.value;
		saveForm();
	}

	onMount(() => {
		firstInput.focus();
	});
</script>

<div class="line-2-elems">
	<h2>Filters</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={sortPlayer} on:change={saveForm}>
	<div class="column-2-elems">
		<label>
			<input
				name="name"
				bind:value={name}
				bind:this={firstInput}
				autocomplete="off"
				placeholder="Search by name"
				class="full-width"
			/>
		</label>
		<label>
			<input
				name="telegramAlias"
				bind:value={telegramAlias}
				autocomplete="off"
				placeholder="Search by alias"
				class="full-width"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="minRating"
				bind:value={minRating}
				autocomplete="off"
				placeholder="Min rating"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="maxRating"
				bind:value={maxRating}
				autocomplete="off"
				placeholder="Max rating"
				class="full-width"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={false} type={'submit'}>Search</Button>
		</div>
	</div>
</form>

<h2>Sort by</h2>

<form on:submit={sortPlayer} on:change={saveForm}>
	<div class="column-2-elems">
		<RadioGroup group={sortBy} values={radioValues} labels={radioLabels} on:update={updateValue} />
	</div>
	<div class="line-2-elems">
		<label class="sorting-order" id="sorting-order-descending">
			<input
				type="radio"
				id="descending"
				name="sorting-order"
				bind:group={isDescending}
				value={true}
			/>
			<DescendingIcon disabled={!isDescending} />
		</label>
		<label class="sorting-order">
			<input
				type="radio"
				id="ascending"
				name="sorting-order"
				bind:group={isDescending}
				value={false}
			/>
			<AscendingIcon disabled={isDescending} />
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={false} type={'submit'}>Sort</Button>
		</div>
	</div>
</form>

<style>
	h2 {
		text-transform: uppercase;
		font-size: var(--fontsize-medium1);
		margin: 1.5em 0;
		font-weight: var(--fontweight-1);
		color: var(--title-color);
	}

	form {
		max-width: 800px;
		margin: 0 auto 3em;
		font-size: var(--fontsize-medium2);
	}
	.column-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.25rem;
		align-items: end;
	}
	.line-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
		align-items: end;
	}

	input {
		box-sizing: border-box;
		border: none;
		border-bottom: 5px solid var(--secondary-bg-color);
		padding: 0.8em 0;
		color: var(--not-chosen-font-color);
		background-color: var(--main-color);
		transition: 0.2s linear;
	}
	input:focus {
		outline: none;
		color: var(--content-color);
		border-bottom: 5px solid var(--secondary-color);
	}
	#sorting-order-descending {
		display: flex;
		justify-content: end;
	}
	.sorting-order input {
		position: fixed;
		opacity: 0;
		pointer-events: none;
	}
	.last-box {
		grid-column: 2;
	}
	.full-width {
		width: 100%;
	}

	.margin-top {
		margin-top: 1em;
	}
</style>
