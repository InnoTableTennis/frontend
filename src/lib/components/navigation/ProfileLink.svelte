<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import ProfileIcon from '../icons/ProfileIcon.svelte';

	import { userToken } from '$lib/stores';
	import { getRoles } from '$lib/token';

	let isMenuVisible = false;
	$: isMenuVisible;

	const logOut = () => {
		localStorage.removeItem('token');
		isMenuVisible = false;
		userToken.set('');
	};
	const openProfileMenu = () => {
		isMenuVisible = true;
	};
</script>

<div class="profile-container">
	{#if !getRoles($userToken).includes('USER') && !isMenuVisible}
		<div class="sign-in">
			<a id="nav-link-matches" href="/login">Sign in</a>
		</div>
		<div class="sign-up">
			<a href="/signup">
				<Button>Sign Up</Button>
			</a>
		</div>
	{:else if !isMenuVisible}
		<button class="profile-button" on:click={openProfileMenu}>
			<div class="profile-icon">
				<ProfileIcon />
			</div>
		</button>
	{:else}
		<div class="profile-menu-container">
			<div class="profile-menu-wrapper">
				<div class="upper-subcontainer">
					<div class="name-tag">
						<div class="name">Name Surname</div>
						<div class="tag">@Telegram tag</div>
					</div>
					<div class="profile-icon">
						<ProfileIcon />
					</div>
				</div>
				<div class="lower-subcontainer">
					<Button>Profile</Button>
					<Button on:click={logOut}>Log Out</Button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* .profile-menu-button {
		width: 3rem;
		height: 3rem;
		border: 0px solid;
		border-radius: 5px;
		background-color: #FFFFFF;
	}
	.in-button-icon {
		width: 100%;
		height: 85%;

	} */
	.profile-container {
		display: flex;
		gap: 1.5em;
		/* min-width: 10px; */
		height: 100%;
		align-items: center;
	}
	.sign-in {
		margin-left: 1em;
		margin-right: 1em;
		height: 100%;
		width: 7rem;
	}
	.sign-up {
		width: 100%;
	}
	.log-out {
		margin-left: 1em;
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
	.profile-button {
		background: var(--main-color);
		border: 0;
	}
	.profile-icon {
		width: 3rem;
		height: 3rem;
	}
	.profile-menu-container {
		display: flex;
		flex-direction: row;
		z-index: 1;
		position: absolute;
		right: 0;
		top: 0;
		height: 10rem;
		width: 20rem;
		border: 1px solid black;
		border-radius: 10px;
		background: var(--main-color);
	}
	.profile-menu-wrapper {
		display: flex;
		width: 18rem;
		height: 8rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
	.upper-subcontainer {
		display: flex;
		flex-direction: row;
		width: 17rem;
		height: 100%;
		/* padding: 10%; */
		justify-content: end;
	}
	.lower-subcontainer {
		display: flex;
		flex-direction: row;
		width: 17rem;
		height: 100%;
		/* padding: 10%; */
	}
	.name-tag {
		width: 100%;
		padding-right: 2rem;
	}
	.name {
		font-size: var(--fontsize-large);
		color: var(--content-color);
	}
	.tag {
		font-size: var(--fontsize-medium1);
		color: var(--);
	}
	@media (min-width: 480px) {
		.profile-container .sign-in a:hover {
			border-bottom: 2px solid var(--content-color);
		}
	}
	@media (max-width: 800px) {
		.profile-container {
			gap: 0.5em;
		}
		.sign-in {
			margin-top: 0.078125rem;
		}
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
