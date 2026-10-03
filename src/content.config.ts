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

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    lift: z.enum(['red', 'green', 'gold', 'default']),
    tags: z.array(z.string()),
    blurb: z.string(),
    href: z.string(),
    status: z.enum(['live', 'coming-soon', 'draft']),
    featured: z.boolean().default(false),
  }),
});

export const collections = { writing, projects };
