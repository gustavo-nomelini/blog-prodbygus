import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberPostCard({ title, description, date, category, imageUrl, postUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  // Configurações de animação
  const cardVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    hover: {
      scale: 1.02,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px 2px var(--primary)',
    },
  };

  // Efeito de escaneamento para o card (estilo cyberpunk)
  const scanlineAnimation = {
    initial: { y: '-100%' },
    hover: {
      y: '200%',
      transition: {
        duration: 1.5,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  // Efeito de contorno para a imagem
  const imageOverlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 0.7,
      transition: { duration: 0.3 },
    },
  };

  // Efeito para o título
  const titleVariants = {
    initial: { y: 0 },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  // Efeito para a linha decorativa
  const lineVariants = {
    initial: { width: '0%' },
    hover: {
      width: '100%',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  // Efeito para a descrição
  const descriptionVariants = {
    initial: { opacity: 0.7, y: 0 },
    hover: {
      opacity: 1,
      y: -3,
      transition: { duration: 0.3, delay: 0.1 },
    },
  };

  return (
    <motion.article
      className="relative overflow-hidden rounded-lg bg-[var(--surface)] border border-[var(--surface-border)] h-full"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Efeito de scanline cyberpunk */}
      <motion.div
        className="absolute inset-0 z-10 opacity-10 pointer-events-none"
        variants={scanlineAnimation}
      >
        <div
          className="h-full w-full bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent"
          style={{ height: '50%' }}
        ></div>
      </motion.div>

      {/* Conteúdo do card */}
      <div className="h-full flex flex-col">
        {/* Imagem com overlay */}
        <a href={postUrl} className="block relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={imageUrl || '/blog-placeholder-1.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />

          {/* Overlay com efeito de grade para estética cyberpunk */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-40"
            variants={imageOverlayVariants}
          />

          {/* Grade de sobreposição para efeito cyberpunk */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(0deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent)',
              backgroundSize: '30px 30px',
            }}
            animate={{
              opacity: isHovered ? 0.2 : 0.1,
              backgroundPosition: isHovered ? '30px 30px' : '0px 0px',
            }}
            transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
          />

          {/* Borda de sobreposição com brilho */}
          <motion.div
            className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-[var(--primary)]/30"
            animate={{
              boxShadow: isHovered
                ? 'inset 0 0 15px rgba(var(--accent-rgb), 0.3)'
                : 'inset 0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
          />
        </a>

        {/* Metadados e conteúdo de texto */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Data e categoria */}
          <div className="flex items-center gap-x-4 text-xs mb-3">
            <span className="text-[var(--text-muted)]">{date}</span>
            {category && (
              <div
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: 'var(--surface-hover)',
                  color: 'var(--primary)',
                  boxShadow: isHovered ? '0 0 8px var(--primary)' : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {category}
              </div>
            )}
          </div>

          {/* Título */}
          <motion.h3
            className="text-lg font-semibold text-[var(--text)] mb-2"
            variants={titleVariants}
          >
            <a href={postUrl} className="block relative">
              {title}
            </a>
          </motion.h3>

          {/* Linha decorativa animada */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mb-3"
            variants={lineVariants}
          />

          {/* Descrição */}
          <motion.p
            className="text-sm text-[var(--text-muted)] mb-4 flex-grow"
            variants={descriptionVariants}
          >
            {description}
          </motion.p>

          {/* Link para continuar lendo */}
          <div className="pt-2 mt-auto">
            <a
              href={postUrl}
              className="inline-flex items-center text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors group"
            >
              Continue lendo
              <svg
                className="ml-1 h-4 w-4 transform transition-transform duration-300"
                style={{ transform: isHovered ? 'translateX(3px)' : 'translateX(0)' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
