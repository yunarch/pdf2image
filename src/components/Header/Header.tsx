"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useThemeContext } from "../../context/ThemeContextProvider";

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  // Render
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar variant="dense">
        <Typography
          variant="h1"
          flex="1"
          color="text.primary"
          fontSize="2rem"
          fontWeight="bold"
        >
          PDF 2 image
        </Typography>
        <Box>
          <IconButton
            color="default"
            href="https://github.com/yunarch/pdf2image"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton color="primary" onClick={toggleTheme}>
            {!isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
