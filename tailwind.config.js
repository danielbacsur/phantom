/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      'display': ['Antonio', 'sans-serif'],
    },
    extend: {
      height: {
        screen: "calc(var(--vh))",
      },
      minHeight: {
        screen: "calc(var(--vh))",
      },
      maxHeight: {
        screen: "calc(var(--vh))",
      },
      width: {
        screen: "calc(var(--vw))",
      },
      minWidth: {
        screen: "calc(var(--vw))",
      },
      maxWidth: {
        screen: "calc(var(--vw))",
      },
    },
  },
  plugins: [],
};
