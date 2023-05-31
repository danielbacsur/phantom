/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Ki Medium", "monospace"],
      },
      fontSize: {
        small: "calc(var(--vw) * 0.03)",
        medium: "calc(var(--vw) * 0.05)",
        large: "calc(var(--vw) * 0.07)",
      },
      screens: {
        ultrawide: "1721px",
      },
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
