<script lang="ts">
	import ProfileLink from '$lib/components/navigation/ProfileLink.svelte';
	import ToggleTheme from '../ToggleTheme.svelte';
</script>

<nav>
	<input type="checkbox" />
	<div class="hamburger-lines">
		<div class="line line1" />
		<div class="line line2" />
		<div class="line line3" />
	</div>
	<div class="nav-container">
		<ToggleTheme />
		<ul class="nav-links">
		<li><a href="/">Matches</a></li>
		<li><a href="/tournaments">Tournaments</a></li>
		<li><a href="/players">Players</a></li>
	</ul>
	<ProfileLink />
	</div>
</nav>

<style>
	input[type='checkbox'] {
		display: none;
		margin: 0;
	}
	nav {
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		height: 100%;
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
	}
	.nav-container {
		display: flex;
		height: 100%;
		align-items: center;
	}
	.nav-links {
		height: 4em;
		justify-content: center;
		display: flex;
	}
	.nav-links li {
		text-decoration: none;
		margin-left: 1em;
		margin-right: 1em;
		height: 100%;
		width: 100%;
		line-height: 4em;
	}
	.nav-links li a {
		text-decoration: none;
		display: flex;
		height: 100%;
		color: var(--content-color);
		transition: 0.1s;
		text-align: center;
		justify-content: center;
	}
	.nav-links li a:hover {
		border-bottom: 2px solid var(--content-color);
	}

	/* .active {*/
	/*	 border-bottom: 2px solid var(--content-color);*/
	/*}*/

	@media (max-width: 480px) {
		.hamburger-lines {
			height: 1.5rem;
			width: 2rem;
			right: 1rem;
			top: 1rem;
			position: absolute;
			z-index: 2;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			transition: all 0.5s ease-in-out;
		}
		.hamburger-lines .line {
			display: block;
			height: 4px;
			width: 100%;
			border-radius: 10px;
			background: var(--content-color);
		}
		input[type='checkbox']:checked ~ .hamburger-lines {
			transform: rotate(-90deg);
		}
		input[type='checkbox'] {
			position: absolute;
			display: block;
			border: none;
			z-index: 3;
			height: 1.5rem;
			width: 2rem;
			right: 1rem;
			top: 1rem;
			opacity: 0;
		}
		.nav-container {
			transform: translate(100%);
			display: grid;
			position: fixed;
			min-width: 160px;
			z-index: 1;
			top: 0;
			right: 0;
			margin: 0;
			background-color: var(--main-color);
			border-left: 1px solid var(--content-color);
			opacity: 0.9;
			transition: transform 0.5s ease-in-out;
			justify-content: center;
		}
		.nav-links {
			display: block;
		}
		input[type='checkbox']:checked ~ .nav-container {
			transform: translateX(0);
		}
		.nav-links li a:hover {
			border-bottom: 2px solid var(--content-color);
		}
		.nav-links li {
			margin: 0.15em;
		}
	}
</style>
