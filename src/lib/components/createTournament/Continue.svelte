<script lang="ts">
	import { alertPopup } from "$lib/popupHandler";
	import Button from "$lib/components/base/Button.svelte";
	import BackArrowButton from "$lib/components/base/BackArrowButton.svelte";

    export let stage;

	const nextStage = function () {
		stage = 'numberFinals';
	};
	const finishTournament = async function () {
		let isConfirmed = await alertPopup('Are you sure that you want finish this tournament?');
		if (isConfirmed) {
			stage = 'groups';
		}
	};
	function back() {
        stage='groups';
	}
</script>

<BackArrowButton
    action={back}
/>

<div class="center">
    <div class="content">
        <h1>Do you want to continue tournament?</h1>
        <div class="line-2-elems">
            <Button type='button' on:click={() => finishTournament()}>
                Finish
            </Button>
            <Button type='button' on:click={() => nextStage()}>
                Continue
            </Button>
        </div>
    </div>
</div>

<style>
    .center {
		display: flex;
		height: 90vh;
	}
	.content {
		margin: auto;
		width: 35rem;
		height: 8rem;
		text-align: center;
	}
    .line-2-elems {
        margin: auto;
		margin-top: 3rem;
		width: 20rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	h1 {
		font-size: var(--fontsize-large);
		font-weight: var(--fontweight-1);
        letter-spacing: 0.09375rem;
	}
</style>
