import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    // Campos adicionais para SEO
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    minutesToRead: z.number().optional(),
  }),
});

export const collections = { blog };
