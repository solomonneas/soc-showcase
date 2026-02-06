import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'chakra': ['"Chakra Petch"', 'sans-serif'],
        'exo': ['"Exo 2"', 'sans-serif'],
        'space': ['"Space Grotesk"', 'sans-serif'],
        'franklin': ['"Libre Franklin"', 'sans-serif'],
        'audiowide': ['"Audiowide"', 'sans-serif'],
        'rajdhani': ['"Rajdhani"', 'sans-serif'],
        'crimson': ['"Crimson Pro"', 'serif'],
        'source-serif': ['"Source Serif 4"', 'serif'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
        'fira': ['"Fira Code"', 'monospace'],
        'ibm-plex': ['"IBM Plex Mono"', 'monospace'],
        'inter': ['"Inter"', 'sans-serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        'soc': {
          'cyan': '#00f0ff',
          'magenta': '#ff00aa',
          'emerald': '#00ff88',
          'amber': '#ffaa00',
          'red': '#ff3333',
          'slate': {
            900: '#0a0e17',
            800: '#111827',
            700: '#1e293b',
            600: '#334155',
          },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'data-flow': 'data-flow 4s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
