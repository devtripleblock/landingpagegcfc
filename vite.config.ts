import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/landingpagegcfc/', // <-- tên repo, có gạch chéo 2 bên
})
