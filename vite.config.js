import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Tự động quét và lấy tất cả các file HTML trong thư mục src
const getHtmlInputs = () => {
  const srcDir = path.resolve(__dirname, 'src');
  const inputs = {};
  
  if (fs.existsSync(srcDir)) {
    fs.readdirSync(srcDir).forEach(file => {
      if (file.endsWith('.html')) {
        const name = path.basename(file, '.html');
        inputs[name] = path.resolve(srcDir, file);
      }
    });
  }
  
  return inputs;
};

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [tailwindcss()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
    },
  },
});
