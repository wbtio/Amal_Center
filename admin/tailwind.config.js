/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2E7D32',
                secondary: '#FFB300',
                cta: '#4CAF50',
                danger: '#D32F2F',
                background: '#F5F5F5',
            },
            fontFamily: {
                cairo: ['"Cairo"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
