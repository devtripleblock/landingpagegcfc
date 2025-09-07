// tailwind.config.js
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // (tuỳ nhu cầu có thể bổ sung các màu khác theo shadcn như primary, muted, card, ring, v.v.)
      },
    },
  },
  plugins: [],
}
