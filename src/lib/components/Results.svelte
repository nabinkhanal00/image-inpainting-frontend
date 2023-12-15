<script>
  import { onMount } from "svelte";
  export let url, image, mask, annotated, width, height, classes, changeImage;
  let imageSrc;
  let fetchDone = false;
  onMount(async () => {
    console.log(image, mask);
    const formData = new FormData();

    const dataURLtoFile = (dataurl, filename) => {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };
    formData.append("img", dataURLtoFile(image, "image.png"));
    formData.append("mask", dataURLtoFile(mask, "mask.png"));
    const fetchOptions = {
      method: "post",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    };
    const response = await fetch(url, fetchOptions);

    const file = await response.blob();
    imageSrc = URL.createObjectURL(file);
    fetchDone = true;
  });
</script>

{#if fetchDone}
  <div class="flex {classes} justify-center">
    <div>
      <img alt="annotated" src={annotated} />
    </div>
    <div class="ml-2">
      <img
        id="inpainted-image"
        alt="inpainted"
        {width}
        {height}
        src={imageSrc}
      />
    </div>
  </div>

  <div class="flex justify-center py-5 px-0">
    <button class="btn variant-filled" on:click={changeImage}>Start Over</button
    >
  </div>
{:else}
  <div class="flex {classes} justify-center">Loading</div>
{/if}

<style>
  #inpainted-image {
    height: 100%;
  }
</style>
