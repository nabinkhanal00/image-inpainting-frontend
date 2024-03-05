<script>
  import { goto } from "$app/navigation";
  function routeToPage(route, replaceState) {
    goto(`/${route}`, { replaceState });
  }
  export let classes;
  import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<div class="flex p-5 justify-center items-center {classes}">
  <a class="text-4xl ml-auto" href="/">IMAGE INPAINTING</a>
  <div class=" ml-auto">
    <LightSwitch />
  </div>
</div>
