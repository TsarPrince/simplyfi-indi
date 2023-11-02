import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#273648",
        lightGray: "#EEF1F0",
        blue: "#4E91C2",
        lightBlue: "#C2DDFF",
        green: "#4EC2C2",
        brown: "#C2894E",
      },
      fontSize: {
        TitleLarge1: ["90px", { fontWeight: 700 }],
        TitleLarge2: ["55px", { fontWeight: 700, lineHeight: "1.2" }],
        TitleMedium: ["32px", { fontWeight: 600 }],
        TitleSmall: ["24px", { fontWeight: 600 }],
        TitleSmall2: ["20px", { fontWeight: 600 }],
        BodyLarge: ["18px", { fontWeight: 500 }],
        BodyMedium: ["16px", { fontWeight: 500 }],
        BodyMedium2: ["14px", { fontWeight: 500 }],
        BodySmall: ["12px", { fontWeight: 500 }],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
