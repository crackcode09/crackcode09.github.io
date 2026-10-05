import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// People who worked on a post or project with Nidhin (only with their permission).
// Photos live in src/content/people/photos/ and are optimised at build time.
const people = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/people' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    link: z.string().url().optional(),
    photo: image().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    excerpt: z.string().max(160),
    published: z.boolean().default(false),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    // "sources" list at the end of the post; logos are files saved next to the post
    sources: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      logo: image().optional(),
    })).default([]),
    // collaborators, by file name in src/content/people
    with: z.array(reference('people')).default([]),
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
    collaborators: z.array(reference('people')).default([]),
  }),
});

export const collections = { writing, projects, people };
