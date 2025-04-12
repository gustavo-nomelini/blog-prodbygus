import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberButton({
  href,
  onClick,
  className = '',
  type = 'primary',
  disabled = false,
  download = false,
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showClickEffect, setShowClickEffect] = useState(false);

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

  const handleClick = (e) => {
    if (disabled) return;

    setShowClickEffect(true);
    setTimeout(() => setShowClickEffect(false), 500);

    if (onClick) {
      onClick(e);
    }

    if (href) {
      if (download) {
        window.location.href = href;
      } else {
        window.open(href, '_blank');
      }
    }
  };

  return (
    <motion.div
      className="cyber-button-wrapper"
      style={{ display: 'inline-block' }}
      data-disabled={disabled}
    >
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
        initial={{
          filter: 'drop-shadow(0 0 0px transparent)',
          scale: 1,
        }}
        whileHover={{
          filter: `drop-shadow(0 0 10px ${colors.border})`,
          scale: 1.03,
          transition: { duration: 0.2 },
        }}
        whileTap={
          !disabled && {
            scale: 0.97,
            filter: `drop-shadow(0 0 15px ${colors.border})`,
            transition: { duration: 0.1 },
          }
        }
        animate={
          !disabled && {
            x: isHovered ? [0, -2, 1, -1, 0] : 0,
            transition: {
              duration: 0.3,
              repeat: isHovered ? Infinity : 0,
              repeatType: 'mirror',
            },
          }
        }
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Efeito de partículas ao clicar */}
        {showClickEffect && (
          <motion.div
            className="click-effect absolute inset-0 z-0 flex items-center justify-center"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full bg-[var(--accent)]/20 rounded-full" />
          </motion.div>
        )}

        {/* Efeito de linha animada */}
        <motion.span
          className="border-effect absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.span
          className="border-effect absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.span
          className="border-effect absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.span
          className="border-effect absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Texto com efeito de glitch */}
        <span className="relative z-10">
          {isHovered && !disabled && (
            <>
              <span className="glitch-effect absolute -left-[1px] -top-[1px] text-[var(--accent)] opacity-70 blur-[0.3px]">
                {children}
              </span>
              <span className="glitch-effect absolute -right-[1px] -bottom-[1px] text-[var(--secondary)] opacity-70 blur-[0.3px]">
                {children}
              </span>
            </>
          )}
          {children}
        </span>
      </motion.div>
    </motion.div>
  );
}
