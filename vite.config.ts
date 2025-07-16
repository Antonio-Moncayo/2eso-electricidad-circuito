import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'; // Necesitamos importar react

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // ESTA ES LA LÍNEA QUE ARREGLA TODO
    base: '/2eso-electricidad-circuito/',
    
    plugins: [react()], // Añadimos el plugin de React
    
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Es mejor apuntar a la carpeta src
      },
    },
  };
});