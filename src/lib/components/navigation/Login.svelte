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
<button class="back-btn" on:click={() => {
	window.history.back()
}}>← Back</button>

<div class="container">
	<div class="row">
		<div class="container">
			<div class="wrapper-left">
				<div class="column">
					<form on:submit={login}>
						<h2>Sign in</h2>
				
						<label>
							<!-- <span class="form-label">Telegram Alias</span> -->
							<input
								name="username"
								bind:value={username}
								required
								autocomplete="off"
								placeholder="@Telegram alias"
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
						<a class="sp-link" href="/signup">I don`t have an account</a>
					</form>					
				</div>	
			</div>	
		</div>
		<div class="wrapper-right">
			<div class="container">
				<img src="../../../../signin.jpg" alt="">
			</div>
		</div>
	</div>
</div>
<style>
	h2 {
		font-size: var(--fontsize-x-large);
		margin-bottom: 0.5em;
		text-align: end;
		align-self: start;
		color: inherit;
	}
	form {
		color: var(--content-color);
		width: 100%;
		height: 100%;
		margin: 0 auto;
		font-size: var(--fontsize-medium1);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	label {
		align-self:flex-start;
		width: 100%;
	}
	input {
		background: var(--main-color);
		box-sizing: border-box;
		width: 100%;
		border-top:none;
		border-left: none;
		border-right: none;
		border-bottom: 0.2rem solid;
		border-color: var(--tertiary-color);
		padding: 0.8em 1em;
		transition: 0.1s;
	}
	input:focus {
		border-color: var(--secondary-color);
		outline: none;
	}
	.back-btn {
		position:absolute;
		left: 5%;
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
	}
	.sp-link {
		padding-top: 1.5em;
		color: var(--secondary-color);
		text-align: center;
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
		width: 100vw;
		height: 100%;
		align-items: start;
	}
	.wrapper-left {
		display: flex;
		flex-direction: column;
		padding: 6em;
	}
	.column {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-content: center;
		justify-content: center;
	}
	.button-container {
		width: 10rem;
		align-self: flex-end;
	}
	img {
		height: 100vh;
		object-fit: cover;
	}
	@media (max-width: 500px) {
		form {
			margin: 7vh 0;
			padding: 0.75em;
			gap: 0.5rem;
		}
		.wrapper-right{
			display: none;
		}
	}
</style>
