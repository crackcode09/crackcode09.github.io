import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    excerpt: z.string().max(160),
    published: z.boolean().default(false),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

export const collections = { writing };
