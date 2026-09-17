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
          950: '#07080D',
          900: '#0B0D14',
          850: '#10131E',
          800: '#161A29',
          750: '#1D2236',
          700: '#252C45',
          600: '#384366',
        },
        editorial: {
          bg: '#060709',
          surface: '#0B0D12',
          card: '#10131A',
          border: '#1E232F',
          borderLight: '#2B3242',
          muted: '#6B7688',
          chalk: '#E4E7EC',
        },
        gorange: {
          DEFAULT: '#FF5500',
          hover: '#E04B00',
          light: '#FF6D24',
          faint: 'rgba(255, 85, 0, 0.08)',
          glow: 'rgba(255, 85, 0, 0.25)',
        },
        solar: {
          violet: '#8B5CF6',
          purple: '#A855F7',
          coral: '#FF3366',
          rose: '#F43F5E',
          amber: '#FF8A00',
          gold: '#F59E0B',
          cyan: '#06B6D4',
          emerald: '#10B981',
        },
        brand: {
          purple: '#8B5CF6',
          indigo: '#6366F1',
          violet: '#A855F7',
          coral: '#FF3366',
          rose: '#F43F5E',
          amber: '#FF8A00',
          cyan: '#06B6D4',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(48px, 6.5vw, 112px)', { lineHeight: '0.95', fontWeight: '800' }],
        'section': ['clamp(36px, 5vw, 72px)', { lineHeight: '1.02', fontWeight: '800' }],
        'body': ['clamp(16px, 1.8vw, 20px)', { lineHeight: '1.6', fontWeight: '400' }],
        'meta': ['clamp(11px, 1vw, 13px)', { lineHeight: '1.4', fontWeight: '400' }],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'gradient-shift': 'gradientShift 5s ease infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'blob': 'blob 10s ease-in-out infinite',
        'solar-pulse': 'solarPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-2deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(255, 51, 102, 0.35)' },
          '50%': { opacity: '0.75', boxShadow: '0 0 35px rgba(139, 92, 246, 0.55)' },
        },
        solarPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.15)' },
          '66%': { transform: 'translate(-25px, 25px) scale(0.9)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      dropShadow: {
        'solar-glow': '0 0 20px rgba(255, 51, 102, 0.45)',
        'amber-glow': '0 0 20px rgba(255, 138, 0, 0.45)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.45)',
      },
    },
  },
  plugins: [],
}