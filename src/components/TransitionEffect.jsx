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

    // Função de preenchimento mais direta e confiável
    const simulateProgress = () => {
      // Limpar qualquer intervalo anterior
      if (progressInterval) clearInterval(progressInterval);

      // Começar do zero
      setProgress(0);

      // Definir pontos de parada para criar um efeito mais realista
      const stages = [
        { target: 30, duration: 600 }, // Rápido no início
        { target: 60, duration: 1000 }, // Desacelera no meio
        { target: 85, duration: 1200 }, // Mais lento perto do fim
        { target: 99, duration: 700 }, // Quase finaliza
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

        // Efeito de easing para suavizar a animação
        const easedRatio = 1 - Math.pow(1 - ratio, 2);
        const newProgress = startProgress + (target - startProgress) * easedRatio;

        setProgress(newProgress);

        // Passar para o próximo estágio quando este terminar
        if (ratio >= 1) {
          startTime = Date.now();
          startProgress = target;
          currentStage++;
        }
      };

      // Atualizar a cada 16ms (aproximadamente 60fps)
      progressInterval = setInterval(updateProgress, 16);
    };

    const startLoading = () => {
      simulateProgress();
    };

    const finishLoading = () => {
      // Limpar o intervalo de progresso
      clearInterval(progressInterval);

      // Definir progresso para 100% no final
      setProgress(100);

      // Aguardar para mostrar 100% antes de remover a tela de carregamento
      setTimeout(() => setIsLoading(false), 800);
    };

    if (isLoading) {
      startLoading();

      // Tempo total de carregamento
      loadingTimeout = setTimeout(finishLoading, 4000);
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
      >
        <motion.div
          className="text-5xl md:text-7xl font-bold mb-8 relative overflow-hidden"
          variants={glitchAnimation}
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

        {/* Container da barra de progresso */}
        <div className="w-80 relative">
          {/* Barra de progresso base */}
          <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
            >


              {/* Efeito de partículas */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[5%] my-auto top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_5px_white]"
                  style={{ left: `${i * 20}%` }}
                  animate={{
                    x: ['0%', '100%'],
                    opacity: [0, 1, 0],
                    scale: [0.2, 1.5, 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                    repeatDelay: 0.6,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Texto de progresso */}
          <div className="mt-6 text-center">
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
