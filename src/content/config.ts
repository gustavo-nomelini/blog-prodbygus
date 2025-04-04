import { ImageMetadata } from 'astro';
import { defineCollection, z } from 'astro:content';

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

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
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
    categories: z.array(z.string()).optional().default(['desenvolvimento']),
    author: z.string().optional().default('PRODBYGUS'),
    canonicalUrl: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    minutesToRead: z.number().optional(),
  }),
});

export const collections = { blog };
