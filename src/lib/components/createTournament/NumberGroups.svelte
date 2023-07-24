<script lang="ts">
	import Button from "$lib/components/base/Button.svelte";
	import InputTemplate from "$lib/components/base/inputs/InputTemplate.svelte";
	import BackArrowButton from "$lib/components/base/BackArrowButton.svelte";

    export let numberGroups = 0;
    export let stage;

    const nextStage = function () {
		stage = 'groups';
	};
    function back() {
        stage='addParticipants';
	}
</script>

<BackArrowButton
    action={back}
/>

<div class="center">
    <div class="content">
        <h1>Choose the number of groups in the tournament</h1>
        <form on:submit={nextStage}>
            <div class="input">
                <InputTemplate
                    type="number"
                    min="1"
                    max="100"
                    name="groupNumber"
                    placeholder=""
                    defaultNumValue={numberGroups}
                    bind:numberVal={numberGroups}
                    textAlignCenter={true}
                />
            </div>
            <div class="button">
                <Button type='submit'>
                    Confirm
                </Button>
            </div>
        </form>
    </div>
</div>

<style>
    .center {
		display: flex;
		height: 90vh;
	}
    .content {
		margin: auto;
		width: 30rem;
		height: 16rem;
		text-align: center;
	}
	.button {
		margin: auto;
		margin-top: 2rem;
        width: 9rem;
		height: 2.75rem;
	}
    .input {
        margin: auto;
        margin-top: 3rem;
        max-width: 5rem;
    }

	h1 {
		font-size: var(--fontsize-x-large);
		font-weight: var(--fontweight-1);
        letter-spacing: 0.125rem;
    }
</style>
