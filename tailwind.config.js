/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy-black background ramp (no white backgrounds anywhere)
        base: {
          DEFAULT: '#0a0f1e',
          100: '#0b1120',
          200: '#0d1426',
          300: '#111a30',
          400: '#16213c',
        },
        // Electric cyan — primary accent
        accent: {
          DEFAULT: '#00d4ff',
          soft: '#38e0ff',
          dim: '#0ea5e9',
        },
        // Purple — Kubernetes / cloud highlights
        brand: {
          purple: '#7c3aed',
          'purple-soft': '#a78bfa',
        },
        // Green terminal cursor
        terminal: {
          green: '#22c55e',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 212, 255, 0.25)',
        'glow-md': '0 0 30px rgba(0, 212, 255, 0.32)',
        'glow-lg': '0 0 48px rgba(0, 212, 255, 0.40)',
        'glow-purple': '0 0 26px rgba(124, 58, 237, 0.38)',
        'glow-green': '0 0 18px rgba(34, 197, 94, 0.6)',
        'inset-glow': 'inset 0 0 24px rgba(0, 212, 255, 0.08)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 14px rgba(34, 197, 94, 0.85)' },
          '50%': { opacity: '0.5', boxShadow: '0 0 4px rgba(34, 197, 94, 0.25)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 1.3s ease-in-out infinite',
        'spin-slow': 'spin-slow 16s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
    },
  },
  plugins: [],
};
