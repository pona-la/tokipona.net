import type { AstroGlobal } from "astro";

// ni li toki tawa pali insa middleware.ts pi ilo pana e ni: lipu ni li pini ala, o pana ala e ona lon lipu suli.
export function draft({ response }: AstroGlobal) {
	response.headers.append("x-draft", "true");
}

export function isDraftResponse(response: Response) {
	return response.headers.has("x-draft");
}

export const RENDER_DRAFTS =
	import.meta.env.DEV ||
	(import.meta.env.CF_PAGES && import.meta.env.CF_PAGES_BRANCH !== "main");
