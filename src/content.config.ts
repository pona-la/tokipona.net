import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const testimonials = defineCollection({
	loader: glob({ base: './src/content/testimonials', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		author: z.string(),
	}),
});

export const collections = { testimonials };
