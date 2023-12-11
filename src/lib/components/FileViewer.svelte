<script>
  import { ImageEncoder } from "svelte-image-input";
  import { onMount } from "svelte";
  export let img, classes, width, height, changeImage, nextStep;
  let displayWidth, displayHeight;
  let element;
  onMount(() => {
    let totalWidth = element.offsetWidth;
    let totalHeight = element.offsetHeight;
    let scale = width / height;
    console.log(width, height, scale);
    let possibleWidth = (totalWidth * 3) / 4;
    displayWidth = Math.min(possibleWidth, 500);
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
    quality={1}
    realTime={false}
    classes="ml-auto mr-auto"
  />
  <div class="flex justify-evenly p-5">
    <button class="btn variant-filled" on:click={changeImage}
      >Change Image</button
    >
    <button
      class="btn variant-filled"
      on:click={() => {
        nextStep(output);
      }}>Next Step</button
    >
  </div>
</div>
