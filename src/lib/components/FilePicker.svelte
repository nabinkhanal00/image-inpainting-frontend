<script>
  import { FileDropzone } from "@skeletonlabs/skeleton";
  export let classes, fileSelect;
  let f;
  const handleFiles= ()=>{
  fileSelect(f)
  }
</script>

<div class="{classes}">
  <FileDropzone name="filepick" on:change={handleFiles} bind:files={f} />
</div>
