/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}", // necessário para processar arquivos JSX
    "./dist/index.html"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
