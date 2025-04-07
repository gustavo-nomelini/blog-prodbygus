import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CyberFooter() {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Activate glitch effect randomly every few seconds
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/prodbygus',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/gustavo-nomelini',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/prodbygus',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  // Variantes para links de navegação com efeito glitch
  const linkVariants = {
    initial: {
      color: 'var(--text)',
      textShadow: '0 0 0px transparent',
      transition: { duration: 0.3 },
    },
    hover: {
      color: 'var(--primary)',
      textShadow: '0 0 8px var(--primary)',
      x: [0, -2, 2, -1, 0],
      transition: {
        duration: 0.3,
        x: { duration: 0.4, ease: 'easeOut' },
      },
    },
  };

  // Variantes para ícones de redes sociais com efeito de destaque
  const socialIconVariants = {
    initial: {
      scale: 1,
      color: 'var(--text)',
      filter: 'drop-shadow(0 0 0 transparent)',
    },
    hover: {
      scale: 1.15,
      color: 'var(--primary)',
      filter: 'drop-shadow(0 0 6px var(--primary))',
    },
  };

  // Efeito de scanline para footer
  const scanlineVariants = {
    initial: { opacity: 0.1 },
    animate: {
      opacity: [0.1, 0.2, 0.1],
      y: [0, -50],
      transition: {
        opacity: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        y: { repeat: Infinity, duration: 10, ease: 'linear' },
      },
    },
  };

  return (
    <footer
      className={`relative bg-[var(--surface)]/90 backdrop-blur-md text-[var(--text)] border-t border-[var(--primary)]/40 overflow-hidden ${
        glitchActive ? 'cyber-glitch' : ''
      }`}
    >
      {/* Linha decorativa no topo com animação */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--surface-border)]/30 via-[var(--primary)] to-[var(--surface-border)]/30 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
        />
      </div>

      {/* Overlay de grade para estética cyberpunk */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Neon pulses in corners */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--primary)]/5 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--primary)]/5 rounded-full blur-xl animate-pulse-medium"></div>

      {/* Linhas de escaneamento */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-transparent pointer-events-none"
        variants={scanlineVariants}
        initial="initial"
        animate="animate"
        style={{ height: '100%' }}
      />

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Decorative corner elements with glow */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Cyber divider */}
          <div className="absolute hidden md:block h-full w-px bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-transparent left-1/2 transform -translate-x-1/2"></div>

          <div>
            <a href="/" className="inline-block mb-4 group relative">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)]/0 via-[var(--primary)]/30 to-[var(--primary)]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"
                animate={{
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'mirror',
                  duration: 2,
                  ease: 'linear',
                }}
              />
              <img
                src="/LogoRoxaSemFundo.png"
                alt="Prod by GUS Logo"
                className="h-48 w-auto relative"
              />
            </a>
            <p className="text-[var(--text-muted)] text-sm max-w-md mb-6 cyber-text">
              Explorando ideias, compartilhando conhecimento e fornecendo soluções digitais.
              Acompanhe o blog para atualizações sobre tecnologia, desenvolvimento e muito mais.
            </p>

            {/* Links de redes sociais */}
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-[var(--text-muted)] relative"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover="hover"
                  aria-label={`Me siga na rede social ${item.name}`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="cyber-icon-container">
                    {item.icon}
                    <span className="cyber-icon-glow"></span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-sm font-mono text-[var(--primary)] tracking-wider uppercase mb-4 cyber-heading after:content-['_//>']">
                Navegação
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] cyber-link"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      onHoverStart={() => setHoveredLink(link.name)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      <span className="text-[var(--primary)]">&#62; </span>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-mono text-[var(--primary)] tracking-wider uppercase mb-4 cyber-heading after:content-['_//>']">
                Contato
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:gustavolnomelini@gmail.com"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors inline-block cyber-link"
                  >
                    <span className="text-[var(--primary)]">@ </span>
                    gustavolnomelini@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+5545998508634"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cyber-link"
                  >
                    <span className="text-[var(--primary)]">☎ </span>
                    +55 (45) 99850-8634
                  </a>
                </li>
                <li className="text-sm text-[var(--text-muted)] cyber-text">
                  <span className="text-[var(--primary)]">⌖ </span>
                  Cascavel - PR, Brasil
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--surface-border)] flex flex-col md:flex-row justify-between items-center">
          {/* Linha decorativa animada no topo */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
            animate={{
              backgroundPosition: ['0%', '100%'],
              transition: {
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'mirror',
              },
            }}
          />

          <div className="text-[var(--text-muted)] text-sm mb-4 md:mb-0">
            <div className="relative flex flex-col items-center md:items-start">
              <span className="font-mono text-xl text-[var(--primary)] font-bold tracking-wider cyber-brand">
                &lt;PROD/BYGUS&gt;
              </span>
              <span className="mt-1">© {currentYear} Todos os direitos reservados.</span>
              {/* Efeito de scanner para o texto do copyright */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent pointer-events-none"
                style={{ width: '100px' }}
                animate={{
                  x: ['-100%', '200%'],
                  transition: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 3,
                    ease: 'linear',
                  },
                }}
              />
            </div>
          </div>

          {/* Botão para voltar ao topo com efeito neon */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center text-xs font-medium text-[var(--text-muted)] border border-[var(--surface-border)] px-4 py-2 rounded-md relative cyber-button overflow-hidden group"
            whileHover={{
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              boxShadow: '0 0 8px 0 var(--primary)',
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>Voltar ao topo</span>
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-[var(--primary)]"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Custom noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
    </footer>
  );
}

// Add this CSS to your global styles or component
const cyberStyles = `
.cyber-glitch {
  animation: glitch 0.2s linear;
}

.neon-glow {
  filter: drop-shadow(0 0 5px var(--primary));
}

.animate-pulse-slow {
  animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-medium {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.cyber-heading {
  position: relative;
  display: inline-block;
}

.cyber-link:hover {
  text-shadow: 0 0 5px var(--primary);
}

.cyber-brand {
  position: relative;
}

.cyber-brand:hover::before,
.cyber-brand:hover::after {
  content: "&lt;PROD/BYGUS&gt;";
  position: absolute;
  left: 0;
  width: 100%;
  opacity: 0.5;
  animation: glitch-loop 3s infinite alternate-reverse;
}

.cyber-brand:hover::before {
  top: -2px;
  color: #0ff;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translate(-2px);
}

.cyber-brand:hover::after {
  top: 2px;
  color: #f0f;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  transform: translate(2px);
}

.cyber-text {
  line-height: 1.5;
}

.cyber-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber-icon-glow {
  position: absolute;
  inset: -5px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.cyber-icon-container:hover .cyber-icon-glow {
  opacity: 0.2;
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.bg-scanline {
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(var(--primary-rgb, 128, 0, 255), 0.1) 3px,
    transparent 3px,
    transparent 4px
  );
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes glitch-loop {
  0%, 40%, 44%, 58%, 61%, 65%, 69%, 73%, 100% {
    opacity: 0.5;
    transform: skewX(0deg);
  }
  41%, 43%, 59%, 60%, 66%, 68%, 74%, 78% {
    opacity: 0.75;
    transform: skewX(5deg);
  }
  42%, 45%, 60%, 62%, 67%, 70%, 75%, 80% {
    opacity: 0.25;
    transform: skewX(-5deg);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}
`;

// You would need to add this CSS to your global styles or add an inline style tag
// This is just a representation
// document.head.insertAdjacentHTML('beforeend', `<style>${cyberStyles}</style>`);
