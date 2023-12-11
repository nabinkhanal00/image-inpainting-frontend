<script>
  import { onMount } from "svelte";
  export let url, classes, width, height;

  onMount(() => {
    console.log(url);
  });
</script>

<div class=" {classes}">
  <div>
    <img alt="confirmed" class="ml-auto mr-auto" src={url} {width} {height} />
  </div>
</div>
