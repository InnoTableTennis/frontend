<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { isLeader } from '$lib/stores';

	$: if (!$isLeader && browser) goto('/');
</script>

{#if $isLeader}
	<slot />
{/if}
