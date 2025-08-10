import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.{json,ts}'
  ],
  theme: {
    extend: {
      colors: {
        base: '#0c0c0f',
        neon: {
          cyan: '#00e5ff',
          magenta: '#ff00e5'
        }
      },
      fontFamily: {
        display: ["'Archivo Black'", 'system-ui', 'sans-serif'],
        body: ["'Inter'", 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;


