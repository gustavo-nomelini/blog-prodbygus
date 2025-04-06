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
    let loadingTimeout;

    // Função de preenchimento mais rápida
    const simulateProgress = () => {
      // Limpar qualquer intervalo anterior
      if (progressInterval) clearInterval(progressInterval);

      // Começar do zero
      setProgress(0);

      // Definir pontos de parada para criar um efeito mais rápido mas ainda suave
      const stages = [
        { target: 40, duration: 200 }, // Início muito rápido
        { target: 80, duration: 300 }, // Meio rápido
        { target: 99, duration: 200 }, // Final rápido
      ];

      let currentStage = 0;
      let startTime = Date.now();
      let startProgress = 0;

      const updateProgress = () => {
        if (currentStage >= stages.length) {
          clearInterval(progressInterval);
          return;
        }

        const { target, duration } = stages[currentStage];
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(1, elapsed / duration);

        // Efeito de easing mais rápido
        const easedRatio = ratio; // Linear para mais velocidade
        const newProgress = startProgress + (target - startProgress) * easedRatio;

        setProgress(newProgress);

        // Passar para o próximo estágio quando este terminar
        if (ratio >= 1) {
          startTime = Date.now();
          startProgress = target;
          currentStage++;
        }
      };

      // Atualizar mais rápido - 10ms (aproximadamente 100fps)
      progressInterval = setInterval(updateProgress, 10);
    };

    const startLoading = () => {
      simulateProgress();
    };

    const finishLoading = () => {
      // Limpar o intervalo de progresso
      clearInterval(progressInterval);

      // Definir progresso para 100% no final
      setProgress(100);

      // Aguardar menos tempo para mostrar 100% antes de remover a tela de carregamento
      setTimeout(() => setIsLoading(false), 200);
    };

    if (isLoading) {
      startLoading();

      // Tempo total de carregamento reduzido significativamente
      loadingTimeout = setTimeout(finishLoading, 1200);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
        initial="hidden"
        animate="visible"
        variants={loadingVariants}
        transition={{ duration: 0.2 }} // Transição mais rápida
      >
        <motion.div
          className="text-4xl md:text-6xl font-bold mb-4 relative overflow-hidden" // Tamanho reduzido
          variants={glitchAnimation}
          transition={{ duration: 0.2 }} // Transição mais rápida
        >
          <span className="relative inline-block">
            <span className="absolute -left-0.5 top-0 text-[var(--accent)] opacity-50 blur-[1px]">
              PRODBYGUS
            </span>
            <span className="absolute -right-0.5 bottom-0 text-[var(--secondary)] opacity-50 blur-[1px]">
              PRODBYGUS
            </span>
            <span className="relative z-10 text-[var(--foreground)]">PRODBYGUS</span>
          </span>
        </motion.div>

        {/* Container da barra de progresso - mais compacto */}
        <div className="w-64 relative">
          {' '}
          {/* Reduzido de 80 para 64 */}
          {/* Barra de progresso base */}
          <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden shadow-inner">
            {' '}
            {/* Altura reduzida */}
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.1, // Transição mais rápida
                ease: 'linear', // Mais suave e rápido
              }}
            />
          </div>
          {/* Efeito de partículas otimizadas posicionadas acima da barra */}
          <div className="absolute -top-2 left-0 right-0 h-2">
            {[...Array(5)].map((_, i) => {
              // Configurações únicas para cada partícula
              const speedFactor = 0.7 + i * 0.15; // Velocidades diferentes (0.7, 0.85, 1.0, 1.15, 1.3)
              const sizeVariation = 0.8 + (i % 3) * 0.2; // Tamanhos diferentes
              const delayOffset = i * 0.12; // Delays escalonados
              const opacityBase = 0.5 + (i % 2) * 0.3; // Opacidades diferentes

              return (
                <motion.div
                  key={i}
                  className="absolute h-2 top-0 bg-white rounded-full shadow-[0_0_3px_white] z-10"
                  style={{
                    width: `${0.8 + (i % 3) * 0.3}px`,
                    opacity: progress < i * 15 ? 0 : 1,
                    left: '0%',
                  }}
                  animate={{
                    left: ['0%', '100%'],
                    y: ['-20%', '20%', '-10%', '15%', '-5%'],
                    opacity: [opacityBase, opacityBase + 0.4, opacityBase],
                    scale: [sizeVariation, sizeVariation * 1.5, sizeVariation],
                    boxShadow: [
                      '0 0 2px rgba(255,255,255,0.4)',
                      '0 0 4px rgba(255,255,255,0.7)',
                      '0 0 2px rgba(255,255,255,0.4)',
                    ],
                  }}
                  transition={{
                    left: {
                      repeat: Infinity,
                      duration: 1.2 / speedFactor, // Velocidade diferente para cada partícula
                      ease: 'linear',
                      repeatDelay: delayOffset,
                    },
                    opacity: {
                      repeat: Infinity,
                      duration: 0.6,
                      ease: 'easeInOut',
                      repeatDelay: 0.1,
                    },
                    scale: {
                      repeat: Infinity,
                      duration: 0.8,
                      ease: 'easeInOut',
                    },
                    y: {
                      repeat: Infinity,
                      duration: 1,
                      ease: 'easeInOut',
                    },
                  }}
                />
              );
            })}
          </div>
          {/* Texto de progresso simplificado */}
          <div className="mt-3 text-center">
            {' '}
            {/* Margem reduzida */}
            <motion.div
              className="text-xs font-medium text-[var(--primary)]" // Tamanho reduzido
              animate={{ opacity: [0.6, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              {progress < 100 ? (
                <span>Carregando {Math.round(progress)}%</span>
              ) : (
                <span>Pronto!</span>
              )}
            </motion.div>
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
      transition={{ type: 'spring', stiffness: 150, damping: 12 }} // Mais responsivo
      className="w-full h-full"
    >
      {children}
    </motion.main>
  );
}
