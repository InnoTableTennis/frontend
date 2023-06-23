<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';

	const logOut = () => {
		localStorage.removeItem('token');
		userToken.set('');
	};
</script>

<div class="profile-container">
	{#if !getRoles($userToken).includes('USER')}
		<div class="sign-in">
			<a href="/login">
				<Button dark={true}>Sign In</Button>
			</a>
		</div>
		<div class="sign-up">
			<a href="/signup">
				<Button dark={true}>Sign Up</Button>
			</a>
		</div>
	{:else}
		<div class="log-out">
			<Button dark={true} on:click={logOut}>Log Out</Button>
		</div>
	{/if}
</div>

<style>
	.profile-container {
		display: flex;
		gap: 1.5em;
		/* min-width: 10px; */
		flex-direction: row-reverse;
	}

	@media (max-width: 800px) {
		.profile-container {
			gap: 0.5em;
		}
	}

	@media (max-width: 450px) {
		.sign-up {
			display: none;
		}
	}
</style>
