import { join } from 'path';

import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,svelte}",
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte}')
  ],
  theme: {
    extend: {},
  },
  plugins: [skeleton({ themes: { preset: [{ name: "crimson", enhancements: true }] } })],

}

