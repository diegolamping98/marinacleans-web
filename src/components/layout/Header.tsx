// src/components/layout/Header.tsx
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  AppBar, Toolbar, Button, Container, Box, Drawer, List,
  ListItemButton, ListItemText, Divider, useScrollTrigger, Stack,
  Typography, IconButton
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

export default function Header() {
  const trigger = useScrollTrigger({ threshold: 8 });
  const [open, setOpen] = useState(false);

  // ✅ Teléfono correcto
  const PHONE_DISPLAY = "(415) 685-1462";
  const PHONE_TEL = "+14156851462";

  const navItems = [
    { label: "Why us", href: "#why" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Work", href: "#work" },          // 👈 agregado
    { label: "Contact", href: "#contact" },
  ];

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={trigger ? 3 : 0}
      sx={(t) => ({
        bgcolor: "rgba(255,255,255,.92)",
        backdropFilter: "saturate(180%) blur(10px)",
        borderBottom: `1px solid ${trigger ? t.palette.divider : "transparent"}`,
        transition: "border-color .2s ease, box-shadow .2s ease",
      })}
    >
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
        <Toolbar sx={{ gap: 1.5, minHeight: { xs: 70, md: 88 }, px: 0 }}>
          {/* IZQUIERDA: Menú + Marca (logo grande + texto) */}
          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Hamburguesa (mobile) */}
            <IconButton
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              sx={(t) => ({
                display: { xs: "inline-flex", md: "none" },
                color: t.palette.primary.main,
                bgcolor: alpha(t.palette.primary.main, 0.08),
                border: `1px solid ${alpha(t.palette.primary.main, 0.18)}`,
                "&:hover": { bgcolor: alpha(t.palette.primary.main, 0.14) },
              })}
            >
              <MenuRoundedIcon />
            </IconButton>

            {/* Botón 'Menu' (desktop) */}
            <Button
              onClick={() => setOpen(true)}
              startIcon={<MenuRoundedIcon />}
              variant="outlined"
              size="medium"
              sx={(t) => ({
                display: { xs: "none", md: "inline-flex" },
                borderRadius: 999,
                px: 1.5,
                borderColor: alpha(t.palette.primary.main, 0.25),
                color: t.palette.primary.main,
                bgcolor: alpha(t.palette.primary.main, 0.06),
                "&:hover": { bgcolor: alpha(t.palette.primary.main, 0.12), borderColor: alpha(t.palette.primary.main, 0.35) },
              })}
            >
              Menu
            </Button>

            {/* Brand: Logo imagen + texto */}
            <Box
              component={RouterLink}
              to="/"
              aria-label="Go to home"
              style={{ textDecoration: "none" }}
            >
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 1.5 }}>
                <Box
                  component="img"
                  src="/logo3.png"
                  alt="Marina Cleans logo"
                  loading="eager"
                  fetchPriority="high"
                  sx={{
                    height: { xs: 48, md: 68 },
                    width: "auto",
                    display: "block",
                    filter: "drop-shadow(0 3px 10px rgba(0,47,108,.18))",
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "'Great Vibes', cursive",
                    fontWeight: 500,
                    fontSize: { xs: 32, md: 48 },
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "baseline",
                    gap: { xs: 0.5, md: 0.75 },
                  }}
                >
                  <Box component="span" sx={{ color: "#F19AC6" }}>Marina</Box>
                  <Box component="span" sx={{ color: "primary.main" }}>Cleans</Box>
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* DERECHA: Acciones */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LocalPhoneRoundedIcon />}
              href={`tel:${PHONE_TEL}`}
              sx={{ borderRadius: 2 }}
            >
              {PHONE_DISPLAY}
            </Button>
          </Stack>

          {/* DRAWER (izquierda) */}
          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              sx: (t) => ({
                width: { xs: "86vw", sm: 420 },
                maxWidth: 520,
                bgcolor: t.palette.background.paper,
                borderRight: `1px solid ${t.palette.divider}`,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                overflow: "hidden",
              }),
            }}
          >
            {/* Header Drawer */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={(t) => ({
                p: 2,
                borderBottom: `1px solid ${t.palette.divider}`,
                background: "linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,255,255,.92))",
                position: "sticky",
                top: 0,
                zIndex: 1,
              })}
            >
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Box
                  component="img"
                  src="/logo2.png"
                  alt="Marina Cleans"
                  loading="eager"
                  sx={{ height: 40, width: "auto", display: "block", filter: "drop-shadow(0 2px 6px rgba(0,47,108,.18))" }}
                />
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 24,
                    letterSpacing: "-.01em",
                    fontFamily: "'Great Vibes', cursive",
                  }}
                >
                  <Box component="span" sx={{ color: "#F19AC6", mr: 0.5 }}>Marina</Box>
                  <Box component="span" sx={{ color: "primary.main" }}>Cleans</Box>
                </Typography>
              </Stack>

              <IconButton
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                sx={(t) => ({
                  color: t.palette.text.secondary,
                  "&:hover": { bgcolor: alpha(t.palette.primary.main, 0.08) },
                })}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Stack>

            {/* Navegación */}
            <List sx={{ p: 1.25 }}>
              {navItems.map((item) => (
                <ListItemButton
                  key={item.label}
                  component="a"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  sx={(t) => ({
                    borderRadius: 2,
                    mb: 0.5,
                    "&:hover": { bgcolor: alpha(t.palette.primary.main, 0.06) },
                  })}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>

            <Divider />

            {/* Contacto rápido */}
            <Stack spacing={1.25} sx={{ px: 2.5, py: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocalPhoneRoundedIcon color="primary" />
                <Typography>{PHONE_DISPLAY}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MailOutlineRoundedIcon color="primary" />
                <Typography>info@marinacleans.com</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PlaceOutlinedIcon color="primary" />
                <Typography>San Francisco, CA</Typography>
              </Stack>
            </Stack>

            {/* Acciones inferiores */}
            <Stack spacing={1.25} sx={{ p: 2.5, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/quote"
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2 }}
              >
                Get a quote
              </Button>
              <Stack direction="row" spacing={1.25}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                  href={`https://wa.me/${PHONE_TEL.replace(/\D/g, "")}`}
                  onClick={() => setOpen(false)}
                  sx={(t) => ({
                    borderRadius: 2,
                    boxShadow: `0 6px 16px ${alpha(t.palette.success.main, 0.25)}`,
                  })}
                >
                  WhatsApp
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<LocalPhoneRoundedIcon />}
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => setOpen(false)}
                  sx={{ borderRadius: 2 }}
                >
                  Call
                </Button>
              </Stack>
            </Stack>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
