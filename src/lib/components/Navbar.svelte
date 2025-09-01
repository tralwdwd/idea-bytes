<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import { whatToCode } from '$lib/what-to-code';
    import { afterNavigate, goto } from '$app/navigation';
    let isLoggedIn = false;
    let menuOpen = false;

    async function checkLogin() {
        isLoggedIn = await whatToCode.isLoggedIn();
    }

    checkLogin();

    afterNavigate(() => {
        checkLogin();
        menuOpen = false;
    });

    function handleRandomClick(event: MouseEvent) {
        event.preventDefault();
        goto('/random');
    }
</script>
<div class="flex flex-row w-full h-16 dark:bg-slate-800 bg-gray-100 fixed top-0 mb-16 items-center">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="flex flex-row cursor-pointer mb-2" on:click={() => goto('/')}>
        <img src={favicon} alt="logo" class="h-12 w-12 pt-3 pl-4" />
        <h1 class="text-2xl pt-4 pl-4 font-bold" >IdeaBytes</h1>
    </div>
    <div class="flex-grow"></div>
    <div class="hidden md:flex flex-row items-center mb-2">
        <a href="/random" class="text-lg pt-5 pr-4 hover:underline mb-2" on:click={handleRandomClick}>Random</a>
        {#if isLoggedIn}
            <a href="/logout" class="text-lg pt-5 pr-4 hover:underline mb-2">Logout</a>
        {:else}
            <a href="/login" class="text-lg pt-5 pr-4 hover:underline mb-2">Login</a>
            <a href="/signup" class="text-lg pt-5 pr-4 hover:underline mb-2">Sign Up</a>
        {/if}
    </div>
    <button class="md:hidden focus:outline-none p-4" on:click={() => menuOpen = !menuOpen} aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
    </button>
    {#if menuOpen}
        <div class="absolute top-16 right-0 bg-gray-100 dark:bg-slate-800 w-full flex flex-col items-end md:hidden z-50 shadow-lg">
            <a href="/random" class="text-lg p-4 hover:underline w-full text-left mb-2" on:click={handleRandomClick}>Random</a>
            {#if isLoggedIn}
                <a href="/logout" class="text-lg p-4 hover:underline w-full text-left mb-2">Logout</a>
            {:else}
                <a href="/login" class="text-lg p-4 hover:underline w-full text-left mb-2">Login</a>
                <a href="/signup" class="text-lg p-4 hover:underline w-full text-left mb-2">Sign Up</a>
            {/if}
        </div>
    {/if}
</div>