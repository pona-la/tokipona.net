// @ts-check
import { defineConfig } from "astro/config";

const deploy =
	import.meta.env.PROD ?
		{ site: `https://tokipona.net/` }
	:	{ site: "http://localhost/" };

// https://astro.build/config
export default defineConfig({ ...deploy, integrations: [] });
