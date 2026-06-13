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

const courses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    status: z.enum(['live', 'coming-soon', 'draft']),
    label: z.string(),
    accent: z.enum(['green', 'red', 'gold', 'default']),
    modules: z.number(),
    projects: z.number(),
    duration: z.string(),
    cost: z.string(),
    repo: z.string().url(),
  }),
});

export const collections = { writing, courses };
