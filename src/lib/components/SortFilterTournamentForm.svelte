<script lang="ts">
	// import { enhance } from '$app/forms';
	import { SortFilterTournamentFormStore } from '$lib/formStores';
	import Button from '$lib/components/base/Button.svelte';
	import RadioGroup from '$lib/components/base/RadioGroup.svelte';
	import AscendingIcon from '$lib/components/icons/AscendingIcon.svelte';
	import DescendingIcon from '$lib/components/icons/DescendingIcon.svelte';

	import { createEventDispatcher, onMount } from 'svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';
	import { changeDateAnotherFormat } from '$lib/helper';

	const dispatch = createEventDispatcher();

	let title = $SortFilterTournamentFormStore.title;
	let minParticipants = $SortFilterTournamentFormStore.minParticipants;
	let maxParticipants = $SortFilterTournamentFormStore.maxParticipants;
	let startDateString = $SortFilterTournamentFormStore.startDateString;
	let endDateString = $SortFilterTournamentFormStore.endDateString;
	let sortBy: 'date' | 'kf' | 'players' = 'date';
	let isDescending = true;
	let firstInput: HTMLInputElement;

	let radioValues = ['date', 'players', 'kf'];
	let radioLabels = ['Sort by date', 'Sort by number of players', 'Sort by kf'];

	const sortTournament = function () {
		dispatch('update');
	};

	const saveForm = function () {
		SortFilterTournamentFormStore.set({
			title: title,
			minParticipants: minParticipants,
			maxParticipants: maxParticipants,
			startDateString: changeDateAnotherFormat(startDateString),
			endDateString: changeDateAnotherFormat(endDateString),
			descending: isDescending,
			sortBy: sortBy,
		});
	};

	const resetForm = function () {
		title = '';
		minParticipants = '';
		maxParticipants = '';
		startDateString = '';
		endDateString = '';
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

<form on:submit={sortTournament} on:change={saveForm} class="filters">
	<div class="column-1-elems">
		<label>
			<input
				name="title"
				bind:value={title}
				bind:this={firstInput}
				autocomplete="off"
				placeholder="Search by title"
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
				name="minParticipants"
				bind:value={minParticipants}
				autocomplete="off"
				placeholder="Min participants"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="number"
				min="0"
				max="1000"
				name="maxParticipants"
				bind:value={maxParticipants}
				autocomplete="off"
				placeholder="Max participants"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="date"
				name="startDateString"
				bind:value={startDateString}
				placeholder="YYYY-MM-DD"
				autocomplete="off"
				class="full-width"
			/>
		</label>
		<label>
			<input
				type="date"
				name="endDateString"
				bind:value={endDateString}
				placeholder="End date"
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

<form on:submit={sortTournament} on:change={saveForm}>
	<div class="column-3-elems">
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
		font-size: var(--fontsize-large);
		margin: 0.9em 0;
		font-weight: var(--fontweight-2);
		color: var(--title-color);
	}

	form {
		max-width: 800px;
		font-size: var(--fontsize-medium2);
	}
	.filters {
		margin: 0 auto 3em;
	}
	.column-1-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.25rem;
		align-items: end;
	}
	.line-2-elems {
		margin-top: 0.9rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}
	.column-3-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
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
		display: none;
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
