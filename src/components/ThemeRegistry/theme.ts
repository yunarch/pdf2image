import type { ThemeOptions } from "@mui/material/styles";
import { Roboto } from "next/font/google";

// Define fonts
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create theme
const defaultTheme: ThemeOptions = {
  typography: {
    fontFamily: roboto.style.fontFamily,
    body1: { fontFamily: roboto.style.fontFamily },
    body2: { fontFamily: roboto.style.fontFamily },
  },
};

export default defaultTheme;
