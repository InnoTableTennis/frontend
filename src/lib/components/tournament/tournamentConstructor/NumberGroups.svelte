<script lang="ts">
	import * as db from '$lib/requests';
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/base/Button.svelte';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import BackArrowButton from '$lib/components/base/BackArrowButton.svelte';
	import type { Group, Tournament, TournamentState } from '$lib/types/types';
	import { alertPopup } from '$lib/popupHandler';
	import type { Player, Tournament } from '$lib/types/types';
	import type { TournamentStage, TournamentState } from '$lib/types/tournamentTypes';

	export let stage: TournamentStage;
	export let id: number;

	const dispatch = createEventDispatcher();

	let numberGroups = 0;
	let tournament: Tournament = {} as Tournament;
	let groups: Group[] = [];

	async function addGroups(state: TournamentState | null) {
		await db.updateTournament(id, state).catch((error) => {
			dispatch('error', error);
		});
	}

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

	const makeGroups = function () {
		groups = [];
		for (let i = 0; i < numberGroups; i++) {
			groups[i] = {
				type: 'Group',
				tournamentTitle: tournament.title,
				players: [],
				matches: [],
				id: i,
			};
		}
		for (let i = 0; i < tournament.state.participants.length; i++) {
			groups[i % numberGroups].players = [
				...groups[i % numberGroups].players,
				tournament.state.participants[i],
			];
		}
	};

	const nextStage = async function () {
		if (
			!tournament.state ||
			!tournament.state.firstStage?.length ||
			tournament.state.firstStage.length == numberGroups ||
			(tournament.state &&
				tournament.state.firstStage?.length != numberGroups &&
				(await alertPopup(
					'Are you sure? Changing the number of groups can cause the loss of previous results.',
				)))
		) {
			makeGroups();
			if (numberGroups != tournament.state.firstStage?.length) {
				tournament.state = {
					participants: tournament.state.participants,
					firstStage: groups,
					secondStage: null,
				};
			}
			await addGroups(tournament.state);
			stage = 'groups';
		}
	};
	function back() {
		stage = 'addParticipants';
	}
</script>

{#await requestTournament() then}
	<BackArrowButton action={back} />

	<div class="center">
		<div class="content">
			<h1>Choose the number of groups in the tournament</h1>
			<form on:submit={nextStage}>
				<div class="input">
					<InputTemplate
						type="number"
						min="1"
						max="100"
						name="groupNumber"
						placeholder=""
						defaultNumValue={tournament.state.firstStage?.length
							? tournament.state.firstStage?.length
							: numberGroups}
						bind:numberVal={numberGroups}
						textAlignCenter={true}
					/>
				</div>
				<div class="button">
					<Button type="submit"
						>{numberGroups === tournament.state.firstStage?.length ? 'Continue' : 'Confirm'}</Button
					>
				</div>
			</form>
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
		height: 16rem;
		text-align: center;
	}
	.button {
		margin: 2rem auto auto;
		width: 9rem;
		height: 2.75rem;
	}
	.input {
		margin: 3rem auto auto;
		max-width: 5rem;
	}

	h1 {
		font-size: var(--fontsize-x-large);
		font-weight: var(--fontweight-1);
		letter-spacing: 0.125rem;
	}
</style>
