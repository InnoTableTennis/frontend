<script lang="ts">
	import * as db from '$lib/requests';
	import { createEventDispatcher } from 'svelte';
	import type { Tournament } from '$lib/types/types';
	import Button from '$lib/components/base/Button.svelte';
	import RestartIcon from '$lib/components/icons/RestartIcon.svelte';
	import TournamentGroup from '../tournamentConstructor/TournamentGroup.svelte';

	export let stage;
	export let id: number;

	const dispatch = createEventDispatcher();
	
	let numberParticipants = 0;
	let numberGroups: number | undefined = 0;
	let tournament: Tournament = {} as Tournament;

	async function requestTournament() {
		await db
			.getTournament(id)
			.then((result) => {
				tournament = result.data;
				numberParticipants = tournament.state.participants.length;
				numberGroups = tournament.state.firstStage?.length;
				console.log(tournament);
			})
			.catch((error) => {
				dispatch('error', error);
			});
	}
	
	const changeParticipants = function () {
		stage = 'addParticipants';
	};
	const changeNumberGroups = function () {
		stage = 'numberGroups';
	};
	const nextStage = function () {
		stage = 'continue';
	};
</script>

{#await requestTournament() then}
	<div class="groups-layout">
		<div class="form">
			<h1>Next games</h1>
			<h1>Settings</h1>
			<span class="setting-line">
				Participants - {numberParticipants}
				<button on:click={() => changeParticipants()} class="restart-button">
					<RestartIcon />
				</button>
			</span>
			<span class="setting-line">
				Groups - {numberGroups}
				<button on:click={() => changeNumberGroups()} class="restart-button">
					<RestartIcon />
				</button>
			</span>
			<span class="setting-line">Finish the group stage of the tournament</span>
			<div class="finish-button">
				<Button type="button" on:click={() => nextStage()}>Finish</Button>
			</div>
		</div>
		<div class="tables">
			{#if tournament.state}
				{#if tournament.state.firstStage}
					{#each tournament.state.firstStage as group}
						<TournamentGroup groupInfo={group}>Group {group.id}</TournamentGroup>
					{/each}
				{/if}
			{/if}
		</div>
	</div>
{/await}

<style>
	.groups-layout {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		grid-template-columns: 1fr 1.5fr;
	}
	.form {
		max-width: 35rem;
	}
	.tables {
		max-width: 90rem;
	}
	h1 {
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.09375rem;
	}
	.setting-line {
		margin-top: 1rem;
		display: flex;
		align-items: center;
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
		width: 9rem;
		height: 2.75rem;
		margin: auto;
		margin-top: 2rem;
	}

	@media (max-width: 1100px) {
		.groups-layout {
			display: block;
		}
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.tables {
			margin: 0 auto;
		}
	}
</style>
