<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { userToken } from '$lib/stores';
	import * as db from '$lib/requests';

	const dispatch = createEventDispatcher();

	let username = '';
	let password = '';

	let usernameInput: HTMLInputElement;

	const login = async (e: Event) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		db.authenticate(data.get('username') as string, data.get('password') as string)
			.then((response: string) => {
				const token = response;
				localStorage.setItem('token', token);
				userToken.set(token);
				window.location.replace('/');
			})
			.catch((error: Error) => {
				dispatch('error', { error });
			});
	};

	onMount(() => {
		usernameInput.focus();
	});
</script>

<div class="container">
	<form on:submit={login}>
		<h2>Sign in</h2>

		<label>
			<!-- <span class="form-label">Telegram Alias</span> -->
			<input
				name="username"
				bind:value={username}
				required
				autocomplete="off"
				placeholder="@telegram_alias"
				class="full-width"
				bind:this={usernameInput}
			/>
		</label>
		<label>
			<!-- <span class="form-label">Password</span> -->
			<input
				type="password"
				name="password"
				bind:value={password}
				required
				autocomplete="off"
				placeholder="Password"
				class="full-width"
			/>
		</label>
		<div class="button-container">
			<Button dark={true} type={'submit'}>Sign In</Button>
		</div>
		<p><a href="/signup">Sign Up</a> If you don't have an account yet!</p>
	</form>
</div>

<style>
	h2 {
		font-size: 1.5em;
		margin-bottom: 0.5em;
		text-align: center;
		color: #000;
	}

	p {
		font-size: 0.8em;
		color: inherit;
	}

	form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #c4d6b0;
		color: #000;
		max-width: 350px;
		margin: 0 auto;
		font-size: 1em;
		padding: 1.5em;
		border-radius: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	input {
		box-sizing: border-box;
		border: none;
		padding: 0.8em 1em;
		border-radius: 20px;
		transition: 0.1s;
	}
	input:focus {
		outline: solid #c4d6b0;
	}
	.button-container {
		width: 10rem;
	}

	@media (max-height: 500px) {
		form {
			margin: 7vh 0;
			padding: 0.75em;
			gap: 0.5rem;
		}
	}
</style>
