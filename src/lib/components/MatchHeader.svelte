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
		color: var(--accent-color);
	}
	h3 {
		margin: 0.75em 0;
		color: var(--table-header-title-color);
		/* text-transform: uppercase; */
	}
	.separator {
		width: 100%;
		height: 2px;
		background-color: var(--accent-color);
		margin: 0.75em 0;
	}
	.invisible {
		visibility: hidden;
		width: 1em;
		height: 1em;
	}
	.table-header {
		font-size: var(--fontsize-medium2);
		display: grid;
		grid-template-columns: 1fr 1fr 2rem auto;
		gap: 1rem 1rem;
		margin-bottom: 1.25rem;
	}
	.not-main {
		font-size: var(--fontsize-medium2);
		color: var(--table-header-subtitle-color);
	}
	.main {
		margin-top: 3em;
	}
</style>
