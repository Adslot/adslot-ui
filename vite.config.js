import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import removeTestIdAttribute from 'rollup-plugin-jsx-remove-attributes';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: true,
        babel: false,
      },
      include: '**/*.svg',
    }),
    removeTestIdAttribute({ usage: 'vite' }),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    minify: false,
    cssMinify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AdslotUI',
      fileName: 'adslot-ui',
      formats: ['es', 'cjs'],
      cssFileName: 'adslot-ui',
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
  },
});
