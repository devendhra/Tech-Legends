/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
  // Safelist ensure colors used in Progress Bars don't get purged
  safelist: [
    'bg-emerald-500',
    'bg-rose-500',
    'bg-amber-500',
    'text-emerald-400',
    'text-rose-400',
    'text-amber-400',
  ]
}