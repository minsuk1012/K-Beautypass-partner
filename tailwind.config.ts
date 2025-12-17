import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#FF5A5F',      // Bottom Left of logo (Vibrant Coral/Red)
          blue: '#4169E1',     // Bottom Right of logo (Royal Blue)
          pink: '#FFD6D6',     // Top Left of logo (Soft Pink)
          lightblue: '#D6E4FF',// Top Right of logo (Soft Blue)
          dark: '#1e293b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
        heading: ['Noto Sans KR', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
