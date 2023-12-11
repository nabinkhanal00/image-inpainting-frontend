<script>
  import { onMount } from "svelte";

  export let width = 300;
  export let height = 300;
  export let color = "#333";
  export let imgSrc;

  let imageCanvas, imageContext;
  let maskCanvas, maskContext;
  let isDrawing;
  let start;
  console.log("Image Source:", imgSrc);

  onMount(() => {
    imageContext = imageCanvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      imageContext.drawImage(img, 0, 0, width, height);
    };
  });

  // const handleStart = ({ offsetX: x, offsetY: y }) => {
  //   if (color === background) {
  //     context.clearRect(0, 0, width, height);
  //   } else {
  //     isDrawing = true;
  //     start = { x, y };
  //   }
  // };

  // const handleEnd = () => {
  //   isDrawing = false;
  // };
  // const handleMove = ({ offsetX: x1, offsetY: y1 }) => {
  //   if (!isDrawing) return;

  //   const { x, y } = start;
  //   context.beginPath();
  //   context.moveTo(x, y);
  //   context.lineTo(x1, y1);
  //   context.closePath();
  //   context.stroke();

  //   start = { x: x1, y: y1 };
  // };

  // const handleSize = () => {
  //   const { top, left } = canvas.getBoundingClientRect();
  //   t = top;
  //   l = left;
  // };
</script>

<canvas id="image" bind:this={imageCanvas} {width} {height} />

<!--
<canvas
  id="maskCanvas"
  bind:this={maskCanvas}
  {width}
  {height}
  on:mousedown={handleStart}
  on:touchstart={(e) => {
    const { clientX, clientY } = e.touches[0];
    handleStart({
      offsetX: clientX - l,
      offsetY: clientY - t,
    });
  }}
  on:mouseup={handleEnd}
  on:touchend={handleEnd}
  on:mouseleave={handleEnd}
  on:mousemove={handleMove}
  on:touchmove={(e) => {
    const { clientX, clientY } = e.touches[0];
    handleMove({
      offsetX: clientX - l,
      offsetY: clientY - t,
    });
  }}
/>
-->
<style>
  #image {
    position: relative;
    z-index: 1;
    margin-left: auto;
    margin-right: auto;
  }
  #mask {
    position: absolute;
    z-index: 2;
  }
</style>
