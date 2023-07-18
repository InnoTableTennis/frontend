<script lang="ts">
	export let disabled = true;
</script>

<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="60" height="60" rx="5" class:disabled />
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M11.6667 20V16.6667H21.6667V20H11.6667ZM11.6667 43.3334V40H48.3334V43.3334H11.6667ZM11.6667 31.6667V28.3334H35.0001V31.6667H11.6667Z"
		fill="white"
	/>
</svg>

<style>
	rect {
		fill: var(--secondary-color);
	}
	.disabled {
		fill: var(--secondary-bg-color);
	}
	path {
		fill: var(--main-color);
	}
</style>
