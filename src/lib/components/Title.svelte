<script>
  export let title;
  export let content;
  export let classes;
</script>

<div class="flex flex-col items-center p-5 {classes}">
  <h2 class="text-4xl capitalize p-2">{title}</h2>
  <h3 class="text-2xl font-thin p-2 text-center">{content}</h3>
</div>
