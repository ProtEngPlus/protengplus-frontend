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
        mitr: ["Mitr", "sans-serif"],
      },
      colors: {
        placeholder: "#9CA3AF",
        label: "#6B7280",
        text: "black",
        error: "#EF4444",
        selected: "#2578D3",
        "pep-blue": "#2578D3",
        "pep-orange": "#F58634",
        "pep-green": "#60B86B",
        "pep-pink": "#D30085",
        "pep-gray": "#9CA3AF",
        "pep-blue-hover": "#1D5B9E",
        "pep-blue-light": "#EFF6FF",
        "pep-gray-border": "#DFE4EA",
        "pep-dark-gray": "#637381",
        "pep-gray-light": "#F9FAFB",
        "pep-dark-blue": "#165BAA",
        "pep-light-gray": "#F1F1F1",
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
