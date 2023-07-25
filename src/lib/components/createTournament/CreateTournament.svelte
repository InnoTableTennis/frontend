<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import type { Tournament } from '$lib/types/types';
	import * as db from '$lib/requests';
	import { createEventDispatcher } from 'svelte';

	export let id: number;
	export let stage;

	const dispatch = createEventDispatcher();

	let tournament: Tournament = {} as Tournament;

	const nextStage = function () {
		stage = 'addParticipants';
	};

	async function requestTournament() {
		await db
			.getTournament(id)
			.then((result) => {
				tournament = result.data;
			})
			.catch((error) => {
				dispatch('error', error);
			});
	}
</script>

{#await requestTournament() then}
	<div class="center">
		<div class="content">
			<h1>{tournament.title}</h1>
			<p>{tournament.startDateString} - {tournament.endDateString}</p>
			<div class="button">
				<Button on:click={() => nextStage()}>Create tournament</Button>
			</div>
		</div>
	</div>
{/await}

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
