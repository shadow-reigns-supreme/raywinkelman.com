import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    html: z.string(),
    category: z.string(),
    keyword: z.string(),
    lang: z.string(),
    slug: z.string(),
    image_url: z.string().optional(),
    published_at: z.string(),
  }),
});

export const collections = { posts };
