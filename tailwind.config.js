// tailwind.config.js
module.exports = {
  // Adiciona `important: true` para que todas as utilitárias geradas tenham `!important`.
  // Use com cuidado — aumenta especificidade globalmente.
  important: true,
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: []
}