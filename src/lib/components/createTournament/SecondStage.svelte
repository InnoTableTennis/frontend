<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import RestartIcon from '$lib/components/icons/RestartIcon.svelte';
	import { stringifyNumber } from '$lib/helper';
	import type {Player, Tournament} from "$lib/types/types";
	import * as db from "$lib/requests";
	import {createEventDispatcher} from "svelte";
	import TournamentGroup from "$lib/components/tournamentConstructor/TournamentGroup.svelte";
	import {goto} from '$app/navigation'

	const dispatch = createEventDispatcher();

	export let stage;
	export let id: number;
	export let numberFinals = 0;

	let chosenId = 0;
	let tournament: Tournament = {} as Tournament;
	let finalResults: Player[][] = new Array(numberFinals).fill(null);
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

	const changeNumberFinals = function () {
		stage = 'numberFinals';
	};
	const finish = async function () {
		tournament.state.participants = [];
		for (let i = 0; i < numberFinals; i++) {
			for (let j = 0; j < finalResults[i].length; j++) {
				if (finalResults[i][j]) {
					tournament.state.participants.push(finalResults[i][j]);
				}
			}
		}
		await db.updateTournament(id, tournament.state).catch((error) => {
			dispatch('error', error);
		});
		await requestTournament();
		await db.finishTournament(id.toString()).catch((error) => {
			dispatch('error', error);
		});
		goto(`/tournaments/${tournament.id}`);
	};

	const countGroups = async function () {
		await requestTournament();
	};
	async function updateTournament(e: CustomEvent) {
		let newGroup = e.detail;
		if (tournament.state.secondStage) {
			tournament.state.secondStage[e.detail] = newGroup;
		}
		await db.updateTournament(id, tournament.state).catch((error) => {
			dispatch('error', error);
		});
		await requestTournament();
		tournament.state.secondStage
	}
	async function updatePlaces(e: CustomEvent, id:number) {
		let players = e.detail;
		finalResults[id] = new Array(players.length).fill(null);
		for (let i = 0; i < players.length; i++) {
			finalResults[id][i] = players[i];
		}
	}
	requestTournament();
</script>

{#await countGroups() then}
	<h1>Second stage</h1>

	<div class="menu-layout">
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
		<div class="final-button-block">
			{#each tournament.state.secondStage as _, i}
				<button
						class="final-button"
						class:selected={chosenId === i}
						on:click|preventDefault={() => {
					chosenId = i;
				}}
				>
					{stringifyNumber(i + 1)
							.charAt(0)
							.toUpperCase() + stringifyNumber(i + 1).slice(1)} final
				</button>
			{/each}
		</div>
		{#if tournament.state.secondStage}
			<TournamentGroup groupInfo={tournament.state.secondStage[chosenId]} on:update={updateTournament}
							 on:finalize={(event) => {updatePlaces(event, chosenId)}} >{stringifyNumber(chosenId + 1)
					.charAt(0).toUpperCase() + stringifyNumber(chosenId + 1).slice(1)} final</TournamentGroup>
		{/if}
		<div class="pre-render-group-block">
			{#each tournament.state.secondStage as _, i}
				{#if tournament.state.secondStage}
						<TournamentGroup groupInfo={tournament.state.secondStage[i]} on:finalize={(event) => {updatePlaces(event, i)}}></TournamentGroup>
				{/if}
			{/each}
		</div>
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
		position: relative;
		margin-top: 1.2rem;
		gap: 1rem;
		overflow-x: scroll;
		justify-content: space-between;
	}
	.final-button-block {
		display: flex;
		justify-content: space-between;
	}
	.final-button {
		margin: 1rem auto;
	}
	.finals::-webkit-scrollbar {
		display: none;
	}
	.pre-render-group-block {
		display: none;
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
		margin: 1rem 0;
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
