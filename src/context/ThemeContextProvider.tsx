import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

// Create context
type ContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ContextProps | undefined>(undefined);

// Context provider
type Props = {
  children: ReactNode;
};
const ThemeContextProvider = ({ children }: Props) => {
  const isDarkOS = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    isDarkOS ? "dark" : "light"
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // Create context value
  const contextValue: ContextProps = useMemo(
    () => ({
      isDarkMode: mode === "dark",
      toggleTheme: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  // Render
  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to get the context value
function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}

export { ThemeContextProvider, useThemeContext };
