import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Default Theme - Dark with Gold
        primary: {
          DEFAULT: '#D4AF37',
          50: '#FAF7ED',
          100: '#F5EEDB',
          200: '#EBDDB7',
          300: '#E1CC93',
          400: '#D7BB6F',
          500: '#D4AF37',
          600: '#B8942A',
          700: '#8A6F20',
          800: '#5C4A15',
          900: '#2E250B',
        },
        background: {
          DEFAULT: '#0A0A0A',
          secondary: '#1A1A1A',
          tertiary: '#2A2A2A',
        },
        // Gold Luxe Theme
        goldLuxe: {
          primary: '#FFD700',
          background: '#000000',
          secondary: '#1C1C1C',
        },
        // Midnight Blue Theme
        midnight: {
          primary: '#4A90E2',
          background: '#0D1B2A',
          secondary: '#1B263B',
        },
        // Rose Gold Theme
        roseGold: {
          primary: '#B76E79',
          background: '#1A1A1A',
          secondary: '#2D2424',
        },
        // Emerald Theme
        emerald: {
          primary: '#50C878',
          background: '#0A1612',
          secondary: '#152822',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
