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
  const applyDoubleModel = ()=>{
    
    let [_, image,
      mask] = comp.getImageData();

    const downloadLinka = document.createElement("a");
    const downloadLinkb = document.createElement("a");
    document.body.appendChild(downloadLinka);
    document.body.appendChild(downloadLinkb);

    downloadLinka.href = image;
    downloadLinka.target = "_self";
    downloadLinka.download = "svelte-draw-export-1";
    downloadLinka.click();
    downloadLinkb.href = mask;
    downloadLinkb.target = "_self";
    downloadLinkb.download = "svelte-draw-export-2";
    downloadLinkb.click();
  }
  const applySingleModel = () => {
    let [data] = comp.getImageData();

    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = data;
    downloadLink.target = "_self";
    downloadLink.download = "svelte-draw-export-" + +new Date();
    downloadLink.click();

  };
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
    <button class="btn variant-ringed" on:click={toggleMask}
      >{showMask ? "Hide Mask" : "Show Mask"}</button
    >
    <button class="btn variant-ringed" on:click={clearMask}>Clear</button>
    <button class="btn variant-ringed" on:click={undoMask}>Undo</button>
    <button class="btn variant-filled" on:click={applySingleModel}>Single</button
    >

    <button class="btn variant-filled" on:click={applyDoubleModel}>Double</button>
  </div>
</div>
