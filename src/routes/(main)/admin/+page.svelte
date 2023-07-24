<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import InputTemplate from '$lib/components/base/inputs/InputTemplate.svelte';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import { handleError } from '$lib/errorHandler';
	import { alertPopup } from '$lib/popupHandler';

	import * as db from '$lib/requests';
	import type { Player } from '$lib/types/types';

	let leaders: Player[] = [];

	let telegramMessage = '';
	let leaderToPromote = '';

	const broadcastMessage = async (message: string) => {
		const isConfirmed = await alertPopup(`Are you sure that you want to broadcast this message?`);
		if (!isConfirmed) return;

		await db
			.broadcastMessage(message)
			.then(() => {
				telegramMessage = '';
			})
			.catch((error) => {
				handleError(error);
			});
	};

	const promoteLeader = async (telegramAlias: string) => {
		const isConfirmed = await alertPopup(
			`Are you sure that you want to promote @${telegramAlias} to leaders?`,
		);
		if (!isConfirmed) return;

		if (telegramAlias.trim() == '') return;

		await db
			.promoteLeader(telegramAlias)
			.then(() => {
				leaderToPromote = '';
			})
			.catch((error) => {
				handleError(error);
			});

		requestLeadersList();
	};

	const demoteLeader = async (leader: Player) => {
		const isConfirmed = await alertPopup(
			`Are you sure that you want to demote leader ${leader.name}?`,
		);
		if (!isConfirmed) return;

		await db.demoteLeader(String(leader.id)).catch((error) => {
			handleError(error);
		});

		requestLeadersList();
	};

	async function requestLeadersList() {
		await db
			.getLeaders()
			.then((result) => {
				leaders = result.data;
			})
			.catch((error) => {
				handleError(error);
			});
	}
</script>

<svelte:head>
	<meta
		name="description"
		content="Manage admins and send messages to the InnoTableTennis group channel with the Admin Panel at InnoTableTennis Club. Grant administrative privileges and stay connected with the club community."
	/>
	<meta
		name="keywords"
		content="admin panel, InnoTableTennis Club, manage admins, group channel messages, administrative privileges, club community"
	/>
</svelte:head>

<h2>Admin panel</h2>

<div class="wrapper">
	<div class="side-wrapper left">
		<h3>Admins</h3>
		<div class="scrollable">
			{#await requestLeadersList() then}
				{#each leaders as leader}
					<div class="leaders-row">
						<button aria-label="Demote" on:click={() => demoteLeader(leader)} class="demote-btn"
							><DeleteIcon /></button
						>
						<div class="people-list">{leader.name} - @{leader.telegramAlias}</div>
					</div>
				{/each}
			{/await}
		</div>
		<div class="form-holder">
			<h4>Add new admin</h4>
			<form class="add-admin">
				<InputTemplate
					type="text"
					name="alias"
					placeholder="Enter alias"
					required={true}
					bind:stringVal={leaderToPromote}
				/>
				<div>
					<Button
						type="submit"
						on:click={() => {
							promoteLeader(leaderToPromote);
						}}>Add</Button
					>
				</div>
			</form>
		</div>
	</div>
	<div class="side-wrapper right">
		<h3>Bot Message</h3>
		<p class="broadcast-description">
			Here you can write the message that bot will send to all players
		</p>
		<div class="textarea-container">
			<InputTemplate
				type="textarea"
				name="message"
				placeholder="Write here the message"
				required={true}
				bind:stringVal={telegramMessage}
			/>
		</div>
		<div class="send-message">
			<div />
			<Button on:click={() => broadcastMessage(telegramMessage)}>Send</Button>
		</div>
	</div>
</div>

<style>
	h2 {
		font-size: var(--fontsize-x-large);
		margin: 1.5rem 0 2rem 0;
	}

	h3 {
		font-size: var(--fontsize-large);
		margin-bottom: 1.5rem;
	}

	h4 {
		font-size: 1.2rem;
		margin: 0.75rem 0;
	}

	.wrapper {
		height: 30rem;
		gap: 1.2rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.side-wrapper {
		height: 30rem;
		box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
		border-radius: 30px;
		padding: 1.5rem;
	}

	.side-wrapper.left {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		height: 30rem;
	}

	.side-wrapper.right {
		display: grid;
		grid-template-rows: auto auto minmax(0, 1fr) auto auto;
		height: 30rem;
	}

	.side-wrapper.right .textarea-container {
		margin-bottom: 0.75rem;
	}

	.side-wrapper.right .broadcast-description {
		margin-bottom: 1.5rem;
	}

	.leaders-row {
		display: flex;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.leaders-row:first-of-type {
		margin: 0 0 1rem;
	}
	.demote-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border: none;
		height: 1em;
		width: 1em;
	}

	.form-holder {
		height: 100%;
	}

	.add-admin {
		width: 100%;
		font-size: var(--fontsize-small);
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		gap: 2rem;
	}

	.send-message {
		width: 100%;
		font-size: var(--fontsize-small);
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		gap: 2rem;
	}

	@media (max-width: 480px) {
		.wrapper {
			margin: 1rem;
			grid-template-columns: 1fr;
		}
	}
</style>
