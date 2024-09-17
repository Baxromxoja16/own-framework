import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',  // Points to the root folder of the project (where index.html is located)
  base: './', // Ensures Vite uses relative paths for assets
  build: {
    outDir: 'dist', // Output folder for the built project
    rollupOptions: {
      input: './index.html', // Specifies the entry point for the build
    }
  }
});