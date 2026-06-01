// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from "@astrojs/sitemap";

const deploy =
	import.meta.env.PROD ?
		{ site: `https://tokipona.net/` }
	:	{ site: "http://localhost/" };

// https://astro.build/config
export default defineConfig({
	...deploy,
	// tenpo ni la ilo cloudflare pages li pana e lipu. nasin ona la, sitelen
	// palisa pini o lon a nimi ilo lipu - sina lukin lukin e lipu kepeken ni ala
	// la ilo li ante e nasin li pana e ni. taso jan li kepeken ilo Aso lon ilo
	// ona la ni li kama ala la, sona jan li pakala. lawa ni li tawa ni: ilo Aso
	// pi pali ilo o sama ilo pana lon cloudflare.
	trailingSlash: 'always',
	redirects: {
		'/tp/Default.aspx': '/',
	},
	integrations: [mdx(), sitemap()],
	adapter: cloudflare(),
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Andika',
			cssVariable: '--font-andika',
			styles: ['normal', 'italic'],
			weights: [400, 700],
		},
	],
});
