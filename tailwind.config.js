/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apsrtc: {
          red: {
            DEFAULT: '#991B1B',
            dark: '#7F1D1D',
            deep: '#450A0A',
            light: '#FEE2E2',
            subtle: '#FFF1F2'
          },
          gold: {
            DEFAULT: '#D97706',
            dark: '#B45309',
            light: '#FEF3C7',
            accent: '#F59E0B'
          },
          slate: {
            950: '#020617',
            900: '#0F172A',
            800: '#1E293B',
            700: '#334155',
            600: '#475569',
            500: '#64748B',
            200: '#E2E8F0',
            100: '#F1F5F9',
            50: '#F8FAFC'
          },
          status: {
            available: '#059669',
            availableLight: '#ECFDF5',
            ladies: '#DB2777',
            ladiesLight: '#FDF2F8',
            senior: '#7C3AED',
            seniorLight: '#F5F3FF',
            booked: '#94A3B8',
            bookedLight: '#F1F5F9'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'Gautami', 'sans-serif']
      },
      boxShadow: {
        'gov': '0 2px 8px -2px rgba(15, 23, 42, 0.08), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        'gov-lg': '0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
        'gov-card': '0 4px 20px -2px rgba(153, 27, 27, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)'
      }
    },
  },
  plugins: [],
}
