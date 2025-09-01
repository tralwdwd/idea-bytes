<script lang="ts">
	import { afterNavigate, goto } from "$app/navigation";
    import IdeaCard from "$lib/components/IdeaCard.svelte";
    import { whatToCode } from "$lib/what-to-code";
    const { data } = $props<{
        data: {
            ideas: { $id: string, title: string, description: string }[]
        }
    }>();

    import { onMount } from "svelte";

    let isLoggedIn = $state(false);

    async function checkLogin() {
        isLoggedIn = await whatToCode.isLoggedIn();
    }

    onMount(() => {
        checkLogin();
    });

    afterNavigate(() => {
        checkLogin();
    });
</script>
{#if isLoggedIn}
<button class="m-5 p-2 bg-[#FFD93B] text-[#1a1a1a] rounded hover:bg-[#d9b832] cursor-pointer" onclick={()=>goto('/create')}>
       <i class="fa-plus fa-regular"></i> Create New Idea
</button>
{/if}


{#each data.ideas as idea}
    <IdeaCard {idea} />
{/each}