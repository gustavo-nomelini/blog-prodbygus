import { useEffect } from 'react';
import CyberBackground from '../components/CyberBackground';
import CyberFooter from '../components/CyberFooter';
import CyberHeader from '../components/CyberHeader';
import TransitionEffect from '../components/TransitionEffect';

// Client-only directive for React component in Astro
const clientOnlyRGB = 'only client';

export default function CyberLayout({ children }) {
  // Efeito para adicionar variáveis CSS RGB para as cores
  useEffect(() => {
    // Converter valores de cores CSS para RGB
    const convertToRGB = (cssVar) => {
      const tempEl = document.createElement('div');
      document.body.appendChild(tempEl);
      tempEl.style.color = `var(${cssVar})`;
      const color = window.getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      // Extrair valores RGB
      const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (match) {
        return `${match[1]}, ${match[2]}, ${match[3]}`;
      }
      return '0, 0, 0'; // Fallback
    };

    // Definir variáveis RGB
    document.documentElement.style.setProperty('--primary-rgb', convertToRGB('--primary'));
    document.documentElement.style.setProperty('--accent-rgb', convertToRGB('--accent'));
    document.documentElement.style.setProperty('--secondary-rgb', convertToRGB('--secondary'));
    document.documentElement.style.setProperty('--background-rgb', convertToRGB('--background'));
    document.documentElement.style.setProperty('--text-rgb', convertToRGB('--text'));

    // Efeito cursor cyberpunk
    const cursorEffect = document.createElement('div');
    cursorEffect.className = 'cyber-cursor';
    document.body.appendChild(cursorEffect);

    const updateCursor = (e) => {
      cursorEffect.style.left = `${e.clientX}px`;
      cursorEffect.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', updateCursor);

    // Clean up
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      if (cursorEffect.parentNode) {
        document.body.removeChild(cursorEffect);
      }
    };
  }, []);

  // Adicionar estilos dynamicamente para o cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cyber-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: transparent;
        border: 1px solid var(--primary);
        mix-blend-mode: difference;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        z-index: 9999;
      }
      
      .cyber-cursor::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background-color: var(--primary);
        border-radius: 50%;
        opacity: 0.8;
      }
      
      a:hover ~ .cyber-cursor,
      button:hover ~ .cyber-cursor {
        width: 30px;
        height: 30px;
        border-color: var(--accent);
        mix-blend-mode: normal;
        border-width: 2px;
        background-color: rgba(var(--primary-rgb), 0.1);
      }
      
      /* Estilização para uma experiência mais cyberpunk */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: var(--surface);
      }
      
      ::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent);
      }
      
      ::selection {
        background: var(--primary);
        color: var(--background);
        text-shadow: 0 0 8px var(--background);
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <CyberBackground />
      <TransitionEffect>
        <div className="flex flex-col min-h-screen">
          <CyberHeader />
          <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-12 sm:pb-16 flex-grow">
            {children}
          </main>
          <CyberFooter />
        </div>
      </TransitionEffect>
    </>
  );
}
