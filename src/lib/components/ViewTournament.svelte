<script lang="ts">
    import type { Tournament } from "$lib/types/types";
	import { handleError } from "$lib/errorHandler";
    import profileImage from '$lib/assets/tournament.png';
	import TournamentInfoPanel from '$lib/components/TournamentInfoPanel.svelte';
    import ParticipantsViewTournamentList from "$lib/components/lists/ParticipantsList.svelte";
	import SortParticipantsTournamentForm from "$lib/components/forms/SortFilterParticipantsForm.svelte";
	import MatchesList from "./lists/MatchesList.svelte";
	import TournamentFilterMatchForm from "./forms/TournamentFilterMatchForm.svelte";
	import { onMount } from "svelte";
	import SecondStage from "./createTournament/SecondStage.svelte";

    let handleInsert: () => void;

    export let tournament: Tournament;

    let title = 'BracketTournament1';
</script>

<div class="container">
    <div class="banner">
        <div class="row">
            <img class="image-container" src={profileImage} alt="Problem with downloading" />
            <div class="profile-info">
                <div class="name">
                    {tournament.title}
                </div>
                <div class="date">
                    {tournament.startDateString} - {tournament.endDateString}
                </div>
            </div>
        </div>
    </div>
    <div class="column">
        <TournamentInfoPanel 
            numberOfGames={tournament.matches.length}
            numberOfParticipants={tournament.state === null ? 0 : tournament.state.participants.length}
        />
    </div>
    <div class="main">
        {#if tournament.state !== null}
            <h1>List of all the participants</h1>
            <div class="form-list-layout">
                <div class="form">
                    <SortParticipantsTournamentForm on:error={handleError} on:update={() => handleInsert()} />
                </div>
                <div class="participants-list">
                    <ParticipantsViewTournamentList
            
                    />
                </div>
            </div>
            <h1>First stage - Groups</h1>
            {#if tournament.state.secondStage !== null}
                <h1>Second stage - 2 finals</h1>
            {/if}
            <h1>Matches</h1>
            <div class="form-list-layout">
                <div class="form">
                    <TournamentFilterMatchForm on:error={handleError} on:update={() => handleInsert()} />
                </div>
                <div class="participants-list">
                    <MatchesList
                        on:error={handleError}
                        bind:handleInsert
                        bind:title
                        oneTournament={false}
                    />
                </div>
            </div>
        {/if}
    </div>

</div>

<style>
    .container {
        position: absolute;
        right: 0;
		color: var(--content-color);
		display: flex;
		flex-direction: column;
		width: 100vw;
		min-height: 100%;
		align-content: center;
	}
    .column {
        display: flex;
        width: 100vw;
        flex-direction: column;
        justify-content: center;
        margin-top: 17rem;
    }

    .banner {
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: -1;
        height: 20rem;
        background: var(--secondary-color);
    }
    .row {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .profile-info {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 70%;
        height: 100%;
        padding: 0 5%;
        justify-content: center;
    }
    .image-container {
        object-fit: cover;
        height:100%;
        width: 30%;
    }
    .name {
        font-size: var(--fontsize-x-large);
        font-weight: var(--fontweight-1);
        color: var(--main-color);
        letter-spacing: 0.3125rem;
    }
    .date {
        font-size: var(--fontsize-large);
        color: var(--main-color);
        letter-spacing: 0.09375rem;
    }

    .main {
        padding: 0 4rem;
    }
    .form-list-layout {
		display: grid;
		grid-auto-flow: column;
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
	
    h1 {
        margin-top: 3rem;
        font-size: var(--fontsize-x-large);
        font-weight: var(--fontweight-1);
        letter-spacing: 0.125rem;
    }
    
	@media (max-width: 1100px) {
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.form-list-layout {
			display: block;
			margin: 0;
		}
		.participants-list {
			margin: 0 auto;
		}
	}

	@media (max-width: 480px) {
        .main {
            padding: 0 1rem;
        }
		.container {
            top: 0;
        }
        .banner {
            height: 10rem;
        }
        .column {
            margin-top: 10rem;
        }
        .name {
            font-size: var(--fontsize-large);
            letter-spacing: 0.09375rem;
        }
        .date {
            font-size: var(--fontsize-medium1);
            letter-spacing: 0.09375rem;
        }
	}
</style>
