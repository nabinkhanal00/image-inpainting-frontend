<script>
  import { onMount } from "svelte";
  import CanvasDraw from "./CanvasDraw.svelte";
  import { RangeSlider } from "@skeletonlabs/skeleton";
  export let url, classes, width, height, changeImage;
  let brushRadius = 1;
  export let brushMax = 10;
  let brushColor = "white";
  let comp;
  const toggleMask = () => {
    comp.toggleMask();
  };
  const clearMask = () => {
    comp.clearMask();
  };
  const undoMask = () => {
    comp.undoMask();
  };
  const applyModel = () => {};
  let showMask = true;
  let slider;
  onMount(() => {
    slider.style.width = width + "px";
  });
</script>

<div class=" {classes}">
  <CanvasDraw
    bind:this={comp}
    {brushRadius}
    {width}
    {height}
    classes="self-center"
    imgSrc={url}
    {brushColor}
    bind:showMask

  />

  <div bind:this={slider} class=" ml-auto mr-auto py-2">
    <RangeSlider
      name="brush-size"
      bind:value={brushRadius}
      min={2}
      max={brushMax}
      step={1}
      ><div class="flex justify-between items-center">
        <div class="font-bold">Brush Size</div>
        <div class="text-xs">{brushRadius} / {brushMax}</div>
      </div>
    </RangeSlider>
  </div>

  <div class="flex justify-center py-5 px-0">
    <button class="btn variant-ringed" on:click={changeImage}
      >Change Image</button
    >
    <button class="btn variant-ringed" on:click={toggleMask}>{showMask? "Hide Mask" : "Show Mask"}</button>
    <button class="btn variant-ringed" on:click={clearMask}>Clear</button>
    <button class="btn variant-ringed" on:click={undoMask}>Undo</button>
    <button class="btn variant-filled" on:click={applyModel}>Apply Model</button
    >
  </div>
</div>
