<script lang="ts">
	// import { enhance } from '$app/forms';
	import { SortFilterMatchFormStore } from '$lib/formStores';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher } from 'svelte';
	import RadioGroup from '$lib/components/base/RadioGroup.svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import { changeDateAnotherFormat } from '$lib/helper';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import OrderButton from '$lib/components/base/OrderButton.svelte';

	const dispatch = createEventDispatcher();

	let name = $SortFilterMatchFormStore.name;
	let score = $SortFilterMatchFormStore.score;
	let minDateString = $SortFilterMatchFormStore.minDateString;
	let maxDateString = $SortFilterMatchFormStore.maxDateString;
	let sortBy: 'date' = 'date' as const;
	let isDescending = true;

	let radioValues = ['date'];
	let radioLabels = ['Sort by date'];

	const sortMatch = () => {
		dispatch('update');
	};

	const saveForm = function () {
		score = score.replace(/\s/g, '');
		$SortFilterMatchFormStore = {
			name: name,
			score: score,
			minDateString: changeDateAnotherFormat(minDateString),
			maxDateString: changeDateAnotherFormat(maxDateString),
			descending: isDescending,
			sortBy: sortBy,
		};
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

	function updateRadioGroupValue(event: CustomEvent) {
		sortBy = event.detail.value;
		saveForm();
	}
</script>

<div class="line-2-elems">
	<h2>Filters</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={sortMatch} on:change={saveForm} class="filters">
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="name"
				isFirst={true}
				bind:stringVal={name}
				bind:defaultValue={name}
				placeholder="Search by player"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="score"
				bind:stringVal={score}
				bind:defaultValue={score}
				placeholder="Search by score"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="date"
				name="minDateString"
				placeholder="Min date"
				bind:defaultValue={minDateString}
				bind:stringVal={minDateString}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="date"
				name="maxDateString"
				placeholder="Max date"
				bind:defaultValue={maxDateString}
				bind:stringVal={maxDateString}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box margin-top">
			<Button dark={false} disabled={false} type={'submit'}>Search</Button>
		</div>
	</div>

	<h2>Sort by</h2>
	
	<div class="column-1-elems">
		<RadioGroup
			group={sortBy}
			values={radioValues}
			labels={radioLabels}
			on:update={updateRadioGroupValue}
		/>
	</div>
	<OrderButton bind:value={isDescending} />
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={false} type={'submit'}>Sort</Button>
		</div>
	</div>
</form>

<style>
	h2 {
		font-size: var(--fontsize-large);
		margin: 0.9em 0;
		font-weight: var(--fontweight-1);
		color: var(--title-color);
	}

	form {
		max-width: 800px;
		font-size: var(--fontsize-medium1);
	}
	.filters {
		margin: 0 auto 1em;
	}
	.column-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		align-items: end;
	}
	.column-1-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		align-items: end;
	}
	.line-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.44rem;
		align-items: end;
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
