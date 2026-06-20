import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import tailwindConfig from "./tailwind.config.mjs";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			tailwindcss({
				config: tailwindConfig,
			}),
		],
	},
});
