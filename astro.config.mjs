// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import purgecss from "astro-purgecss";
import inline from "@playform/inline";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
	site:
		process.env.CF_PAGES_BRANCH === "main" ? "https://tokipona.net"
		: process.env.CF_PAGES_BRANCH ?
			`https://${process.env.CF_PAGES_BRANCH}.tokipona-net-7fb.pages.dev`
		:	"http://localhost/",

	// tenpo ni la ilo cloudflare pages li pana e lipu. nasin ona la, sitelen
	// palisa pini o lon a nimi ilo lipu - sina lukin lukin e lipu kepeken ni ala
	// la ilo li ante e nasin li pana e ni. taso jan li kepeken ilo Aso lon ilo
	// ona la ni li kama ala la, sona jan li pakala. lawa ni li tawa ni: ilo Aso
	// pi pali ilo o sama ilo pana lon cloudflare.
	trailingSlash: "always",

	redirects: {
		"/tp/Default.aspx": "/",
	},
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Andika",
			cssVariable: "--font-andika",
			styles: ["normal", "italic"],
			weights: [400, 700],
		},
	],
	integrations: [
		mdx(),
		sitemap(),
		robotsTxt(),

		purgecss(),
		inline(),
		compress(),
	],

	adapter: cloudflare({
		// ni li suli. sina weka e ni la, pali insa middleware.ts li lukin lon ala e lipu la, ona li kama lon e lipu pi ijo insa ala. (???)
		prerenderEnvironment: "node",
	}),

	vite: {
		envPrefix: ["PUBLIC_,", "CF_"],
	},
});
