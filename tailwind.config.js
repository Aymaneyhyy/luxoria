import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', ...defaultTheme.fontFamily.sans],
                serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                gold: {
                    400: '#F3E5AB',
                    500: '#D4AF37',
                    600: '#C5A059',
                    700: '#996515',
                },
                dark: {
                    900: '#0A0A0B',
                    800: '#121214',
                    700: '#1A1A1E',
                    600: '#25252A',
                }
            }
        },
    },
    plugins: [],
};
