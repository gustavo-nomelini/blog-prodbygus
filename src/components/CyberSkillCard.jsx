import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function CyberSkillCard({ title, skills, iconName, color = 'var(--primary)' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  // Skill badge variants
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      boxShadow: `0 0 15px 2px ${color}`,
      transition: { duration: 0.2 },
    },
  };

  // Glitch effect for the title
  const titleGlitch = {
    initial: { x: 0 },
    glitch: {
      x: [0, -2, 3, -1, 0],
      transition: {
        duration: 0.5,
        repeat: 1,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  // Border scan effect animation
  const scanEffect = {
    hidden: { left: '-5%' },
    visible: {
      left: '105%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear',
        repeatDelay: 2,
      },
    },
  };

  // Get icon character/symbol based on the type
  const getIconSymbol = () => {
    if (iconName?.includes('paint-brush')) return '🎨';
    if (iconName?.includes('code')) return '💻';
    if (iconName?.includes('database')) return '🗄️';
    return '✨'; // Default
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveSkill(null);
      }}
    >
      {/* Border scan effect */}
      <motion.div
        className="absolute top-0 w-10 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        variants={scanEffect}
        animate={isHovered ? 'visible' : 'hidden'}
      />

      <div className="backdrop-blur-sm bg-[var(--surface)]/30 border border-[var(--surface)] rounded-lg p-6 relative">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 rounded-lg z-0"
          initial={{ background: `radial-gradient(circle at center, ${color}15, transparent 60%)` }}
          animate={{
            background: isHovered
              ? `radial-gradient(circle at center, ${color}30, transparent 70%)`
              : `radial-gradient(circle at center, ${color}15, transparent 60%)`,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2"
          style={{ borderColor: color }}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2"
          style={{ borderColor: color }}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2"
          style={{ borderColor: color }}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2"
          style={{ borderColor: color }}
        />

        {/* Title with icon */}
        <motion.div
          className="text-lg font-medium mb-4 flex items-center relative z-10"
          variants={titleGlitch}
          initial="initial"
          animate={isHovered ? 'glitch' : 'initial'}
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-[var(--background)] mr-2"
            style={{ background: `linear-gradient(135deg, ${color}, var(--accent))` }}
          >
            {getIconSymbol()}
          </span>

          {/* Container para o texto principal e os efeitos de glitch */}
          <div className="relative">
            {/* Efeitos de glitch ficam atrás */}
            {isHovered && (
              <>
                <span
                  className="absolute -left-[1px] -top-[1px] opacity-70 blur-[0.5px]"
                  style={{ color: 'var(--accent)', zIndex: 1 }}
                >
                  {title}
                </span>
                <span
                  className="absolute -right-[1px] -bottom-[1px] opacity-70 blur-[0.5px]"
                  style={{ color: 'var(--secondary)', zIndex: 1 }}
                >
                  {title}
                </span>
              </>
            )}
            {/* Texto principal sempre em primeiro plano */}
            <span className="relative" style={{ color: 'var(--text)', zIndex: 2 }}>
              {title}
            </span>
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="space-y-2 relative z-10">
          {Array.isArray(skills[0]) ? (
            // Grouped skills
            skills.map((lineSkills, i) => (
              <div key={i} className="flex flex-wrap gap-2">
                {lineSkills.map((skill, j) => (
                  <SkillBadge
                    key={`${i}-${j}`}
                    skill={skill}
                    color={color}
                    isActive={activeSkill === skill}
                    setActiveSkill={setActiveSkill}
                    variants={skillVariants}
                  />
                ))}
              </div>
            ))
          ) : (
            // Simple array of skills
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <SkillBadge
                  key={i}
                  skill={skill}
                  color={color}
                  isActive={activeSkill === skill}
                  setActiveSkill={setActiveSkill}
                  variants={skillVariants}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Skill badge component
function SkillBadge({ skill, color, isActive, setActiveSkill, variants }) {
  return (
    <motion.span
      className="px-3 py-1.5 rounded-full border relative overflow-hidden cursor-pointer"
      style={{
        borderColor: isActive ? color : 'var(--surface)',
        backgroundColor: 'var(--surface)',
        color: 'var(--text)',
      }}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setActiveSkill(skill)}
      variants={variants}
    >
      <motion.span
        className="relative z-10 text-sm font-medium"
        animate={{
          color: isActive ? color : 'var(--text)',
          textShadow: isActive ? `0 0 8px ${color}60` : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        {skill}
      </motion.span>

      {/* Background glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 opacity-20 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          style={{ backgroundColor: color }}
          layoutId="highlight"
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.span>
  );
}
