// src/theme.ts
import { createTheme, alpha } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    // Base corporativa: azul (confianza) + rosa (acento)
    primary:   { main: "#002F6C", dark: "#001E49", light: "#2F5C97", contrastText: "#FFFFFF" },
    secondary: { main: "#F19AC6", dark: "#DA76AC", light: "#F6C1DD", contrastText: "#2A2E39" },

    success:   { main: "#16A34A" },
    warning:   { main: "#F59E0B" },
    error:     { main: "#EF4444" },
    info:      { main: "#0EA5E9" },

    text:      { primary: "#0F172A", secondary: "#475569" },
    divider:   "rgba(2,6,23,.12)",
    background:{ default: "#FFFFFF", paper: "#FFFFFF" },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    h1: { fontWeight: 900, letterSpacing: "-0.02em" },
    h2: { fontWeight: 900, letterSpacing: "-0.02em" },
    button: { textTransform: "none", fontWeight: 700 },
  },

  components: {
    /* Base */
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: alpha("#F19AC6", 0.35),
        },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },

    /* Botones */
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
        containedPrimary: {
          backgroundImage: "linear-gradient(135deg, #002F6C 0%, #001E49 100%)",
          boxShadow: "0 8px 22px rgba(0,47,108,.28)",
          "&:hover": {
            backgroundImage: "linear-gradient(135deg, #001E49 0%, #001633 100%)",
          },
        },
        containedSecondary: {
          backgroundColor: "#F19AC6",
          color: "#2A2E39",
          "&:hover": { backgroundColor: "#DA76AC" },
        },
        outlined: { borderColor: "rgba(2,6,23,.14)" },
      },
    },

    /* Chips / Badges suaves */
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10 },
        colorPrimary:   { backgroundColor: "rgba(0,47,108,.10)", color: "#002F6C" },
        colorSecondary: { backgroundColor: "rgba(241,154,198,.20)", color: "#9C3D75" },
      },
    },

    /* AppBar translúcido con blur */
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "rgba(255,255,255,.82)",
          backdropFilter: "saturate(180%) blur(10px)",
          borderBottom: "1px solid rgba(2,6,23,.12)",
        },
      },
    },

    /* Tarjetas con borde sutil */
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(2,6,23,.08)",
        },
      },
    },

    /* Links en azul corporativo */
    MuiLink: {
      styleOverrides: {
        root: { color: "#002F6C", "&:hover": { color: "#001E49" } },
      },
    },

    /* Drawer estilizado (para tu menú) */
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          borderLeft: "1px solid rgba(2,6,23,.12)",
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,255,255,.94))",
          backdropFilter: "saturate(160%) blur(6px)",
        },
      },
    },

    /* List items cómodos y con hover azul suave (para el Drawer) */
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
          borderRadius: 12,
          "&:hover": {
            backgroundColor: "rgba(0,47,108,.06)",
          },
        },
      },
    },

    /* Dividers más suaves */
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(2,6,23,.12)" },
      },
    },

    /* Paper “outlined” uniforme (si lo usas) */
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: "rgba(2,6,23,.12)",
        },
      },
    },
  },
});
