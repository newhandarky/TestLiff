import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // 指定打包輸出的目錄
  },
  server: {
    allowedHosts: ['89f4-220-130-7-9.ngrok-free.app'], // 替換為你的 ngrok URL
  },
})
