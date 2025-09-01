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

<div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold mb-6">Create an account to submit new ideas!</h1>
    <form method="post" on:submit={async (e)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (form.password.value !== form.passwordconfirm.value) {
            error = "Passwords do not match";
            return;
        }
        let res = await whatToCode.signup(form.username.value ,form.email.value, form.password.value);
        if(!res.success){
            error = res.message || "Sign Up failed";
        } else {
            error = "";
            goto("/");
        }

    }} class="w-96 max-w-full">
        <input type="text" name="username" placeholder="Username" class="border p-2 m-2 rounded-lg w-full" required /> <br />
        <input type="email" name="email" placeholder="Email" class="border p-2 m-2 rounded-lg w-full" required /> <br />
        <input type="password" name="password" placeholder="Password" class="border p-2 m-2 rounded-lg w-full" required />
        <input type="password" name="passwordconfirm" placeholder="Confirm password" class="border p-2 m-2 rounded-lg w-full" required />
        <input type="submit" value="Sign Up" class="bg-[#FFD93B] p-2 m-2 text-[#1a1a1a] rounded-lg w-full hover:bg-[#d9b832] cursor-pointer" />
    </form>
    <p>Alread have an account? <a href="/login" class="text-blue-500">Login</a>.</p>
    <p class="text-red-500 text-lg">{error}</p>
</div>