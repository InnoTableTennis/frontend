<script lang="ts">
	import * as db from '$lib/client/requests';
	import type { Player, Tournament } from '$lib/types/types.js';
	import Button from '$lib/components/base/Button.svelte';
	import AddParticipantForm from '$lib/components/forms/AddParticipantForm.svelte';
	import ParticipantsCreateTable from '$lib/components/tables/ParticipantsCreateTable.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { TournamentStage, TournamentState } from '$lib/types/tournamentTypes';

	export let stage: TournamentStage;
	export let tournament: Tournament;

	let numberParticipants = 0;
	let participants: Player[] = [];
	let participant: Player = {} as Player;
	let state: TournamentState | null = null;

	const dispatch = createEventDispatcher();

	async function getFormData() {
		const players = await db.getAllPlayers();
		return players;
	}

	async function addParticipants() {
		await db.updateTournament(tournament.id, state).catch((error) => {
			dispatch('error', error);
		});
	}

	const nextStage = async function () {
		state = {
			participants: participants,
			firstStage: tournament.state
				? tournament.state.firstStage
					? tournament.state.firstStage
					: null
				: null,
			secondStage: tournament.state
				? tournament.state.secondStage
					? tournament.state.secondStage
					: null
				: null,
		};
		await addParticipants();
		stage = 'numberGroups';
	};
</script>

	{#await getFormData() then resp}
		<div class="form-list-layout">
			<div class="form">
				<AddParticipantForm
					players={resp.players}
					bind:player={participant}
					bind:participants
					bind:numberParticipants
				/>
			</div>
			<div class="participants-list">
				<ParticipantsCreateTable bind:participant bind:participants />
				<div class="line-2-elems">
					<span>{numberParticipants} participants in total</span>
					<div class="button">
						<Button on:click={() => nextStage()}>Continue</Button>
					</div>
				</div>
			</div>
		</div>
	{/await}

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
