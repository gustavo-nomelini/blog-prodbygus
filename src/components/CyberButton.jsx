import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberButton({
  children,
  href,
  onClick = () => {},
  className = '',
  type = 'primary',
  disabled = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Definindo cores com base no tipo
  let colors = {
    bg: 'var(--primary)',
    glow: 'var(--accent)',
    text: 'var(--background)',
    border: 'var(--primary)',
  };

  if (type === 'secondary') {
    colors = {
      bg: 'transparent',
      glow: 'var(--primary)',
      text: 'var(--primary)',
      border: 'var(--primary)',
    };
  } else if (type === 'accent') {
    colors = {
      bg: 'var(--accent)',
      glow: 'var(--primary)',
      text: 'var(--background)',
      border: 'var(--accent)',
    };
  }

  // Efeito de hover
  const glowVariants = {
    hover: {
      filter: `drop-shadow(0 0 6px ${colors.glow})`,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    initial: {
      filter: 'drop-shadow(0 0 0px transparent)',
      scale: 1,
    },
  };

  // Efeito de glitch para cyberpunk
  const glitchEffect = isHovered
    ? {
        x: [0, -2, 1, -1, 0],
        transition: {
          duration: 0.4,
          repeat: Infinity,
          repeatType: 'mirror',
        },
      }
    : {};

  // Efeito para a borda
  const borderEffect = {
    opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
    transition: {
      duration: isHovered ? 2 : 0,
      repeat: isHovered ? Infinity : 0,
      ease: 'linear',
    },
  };

  const ButtonContent = () => (
    <motion.div
      className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono tracking-wider 
      border-2 rounded-md ${className}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
      variants={glowVariants}
      initial="initial"
      whileHover="hover"
      whileTap={!disabled && 'tap'}
      animate={glitchEffect}
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Efeito de linha animada */}
      <motion.span
        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
        animate={borderEffect}
      />

      {/* Efeito de linha animada - topo */}
      <motion.span
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
        animate={borderEffect}
      />

      {/* Texto com efeito de glitch */}
      <span className="relative z-10">
        {isHovered && !disabled && (
          <>
            <span className="absolute -left-[1px] -top-[1px] text-[var(--accent)] opacity-70 blur-[0.3px]">
              {children}
            </span>
            <span className="absolute -right-[1px] -bottom-[1px] text-[var(--secondary)] opacity-70 blur-[0.3px]">
              {children}
            </span>
          </>
        )}
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={`inline-block ${disabled ? 'pointer-events-none' : ''}`}>
        <ButtonContent />
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} type="button" className="inline-block">
      <ButtonContent />
    </button>
  );
}
