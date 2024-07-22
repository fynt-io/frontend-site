import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  sans: ['Open Sans'],
  darkMode: ['class'],
  theme: {
    colors: {
      'transparent': 'transparent',
      'black': '#000000',
      'tall-grey': '#2B2B2B',
      'light-grey': '#a7aab4',
      'white-smoke': '#f4f6f9',
      'cloudy-blue': '#aec3d3',
      'gravel': '#42464d',
      'yellowgreenish': '#D2DAB0',
      'glacier': '#72B1C7',
      'yellow': '#FEDC9A',
      'red': '#A7513F',
      //DESIGN SYSTEM COLORS
      'oil': '#050505',
      'dark-grey': '#272727',
      'medium-grey': '#3F3F3F',
      'grey': '#565656',
      'yellow-greenish': '#E9E3AA',
      'white': '#ffffff',
      'bren-blue-100': '#EBF0F4',
      'bren-blue-200': '#D6E0E9',
      'bren-blue-300': '#AEC3D4',
      'bren-alert': '#F56565',
      'bren-red': '#A7503F',
      'bren-green': '#339A33',
      'bren-yellow': '#FFDD99',
      'bren-grey-text': '#8C8C8C',
    },
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },

      borderColor: (theme) => ({
        'gradient-border-primary': 'var(--border-primary)',
      }),
      color: (theme) => ({
        'primary-color': 'var(--color-primary)',
      }),
      backgroundImage: (theme) => ({
        'bren-gradient-1': 'linear-gradient(90deg, #77B7C2 0%, #649CCF 100%)',
        'bren-gradient-2': 'linear-gradient(90deg, #B6CFB7 0%, #E9E3AA 100%)',
        'whats-bg': 'url(/whatsapp/wp-light.jpg)',
        'whats-bg-dark': "url('/whatsapp/wp-dark.jpg')",
        'gradient-primary-vertical': `linear-gradient(to top, rgb(var(--gradient3-rgb-start)), rgb(var(--gradient3-rgb-end)))`,
        'gradient-primary-horizontal': `linear-gradient(to right, rgb(var(--gradient3-rgb-start)), rgb(var(--gradient3-rgb-end)))`,
        'gradient-secondary-vertical': `linear-gradient(to top, rgb(var(--gradient4-rgb-start)), rgb(var(--gradient4-rgb-end)))`,
        'gradient-secondary-horizontal': `linear-gradient(to right, rgb(var(--gradient4-rgb-start)), rgb(var(--gradient4-rgb-end)))`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }),
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config;
