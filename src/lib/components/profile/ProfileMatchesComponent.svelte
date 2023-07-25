<script lang="ts">
	import { handleError } from '$lib/errorHandler';
	import ProfileMatchesList from '$lib/components/profile/ProfileMatchesList.svelte';
	import type { ProfileMatch } from '$lib/types/profileTypes';

	export let dataMatches: ProfileMatch[];
</script>

<div class="matches-comp-wrapper">
	<div class="form-list-layout">
		<h1>Your resent games</h1>
		<div class="matches-list">
			<ProfileMatchesList on:error={handleError} {dataMatches} />
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: var(--fontsize-x-large);
		font-weight: 700;
	}
	.form-list-layout {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		grid-template-columns: 1fr 2fr;
	}
	.matches-comp-wrapper {
		box-sizing: border-box;
		padding: 0% 3% 3% 3%;
		height: 100%;
	}
	.matches-list {
		max-width: 900px;
	}

	@media (max-width: 1100px) {
		.form-list-layout {
			display: block;
		}
		.matches-list {
			margin: 0 auto;
		}
	}
</style>
