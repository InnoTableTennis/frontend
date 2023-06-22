<script>
	import Rectangles from '$lib/components/Rectangles.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import Errors from '$lib/components/Errors.svelte';

	import Login from '../../lib/components/Login.svelte';

	let errors = [];

	function handleError(event) {
		errors = [...errors, event.detail];
	}
</script>

<PageWrapper {errors}>
	<Rectangles />

	<Errors {errors} />

	<Login on:erorr={handleError} />
</PageWrapper>
