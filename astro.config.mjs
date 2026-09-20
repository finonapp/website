import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	// The site's CSS is about 6 KB, so inlining it saves a render-blocking request on every page.
	build: { inlineStylesheets: "always" },
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
});
