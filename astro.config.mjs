// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import purgecss from 'astro-purgecss';
import inline from '@playform/inline';
import compress from 'astro-compress';

const deploy =
	import.meta.env.PROD ?
		{ site: 'https://tokipona.net/' }
	:	{ site: 'http://localhost/' };

// https://astro.build/config
export default defineConfig({
	...deploy,
	redirects: {
		'/tp/Default.aspx': '/',
	},
	integrations: [
		mdx(),
		sitemap(),
		robotsTxt(),

		purgecss(),
		inline(),
		compress(),
	],
	adapter: cloudflare(),
	site: "https://tokipona.net",
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
