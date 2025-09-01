<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import { whatToCode } from '$lib/what-to-code';
    import { afterNavigate, goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { invalidate } from '$app/navigation';
    import { get } from 'svelte/store';

    let isLoggedIn = false;

    async function checkLogin() {
        isLoggedIn = await whatToCode.isLoggedIn();
    }

    checkLogin();

    afterNavigate(() => {
        checkLogin();
    });

    function handleRandomClick(event: MouseEvent) {
        event.preventDefault();
        goto('/random');
    }
</script>
<div class="flex flex-row w-full h-16 dark:bg-slate-800 bg-gray-100 fixed top-0 mb-9">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="flex flex-row cursor-pointer" onclick={() => goto('/')}>
        <img src={favicon} alt="logo" class="h-12 w-12 pt-3 pl-4" />
        <h1 class="text-2xl pt-4 pl-4 font-bold">IdeaBytes</h1>
    </div>
    <div class="flex-grow"></div>
    <a href="/random" class="text-lg pt-5 pr-4 hover:underline" onclick={handleRandomClick}>Random</a>
    {#if isLoggedIn}
        <a href="/logout" class="text-lg pt-5 pr-4 hover:underline">Logout</a>
    {:else}
        <a href="/login" class="text-lg pt-5 pr-4 hover:underline">Login</a>
        <a href="/signup" class="text-lg pt-5 pr-4 hover:underline">Sign Up</a>
    {/if}
</div>