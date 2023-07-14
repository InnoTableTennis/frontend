<script>
	import Button from '$lib/components/base/Button.svelte';
</script>

<h2>Admin panel</h2>

<div class="wrapper">
	<div class="side-wrapper left">
		<h3>Admins</h3>
		<div class="scrollable">
			{#each Array(20) as i}
				<p>Anvar Iskhakov - @kekstroke</p>
			{/each}
		</div>
		<div class="form-holder">
			<h4>Add new admin</h4>
			<form class="add-admin">
				<input placeholder="Enter alias" />
				<div>
					<Button type="submit">Add</Button>
				</div>
			</form>
		</div>
	</div>
	<div class="side-wrapper right">
		<h3>Bot Message</h3>
		<p>Here you can write the message that bot will send to all players</p>
		<textarea class="scrollable" placeholder="Write here the message" />
		<div>
			<Button type="submit">Send</Button>
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
		gap: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.side-wrapper {
		height: 30rem;
		/* width: 50%; */
		border: 2px solid var(--tertiary-color);
		border-radius: 30px;
		padding: 1.5rem;
	}

	.side-wrapper.left {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;

		/* display: flex;
        flex: auto;
        flex-direction: column; */
		height: 30rem;
	}

	.side-wrapper.right {
		display: grid;
		grid-template-rows: auto auto minmax(0, 1fr) auto auto;
		height: 30rem;
	}

	.side-wrapper.right textarea {
		overflow-y: scroll;
        margin-bottom: 0.75rem;
        border-radius: 20px;
	}

	.side-wrapper.right p {
		margin-bottom: 1.5rem;
	}

	.scrollable {
		overflow-y: scroll;
	}

	.scrollable p {
		margin: 1rem 0;
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

	@media (max-width: 480px) {
		.wrapper {
			margin: 1rem;
			grid-template-columns: 1fr;
		}
	}
</style>
