import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@data': resolve(__dirname, 'src/data'),
      '@styles': resolve(__dirname, 'styles'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'historia-linux': resolve(__dirname, 'pages/historia-linux.html'),
        filesystem: resolve(__dirname, 'pages/filesystem.html'),
        'about': resolve(__dirname, 'pages/about.html'),
        '404': resolve(__dirname, 'pages/404.html'),
      },
    },
  },
});
