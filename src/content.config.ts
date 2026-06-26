import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import Faq from "./pages/faq.astro";

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

const faqEntries = defineCollection({
	loader: glob({ base: "./src/content/faq", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		published: z.boolean(),
		title: z.string(),
		simple: z.optional(z.string()),
		image: z.optional(z.string()),
		faq_group: z.int(),
		faq_index: z.optional(z.int()),
	}),
});

export const collections = { testimonials, faqEntries };
