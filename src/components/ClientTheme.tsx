"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "@/theme";

export default function ClientTheme({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "saturate(180%) blur(6px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={800}
            sx={{ flexGrow: 1 }}
          >
            Diet Planner
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ minHeight: "100vh" }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}
