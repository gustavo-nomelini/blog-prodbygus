/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
        highlight: 'var(--highlight)',
      },
      fontFamily: {
        mono: 'var(--font-family-mono)',
        sans: 'var(--font-family-sans)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-speed)',
      },
      animation: {
        'shrink-width': 'shrink-width 10s linear forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'shrink-width': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 20px 5px rgba(var(--primary-rgb), 0.3)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text)',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--accent)',
              },
            },
            h1: {
              color: 'var(--highlight)',
            },
            h2: {
              color: 'var(--primary)',
            },
            h3: {
              color: 'var(--accent)',
            },
            h4: {
              color: 'var(--text)',
            },
            code: {
              color: 'var(--highlight)',
              backgroundColor: 'var(--surface)',
            },
            pre: {
              backgroundColor: 'var(--surface)',
              color: 'var(--highlight)',
            },
            strong: {
              color: 'var(--highlight)',
            },
            blockquote: {
              color: 'var(--text-muted)',
              borderLeftColor: 'var(--primary)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
