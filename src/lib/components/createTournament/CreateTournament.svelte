<script lang="ts">
	import Button from "$lib/components/base/Button.svelte";
	import type { Tournament } from "$lib/types/types";

    export let tournament: Tournament;
    export let stage: 'create' | 'addParticipants' | 'numberGroups' | 'groups' | 'continue' | 'numberFinals' | 'finalsDistribution' | 'secondStage';

	const nextStage = function () {
		stage = 'addParticipants';
	};
</script>


<div class="center">
	<div class="content">
		<h1>{tournament.title}</h1>
		<p>{tournament.startDateString} - {tournament.endDateString}</p>
		<div class="button">
			<Button on:click={() => nextStage()}>
				Create tournament
			</Button>
		</div>
	</div>
</div>


<style>
    .center {
		display: flex;
		height: 90vh;
	}
	.content {
		margin: auto;
		width: 30rem;
		height: 11rem;
		text-align: center;
	}
	.button {
		margin: auto;
		margin-top: 3rem;
		width: 18rem;
		height: 2.75rem;
	}

	h1 {
		font-size: var(--fontsize-x-large);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.3125rem;
	}
	p {
		margin-top: 1rem;
		font-size: var(--fontsize-large);
		font-weight: 500;
		letter-spacing: 0.09375rem;
	}
</style>
