<script lang="ts">
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';

	export let title: string;
	export let isMain = false;
	export let isLeader = false;
</script>

<h3 class:main={isMain} class:not-main={!isMain}>{title}</h3>
{#if !isMain}
	<div class="separator" />
	<div class="table-header">
		<span>First Player</span>
		<span>Second Player</span>
		<span>Score</span>
		{#if isLeader}
			<div class="invisible"><DeleteIcon /></div>
		{/if}
	</div>
{/if}

<style>
	span {
		color: #c4d6b0;
	}
	h3 {
		margin: 0.75em 0;
		color: #ffffff;
		/* text-transform: uppercase; */
	}
	.separator {
		width: 100%;
		height: 2px;
		background-color: #c4d6b0;
		margin: 0.75em 0;
	}
	.invisible {
		visibility: hidden;
		width: 1em;
		height: 1em;
	}
	.table-header {
		font-size: 0.8em;
		display: grid;
		grid-template-columns: 1fr 1fr 2rem auto;
		gap: 1rem 1rem;
		margin-bottom: 1.25rem;
	}
	.not-main {
		font-size: 0.8em;
		color: rgba(255, 255, 255, 0.5);
	}
	.main {
		margin-top: 3em;
	}
</style>
