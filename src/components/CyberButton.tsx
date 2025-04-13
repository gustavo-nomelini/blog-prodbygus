import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  download?: boolean;
  children: React.ReactNode;
}

const colors = {
  primary: {
    bg: 'var(--primary)',
    glow: 'var(--accent)',
    text: 'var(--background)',
    border: 'var(--primary)',
  },
  secondary: {
    bg: 'transparent',
    glow: 'var(--primary)',
    text: 'var(--primary)',
    border: 'var(--primary)',
  },
  accent: {
    bg: 'var(--accent)',
    glow: 'var(--primary)',
    text: 'var(--background)',
    border: 'var(--accent)',
  },
};

export default function CyberButton({
  href,
  onClick,
  className = '',
  type = 'primary',
  disabled = false,
  download = false,
  children,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [x, setX] = useState(0);

  const currentColors = colors[type] || colors.primary;

  useEffect(() => {
    if (!disabled) {
      const interval = setInterval(() => {
        setX((prev) => (prev + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [disabled]);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (href) {
      if (download) {
        window.location.href = href;
      } else {
        window.open(href, '_blank');
      }
    }
  };

  const positions = [0, -2, 1, -1];

  return (
    <div className="cyber-button-wrapper">
      <motion.div
        className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono tracking-wider border-2 rounded-md ${className} ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
        style={{
          backgroundColor: currentColors.bg,
          borderColor: currentColors.border,
          color: currentColors.text,
          transform: `translateX(${positions[x]}px)`,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTapStart={() => setIsPressed(true)}
        onTap={() => setIsPressed(false)}
        onClick={handleClick}
      >
        {/* Animated border effects */}
        <motion.span
          className="border-effect absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.span
          className="border-effect absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.span
          className="border-effect absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.span
          className="border-effect absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Text with glitch effect */}
        <span className="relative z-10">
          <span className="glitch-effect absolute -left-[1px] -top-[1px] text-[var(--accent)] opacity-70 blur-[0.3px]">
            {children}
          </span>
          <span className="glitch-effect absolute -right-[1px] -bottom-[1px] text-[var(--secondary)] opacity-70 blur-[0.3px]">
            {children}
          </span>
          {children}
        </span>

        {/* Click effect */}
        {isPressed && (
          <motion.div
            className="click-effect absolute inset-0 z-0 flex items-center justify-center"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full bg-[var(--accent)]/20 rounded-full" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
