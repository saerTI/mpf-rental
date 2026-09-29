import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Colores de marca vía variables CSS (se inyectan desde Firestore en el
      // layout público). Formato de canales RGB para soportar opacidades
      // (bg-primary/10, accent/30, etc.). Defaults en app/globals.css.
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          light: 'rgb(var(--color-primary) / 0.1)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          light: 'rgb(var(--color-accent) / 0.1)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
          light: 'rgb(var(--color-secondary) / 0.1)',
        },
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        // No están en el modelo de marca: se mantienen fijos.
        darkBlue: '#2d3e5f',
        lightBlue: '#5169a0',
        deepNavy: '#1a233a',
      }



    },
  },
  plugins: [],
};
export default config;