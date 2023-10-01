<script lang="ts">
	import * as db from '$lib/client/requests';
	import type { Player, Tournament } from '$lib/types/types.js';
	import Button from '$lib/components/base/Button.svelte';
	import AddParticipantForm from '$lib/components/forms/AddParticipantForm.svelte';
	import ParticipantsCreateTable from '$lib/components/tables/ParticipantsCreateTable.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { TournamentStage } from '$lib/types/tournamentTypes';
	import { invalidate } from '$app/navigation';

	export let stage: TournamentStage;
	export let tournament: Tournament;

	let participants = tournament.state.participants ?? [];
	$: numberParticipants = participants.length;
	
	$: tournament.state.participants = participants
	$: state = tournament.state;

	let participant: Player = {} as Player;
	
	const dispatch = createEventDispatcher();

	async function addParticipants() {
		await db.updateTournament(tournament.id, state).then(()=>{invalidate('tournament:update')}).catch((error) => {			console.error(error);
			dispatch('error', error);
		});
	}

	const nextStage = async function () {
		await addParticipants();
		stage = 'numberGroups';
	};
</script>

<div class="form-list-layout">
	<div class="form">
		{#await db.getAllPlayers() then allPlayers}
			<AddParticipantForm
				players={allPlayers}
				bind:player={participant}
				bind:participants={participants}
			/>
		{/await}
	</div>
	<div class="participants-list">
		<ParticipantsCreateTable bind:participant {participants} />
		<div class="line-2-elems">
			<span>{numberParticipants} participants in total</span>
			<div class="button">
				<Button on:click={() => nextStage()}>Continue</Button>
			</div>
		</div>
	</div>
</div>

<style>
	.form-list-layout {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 2fr;
	}
	.form {
		max-width: 350px;
		margin-right: 2rem;
	}
	.participants-list {
		max-width: 900px;
	}
	.line-2-elems {
		margin-top: 1rem;
		margin-left: auto;
		width: 30rem;
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 1rem;
	}

	span {
		margin: auto;
		font-weight: 500;
		font-size: var(--fontsize-large);
	}

	@media (max-width: 1100px) {
		.form-list-layout {
			display: block;
		}
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.participants-list {
			margin: 0 auto;
			overflow-x: hidden;
		}
		.line-2-elems {
			margin-left: 0;
			display: block;
		}
		.button {
			margin: 1rem 0;
			width: 10rem;
		}
	}
</style>
