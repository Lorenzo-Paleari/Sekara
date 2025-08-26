import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        brand: {
            "25":  "#F6FEF9",
            "50":  "#ECFDF3",
            "100": "#D1FADF",
            "200": "#A6F4C5",
            "300": "#6CE9A6",
            "400": "#32D583",
            "500": "#12B76A",
            "600": "#039855",
            "700": "#027A48",
            "800": "#05603A",
            "900": "#054F31",
            "950": "#022C1A",
        },
        "discord-gray": "#2F3136",
        "discord-text": "#E3E5E8",
        "discord-timestamp": "#7F8C87",
      },
    },
  },
  plugins: [],
}
export default config
