import type { ImageMetadata } from 'astro';
import { defineCollection, reference, z } from 'astro:content';

// Esquema para imagens locais com astro:assets
const imageSchema = z.union([
  // Pode ser uma string (URL externa)
  z.string(),
  // Ou um objeto ImageMetadata (importado localmente)
  z.custom<ImageMetadata>(),
]);

// Função auxiliar para converter string para Date
const stringToDate = (dateStr: string): Date => {
  try {
    const date = new Date(dateStr);
    // Verificar se a data é válida
    if (isNaN(date.getTime())) {
      console.error(`Invalid date string: ${dateStr}, using current date as fallback`);
      return new Date();
    }
    return date;
  } catch (error) {
    console.error(`Error parsing date: ${dateStr}`, error);
    return new Date();
  }
};

// Define available categories
const categoryEnum = z.enum([
  'desenvolvimento',
  'linux',
  'docker',
  'devops',
  'programação',
  'terminal',
  'web',
  'frontend',
  'backend',
  'tutorial',
  'guia',
]);

// Define authors collection schema
const authors = defineCollection({
  type: 'data', // JSON/YAML collection
  schema: z.object({
    name: z.string(),
    avatar: imageSchema.optional(),
    bio: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    website: z.string().url().optional(),
  }),
});

// Enhanced blog post schema
const blog = defineCollection({
  schema: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    // Melhor tratamento para datas
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => {
        if (!val) {
          console.error('pubDate is undefined, using current date');
          return new Date();
        }
        return stringToDate(val.toString());
      }),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? stringToDate(str) : undefined)),
    heroImage: imageSchema.optional(),
    // Campos adicionais para SEO
    categories: z.array(categoryEnum).min(1).default(['desenvolvimento']),
    tags: z.array(z.string()).optional(),
    author: reference('authors').optional().default('prodbygus'),
    canonicalUrl: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    minutesToRead: z.number().optional(),
    // Social sharing
    ogImage: imageSchema.optional(),
    twitterCard: z
      .enum(['summary', 'summary_large_image'])
      .optional()
      .default('summary_large_image'),
    // Additional content fields
    tableOfContents: z.boolean().optional().default(true),
    relatedPosts: z.array(z.string()).optional(),
    // Custom CSS for the post
    customCSS: z.string().optional(),
  }),
});

// Projects collection for showcasing your work
const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: imageSchema.optional(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    technologies: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    completed: z.boolean().optional().default(true),
    publishDate: z
      .string()
      .or(z.date())
      .transform((val) => stringToDate(val.toString())),
  }),
});

export const collections = {
  blog,
  authors,
  projects,
};
