import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://lit-ocean-20742-9fe344a27f35.herokuapp.com/',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})