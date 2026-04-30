/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F0F10',
        surface: '#1A1A1C',
        text: '#E8E6E1',
        muted: '#8A8680',
        accent: '#B8392E',
        metal: '#9C9893',
      },
      fontFamily: {
        serif: ['"Playfair Display Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            a: { color: theme('colors.accent') },
            h1: { fontFamily: '"Playfair Display Variable", Georgia, serif' },
            h2: { fontFamily: '"Playfair Display Variable", Georgia, serif' },
            h3: { fontFamily: '"Playfair Display Variable", Georgia, serif' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
