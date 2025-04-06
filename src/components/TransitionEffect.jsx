import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Variantes para os efeitos de transição entre páginas
const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Efeito de carga inicial moderno
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;
    
    const simulateProgress = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(progressInterval);
            return 98;
          }
          // Velocidade variável para simular download real
          const remaining = 100 - prev;
          const increment = Math.max(0.1, remaining * 0.1);
          return Math.min(98, prev + increment);
        });
      }, 50);
    };

    const startLoading = () => {
      setProgress(0);
      simulateProgress();
    };

    const finishLoading = () => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    };

    if (isLoading) {
      startLoading();
      // Simula tempo total de carregamento
      setTimeout(finishLoading, 2000);
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
        initial="hidden"
        animate="visible"
        variants={loadingVariants}
      >
        <motion.div
          className="text-5xl md:text-7xl font-bold mb-8 relative overflow-hidden"
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

        {/* Container da barra de progresso */}
        <div className="w-80 relative">
          {/* Barra de progresso base */}
          <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
              initial={{ width: '0%', scale: 0.95 }}
              animate={{ 
                width: `${progress}%`,
                scale: [0.95, 1, 0.95],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Efeito de brilho principal */}
              <motion.div
                className="absolute top-0 right-0 h-full w-20 bg-white opacity-30"
                animate={{
                  x: ['-200%', '200%'],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              />
              
              {/* Efeito de partículas */}
              <motion.div
                className="absolute top-0 left-0 h-full w-2 bg-white"
                animate={{
                  x: ['0%', '100%'],
                  opacity: [0, 0.8, 0],
                  scale: [0.2, 1.5, 0.2]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                  repeatDelay: 0.5
                }}
              />
            </motion.div>
          </div>

          {/* Texto de progresso */}
          <div className="mt-4 text-center">
            <motion.div
              className="text-sm font-medium text-[var(--primary)]"
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {progress < 100 ? (
                <span>Carregando... {Math.round(progress)}%</span>
              ) : (
                <span>Concluído!</span>
              )}
            </motion.div>
          </div>

          {/* Indicadores de atividade */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-[var(--primary)] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
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
