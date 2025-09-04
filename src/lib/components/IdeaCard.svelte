<script lang="ts">
    export let idea: {$id: string, title: string, description: string};

    function shareIdea() {
        const shareData = {
            title: `IdeaBytes - ${idea.title}`,
            text: idea.description,
            url: `${window.location.origin}/post/${idea.$id}`
        };

        if (navigator.share) {
            navigator.share(shareData).catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that do not support the Web Share API
            navigator.clipboard.writeText(shareData.url).then(() => {
                alert('Link copied to clipboard!');
            }).catch((error) => console.log('Error copying link', error));
        }
    }
</script>
<div class="border rounded-lg m-5 mb-0">
    <h2 class="text-xl font-bold p-2">{idea.title}</h2>
    <p class="p-2 text-lg">{idea.description}</p>
     <button
      class="flex items-center gap-1 p-2 text-sm text-gray-400 cursor-pointer hover:text-white transition"
      aria-label="Share idea"
      on:click = {shareIdea}
    >
      <i class="fa-solid fa-share-nodes"></i>
      <span>Share</span>
    </button>
</div>