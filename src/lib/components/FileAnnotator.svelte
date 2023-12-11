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

  <div class="flex justify-evenly py-5">
    <button class="btn bg-transparent variant-soft-primary">Change Image</button>
    <button class="btn ">Hide Mask</button>
    <button class="btn ">Clear</button>
    <button class="btn ">Undo</button>
    <button class="btn variant-filled">Apply Model</button>
  </div>
</div>
