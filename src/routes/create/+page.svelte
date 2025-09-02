<script lang="ts">
    import { whatToCode } from "$lib/what-to-code";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    let error = "";

    onMount(() => {
        whatToCode.isLoggedIn().then(loggedIn => {
            if (!loggedIn) {
                goto("/");
            }
        });
    });
</script>

<h1 class="text-4xl font-bold m-6 text-center">Submit new idea.</h1>
<form method="post" on:submit={async (e)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        let res = await whatToCode.createIdea(form.ideatitle.value, form.description.value);
        if(!res.success){
            error = res.message || "Create Idea failed";
        } else {
            goto("/");
            error = "";
        }

    }} class="max-w-full m-6">
        <input type="text" name="ideatitle" placeholder="Title" class="border p-2 m-2 rounded-lg w-full" required /> <br />
        <textarea name="description" placeholder="Description" class="border p-2 m-2 rounded-lg w-full" required></textarea> <br />
        <input type="submit" value="Create Idea" class="bg-[#FFD93B] p-2 m-2 text-[#1a1a1a] rounded-lg w-full hover:bg-[#d9b832] cursor-pointer" />
    </form>
<p class="text-red-500 text-lg text-center">{error}</p>