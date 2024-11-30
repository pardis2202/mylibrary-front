import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'jwt-decode': path.resolve(__dirname, 'node_modules/jwt-decode/build/cjs/index.js')
    }
    
},

});
