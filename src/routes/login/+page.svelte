<script lang="ts">
	import Rectangles from '$lib/components/Rectangles.svelte';

	import Login from '$lib/components/Login.svelte';
	import { errors } from '$lib/stores';

	function handleError(event: CustomEvent) {
		$errors = [...$errors, event.detail];
	}
</script>

<Rectangles />

<Login on:erorr={handleError} />
