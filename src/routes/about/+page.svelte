<!-- TechStack.svelte -->
<script>
  let techStacks = [
    {
      name: "HTML",
      logoUrl: "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png",
    },
    {
      name: "CSS",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    },
    {
      name: "JavaScript",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
    },
    {
      name: "Svelte",
      logoUrl: "https://svelte.dev/svelte-logo-horizontal.svg",
    },
    {
      name: "FastAPI",
      logoUrl: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
    },
    {
      name: "PyTorch",
      logoUrl: "https://pytorch.org/assets/images/pytorch-logo.png",
    },

    {
      name: "Cloudflare",
      logoUrl: "https://www.cloudflare.com/img/logo-cloudflare-dark.svg",
    },
    {
      name: "Nginx",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c5/Nginx_logo.svg",
    },
    {
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
      name: "Azure",
    },
    // Add more technologies as needed
  ];
</script>

<div class="flex flex-col items-center justify-end px-20">
  <h2 class="text-3xl">
    Image Inpainting for Irregular Holes Using Partial Convolutions
  </h2>
  <h3 class="text-3xl m-5">Tech Stack Used:</h3>

  <div class="tech-stack grid grid-cols-3 gap-4">
    {#each techStacks as { name, logoUrl }}
      <div
        class="rounded-lg overflow-hidden border shadow-md transform hover:scale-105 transition-transform duration-300"
      >
        <img class="tech-img" src={logoUrl} alt={name} />
      </div>
    {/each}
  </div>
</div>

<style>
  .tech-img {
    height: 100px; /* Adjust height as needed */
    width: 100px;
    object-fit: contain;
  }
</style>
