<script lang="ts">
	// import { enhance } from '$app/forms';
	import { SortFilterTournamentFormStore } from '$lib/formStores';
	import Button from '$lib/components/base/Button.svelte';
	import RadioGroup from '$lib/components/base/RadioGroup.svelte';
	import OrderButton from '$lib/components/base/OrderButton.svelte';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';

	import { createEventDispatcher } from 'svelte';
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

	let radioValues = ['date', 'players', 'kf'];
	let radioLabels = ['Sort by date', 'Sort by number of players', 'Sort by kf'];

	const sortTournament = function () {
		dispatch('update');
	};

	const saveForm = function () {
		$SortFilterTournamentFormStore = {
			title: title,
			minParticipants: minParticipants,
			maxParticipants: maxParticipants,
			startDateString: changeDateAnotherFormat(startDateString),
			endDateString: changeDateAnotherFormat(endDateString),
			descending: isDescending,
			sortBy: sortBy,
		};
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

	function updateRadioGroupValue(event: CustomEvent) {
		sortBy = event.detail.value;
		saveForm();
	}
</script>

<div class="line-2-elems">
	<h2>Filters</h2>
	<ResetButton onClick={resetForm} label="Reset" />
</div>

<form on:submit={sortTournament} on:change={saveForm} class="filters">
	<div class="column-1-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="title"
				isFirst={true}
				bind:stringVal={title}
				bind:defaultValue={title}
				placeholder="Search by title"
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="number"
				min="0"
				max="1000"
				name="minParticipants"
				bind:numberVal={minParticipants}
				bind:defaultNumValue={minParticipants}
				placeholder="Min participants"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="number"
				min="0"
				max="1000"
				name="maxParticipants"
				bind:numberVal={maxParticipants}
				bind:defaultNumValue={maxParticipants}
				placeholder="Max participants"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="date"
				name="startDateString"
				placeholder="Start date"
				bind:defaultValue={startDateString}
				bind:stringVal={startDateString}
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="date"
				name="endDateString"
				placeholder="End date"
				bind:defaultValue={endDateString}
				bind:stringVal={endDateString}
			/>
		</label>
	</div>
	<div class="line-2-elems">
		<div class="last-box full-width margin-top">
			<Button dark={false} disabled={false} type={'submit'}>Search</Button>
		</div>
	</div>

	<h2>Sort by</h2>

	<div class="column-3-elems">
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
		margin: 0 auto 1rem;
	}
	.column-1-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		align-items: end;
	}
	.line-2-elems {
		margin-top: 0.9rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem 0.44rem;
	}
	.column-3-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
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
