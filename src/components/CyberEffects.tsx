'use client';

import { useEffect } from 'react';

export default function CyberEffects() {
  // Effect to add CSS RGB variables for colors
  useEffect(() => {
    // Convert CSS color values to RGB
    const convertToRGB = (cssVar: string) => {
      const tempEl = document.createElement('div');
      document.body.appendChild(tempEl);
      tempEl.style.color = `var(${cssVar})`;
      const color = window.getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      // Extract RGB values
      const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (match) {
        return `${match[1]}, ${match[2]}, ${match[3]}`;
      }
      return '0, 0, 0'; // Fallback
    };

    // Set RGB variables
    document.documentElement.style.setProperty('--primary-rgb', convertToRGB('--primary'));
    document.documentElement.style.setProperty('--accent-rgb', convertToRGB('--accent'));
    document.documentElement.style.setProperty('--secondary-rgb', convertToRGB('--secondary'));
    document.documentElement.style.setProperty('--background-rgb', convertToRGB('--background'));
    document.documentElement.style.setProperty('--text-rgb', convertToRGB('--text'));

    // Cyberpunk cursor effect
    const cursorEffect = document.createElement('div');
    cursorEffect.className = 'cyber-cursor';
    document.body.appendChild(cursorEffect);

    const updateCursor = (e: MouseEvent) => {
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

  // Add dynamic styles for cursor and other effects
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
      
      /* Cyberpunk scrollbar styling */
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
      
      /* Selection styling */
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

  return null; // This component doesn't render anything
}
