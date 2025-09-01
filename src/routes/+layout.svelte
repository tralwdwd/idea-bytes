<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>IdeaBytes</title>
</svelte:head>
<div class="h-screen text-[#111827] bg-white dark:bg-[#111827] dark:text-white">
	<Navbar />
	<div class="pt-16 h-full">
		{@render children?.()}
	</div>
</div>