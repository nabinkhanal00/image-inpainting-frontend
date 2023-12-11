<script>
  import CanvasDraw from "./CanvasDraw.svelte";
  export let url, classes, width, height, changeImage;
  let brushRadius = 5;
  let brushColor = "white";
  const hideMask=()=>{}
  const clearMask=()=>{}
  const undoMask=()=>{}
  const applyModel=()=>{}
</script>

<div class=" {classes}">
  <CanvasDraw
    {width}
    {height}
    classes="self-center"
    imgSrc={url}
    {brushColor}
    {brushRadius}
  />
  <div class="flex justify-center py-5 px-0">
    <button class="btn variant-ringed" on:click={changeImage}
      >Change Image</button
    >
    <button class="btn variant-ringed" on:click={hideMask}>Hide Mask</button>
    <button class="btn variant-ringed" on:click={clearMask}>Clear</button>
    <button class="btn variant-ringed" on:click={undoMask}>Undo</button>
    <button class="btn variant-filled" on:click={applyModel}>Apply Model</button
    >
  </div>
</div>
