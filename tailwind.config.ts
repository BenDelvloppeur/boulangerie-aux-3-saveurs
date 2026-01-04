import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFA',
          100: '#FAF6F1',
          200: '#F2E8DB', // Beige doux fond
          300: '#E8D4BC',
        },
        brown: {
          500: '#A67C52', // Caramel
          800: '#5D4037', // Cacao clair
          900: '#3E2723', // Cacao foncé (texte)
        },
        green: {
          700: '#4E7044', // Vert feuille (accent naturel)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
