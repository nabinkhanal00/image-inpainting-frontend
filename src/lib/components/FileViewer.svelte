<script>
  import ImageEncoder from "$lib/components/ImageEncoder.svelte";
  import { onMount } from "svelte";
  export let img, classes, width, height, changeImage, nextStep;
  let displayWidth, displayHeight;
  let element;
  onMount(() => {
    let totalWidth = element.offsetWidth;
    let totalHeight = element.offsetHeight;
    let scale = width / height;
    let possibleWidth = (totalWidth * 3) / 4;
    displayWidth = Math.min(width);
    displayHeight = displayWidth / scale;
  });

  let output;
</script>

<div bind:this={element} class={classes}>
  <ImageEncoder
    width={displayWidth}
    height={displayHeight}
    src={img.src}
    bind:url={output}
    classes="ml-auto mr-auto"
  />
  <div class="flex justify-evenly p-5">
    <button class="btn variant-filled" on:click={changeImage}
      >Change Image</button
    >
    <button
      class="btn variant-filled"
      on:click={() => {
        nextStep(output, displayWidth, displayHeight);
      }}>Next Step</button
    >
  </div>
</div>
