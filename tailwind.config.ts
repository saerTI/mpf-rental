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
        primary: {
          DEFAULT: '#3C2F7C',
          hover: '#2d2360',
          light: '#3C2F7C1A',
        },
        accent: {
          DEFAULT: '#FFB800',
          hover: '#e6a600',
          light: '#FFB8001A',
        },
        secondary: {
          DEFAULT: '#7D6BD5',
          hover: '#6254b3',
          light: '#7D6BD51A',
        },
        navy: '#3d4e7c',
        darkBlue: '#2d3e5f',
        lightBlue: '#5169a0',
        deepNavy: '#1a233a',
      }



    },
  },
  plugins: [],
};
export default config;