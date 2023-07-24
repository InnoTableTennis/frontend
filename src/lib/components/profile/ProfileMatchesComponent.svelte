<script lang="ts">
	import { handleError } from '$lib/errorHandler';
	import ProfileSortFilterMatchForm from '$lib/components/profile/ProfileSortFilterMatchForm.svelte';
	import ProfileMatchesList from '$lib/components/profile/ProfileMatchesList.svelte';

	let handleInsert: () => void;
</script>

<div class="matches-comp-wrapper">
	<div class="form-list-layout">
		<div class="form">
			<ProfileSortFilterMatchForm on:error={handleError} on:update={handleInsert} />
		</div>
		<div class="matches-list">
			<ProfileMatchesList on:error={handleError} bind:handleInsert />
		</div>
	</div>
</div>

<style>
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
	.matches-comp-wrapper {
		box-sizing: border-box;
		padding: 0% 3% 3% 3%;
		height: 100%;
	}
	.matches-list {
		max-width: 900px;
	}

	@media (max-width: 1100px) {
		.form {
			max-width: 500px;
			margin: 0 auto;
		}
		.form-list-layout {
			display: block;
		}
		.matches-list {
			margin: 0 auto;
		}
	}
</style>
