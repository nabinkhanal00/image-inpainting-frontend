<script>
  import Header from "$lib/components/Header.svelte";
  import Title from "$lib/components/Title.svelte";
  import FilePicker from "$lib/components/FilePicker.svelte";
  import FileViewer from "$lib/components/FileViewer.svelte";
  import FileAnnotator from "$lib/components/FileAnnotator.svelte";
  import Results from "$lib/components/Results.svelte";

  let url = `${import.meta.env.VITE_BACKEND_URL}/uploadfile/`;
  let content =
    "Upload your image, scale, and use your cursor to drag your image to center. Uploaded image will be zoomed/cropped by default.";
  let title = "step one";
  let selected = false;
  let confirmed = false;
  let uploaded = false;
  let width, height;
  let img;
  let fileSelect = (fileList) => {
    let file = fileList[0];
    img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      width = this.width;
      height = this.height;
      selected = true;
    };
  };
  let changeImage = () => {
    selected = false;
    confirmed = false;
    uploaded = false;
    content =
      "Upload your image, scale, and use your cursor to drag your image to center. Uploaded image will be zoomed/cropped by default.";
    title = "step one";
  };
  let outputImage, outputWidth, outputHeight;
  let startMasking = (outputURL, width, height) => {
    console.log("confirmed image:", outputURL);
    outputImage = outputURL;
    outputWidth = width;
    outputHeight = height;
    confirmed = true;

    title = "Step Two";
    content =
      "Use your cursor to mask out any portions of your image, and select Apply Model to view your results.";
  };

  let originalImage, maskImage, annotatedImage, finalWidth, finalHeight;

  let handleUpload = (image, mask, annonated, width, height) => {
    title = "Voila!";
    content = "Inpainting Complete.";
    uploaded = true;
    originalImage = image;
    maskImage = mask;
    annotatedImage = annonated;
    finalWidth = width;
    finalHeight = height;
  };
</script>

<div class="w-screen h-screen flex flex-col">
  <Header classes="" />
  <Title classes="w-3/4 self-center" {title} {content} />
  {#if !selected}
    <FilePicker {fileSelect} classes="w-3/4 self-center" />
  {:else if !confirmed}
    <FileViewer
      classes="w-3/4 self-center"
      {width}
      {height}
      {img}
      {changeImage}
      nextStep={startMasking}
    />
  {:else if !uploaded}
    <FileAnnotator
      url={outputImage}
      height={outputHeight}
      width={outputWidth}
      classes="w-3/4 self-center"
      {changeImage}
      {handleUpload}
    />
  {:else}
    <Results
      {url}
      annotated={annotatedImage}
      image={originalImage}
      mask={maskImage}
      annonated={annotatedImage}
      width={finalWidth}
      height={finalHeight}
      {changeImage}
      classes="w-3/4 self-center"
    />
  {/if}
</div>
