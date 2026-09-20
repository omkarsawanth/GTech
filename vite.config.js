import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');

          if (norm.includes('node_modules/@react-three/') || norm.includes('node_modules/three')) {
            return 'vendor-r3f';
          }
          if (norm.includes('node_modules/@ybouane/liquidglass/') || norm.includes('node_modules/html-to-image/')) {
            return 'vendor-liquidglass';
          }
          if (norm.includes('node_modules/firebase/firestore') || norm.includes('node_modules/@firebase/firestore')) {
            return 'vendor-firestore';
          }
          if (norm.includes('node_modules/firebase/auth') || norm.includes('node_modules/@firebase/auth')) {
            return 'vendor-auth';
          }
          if (norm.includes('node_modules/firebase') || norm.includes('node_modules/@firebase')) {
            return 'vendor-firebase';
          }
          if (norm.includes('node_modules/recharts')) {
            return 'vendor-recharts';
          }
          if (norm.includes('node_modules/framer-motion')) {
            return 'vendor-framer-motion';
          }
          if (norm.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (norm.includes('node_modules/react/') || norm.includes('node_modules/react-dom/') || norm.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
        }
      }
    }
  }
});
