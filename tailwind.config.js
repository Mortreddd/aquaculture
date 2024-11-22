/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#323131",

          secondary: "#33CBB6",

          accent: "#00ffff",

          neutral: "#ff00ff",

          "base-100": "#323131",

          info: "#3b82f6",

          success: "#22c55e",

          warning: "#f59e0b",

          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
