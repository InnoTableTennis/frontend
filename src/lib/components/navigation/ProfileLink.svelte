<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';

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
			<a id="nav-link-matches" href="/login">Sign in</a>
		</div>
		<div class="sign-up">
			<a href="/signup">
				<Button>Sign Up</Button>
			</a>
		</div>
	{:else}
		<div class="log-out">
			<Button on:click={logOut}>Log Out</Button>
		</div>
	{/if}
</div>

<style>
	.profile-container {
		display: flex;
		gap: 1.5rem;
		/* min-width: 10px; */
		height: 100%;
		align-items: center;
		white-space: nowrap;
	}
	.sign-in {
		margin-left: 1rem;
		margin-right: 1rem;
		height: 100%;
		width: 7rem;
	}
	.sign-up {
		width: 100%;
	}
	.log-out {
		margin-left: 1rem;
	}
	.profile-container a {
		text-decoration: none;
		display: flex;
		height: 100%;
		transition: 0.1s;
		align-items: center;
		justify-content: center;
		color: var(--content-color);
	}
	@media (min-width: 480px) {
		.profile-container .sign-in a:hover {
			border-bottom: 2px solid var(--content-color);
		}
	}
	@media (max-width: 800px) {
		.profile-container {
			gap: 0.5rem;
		}
		.log-out {
		margin-left: 0.7rem;
	}
		.sign-in {
			margin-top: 0.078125rem;
		margin-left: 0.7rem;
		margin-right: 0.7rem;
		height: 100%;
		width: 5rem;
	}
	/* .sign-up {
		width: 4rem;
	} */
	}
	@media (max-width: 480px) {
		.profile-container {
			display: block;
			height: 6rem;
		}
		.sign-in {
			height: 3rem;
		}
		.sign-up {
			height: 3rem;
		}
	}
</style>
