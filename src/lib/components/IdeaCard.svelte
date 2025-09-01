<script lang="ts">
    export let idea: {$id: string, title: string, description: string};
</script>
<div class="border rounded-lg m-5">
    <h2 class="text-xl font-bold p-2">{idea.title}</h2>
    <p class="p-2 text-lg">{idea.description}</p>
    
</div>