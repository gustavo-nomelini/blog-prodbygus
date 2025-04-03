import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CyberBackground() {
  const [particles, setParticles] = useState([]);
  const [accentParticles, setAccentParticles] = useState([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    // Generate primary particles
    const primaryParticles = Array(20)
      .fill(0)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.3 + 0.1,
        yMovement: Math.random() * 30 - 15,
        xMovement: Math.random() * 30 - 15,
        opacityRange: [
          Math.random() * 0.3 + 0.1,
          Math.random() * 0.5 + 0.3,
          Math.random() * 0.3 + 0.1,
        ],
        scale: Math.random() + 0.5,
        duration: Math.random() * 5 + 5,
      }));

    // Generate accent particles
    const secondaryParticles = Array(15)
      .fill(0)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.3 + 0.1,
        yMovement: Math.random() * 40 - 20,
        xMovement: Math.random() * 40 - 20,
        opacityRange: [
          Math.random() * 0.3 + 0.1,
          Math.random() * 0.5 + 0.3,
          Math.random() * 0.3 + 0.1,
        ],
        scale: Math.random() + 0.5,
        duration: Math.random() * 5 + 7,
      }));

    setParticles(primaryParticles);
    setAccentParticles(secondaryParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Grade principal com efeito cyberpunk */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Linhas horizontais em movimento */}
      <motion.div
        className="absolute left-0 right-0 h-[0.5px] bg-[var(--primary)]/30"
        style={{ top: '20%' }}
        animate={{
          y: [0, 500],
          opacity: [0.3, 0, 0.3],
          transition: {
            repeat: Infinity,
            duration: 15,
            ease: 'linear',
          },
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-[0.5px] bg-[var(--accent)]/30"
        style={{ top: '50%' }}
        animate={{
          y: [0, -400],
          opacity: [0.3, 0, 0.3],
          transition: {
            repeat: Infinity,
            duration: 12,
            ease: 'linear',
          },
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-[0.5px] bg-[var(--primary)]/30"
        style={{ top: '75%' }}
        animate={{
          y: [0, 300],
          opacity: [0.3, 0, 0.3],
          transition: {
            repeat: Infinity,
            duration: 18,
            ease: 'linear',
          },
        }}
      />

      {/* Linhas verticais em movimento */}
      <motion.div
        className="absolute top-0 bottom-0 w-[0.5px] bg-[var(--primary)]/30"
        style={{ left: '30%' }}
        animate={{
          x: [0, 300],
          opacity: [0.3, 0, 0.3],
          transition: {
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          },
        }}
      />

      <motion.div
        className="absolute top-0 bottom-0 w-[0.5px] bg-[var(--accent)]/30"
        style={{ left: '70%' }}
        animate={{
          x: [0, -300],
          opacity: [0.3, 0, 0.3],
          transition: {
            repeat: Infinity,
            duration: 16,
            ease: 'linear',
          },
        }}
      />

      {/* Círculos com pulsação */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-[var(--primary)]/20"
        style={{
          left: 'calc(50% - 250px)',
          top: 'calc(50% - 250px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-[var(--accent)]/20"
        style={{
          left: 'calc(50% - 150px)',
          top: 'calc(50% - 150px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          },
        }}
      />

      {/* Partículas flutuantes (pontos) - Agora geradas via useEffect */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--primary)]"
            style={{
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, particle.yMovement],
              x: [0, particle.xMovement],
              opacity: particle.opacityRange,
              scale: [1, particle.scale, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}

        {accentParticles.map((particle, i) => (
          <motion.div
            key={i + 20}
            className="absolute w-1 h-1 rounded-full bg-[var(--accent)]"
            style={{
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, particle.yMovement],
              x: [0, particle.xMovement],
              opacity: particle.opacityRange,
              scale: [1, particle.scale, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Overlay com gradiente escuro para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/50 via-transparent to-[var(--background)]/50" />

      {/* Scanlines com efeito cyberpunk */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.05) 100%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Efeito de vinheta */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, transparent 30%, var(--background) 100%)',
        }}
      />
    </div>
  );
}
