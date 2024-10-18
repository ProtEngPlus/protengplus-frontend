/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mitr", "sans-serif"],
      },
      colors: {
        placeholder: "#9CA3AF",
        label: "#6B7280", // gray-500
        text: "black",
        error: "#EF4444", // red-500
        selected: "#2578D3",
      },
    },
  },
  plugins: [],
};
