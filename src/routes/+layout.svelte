<script lang='ts'>
	import { page } from '$app/stores';

	import { beforeUpdate } from 'svelte';

	import NavBar from '$lib/components/NavBar.svelte';

	import { userToken } from '$lib/stores';

	beforeUpdate(() => {
		const token = localStorage.getItem('token');
		userToken.set(token ?? '');
		// userToken.set(
		// 	'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJMRUFERVIiLCJVU0VSIiwiQURNSU4iXSwic3ViIjoiYWRtaW4iLCJpYXQiOjE2Nzc2MDYyNTAsImV4cCI6MTY3NzY5MjY1MH0.cuqyrjmlBMDSVcf_qsvi5Hghn3c4h7FqcK_WDsnD0hE'
		// );
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
