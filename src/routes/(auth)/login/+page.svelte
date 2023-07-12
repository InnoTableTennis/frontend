<script lang="ts">
	import Rectangles from '$lib/components/decorations/Rectangles.svelte';
	import Login from '$lib/components/navigation/Login.svelte';
	import { handleError } from '$lib/errorHandler';
</script>

<Login on:erorr={handleError} />
