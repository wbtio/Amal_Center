/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './contexts/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#FFB300',
        background: '#F5F5F5',
        text: {
          primary: '#212121',
          secondary: '#757575'
        }
      },
      fontFamily: {
        ibm: ['IBMPlexSansArabic_400Regular'],
        'ibm-bold': ['IBMPlexSansArabic_700Bold'],
        'ibm-semibold': ['IBMPlexSansArabic_600SemiBold'],
      }
    },
  },
  plugins: [],
};
