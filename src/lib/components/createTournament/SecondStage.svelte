<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import RestartIcon from '$lib/components/icons/RestartIcon.svelte';
	import { stringifyNumber } from '$lib/helper';

	export let stage;
	export let numberFinals = 0;
	// export let finals: Player[][] = [];
	export let games = [
		'Bogdankov M. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Abdukhamidov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
		'Bogdankov N. - Iskhakov A.',
	];

	let finals: number[][] = [];
	let completed = false;
	let chosenId = 0;

	const changeNumberFinals = function () {
		stage = 'numberFinals';
	};
	const finish = function () {
		console.log('You finished');
	};

	const countGroups = function () {
		for (let i = 0; i < numberFinals; i++) {
			finals.push([]);
		}
	};
</script>

{#await countGroups() then}
	<h1>Second stage</h1>

	<div class="menu-layout">
		<div class="next-games">
			<h2>Next games</h2>
			<div class="games-block">
				{#each games as game}
					<div class="game-line" class:disabled={completed}>
						{game}
					</div>
				{/each}
			</div>
		</div>
		<div class="settings">
			<h2>Settings</h2>
			<span class="setting-line">
				Finals - {numberFinals}
				<button on:click={() => changeNumberFinals()} class="restart-button">
					<RestartIcon />
				</button>
			</span>
			<span class="setting-line">Finish the tournament</span>
			<div class="finish-button">
				<Button type="button" on:click={() => finish()}>Finish</Button>
			</div>
		</div>
	</div>

	<div class="finals">
		// TODO: replace each finals, because final is not used. Lint shows warning
		{#each finals as final, i}
			<button
				class="final-button"
				class:selected={chosenId === i}
				on:click|preventDefault={() => {
					chosenId = i;
					final;
				}}
			>
				{stringifyNumber(i + 1)
					.charAt(0)
					.toUpperCase() + stringifyNumber(i + 1).slice(1)} final
			</button>
		{/each}
	</div>
{/await}

<style>
	.menu-layout {
		padding: 1.2rem 0;
		border-top: 1px solid var(--not-chosen-font-color);
		border-bottom: 1px solid var(--not-chosen-font-color);
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.finals {
		margin-top: 1.2rem;
		display: flex;
		gap: 1rem;
		overflow-x: scroll;
	}
	.finals::-webkit-scrollbar {
		display: none;
	}
	.games-block {
		max-height: 10.25rem;
		overflow-y: scroll;
	}
	.games-block::-webkit-scrollbar {
		display: none;
	}
	.setting-line {
		margin-top: 1rem;
		display: flex;
		align-items: center;
	}
	.game-line {
		margin-bottom: 0.6rem;
		display: flex;
		align-items: center;
		font-size: var(--fontsize-medium2);
		color: var(--content-color);
	}
	.restart-button {
		background: none;
		border: none;
		cursor: pointer;
		margin-left: 1rem;
		padding: 0;
		height: 1.1rem;
		width: 1.1rem;
	}
	.finish-button {
		width: 12rem;
		height: 2.75rem;
		margin: auto;
		margin-top: 2rem;
	}
	.disabled {
		color: var(--not-chosen-font-color);
	}
	.final-button {
		background: none;
		border: none;
		cursor: pointer;
		width: 10rem;
		height: 2.5rem;
		flex-shrink: 0;
		border-radius: 0.9375rem;
		font-size: var(--fontsize-medium1);
		background: var(--secondary-bg-color);
		color: #fff;
	}
	.selected {
		background: var(--secondary-color);
	}

	h1 {
		margin: 1rem 0;
		font-size: var(--fontsize-x-large);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.125rem;
	}
	h2 {
		margin-bottom: 1.2rem;
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.09375rem;
	}

	@media (max-width: 1100px) {
		.menu-layout {
			display: block;
		}
		.settings {
			margin-top: 1rem;
		}
		.final-button {
			width: 7rem;
			height: 2.2rem;
			font-size: var(--fontsize-medium2);
		}
	}
</style>
