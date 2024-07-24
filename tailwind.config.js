/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        notoSans: ["Noto Sans", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        notoSansDisplay: ["Noto Sans Display", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        bgColor: "#F4F4F4",
        loginBgColor: "#C4C4C4",
        btnColor: "#76DE37",
        secondary: "#000000a6",
      },
    },
  },
  plugins: [require("daisyui")],
};
