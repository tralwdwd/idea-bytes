<script lang="ts">
    import { whatToCode } from "$lib/what-to-code";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    let error = "";

    onMount(() => {
        whatToCode.isLoggedIn().then(loggedIn => {
            if (loggedIn) {
                goto("/");
            }
        });
    });
    
</script>
<h1 class="text-4xl font-bold mb-6 text-center">Login to submit new ideas!</h1>
<form method="post" on:submit={async (e)=>{
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let res = await whatToCode.login(form.email.value, form.password.value);
    if(!res.success){
        error = res.message || "Login failed";
    } else {
        error = "";
        goto("/");
    }

}} class="m-6 max-w-full">
    <input type="email" name="email" placeholder="Email" class="border p-2 m-2 rounded-lg w-full" required /> <br />
    <input type="password" name="password" placeholder="Password" class="border p-2 m-2 rounded-lg w-full" required />
    <input type="submit" value="Login" class="bg-[#FFD93B] p-2 m-2 text-[#1a1a1a] rounded-lg w-full hover:bg-[#d9b832] cursor-pointer" />
</form>
<p class="text-center">No account? <a href="/signup" class="text-blue-500">Sign Up</a>.</p>
<p class="text-red-500 text-lg text-center">{error}</p>
