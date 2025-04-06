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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulação de carregamento progressivo
    let interval;
    if (isLoading) {
      // Inicia em 0 e incrementa gradualmente
      setProgress(0);

      // Aumenta o progresso em etapas
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Aceleração no início e desaceleração no final
          const increment = Math.max(0.5, 15 * (1 - prevProgress / 100));
          const nextProgress = prevProgress + increment;

          // Limita o progresso a 95% durante a carga simulada
          // Os últimos 5% serão preenchidos quando o carregamento terminar
          return nextProgress > 95 ? 95 : nextProgress;
        });
      }, 100);
    }

    // Tempo total para o carregamento simulado
    const timer = setTimeout(() => {
      if (interval) clearInterval(interval);
      // Finaliza o progresso para 100%
      setProgress(100);
      // Espera a barra terminar de preencher antes de remover a tela de carregamento
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
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

        <div className="w-72 h-3 bg-[var(--surface)] rounded-full overflow-hidden mb-4 relative">
          {/* Barra de progresso principal com gradiente */}
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          />

          {/* Brilho móvel na barra (mais visível) */}
          <motion.div
            className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              x: ['-100%', '170%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          />

          {/* Segunda camada de brilho para reforçar o efeito */}
          <motion.div
            className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: ['-100%', '170%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              delay: 0.3,
              ease: 'easeInOut',
            }}
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          />

          {/* Efeito de partículas */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute top-0 h-full w-[2px] bg-white rounded-full"
              style={{
                left: `${Math.min(progress, 95) * (i / 10 + 0.1)}%`,
                opacity: 0.6 - i * 0.05,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                height: ['30%', '80%', '30%'],
                y: ['30%', '10%', '30%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + i * 0.1,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Borda luminosa na frente da barra */}
          <motion.div
            className="absolute top-0 h-full w-[3px] bg-white rounded-r-full opacity-70"
            style={{
              left: `${progress}%`,
              display: progress > 0 ? 'block' : 'none',
            }}
          />
        </div>

        {/* Indicador de progresso estilizado */}
        <motion.div
          className="text-xs text-[var(--muted)] font-mono relative flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[var(--primary)]">{Math.round(progress)}%</span>
          <span>carregando</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              repeatType: 'loop',
            }}
          >
            ...
          </motion.span>
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
