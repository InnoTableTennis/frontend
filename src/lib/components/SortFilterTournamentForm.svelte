<script lang="ts">
	// import { enhance } from '$app/forms';
	import { get } from 'svelte/store';
	import { SortFilterTournamentFormStore } from '$lib/stores';
	import Button from '$lib/components/base/Button.svelte';
	import RadioGroup from './base/RadioGroup.svelte';
	import AscendingIcon from './icons/AscendingIcon.svelte';
	import DescendingIcon from './icons/DescendingIcon.svelte';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let title = get(SortFilterTournamentFormStore).title;
	let minParticipants = get(SortFilterTournamentFormStore).minParticipants;
	let maxParticipants = get(SortFilterTournamentFormStore).maxParticipants;
	let startDateString = get(SortFilterTournamentFormStore).startDateString;
	let endDateString = get(SortFilterTournamentFormStore).endDateString;
	let sortBy = 'date';
	let isDescending = true;
	let firstInput: HTMLInputElement;

	let radioValues = ['date', 'numberOfPlayers', 'kf'];
	let radioLabels = ['Sort by date', 'Sort by number of players', 'Sort by kf'];

	let isSubmissionDisabled = true;

	$: {
		isSubmissionDisabled = !(
			title ||
			!isNaN(parseInt(minParticipants)) ||
			!isNaN(parseInt(maxParticipants)) ||
			startDateString ||
			endDateString
		);
	}

	const sortTournament = function () {
		dispatch('update');
	};

	const saveForm = function () {
		console.log(maxParticipants);
		const sortby: 'date' | 'kf' | 'numberOfPlayers' =
			sortBy === 'date' ? 'date' : sortBy === 'kf' ? 'kf' : 'numberOfPlayers';
		SortFilterTournamentFormStore.set({
			title: title,
			minParticipants: minParticipants,
			maxParticipants: maxParticipants,
			startDateString: startDateString,
			endDateString: endDateString,
			descending: isDescending,
			sortBy: sortby,
		});
	};

	function updateValue(event: CustomEvent) {
		// TO DO: make event type
		sortBy = event.detail.value;
		saveForm();
	}

	onMount(() => {
		firstInput.focus();
	});
</script>

<h2>Filters</h2>

<form on:submit={sortTournament} on:change={saveForm}>
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
				autocomplete="off"
				placeholder="Start date"
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
			<Button dark={false} disabled={isSubmissionDisabled} type={'submit'}>Search</Button>
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
		border-bottom: 5px solid var(--tertiary-color);
		padding: 0.8em 1em;
		color: var(--tertiary-font-color);
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
