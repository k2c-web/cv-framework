/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      /* Palette grise premium (optionnelle) */
      colors: {
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2933",
          900: "#111827",
        },
      },

      /* Typographie premium */
      fontSize: {
        "3xl": ["1.875rem", { lineHeight: "1.2" }],
        lg: ["1.125rem", { lineHeight: "1.3" }],
        base: ["1rem", { lineHeight: "1.3" }],
        15: ["0.9375rem", { lineHeight: "1.35" }],
        14: ["0.875rem", { lineHeight: "1.45" }],
        13: ["0.8125rem", { lineHeight: "1.35" }],
      },

      /* Spacing premium */
      spacing: {
        1.5: "0.375rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
      },
    },
  },

  plugins: [],
};
