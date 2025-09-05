import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { theme } from "./app/theme";
import AnimatedStyles from "./components/AnimatedStyles"; // 👈 importa estilos animados globales

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Inyectamos animaciones globales */}
      <AnimatedStyles />

      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
