<script lang="ts">
	export let width = 16;
	export let height = 26;
	export let color = 'white';
</script>

<svg {width} {height} viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M15.7188 3.4375L12.7813 0.5L0.28125 13L12.7813 25.5L15.7188 22.5625L6.17708 13L15.7188 3.4375Z"
		fill={color}
	/>
</svg>

<style>
	path {
		fill: var(--secondary-color);
	}
</style>
