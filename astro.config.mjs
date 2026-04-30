// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from '@astrojs/cloudflare';
import sitemap from "@astrojs/sitemap";

const deploy =
	import.meta.env.PROD ?
		{ site: `https://tokipona.net/` }
	:	{ site: "http://localhost/" };

// https://astro.build/config
export default defineConfig({
	...deploy,
	redirects: {
		"/tp/Default.aspx": "/",
	},
	integrations: [sitemap()],
	adapter: cloudflare(),
});
