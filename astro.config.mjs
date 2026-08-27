// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import yaml from "@rollup/plugin-yaml";
import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";

let siteUrl = "http://localhost";

if (process.env.CF_PAGES) {
	siteUrl = `https://${process.env.CF_PAGES_BRANCH}.tokipona-net-7fb.pages.dev`;
	if (process.env.CF_PAGES_BRANCH === "main") {
		siteUrl = "https://tokipona.net";
	}
} else if (process.env.WORKERS_CI) {
	siteUrl = `https://${process.env.WORKERS_CI_BRANCH}-${process.env.WORKERS_CI_DOMAIN}`;
	if (process.env.WORKERS_CI_BRANCH === "main") {
		siteUrl = `https://${process.env.WORKERS_CI_DOMAIN}`;
		if (process.env.WORKERS_CI_DOMAIN?.startsWith("tokipona-net.")) {
			siteUrl = "https://tokipona.net";
		}
	}
}

console.log(siteUrl);

// https://astro.build/config
export default defineConfig({
	site: siteUrl,

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
		{
			provider: fontProviders.local(),
			name: "nasin-nanpa",
			cssVariable: "--font-nasin-nanpa",
			options: {
				variants: [
					{
						weight: "400",
						style: "normal",
						src: ["./src/assets/fonts/nasin-nanpa-5.0.0-beta.3.otf"],
					},
				],
			},
		},
	],

	integrations: [mdx(), sitemap()],

	adapter: cloudflare({
		// ni li suli. sina weka e ni la, pali insa middleware.ts li lukin lon ala e lipu la, ona li kama lon e lipu pi ijo insa ala. (???)
		prerenderEnvironment: "node",
	}),

	vite: {
		build: {
			target: browserslistToEsbuild(),
			cssMinify: "lightningcss",
		},
		css: {
			lightningcss: {
				targets: browserslistToTargets(browserslist()),
			},
		},
		plugins: [yaml()],
		envPrefix: ["PUBLIC_,", "CF_", "WORKERS_"],
	},
});
