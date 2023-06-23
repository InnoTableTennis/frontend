<script lang="ts">
	import Rectangles from '$lib/components/decorations/Rectangles.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Errors from '$lib/components/error/Errors.svelte';

	import Login from '$lib/components/navigation/Login.svelte';
	import type { Error } from '$lib/types/types';

	let errors: Error[] = [];

	function handleError(event: CustomEvent) {
		errors = [...errors, event.detail];
	}
</script>

<PageWrapper {errors}>
	<Rectangles />

	<Errors {errors} />

	<Login on:erorr={handleError} />
</PageWrapper>
