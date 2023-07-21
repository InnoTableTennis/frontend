<script lang='ts'>
	import { goto } from "$app/navigation";
	import { isLeader } from "$lib/stores";

	$: if (!$isLeader) goto('/');
</script>

{#if $isLeader}
<slot/>
{/if}