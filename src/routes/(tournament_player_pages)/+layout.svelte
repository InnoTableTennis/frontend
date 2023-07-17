<script lang="ts">
	import { userToken } from '$lib/stores';
</script>

{#if $userToken}
    <slot />
{:else}
    <p class="details">Oops! That page doesn't exist or it is private</p>
{/if}


<style>
	.details {
		font-size: var(--fontsize-medium1);
        text-align: center;
		margin-top: 15rem;
	}
</style>
