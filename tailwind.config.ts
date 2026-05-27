import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'hsl(220 18% 8%)',
        foreground: 'hsl(0 0% 95%)',
        card: {
          DEFAULT: 'hsl(220 16% 12%)',
          foreground: 'hsl(0 0% 95%)',
        },
        primary: {
          DEFAULT: 'hsl(48 100% 50%)',
          foreground: 'hsl(220 18% 8%)',
        },
        secondary: {
          DEFAULT: 'hsl(220 14% 16%)',
          foreground: 'hsl(0 0% 85%)',
        },
        muted: {
          DEFAULT: 'hsl(220 12% 18%)',
          foreground: 'hsl(220 8% 55%)',
        },
        border: 'hsl(220 12% 20%)',
        input: 'hsl(220 12% 20%)',
        gold: {
          DEFAULT: 'hsl(48 100% 50%)',
          light: 'hsl(48 80% 60%)',
          dark: 'hsl(42 85% 40%)',
        },
        midnight: 'hsl(220 18% 8%)',
        anthracite: 'hsl(220 14% 16%)',
        silver: 'hsl(220 8% 65%)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, hsl(48 100% 50%), hsl(42 85% 58%))',
        'gradient-dark': 'linear-gradient(180deg, hsl(220 18% 8%), hsl(220 16% 14%))',
        'gradient-card': 'linear-gradient(180deg, hsl(220 16% 12%), hsl(220 14% 10%))',
      },
      boxShadow: {
        gold: '0 4px 30px -8px hsl(48 100% 50% / 0.3)',
        'gold-lg': '0 8px 50px -10px hsl(48 100% 50% / 0.4)',
        elevated: '0 20px 60px -15px hsl(0 0% 0% / 0.6)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 hsl(48 100% 50% / 0.4)' },
          '70%': { boxShadow: '0 0 0 12px hsl(48 100% 50% / 0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
