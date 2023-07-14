<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let group: string;
	export let values: string[];
	export let labels: string[];
</script>

{#each values as value, i}
	<div>
		<input
			type="radio"
			id={labels[i]}
			class="radio"
			bind:group
			{value}
			on:click={() => dispatch('update', { value })}
		/>
		<label for={labels[i]}>{labels[i]}</label>
	</div>
{/each}

<style>
	.radio {
		position: absolute;
		opacity: 0;
	}
	.radio + label {
		position: relative;
		padding: 0 0 0 2.5em;
		cursor: pointer;
	}
	.radio + label:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0.3rem;
		width: 1em;
		height: 1em;
		border: 2px solid var(--content-color);
		border-radius: 2em;
		background: var(--main-color);
	}
	.radio + label:after {
		content: '';
		position: absolute;
		top: 0.3rem;
		left: 0.6rem;
		width: 0.5em;
		height: 0.5em;
		border-radius: 2em;
		background: var(--content-color);
		opacity: 0;
		transition: 0.2s;
	}
	.radio:checked + label:after {
		opacity: 1;
	}
</style>
