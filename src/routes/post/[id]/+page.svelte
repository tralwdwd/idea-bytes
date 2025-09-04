<script lang="ts">
    import IdeaCard from "$lib/components/IdeaCard.svelte";
    const { data } = $props<{
        data: {
            idea: { $id: string, title: string, content: string } | null
        }
    }>();
    const isFound = data.idea != null;
</script>
{#if isFound}
    <IdeaCard idea={data.idea} />
{:else}
    <p class="m-5 text-lg">Idea not found.</p>
{/if}



