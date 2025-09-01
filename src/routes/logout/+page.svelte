<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { whatToCode } from '$lib/what-to-code';

  onMount(async () => {
    await whatToCode.logout(); 

    goto('/', { replaceState: true });
  });
</script>
