<script lang="ts">
	import { page } from '$app/stores';

	import { beforeUpdate } from 'svelte';

	import NavBar from '$lib/components/navigation/NavBar.svelte';

	import { userToken } from '$lib/stores';

	beforeUpdate(() => {
		const token = localStorage.getItem('token');
		userToken.set(token ?? '');
	});
</script>

<svelte:head>
	<title>InnoTableTennis | {$page.data.title}</title>
</svelte:head>

<header>
	<NavBar />
</header>
<main>
	<slot />
</main>

<style>
	header {
		height: 4em;
		background-color: #c4d6b0;
	}
	main {
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 2em;
	}

	@media (max-width: 800px) {
		* {
			font-size: 85%;
		}
		main {
			padding: 0 1em;
		}
	}
</style>
