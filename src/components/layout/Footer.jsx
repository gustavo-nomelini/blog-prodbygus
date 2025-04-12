import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);

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
      href: 'https://twitter.com/prodbygus37',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
      href: 'https://instagram.com/prodbygus37',
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
      {/* Top decorative line */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Decorative corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--primary)]/70 hidden sm:block neon-glow"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Left column */}
          <div>
            <div className="mb-6 group">
              <p className="text-sm flex flex-col items-center md:items-start">
                <span className="font-mono text-xl text-[var(--primary)] font-bold tracking-wider group-hover:text-shadow-glow transition-all duration-300 glitch-text">
                  &lt;PROD/BYGUS&gt;
                </span>
                <span className="mt-2 text-[var(--text-muted)] italic tracking-wide">
                  Todos os direitos reservados © {currentYear}
                </span>
              </p>
            </div>

            {/* Social links */}
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
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-2 gap-8">
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
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors inline-flex items-center space-x-2 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <span className="hidden md:inline">gustavolnomelini@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/gustavo-lopes-nomelini-144bb1212/"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors inline-flex items-center space-x-2 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                    <span className="hidden md:inline">LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
