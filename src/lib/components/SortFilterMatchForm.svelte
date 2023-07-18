<script lang="ts">
	// import { enhance } from '$app/forms';
	import { SortFilterMatchFormStore } from '$lib/stores';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import RadioGroup from '$lib/components/base/RadioGroup.svelte';
	import AscendingIcon from '$lib/components/icons/AscendingIcon.svelte';
	import DescendingIcon from '$lib/components/icons/DescendingIcon.svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import { changeDateAnotherFormat } from '$lib/helper';

	const dispatch = createEventDispatcher();

	let name = get(SortFilterMatchFormStore).name;
	let score = get(SortFilterMatchFormStore).score;
	let minDateString = get(SortFilterMatchFormStore).minDateString;
	let maxDateString = get(SortFilterMatchFormStore).maxDateString;
	let sortBy = 'date';
	let isDescending = true;
	let firstInput: HTMLInputElement;

	let radioValues = ['date'];
	let radioLabels = ['Sort by date'];

	const sortMatch = () => {
		dispatch('update');
	};

	const saveForm = function () {
		score = score.replace(/\s/g, '');
		const sortby: 'date' = 'date' as const;
		SortFilterMatchFormStore.set({
			name: name,
			score: score,
			minDateString: changeDateAnotherFormat(minDateString),
			maxDateString: changeDateAnotherFormat(maxDateString),
			descending: isDescending,
			sortBy: sortby,
		});
	};

	const resetForm = function () {
		name = '';
		score = '';
		minDateString = '';
		maxDateString = '';
		sortBy = 'date';
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

<form on:submit={sortMatch} on:change={saveForm}>
	<div class="column-2-elems">
		<label>
			<input
				name="name"
				bind:value={name}
				bind:this={firstInput}
				autocomplete="off"
				placeholder="Search by player"
				class="full-width"
			/>
		</label>
		<label>
			<input
				name="score"
				bind:value={score}
				autocomplete="off"
				placeholder="Search by score"
				class="full-width"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<label>
			<input
				type="date"
				name="minDateString"
				bind:value={minDateString}
				autocomplete="off"
				placeholder="Min date"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="date"
				name="maxDateString"
				bind:value={maxDateString}
				placeholder="Max date"
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

<form on:submit={sortMatch} on:change={saveForm}>
	<div class="column-1-elems">
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
	.column-1-elems {
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
		transition: 0.1s;
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
