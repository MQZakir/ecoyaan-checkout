/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        "cream-dark": "#EDE6D6",
        forest: "#2C5F2E",
        "forest-light": "#3D7A40",
        "forest-muted": "#557A57",
        amber: "#C67A3C",
        "amber-light": "#E8934A",
        bark: "#6B4C3B",
        stone: "#8C8278",
        ink: "#1C1C1C",
        "ink-soft": "#3D3935",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
