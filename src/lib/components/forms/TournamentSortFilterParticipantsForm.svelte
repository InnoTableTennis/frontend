<script lang="ts">
	// import { enhance } from '$app/forms';
	import { TournamentSortFilterParticpantsFormStore } from '$lib/tournamentStores';
	import Button from '$lib/components/base/Button.svelte';
	import RadioGroup from '$lib/components/base/RadioGroup.svelte';
	import OrderButton from '$lib/components/base/OrderButton.svelte';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';

	import { createEventDispatcher } from 'svelte';
	import ResetButton from '$lib/components/base/ResetButton.svelte';

	const dispatch = createEventDispatcher();

	let name = $TournamentSortFilterParticpantsFormStore.name;
	let telegramAlias = $TournamentSortFilterParticpantsFormStore.telegramAlias;
	let minRating = $TournamentSortFilterParticpantsFormStore.minRating;
	let maxRating = $TournamentSortFilterParticpantsFormStore.maxRating;
	let sortBy: 'rating' | 'place' | 'delta' = 'place';
	let isDescending = true;

	let radioValues = ['place', 'rating', 'delta'];
	let radioLabels = ['Sort by place', 'Sort by rating', 'Sort by delta'];

	const sortTournament = function () {
		dispatch('update');
	};

	const saveForm = function () {
		$TournamentSortFilterParticpantsFormStore = {
			name: name,
			telegramAlias: telegramAlias,
			minRating: minRating,
			maxRating: maxRating,
			descending: isDescending,
			sortBy: sortBy,
		};
	};

	const resetForm = function () {
		name = '';
		telegramAlias = '';
		minRating = '';
		maxRating = '';
		sortBy = 'place';
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

<form on:submit|preventDefault={sortTournament} on:change={saveForm} class="filters">
	<div class="column-2-elems">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="name"
				isFirst={true}
				bind:stringVal={name}
				bind:defaultValue={name}
				placeholder="Search by name"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="text"
				name="telegramAlias"
				bind:stringVal={telegramAlias}
				bind:defaultValue={telegramAlias}
				placeholder="Search by alias"
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
				name="minRating"
				bind:numberVal={minRating}
				bind:defaultNumValue={minRating}
				placeholder="Min rating"
			/>
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<InputTemplate
				type="number"
				min="0"
				max="1000"
				name="maxRating"
				bind:numberVal={maxRating}
				bind:defaultNumValue={maxRating}
				placeholder="Max rating"
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

<form on:submit|preventDefault={sortTournament} on:change={saveForm}>
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
	.column-2-elems {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 0.9rem;
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
