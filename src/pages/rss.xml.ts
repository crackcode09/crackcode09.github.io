import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// Field notes feed at /rss.xml: published posts only, newest first.
export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => data.published === true))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'field notes · nidhy.dev',
    description: 'Articles on industrial engineering, systems thinking, AI tools, and building in public.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      categories: [post.data.tag],
      link: `/writing/${post.id}/`,
    })),
    customData: '<language>en</language>',
  });
}
