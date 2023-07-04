<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import ProfileLink from '$lib/components/navigation/ProfileLink.svelte';
</script>

<nav>
	<img class="logo" src={logo} alt="Innopolis Table Tennis Club" />
	<ul class="nav-links">
		<li><a href="/">Matches</a></li>
		<li><a href="/tournaments">Tournaments</a></li>
		<li><a href="/players">Players</a></li>
	</ul>
	<ProfileLink />
</nav>

<style>
	nav {
		padding: 0 2em;
		display: flex;
		justify-content: space-between;
		height: 100%;
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
	}

	.nav-links li {
		display: inline;
		text-decoration: none;
		margin: 1em;
	}
	.nav-links li a {
		text-decoration: none;
		color: var(--main-color);
		transition: 0.1s;
	}
	.nav-links li a:hover {
		border-bottom: 2px solid var(--main-color);
	}

	/* .active {
		font-weight: bold;
	} */

	.logo {
		height: 70%;
		border-radius: 50%;
	}

	@media (max-width: 800px) {
		nav {
			padding: 0 1em;
		}
		.nav-links li a:hover {
			text-decoration: underline;
			border-bottom: none;
		}
	}
	@media (max-width: 450px) {
		.nav-links li {
			margin: 0.15em;
		}
	}
</style>
