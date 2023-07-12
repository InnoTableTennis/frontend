<script lang="ts">
	// import { enhance } from '$app/forms';
	// import Rectangles from '$lib/components/decorations/Rectangles.svelte';
</script>

<button class="back-btn" on:click={() => {
	window.history.back()
}}>Back →</button>

<div class="container">
	<div class="row">
		<div class="wrapper-left">
			<div class="container">
				<img src="../../../signup.png">
			</div>
		</div>
		<div class="container">
			<div class="wrapper-right">
				<div class="column">
					<h2>Sign Up</h2>
					<div class="index">01</div>
					<p>
						Contact the <a class="link" href="https://t.me/+pSAqcDY6eqM5Mjg6" target="_blank" rel="noreferrer">club</a
						>
						leaders to add yourself to the players' list. Check the <a class="link" href="/">matches section</a> to confirm
						if you're already added.
					</p>
					<div class="index">02</div>
					<p>
						Use the <a class="link" href="https://t.me/InnoTableTennisBot" target="_blank" rel="noreferrer"
							>telegram bot</a
						> to get your password once your telegram alias is added.
					</p>
					<div class="index">03</div>
					<p><a class="link" href="/login">Log in</a> to the website using your password to access the services.</p>
					<a class="sp-link" href="/login">Already have an account</a>
				</div>	
			</div>	
		</div>
	</div>
</div>
<style>
	h2 {
		font-size: var(--fontsize-x-large);
		margin-bottom: 0.5em;
		text-align: end;
		color: inherit;
	}
	p {
		text-align: end;
		color: inherit;
		font-size: var(--fontsize-large);
		color: var(--content-color);
		margin-bottom: 0.5em;
		padding-right: 0.5em;
	}

	.back-btn {
		position:absolute;
		left: 85%;
		top: 5%;
		color: var(--secondary-color);
		font-size: 1.5em;
		background-color: var(--main-color);
		border: 0;
		text-decoration: underline;
	}

	.row {
		display:flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		margin-left: -4em;
	}

	.link {
		color: var(--secondary-color);
	}

	.sp-link {
		padding-top: 1.5em;
		color: var(--secondary-color);
		text-align: center;
		width: 100%;
	}

	.index {
		text-align: end;
		color: var(--tertiary-color);
		font-size: 6em;
		margin-bottom: -0.5em;
	}

	.container {
		color: var(--content-color);
		display:flex;
		flex-direction: column;
		width: 100%;
		max-height: 100%;
		align-content: center;
		justify-content: center;
	}
	.wrapper-right {
		display: flex;
		flex-direction: column;
		padding: 3em 3em 3em 7em;
		width: 80%;
		height: 100%;
	}
	.wrapper-left {
		display: flex;
		width: 100vw;
		/* height: 100%; */
		align-items: start;
	}

	.column {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-content: center;
		justify-content: center;
	}
	img {
		height: 100vh;
		object-fit: cover;
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
		.wrapper-left{
			display: none;
		}
	}
</style>
