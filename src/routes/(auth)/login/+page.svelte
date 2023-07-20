<script lang="ts">
	import Login from '$lib/components/navigation/Login.svelte';
	import { handleError } from '$lib/errorHandler';
</script>

<Login on:error={handleError} />
