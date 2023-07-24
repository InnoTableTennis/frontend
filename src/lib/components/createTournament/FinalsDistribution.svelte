<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import FinalsDistributor from '$lib/components/createTournament/FinalsDistributor.svelte';
	import BackArrowButton from '$lib/components/base/BackArrowButton.svelte';

	export let numberFinals = 0;
	export let numberGroups = 0;
	export let numberParticipants = 0;
	export let stage;

	function back() {
		stage = 'numberFinals';
	}
</script>

<BackArrowButton action={back} />

<div class="content">
	<h1>How many finals do you want?</h1>
	<div class="numberFinals">
		{numberFinals}
	</div>
	<div class="distribution">
		<h1>Distribute places between finals</h1>
		<div class="distributor">
			<FinalsDistributor bind:numberGroups bind:numberParticipants bind:numberFinals />
		</div>
		<div class="button">
			<Button type="button" on:click={() => (stage = 'secondStage')}>Confirm</Button>
		</div>
	</div>
</div>

<style>
	.content {
		margin: auto;
		margin-top: 6.25rem;
		width: 64rem;
		text-align: center;
	}
	.distribution {
		margin-top: 4rem;
	}
	.distributor {
		margin-top: 2rem;
	}
	.numberFinals {
		margin: auto;
		margin-top: 2rem;
		max-width: 4rem;
		height: 2rem;
		border-bottom: 4px solid var(--secondary-bg-color, #de9b8a);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: var(--fontsize-medium1);
	}
	.button {
		width: 9rem;
		height: 2.5rem;
		margin: 2rem auto;
	}

	h1 {
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.09375rem;
	}

	@media (max-width: 1100px) {
		.content {
			margin: auto;
			margin-top: 6.25rem;
			width: 35rem;
			text-align: center;
		}
		.distributor {
			width: 30rem;
			margin: 0 auto;
		}
	}
</style>
