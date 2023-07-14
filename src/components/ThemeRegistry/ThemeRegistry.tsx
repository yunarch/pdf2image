"use client";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import type { ReactNode } from "react";
import { ThemeContextProvider } from "../../context/ThemeContextProvider";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeContextProvider>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          {children}
        </Box>
      </ThemeContextProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
