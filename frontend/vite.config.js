import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    envDir: path.resolve(__dirname, '../backend'),
    plugins: [
        {
            name: 'redirect-to-laravel',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/' || req.url === '/index.html') {
                        res.writeHead(302, { Location: 'http://127.0.0.1:8000' });
                        res.end();
                        return;
                    }
                    next();
                });
            },
        },
        laravel({
            input: ['src/app.jsx'],
            publicDirectory: '../backend/public',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        cors: true,
    },
});
