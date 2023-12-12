<script>
  import { onMount } from "svelte";

  export let width = 300;
  export let height = 300;
  export let brushColor = "#ffffff";
  export let brushRadius;
  export let imgSrc;

  let imageCanvas, imageContext;
  let maskCanvas, maskContext;
  let isDrawing = false;
  let isPressing = false;
  let mouseHasMoved = true;
  let valuesChanged = true;
  export let showMask = true;

  let start;
  let points = [],
    lines = [];
  const midPoint = (p1, p2) => {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  };
  const handleStart = (e) => {
    e.preventDefault();
    isPressing = true;
    const { x, y } = getPointerPos(e);
    handlePointerMove(x, y);
  };
  let getPointerPos = (e) => {
    const rect = maskCanvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };
  let handlePointerMove = (x, y) => {
    if (isPressing && !isDrawing) {
      isDrawing = true;
      points.push({ x, y });
    }
    if (isDrawing) {
      points.push({ x, y });
      drawPoints({ points: points, brushRadius: brushRadius });
    }
    mouseHasMoved = true;
  };
  let drawPoints = ({ points, brushRadius }) => {
    if (!showMask) {
      return;
    }
    if (points.length < 2) {
      return;
    }
    maskContext.lineJoin = "round";
    maskContext.lineCap = "round";
    maskContext.lineWidth = brushRadius;
    maskContext.strokeStyle = brushColor;
    let p1 = points[0];
    let p2 = points[1];
    maskContext.moveTo(p2.x, p2.y);
    maskContext.beginPath();
    for (let i = 1, len = points.length; i < len; i++) {
      let mp = midPoint(p1, p2);
      maskContext.quadraticCurveTo(p1.x, p1.y, mp.x, mp.y);
      p1 = points[i];
      p2 = points[i + 1];
    }
    maskContext.lineTo(p1.x, p1.y);
    maskContext.stroke();
  };

  let handleMove = (e) => {
    e.preventDefault();
    const { x, y } = getPointerPos(e);
    handlePointerMove(x, y);
  };
  let handleEnd = (e) => {
    e.preventDefault();
    handleMove(e);
    if (isPressing) {
      saveLine({ brushRadius });
    }
    isDrawing = false;
    isPressing = false;
  };
  let saveLine = ({ radius } = {}) => {
    lines.push({ points: [...points], brushRadius: radius || brushRadius });
    points.length = 0;
  };
  export const toggleMask = () => {
    showMask = !showMask;
    redraw();
  };
  export const clearMask = () => {
    lines.length = 0;
    redraw();
  };
  export const undoMask = () => {
    lines = lines.slice(0, -1);
    redraw();
  };
  export const getImageData= () => {
    let newCanvas = document.createElement("canvas");
    let _ctx = newCanvas.getContext("2d");

    newCanvas.width = width;
    newCanvas.height = height;

    [imageCanvas, maskCanvas].forEach(function (n) {
      _ctx.beginPath();
      _ctx.drawImage(n, 0, 0, width, height);
    });

  return [newCanvas.toDataURL(), imageCanvas.toDataURL(), maskCanvas.toDataURL()];
  };
  const redraw = () => {
    maskContext.clearRect(0, 0, width, height);
    lines.forEach((line) => {
      const { points, brushRadius } = line;
      drawPoints({ points, brushRadius });
    });
  };
  onMount(() => {
    imageContext = imageCanvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      imageContext.drawImage(img, 0, 0, width, height);
    };
  });

  onMount(() => {
    maskContext = maskCanvas.getContext("2d");
  });
</script>

<div id="canvasContainer">
  <canvas id="image" bind:this={imageCanvas} {width} {height} />

  <canvas
    id="mask"
    bind:this={maskCanvas}
    {width}
    {height}
    on:mousedown={handleStart}
    on:mousemove={handleMove}
    on:mouseup={handleEnd}
    on:mouseleave={handleEnd}
    on:touchstart={handleStart}
    on:touchmove={handleMove}
    on:touchend={handleEnd}
    on:touchcancel={handleEnd}
  />
</div>

<style>
  #canvasContainer {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  #image {
    z-index: 1;
    margin-left: auto;
    margin-right: auto;
  }
  #mask {
    align-self: center;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;
  }
</style>
