/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial"],
      },
      colors: {
        bkg: "var(--bkg)",
        bkg2: "var(--bkg2)",

        heading: "var(--heading)",
        content: "var(--content)",
        content2: "var(--content2)",

        br: "var(--br)",
        comp: "var(--comp)",
        comp2: "var(--comp2)",
        hv: "var(--hv)",

        logo: "var(--logo)",

        accent: "var(--accent)",
        accent2: "var(--accent2)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
