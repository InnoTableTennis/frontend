<script lang="ts">
	import { stringifyNumber } from '$lib/helper';
	import DropdownInput from '$lib/components/base/inputs/DropdownInput.svelte';

	export let numberFinals = 0;
	export let numberGroups = 0;
	export let numberParticipants = 0;

	let groups: number[] = [];
	let finals: number[][] = [];
	let chosenId: number[] = [];
	let types: string[] = [];

	let peopleInGroups = numberParticipants / numberGroups;
	let typeOptions: string[] = ['Finals', 'Groups'];

	const countGroups = function () {
		for (let i = 0; i < numberFinals; i++) {
			finals.push([]);
		}
		for (let i = 0; i < peopleInGroups; i++) {
			groups.push(i + 1);
		}
		for (let i = 0; i < peopleInGroups; i++) {
			chosenId.push(i + 1);
		}
		for (let i = 0; i < numberFinals; i++) {
			types.push(typeOptions[0]);
		}
	};

	function handleSelectType(event: CustomEvent, index: number) {
		types[index] = event.detail;
	}
</script>

{#await countGroups() then}
	<div class="content">
		// TODO: replace each finals, because final is not used. Lint shows warning
		{#each finals as final, i}
			<div
				class="separator"
				class:invisible={peopleInGroups <= 8 || numberFinals <= 1}
				class:invisible-small={peopleInGroups <= 4 || numberFinals <= 1}
			/>
			<div class="line">
				<h2>
					{stringifyNumber(i + 1)
						.charAt(0)
						.toUpperCase() + stringifyNumber(i + 1).slice(1)} final
				</h2>
				<div
					class="buttons"
					class:not-fit={peopleInGroups > 8}
					class:not-fit-small={peopleInGroups > 4}
				>
					{#each groups as j}
						<button
							class="button"
							class:selected={chosenId[j - 1] === i * peopleInGroups + j}
							on:click|preventDefault={() => {
								chosenId[j - 1] = i * peopleInGroups + j;
								final;
							}}
						>
							{j}
						</button>
					{/each}
				</div>
				<div class="input">
					<DropdownInput
						name="type"
						placeholder="Type"
						options={typeOptions}
						on:select={(event) => handleSelectType(event, i)}
						defaultValue={types[i]}
						bind:inputVal={types[i]}
					/>
				</div>
			</div>
		{/each}
	</div>
{/await}

<style>
	.content {
		margin-top: 2rem;
		width: 64rem;
	}
	.separator {
		margin-top: 1rem;
		height: 0.5px;
		background-color: var(--secondary-color);
	}
	.invisible {
		display: none;
	}
	.not-fit {
		justify-content: flex-start;
	}
	.line {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.input {
		width: 15rem;
	}
	.buttons {
		width: 30rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
	.button {
		background: none;
		border: none;
		min-width: 2.8125rem;
		height: 2.1875rem;
		border-radius: 0.625rem;
		font-size: var(--fontsize-medium1);
		font-weight: var(--fontweight-1);
		background-color: var(--secondary-bg-color);
		color: #fff;
	}
	.selected {
		background-color: var(--secondary-color);
	}

	h2 {
		width: 13rem;
		text-align: left;
		font-size: var(--fontsize-medium1);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.07813rem;
	}

	@media (max-width: 1100px) {
		.content {
			width: 30rem;
		}
		.separator {
			width: 30rem;
		}
		.invisible {
			display: block;
		}
		.invisible-small {
			display: none;
		}
		.not-fit-small {
			justify-content: flex-start;
		}
	}
</style>
