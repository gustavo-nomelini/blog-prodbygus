import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Variantes para os efeitos de transição entre páginas
const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Efeito de carga inicial "cyberpunk"
const loadingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { width: '0%' },
  visible: {
    width: '100%',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

const glitchAnimation = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export default function TransitionEffect({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] text-[var(--primary)]"
        initial="hidden"
        animate="visible"
        variants={loadingVariants}
      >
        <motion.div
          className="text-5xl md:text-7xl font-bold mb-6 relative overflow-hidden"
          variants={glitchAnimation}
        >
          <span className="relative inline-block">
            <span className="absolute -left-1 top-0 text-[var(--accent)] opacity-70 blur-[2px]">
              PRODBYGUS
            </span>
            <span className="absolute -right-1 bottom-0 text-[var(--secondary)] opacity-70 blur-[2px]">
              PRODBYGUS
            </span>
            PRODBYGUS
          </span>
        </motion.div>

        <motion.div className="w-64 h-1 bg-[var(--surface)] rounded overflow-hidden mb-8 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
            variants={lineVariants}
          />
          <motion.div
            className="absolute top-0 left-0 w-16 h-full bg-white opacity-30 blur-sm"
            animate={{
              x: ['-100%', '400%'],
              transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              },
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="w-full h-full"
    >
      {children}
    </motion.main>
  );
}
