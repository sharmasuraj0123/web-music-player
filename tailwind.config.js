/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'border': 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'accent': 'var(--color-accent)',
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--color-gradient-from), var(--color-gradient-to))',
      },
    },
  },
  plugins: [],
};
