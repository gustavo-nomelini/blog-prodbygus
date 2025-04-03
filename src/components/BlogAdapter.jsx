import { useEffect, useState } from 'react';
import CyberPostGrid from './CyberPostGrid';

export default function BlogAdapter({ posts, category = null }) {
  const [formattedPosts, setFormattedPosts] = useState([]);

  // Converter posts do Astro para o formato esperado pelo CyberPostGrid
  useEffect(() => {
    if (posts && posts.length > 0) {
      const converted = posts.map((post) => {
        // Lidar com diferentes formatos de imagem heroImage
        let heroImageSrc = post.data?.heroImage || '/blog-placeholder-1.jpg';
        const postUrl = `/blog/${post.slug}/`;

        // Formatar a data usando o componente existente
        let formattedDate = '';
        if (post.data?.pubDate) {
          const dateObj = new Date(post.data.pubDate);
          formattedDate = `${dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}`;
        }

        return {
          id: post.slug,
          title: post.data?.title || 'Sem título',
          description: post.data?.description || '',
          date: formattedDate,
          categories: post.data?.categories || ['desenvolvimento'],
          primaryCategory: post.data?.categories?.[0] || 'desenvolvimento',
          imageUrl: heroImageSrc,
          postUrl: postUrl,
        };
      });

      setFormattedPosts(converted);
    }
  }, [posts]);

  return (
    <div className="py-4">
      <CyberPostGrid posts={formattedPosts} initialCategory={category} />
    </div>
  );
}
