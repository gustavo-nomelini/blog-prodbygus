import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CATEGORIES } from '../consts';
import CyberButton from './CyberButton';
import CyberPostCard from './CyberPostCard';

export default function CyberPostGrid({ posts, initialCategory = null }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Usar as categorias definidas em consts.ts
  const categories = CATEGORIES.map((cat) => cat.slug);

  // Filtrar posts quando a categoria ativa mudar
  useEffect(() => {
    if (!activeCategory || activeCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => post.categories && post.categories.includes(activeCategory))
      );
    }
    setCurrentPage(1);
  }, [activeCategory, posts]);

  // Calcular posts para a página atual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Variantes para animação do container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  // Variantes para os itens
  const postVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Variantes para filtros
  const filterVariants = {
    inactive: {
      scale: 1,
      color: 'var(--text)',
      backgroundColor: 'transparent',
      borderColor: 'var(--surface-border)',
      boxShadow: 'none',
    },
    active: {
      scale: 1.05,
      color: 'var(--primary)',
      backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
      borderColor: 'var(--primary)',
      boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.3)',
    },
  };

  // Gestos para navegação
  const swipeThreshold = 50;
  const handleSwipe = (event, info) => {
    if (info.offset.x > swipeThreshold && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (info.offset.x < -swipeThreshold && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Obter o nome da categoria para exibição
  const getCategoryName = (slug) => {
    const category = CATEGORIES.find((c) => c.slug === slug);
    return category ? category.name : slug;
  };

  return (
    <div>
      {/* Filtros de categoria */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.slug}
            className="px-4 py-2 text-sm rounded-md border transition-all"
            variants={filterVariants}
            initial="inactive"
            animate={activeCategory === category.slug ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.slug)}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid de posts */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleSwipe}
      >
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={postVariants}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
            >
              <CyberPostCard
                title={post.title}
                description={post.description}
                date={post.date}
                categories={post.categories}
                primaryCategory={post.primaryCategory}
                imageUrl={post.imageUrl}
                postUrl={post.postUrl}
                getCategoryName={getCategoryName}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-[var(--text-muted)]">
              Nenhum post encontrado nesta categoria.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Paginação */}
      {totalPages > 1 && (
        <motion.div
          className="mt-10 flex justify-center items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CyberButton
            type="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </span>
          </CyberButton>

          <div className="text-sm px-4 py-2 rounded-md border border-[var(--surface-border)] bg-[var(--surface)]">
            <span className="text-[var(--text-muted)]">Página</span>
            <span className="mx-1 text-[var(--primary)] font-medium">{currentPage}</span>
            <span className="text-[var(--text-muted)]">de</span>
            <span className="mx-1 text-[var(--primary)] font-medium">{totalPages}</span>
          </div>

          <CyberButton
            type="secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="flex items-center">
              Próximo
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </CyberButton>
        </motion.div>
      )}
    </div>
  );
}
