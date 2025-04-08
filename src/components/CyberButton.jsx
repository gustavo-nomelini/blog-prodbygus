import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberButton({
  children,
  href,
  onClick = () => {},
  className = '',
  type = 'primary',
  disabled = false,
  download = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
      filter: `drop-shadow(0 0 10px ${colors.glow})`,
      scale: 1.03,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.97,
      filter: `drop-shadow(0 0 15px ${colors.glow})`,
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
          duration: 0.3,
          repeat: Infinity,
          repeatType: 'mirror',
        },
      }
    : {};

  // Efeito para a borda
  const borderEffect = {
    opacity: isHovered ? [0.6, 0.9, 0.6] : 0.6,
    transition: {
      duration: isHovered ? 1.5 : 0,
      repeat: isHovered ? Infinity : 0,
      ease: 'linear',
    },
  };

  // Efeito de partículas quando clicado
  const clickEffect = isClicked
    ? {
        opacity: [1, 0],
        scale: [0, 1.5],
        transition: {
          duration: 0.5,
        },
      }
    : {};

  const handleClick = (e) => {
    if (!disabled) {
      setIsClicked(true);
      onClick(e);
      setTimeout(() => setIsClicked(false), 500);
    }
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
      onClick={handleClick}
      suppressHydrationWarning={true}
    >
      {/* Efeito de partículas ao clicar */}
      {isClicked && !disabled && (
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={clickEffect}
          suppressHydrationWarning={true}
        >
          <div className="w-full h-full bg-[var(--accent)]/20 rounded-full" />
        </motion.div>
      )}

      {/* Efeito de linha animada */}
      <motion.span
        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
        animate={borderEffect}
        suppressHydrationWarning={true}
      />

      {/* Efeito de linha animada - topo */}
      <motion.span
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
        animate={borderEffect}
        suppressHydrationWarning={true}
      />

      {/* Efeito de linha animada - esquerda */}
      <motion.span
        className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
        animate={borderEffect}
        suppressHydrationWarning={true}
      />

      {/* Efeito de linha animada - direita */}
      <motion.span
        className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
        animate={borderEffect}
        suppressHydrationWarning={true}
      />

      {/* Texto com efeito de glitch */}
      <span className="relative z-10" suppressHydrationWarning={true}>
        {isHovered && !disabled && (
          <>
            <span
              className="absolute -left-[1px] -top-[1px] text-[var(--accent)] opacity-70 blur-[0.3px]"
              suppressHydrationWarning={true}
            >
              {children}
            </span>
            <span
              className="absolute -right-[1px] -bottom-[1px] text-[var(--secondary)] opacity-70 blur-[0.3px]"
              suppressHydrationWarning={true}
            >
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
      <a
        href={href}
        download={download}
        className={`inline-block ${disabled ? 'pointer-events-none' : ''}`}
        suppressHydrationWarning={true}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="inline-block"
      suppressHydrationWarning={true}
    >
      <ButtonContent />
    </button>
  );
}
