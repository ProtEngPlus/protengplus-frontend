/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
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
      },
      boxShadow: {
        dropShadow: "0 4px 4px 0 rgba(0,0,0,0.25)",
        pagination: "0 1px 3px 0 rgba(0,0,0,0.13)",
        table: "0 3px 8px 0 rgba(0,0,0,0.08)",
        dropDown: "0 1px 3px 0 rgba(166,175,195,0.4)",
        statistic: "0 1px 6.25px 0 rgba(166,175,195,0.4)",
      },
      screens: {
        inputField: "900px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
