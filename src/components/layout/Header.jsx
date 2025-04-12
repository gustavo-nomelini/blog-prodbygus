import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
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
    setActivePath(window.location.pathname);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.3, ease: 'easeInOut' },
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

  const mobileItemVariants = {
    closed: { y: -20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      filter: 'drop-shadow(0 0 8px var(--primary))',
      transition: { duration: 0.3, yoyo: Infinity, ease: 'easeOut' },
    },
  };

  const navLinkVariants = {
    initial: { color: 'var(--text)', transition: { duration: 0.3 } },
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

  const linkUnderlineVariants = {
    initial: { scaleX: 0, originX: 0 },
    hover: { scaleX: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    active: { scaleX: 1 },
  };

  const scanlineVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
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
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex-shrink-0 flex items-center relative z-20 group"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              aria-label="Página Inicial"
            >
              <img
                src="/LogoRoxaSemFundo.png"
                alt="Prod by GUS Logo"
                className="h-16 w-auto transition-all duration-300 ease-in-out group-hover:brightness-110"
              />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-[var(--surface)] text-[var(--text)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                Ir para a página inicial
              </span>
            </motion.a>

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] md:hidden flex flex-col bg-[var(--background)]/80 backdrop-blur-3xl"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-transparent pointer-events-none"
              variants={scanlineVariants}
              initial="initial"
              animate="animate"
              style={{ height: '100%' }}
            />

            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative z-10">
              <a href="/" className="inline-block" aria-label="Página Inicial">
                <img src="/LogoRoxaSemFundo.png" alt="Prod by GUS Logo" className="h-10 w-auto" />
              </a>

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
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--primary)] transform transition-transform duration-300 ease-out scale-x-0 origin-center"></span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="py-6 text-center text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} Prod by GUS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
