<script lang="ts">
	// import { enhance } from '$app/forms';
	import Rectangles from '$lib/components/decorations/Rectangles.svelte';
	import '$lib/app.css';
</script>

<Rectangles />

<div class="container">
	<h2>Sign Up</h2>
	<p>
		1. Contact the <a href="https://t.me/+pSAqcDY6eqM5Mjg6" target="_blank" rel="noreferrer">club</a
		>
		leaders to add yourself to the players' list. Check the <a href="/">matches section</a> to confirm
		if you're already added.
	</p>
	<p>
		2. Use the <a href="https://t.me/InnoTableTennisBot" target="_blank" rel="noreferrer"
			>telegram bot</a
		> to get your password once your telegram alias is added.
	</p>
	<p>3. <a href="/login">Log in</a> to the website using your password to access the services.</p>
</div>

<style>
	h2 {
		font-size: var(--fontsize-signup-heading);
		margin-bottom: 0.5em;
		text-align: center;
		color: inherit;
	}
	p {
		text-align: justify;
		color: inherit;
		color: var(--signup-text-color);
	}

	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--accent-color);
		color: var(--signup-heading-color);
		max-width: 350px;
		margin: 0 auto;
		font-size: var(--fontsize-signup-text);
		padding: 1.5em;
		border-radius: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	/* .full-width {
		width: 100%;
	} */
	/* .form-label {
		display: inline-block;
		margin-bottom: 0.25em;
	} */

	@media (max-height: 500px) {
		.container {
			margin: 7vh 0;
			padding: 0.75em;
			gap: 0.5rem;
		}
	}
</style>
