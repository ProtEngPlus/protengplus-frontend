/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],

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
      boxShadow: {
        dropShadow: "0 4px 4px 0 rgba(0,0,0,0.25)",
      },
      screens: {
        inputField: "900px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
