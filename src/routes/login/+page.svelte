<script lang="ts">
	import Rectangles from '$lib/components/Rectangles.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Errors from '$lib/components/Errors.svelte';

	import Login from '$lib/components/Login.svelte';
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
