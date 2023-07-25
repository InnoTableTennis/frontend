<script lang="ts">
	import profileImage from '$lib/assets/profileImage.png';
	import InfoBlocks from '$lib/components/InfoBlocks.svelte';
	import ProfileMatchesComponent from '$lib/components/profile/ProfileMatchesComponent.svelte';
	import RatingGraph from '$lib/components/graph/RatingGraph.svelte';
	import type { ProfileData, RatingHistoryItem, ProfileMatch } from '$lib/types/profileTypes.js';
	import * as db from '$lib/requests';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data;

	const playerID: number = +data.id;

	let profileData: ProfileData;
	let graphInfo: RatingHistoryItem[];
	let dataMatches: ProfileMatch[];
	const requestProfileData = async () => {
		await db
			.getProfileData(playerID)
			.then((result) => {
				profileData = result;
				graphInfo = profileData.graph;
				dataMatches = profileData.matches;
			})
			.catch((error) => {
				dispatch('error', error);
			});
	};
</script>

{#await requestProfileData() then}
	<div class="container">
		<div class="banner">
			<div class="row">
				<div class="profile-info">
					<div class="name">
						{profileData?.name || ''}
					</div>
				</div>
				<img class="image-container" src={profileImage} alt="Problem with downloading" />
			</div>
		</div>
		<div class="column">
			<InfoBlocks {playerID} />
			<RatingGraph Data={graphInfo} />
			<ProfileMatchesComponent {dataMatches} />
		</div>
	</div>
{/await}

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
		margin-top: 14rem;
	}

	.banner {
		position: absolute;
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: -1;
		height: 15rem;
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
		padding: 0 10%;
		justify-content: center;
	}
	.image-container {
		object-fit: cover;
		height: 100%;
		width: 30%;
	}
	.name {
		font-size: var(--fontsize-x-large);
		color: var(--main-color);
	}

	@media (max-width: 840px) {
	}

	@media (max-width: 480px) {
		.container {
			top: 0;
		}
		.banner {
			height: 10rem;
		}
		.column {
			margin-top: 10rem;
		}
	}
</style>
