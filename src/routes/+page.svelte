<script>
  import Header from "$lib/components/Header.svelte";
  import Title from "$lib/components/Title.svelte";
  import FilePicker from "$lib/components/FilePicker.svelte";
  import FileViewer from "$lib/components/FileViewer.svelte";
  import FileAnnotator from "$lib/components/FileAnnotator.svelte";
  import Results from "$lib/components/Results.svelte";

  $: content =
    "Upload your image, scale, and use your cursor to drag your image to center. Uploaded image will be zoomed/cropped by default.";
  $: title = "step one";
  let file;
  let confirmed = false;
  let uploaded = false;
  let fileSelect = (fileList) => {
    file = fileList[0];
    console.log(file);
  };
</script>

<div class="w-screen h-screen flex flex-col">
  <Header classes="" />
  <Title classes="w-3/4 self-center" {title} {content} />
  {#if !file}
    <FilePicker {fileSelect} classes="card p-4 w-3/4 self-center" />
  {:else if !confirmed}
    <FileViewer />
  {:else if !uploaded}
    <FileAnnotator />
  {:else}
    <Results />
  {/if}
</div>
