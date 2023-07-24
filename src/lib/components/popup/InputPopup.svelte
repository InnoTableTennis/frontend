<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { fade } from 'svelte/transition';
	import { inputOverlayText, outputOverlayText } from '$lib/stores';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	export let popupText: string;
	export let firstPlayer: string;
	export let secondPlayer: string;
	const buttonPressed = (e: Event) => {
		e.preventDefault();
		let data = new FormData(e.target as HTMLFormElement);
		$outputOverlayText = [Number(data.get('firstScore')), Number(data.get('secondScore'))];
		$inputOverlayText = null;
	};
</script>

<form class="fullscreen-overlay" transition:fade on:submit={buttonPressed}>
	<button class="overlay-background" type="button" />
	<div class="overlay-content">
		<div class="overlay-head">
			<div class="circle">!</div>
		</div>
		<p class="overlay-text">{popupText}</p>
		<div class="inputScore">
			<div class="player-block">
				<p>{firstPlayer}</p>
				<div class="input">
					<InputTemplate
						type={'number'}
						name={'firstScore'}
						defaultNumValue={0}
						placeholder={'First Score'}
					/>
				</div>
			</div>
			<div class="player-block">
				<p>{secondPlayer}</p>
				<div class="input">
					<InputTemplate
						type={'number'}
						name={'secondScore'}
						defaultNumValue={0}
						placeholder={'Second Score'}
					/>
				</div>
			</div>
		</div>
		<div class="overlay-button-block">
			<div class="overlay-button">
				<Button type={'submit'}>Ok</Button>
			</div>
		</div>
	</div>
</form>

<style>
	.fullscreen-overlay {
		position: fixed;
		visibility: visible;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 10;
		align-items: center;
	}
	.overlay-background {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: var(--content-color);
		z-index: 0;
		border: none;
		padding: 0;
		outline: none;
		opacity: 0.8;
	}
	.overlay-content {
		margin: 0 auto;
		position: relative;
		background: var(--main-color);
		z-index: 1;
		height: 20rem;
		width: 25rem;
		text-align: center;
		border-radius: 30px;
		opacity: 1;
		top: 50%;
		transform: translateY(-50%);
	}
	.overlay-head {
		display: flex;
		height: 25%;
		background-color: var(--secondary-color);
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		align-items: center;
		justify-content: center;
	}
	.circle {
		display: flex;
		height: 2rem;
		width: 2rem;
		border-radius: 100%;
		border: 3px solid var(--main-color);
		align-items: center;
		justify-content: center;
		color: var(--main-color);
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
	}
	.overlay-text {
		font-size: var(--fontsize-large);
		margin: 1rem auto;
	}
	.overlay-button-block {
		position: absolute;
		display: flex;
		bottom: 5%;
		height: 15%;
		width: 100%;
		justify-content: center;
	}
	.overlay-button {
		width: 20%;
	}
	.player-block {
		width: 40%;
	}
	.player-block p {
		width: 100%;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.inputScore {
		margin-top: 1.5rem;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.input {
		width: 80%;
		margin: 0.5rem auto;
	}
	@media (max-width: 800px) {
		.overlay-content {
			height: 50%;
			width: 60%;
		}
		.player-block {
			width: 40%;
		}
	}
	@media (max-width: 480px) {
		.overlay-content {
			padding: 0;
			height: 30rem;
			width: 70%;
		}
		.overlay-head {
			height: 20%;
		}
		.overlay-text {
			font-size: var(--fontsize-large);
			margin-top: 2rem;
		}
		.overlay-button-block {
			bottom: 5%;
		}
		.overlay-button {
			width: 60%;
		}
		.inputScore {
			display: block;
			margin: 2rem auto;
		}
		.player-block {
			width: 80%;
			margin: 1rem auto;
			text-align: center;
		}
		.input {
			margin: 0 auto;
			width: 70%;
		}
	}
</style>
