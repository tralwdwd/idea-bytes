<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import IdeaCard from "$lib/components/IdeaCard.svelte";
    import { get } from "svelte/store";
    const { data } = $props<{
        data: {
            idea: { $id: string, title: string, description: string }
        }
    }>();
</script>

<!-- svelte-ignore event_directive_deprecated -->
<button
    class="m-5 p-2 bg-[#FFD93B] text-[#1a1a1a] rounded hover:bg-[#d9b832] cursor-pointer"
    on:click={() => goto(get(page).url.pathname, { replaceState: true, invalidateAll: true })}
>
    <i class="fa-repeat fa-solid"></i> New Random Idea
</button>

<IdeaCard idea={data.idea} />