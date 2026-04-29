// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

const deploy =
	import.meta.env.PROD ?
		{ site: `https://tokipona.net/` }
	:	{ site: "http://localhost/" };

// https://astro.build/config
export default defineConfig({
	...deploy,
	redirects: {
		'/tp/Default.aspx': '/',
	},
	integrations: [mdx()],
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
