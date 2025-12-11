/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');
module.exports = {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [primeui],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        fontSize: {
            'xs': '0.875rem',    // 14px
            'sm': '1rem',        // 16px (antes era 14px)
            'base': '1.125rem',  // 18px (antes era 16px)
            'lg': '1.25rem',     // 20px
            'xl': '1.5rem',      // 24px
            '2xl': '1.875rem',   // 30px
            '3xl': '2.25rem',    // 36px
            '4xl': '3rem',       // 48px
        }
    }
};
