import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pkg from './package.json' with { type: 'json' };

// this config is used to transpiled library file itself

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    minify: false,
    cssMinify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AdslotUI',
      fileName: 'adslot-ui',
      formats: ['es'],
      cssFileName: 'adslot-ui',
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
  },
});
