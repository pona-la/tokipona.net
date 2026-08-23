import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const testimonials = defineCollection({
	loader: glob({
		base: "./src/content/testimonials",
		pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
		author: z.string(),
		tags: z.array(z.string()),
		notes: z.optional(z.string()),
	}),
});

const faqEntry = z.object({
	title: z.string(),
	simple: z.string(),
	image: z.string(),
	faq_group: z.int(),
	faq_index: z.int(),
});

const faqEntries = defineCollection({
	loader: glob({ base: "./src/content/faq", pattern: "**/*.{md,mdx}" }),
	schema: z.discriminatedUnion("published", [
		faqEntry.extend({ published: z.literal(true) }),
		faqEntry.partial().extend({ published: z.literal(false) }),
	]),
});

export const collections = { testimonials, faqEntries };
