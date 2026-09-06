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
        dark: {
          950: '#07090E',
          900: '#0B0F17',
          850: '#111726',
          800: '#172033',
          700: '#23304A',
          600: '#34466B',
        },
        brand: {
          purple: '#8B5CF6',
          indigo: '#6366F1',
          violet: '#A855F7',
          cyan: '#06B6D4',
          pink: '#EC4899',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'rotate': 'rotate 10s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'blob': 'blob 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 rgba(0,0,0,0)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-20px, -20px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(1)' },
          '75%': { transform: 'translate(20px, 20px) scale(1.1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      dropShadow: {
        'purple-glow': '0 0 10px rgba(139, 92, 246, 0.5)',
        'indigo-glow': '0 0 15px rgba(99, 102, 241, 0.4)',
        'cyan-glow': '0 0 20px rgba(56, 189, 248, 0.4)',
      },
    },
  },
  plugins: [],
}