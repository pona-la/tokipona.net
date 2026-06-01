import type { APIContext, MiddlewareNext } from "astro";
import { RENDER_DRAFTS, isDraftResponse } from "./utils/draft";

export async function onRequest(context: APIContext, next: MiddlewareNext) {
	const response = await next();
	if (!RENDER_DRAFTS && isDraftResponse(response)) {
		// ni li tan nasa a pi ilo Aso. ona li pali lon tenpo pana ala la,
		// lipu li toki 'mi lon ala' la, ona li awen wile a lon e lipu. li lon
		// e ona kepeken lipu sina pi toki ni 'lipu ni li lon ala.' ike a tan
		// ni: tenpo kama la ilo pana lon li pana e lipu la, ni li lipu lon,
		// li toki pi lon ala e ni 'mi lon ala.' nasin ni taso la ilo Aso li
		// ken lon ala e lipu: mi pana e *ala*.
		if (import.meta.env.PROD) {
			return new Response(null);
		}

		return new Response(null, { status: 404 });
	}
	return response;
}
