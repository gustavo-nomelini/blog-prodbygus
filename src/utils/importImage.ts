import type { ImageMetadata } from 'astro';

// Importa todas as imagens da pasta assets/images
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,gif,avif}'
);

/**
 * Função para importar imagens para posts em Markdown
 *
 * Uso:
 * ---
 * import { importImage } from '../utils/importImage';
 * const heroImage = await importImage('/src/assets/images/blog/exemplo.jpg');
 * ---
 */
export async function importImage(imagePath: string): Promise<ImageMetadata> {
  if (!imagePath) {
    throw new Error('Path para imagem está vazio ou não definido');
  }

  // Verifica se a imagem está no formato correto
  if (!imagePath.startsWith('/src/assets/images/')) {
    throw new Error(`O caminho da imagem deve começar com "/src/assets/images/": ${imagePath}`);
  }

  // Verifica se a imagem existe no objeto de imagens importadas
  if (!images[imagePath]) {
    throw new Error(`Imagem não encontrada: ${imagePath}`);
  }

  try {
    // Importa a imagem dinamicamente
    const importedImage = await images[imagePath]();
    return importedImage.default;
  } catch (error) {
    console.error(`Erro ao importar imagem: ${imagePath}`, error);
    throw new Error(`Falha ao importar imagem: ${imagePath}`);
  }
}
