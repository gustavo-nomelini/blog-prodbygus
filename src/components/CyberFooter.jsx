import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberFooter() {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);

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
      href: 'https://github.com/prodbygus',
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

  // Variantes para links de navegação
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

  // Variantes para ícones de redes sociais
  const socialIconVariants = {
    initial: {
      scale: 1,
      color: 'var(--text)',
      filter: 'drop-shadow(0 0 0 transparent)',
    },
    hover: {
      scale: 1.15,
      color: 'var(--primary)',
      filter: 'drop-shadow(0 0 4px var(--primary))',
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
    <footer className="relative bg-[var(--surface)] border-t border-[var(--surface-border)] overflow-hidden">
      {/* Overlay de grade para estética cyberpunk */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--primary) 25%, var(--primary) 26%, transparent 27%, transparent 74%, var(--primary) 75%, var(--primary) 76%, transparent 77%, transparent)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Linhas de escaneamento */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-transparent pointer-events-none"
        variants={scanlineVariants}
        initial="initial"
        animate="animate"
        style={{ height: '100%' }}
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <a href="/" className="inline-block mb-4">
              <img src="/LogoRoxaSemFundo.png" alt="Prod by GUS Logo" className="h-10 w-auto" />
            </a>
            <p className="text-[var(--text-muted)] text-sm max-w-md mb-6">
              Explorando ideias, compartilhando conhecimento e fornecendo soluções digitais.
              Acompanhe o blog para atualizações sobre tecnologia, desenvolvimento e muito mais.
            </p>

            {/* Links de redes sociais */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover="hover"
                  aria-label={`Siga-nos no ${item.name}`}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] tracking-wider uppercase mb-4">
                Navegação
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-sm text-[var(--text-muted)]"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      onHoverStart={() => setHoveredLink(link.name)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] tracking-wider uppercase mb-4">
                Contato
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@prodbygus.com"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                  >
                    info@prodbygus.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+5511999999999"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                  >
                    +55 (11) 99999-9999
                  </a>
                </li>
                <li className="text-sm text-[var(--text-muted)]">São Paulo - SP, Brasil</li>
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
            <div className="relative">
              © {currentYear} Prod by GUS. Todos os direitos reservados.
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
            className="inline-flex items-center text-xs font-medium text-[var(--text-muted)] border border-[var(--surface-border)] px-4 py-2 rounded-md"
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
            Voltar ao topo
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
