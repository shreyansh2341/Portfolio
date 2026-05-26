/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        surface: 'var(--bg-card)',
        'surface-hover': 'var(--bg-card-hover)',
        border: 'var(--border)',
        'border-accent': 'var(--border-accent)',
        primary: 'var(--cyan)',
        secondary: 'var(--amber)',
        tertiary: 'var(--violet)',
        'on-background': 'var(--text-primary)',
        'on-surface': 'var(--text-secondary)',
        'on-muted': 'var(--text-muted)',
        cyan: 'rgb(var(--cyan-rgb) / <alpha-value>)',
        amber: 'rgb(var(--amber-rgb) / <alpha-value>)',
        violet: 'rgb(var(--violet-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Comfortaa', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'role-in': 'roleIn 0.4s ease forwards',
        'role-out': 'roleOut 0.4s ease forwards',
        'spotlight': 'spotlight 2s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'cursor-glow': 'cursorGlow 2s ease-in-out infinite',
        'loading-reveal': 'loadingReveal 0.8s ease-out forwards',
        'loading-line': 'loadingLine 1.5s ease-in-out forwards',
        'breathing': 'breathing 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        roleIn: {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        roleOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-16px) scale(0.97)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.25)' },
        },
        cursorGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        loadingReveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        loadingLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        breathing: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.55' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
