<script lang="ts">
	// import { enhance } from '$app/forms';
	import { SortFilterMatchFormStore } from '$lib/formStores';
	import Button from '$lib/components/base/Button.svelte';

	import { createEventDispatcher } from 'svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import { changeDateAnotherFormat } from '$lib/helper';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';

	const dispatch = createEventDispatcher();

	let name = $SortFilterMatchFormStore.name;
	let score = $SortFilterMatchFormStore.score;
	let minDateString = $SortFilterMatchFormStore.minDateString;
	let maxDateString = $SortFilterMatchFormStore.maxDateString;
	let sortBy: 'date' = 'date' as const;
	let isDescending = true;

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
		<div class="last-box margin-top">
			<Button dark={false} disabled={false} type={'submit'}>Search</Button>
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

	.margin-top {
		margin-top: 1em;
	}
</style>
