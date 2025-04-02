import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CyberHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/blog', text: 'Posts' },
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' },
  ];

  useEffect(() => {
    // Atualizar o caminho ativo com base na URL atual
    setActivePath(window.location.pathname);

    // Controlar efeitos de rolagem
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Variantes para a barra de navegação
  const navbarVariants = {
    top: {
      backgroundColor: 'rgba(var(--background-rgb), 0.85)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 0 0px transparent',
    },
    scrolled: {
      backgroundColor: 'rgba(var(--background-rgb), 0.65)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.3)',
    },
  };

  // Variantes para o menu móvel
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  // Variantes para itens do menu móvel
  const mobileItemVariants = {
    closed: {
      y: -20,
      opacity: 0,
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  // Efeito glitch para o logo
  const logoGlitchVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      filter: 'drop-shadow(0 0 8px var(--primary))',
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: 'easeOut',
      },
    },
  };

  // Variantes para links de navegação
  const navLinkVariants = {
    initial: {
      color: 'var(--text)',
      transition: { duration: 0.3 },
    },
    hover: {
      color: 'var(--primary)',
      x: [0, -2, 2, -1, 0],
      textShadow: '0 0 8px var(--primary)',
      transition: {
        color: { duration: 0.3 },
        x: { duration: 0.4, ease: 'easeOut' },
      },
    },
  };

  // Variantes para a linha sob os links
  const linkUnderlineVariants = {
    initial: {
      scaleX: 0,
      originX: 0,
    },
    hover: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    active: {
      scaleX: 1,
    },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={navbarVariants}
        initial="top"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo com efeito glitch */}
            <motion.a
              href="/"
              className="flex-shrink-0 flex items-center relative z-20"
              variants={logoGlitchVariants}
              initial="initial"
              whileHover="hover"
              aria-label="Página Inicial"
            >
              <img src="/LogoRoxaSemFundo.png" alt="Prod by GUS Logo" className="h-32 w-auto" />

              {/* Efeito neon no hover */}
              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none"
                animate={{
                  opacity: [0, 0.5, 0],
                  filter: 'blur(8px)',
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <img src="/LogoRoxaSemFundo.png" alt="" className="h-32 w-auto opacity-50" />
              </motion.div>
            </motion.a>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  <motion.a
                    href={link.href}
                    className="relative py-2 text-[var(--text)]"
                    variants={navLinkVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {link.text}

                    {/* Linha de baixo do link */}
                    <motion.span
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--primary)]"
                      variants={linkUnderlineVariants}
                      initial="initial"
                      animate={activePath === link.href ? 'active' : 'initial'}
                      whileHover="hover"
                    />
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* Botão do menu móvel */}
            <motion.button
              className="md:hidden text-[var(--text)] p-2 rounded-md hover:bg-[var(--surface)] transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Menu móvel com animação */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] md:hidden flex flex-col bg-[var(--background)]/90 backdrop-blur-3xl"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              {/* Logo no menu móvel */}
              <a href="/" className="inline-block" aria-label="Página Inicial">
                <img src="/LogoRoxaSemFundo.png" alt="Prod by GUS Logo" className="h-10 w-auto" />
              </a>

              {/* Botão para fechar menu */}
              <motion.button
                className="p-2 rounded-full text-[var(--text)] bg-[var(--surface)]/60 hover:bg-[var(--primary)]/60 transition-colors"
                onClick={() => setIsOpen(false)}
                whileTap={{ scale: 0.95 }}
                aria-label="Fechar menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Links de navegação - centralizado na tela */}
            <div className="flex-1 flex flex-col justify-center items-center py-8">
              <nav className="w-full max-w-xs mx-auto">
                <ul className="space-y-8">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.href}
                      className="text-center"
                      variants={mobileItemVariants}
                    >
                      <a
                        href={link.href}
                        className="text-2xl font-medium relative inline-block text-[var(--text)] transition-colors duration-300 hover:text-[var(--primary)]"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.text}

                        {/* Efeito de linha animada */}
                        <motion.span
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                          initial={{ scaleX: 0 }}
                          whileHover={{
                            scaleX: 1,
                            boxShadow: '0 0 8px 0 var(--primary)',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Rodapé do menu com efeito de scanner */}
            <motion.div
              className="py-6 text-center text-sm text-[var(--text-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                © {new Date().getFullYear()} Prod by GUS
                {/* Efeito de scanner para o texto do rodapé */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"
                  style={{ width: '100px' }}
                  animate={{
                    x: ['-100%', '200%'],
                    transition: {
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 1.5,
                      ease: 'linear',
                    },
                  }}
                />
              </div>
            </motion.div>

            {/* Elementos decorativos no fundo para estilo cyberpunk */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              {/* Linhas de grade */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    'linear-gradient(0deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent)',
                  backgroundSize: '50px 50px',
                }}
              />

              {/* Linhas horizontais animadas */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-[var(--primary)]/50"
                style={{ top: '30%' }}
                animate={{
                  y: [0, 300],
                  opacity: [0.5, 0, 0.5],
                  transition: {
                    repeat: Infinity,
                    duration: 8,
                    ease: 'linear',
                  },
                }}
              />

              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-[var(--accent)]/50"
                style={{ top: '60%' }}
                animate={{
                  y: [0, -200],
                  opacity: [0.5, 0, 0.5],
                  transition: {
                    repeat: Infinity,
                    duration: 6,
                    ease: 'linear',
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
