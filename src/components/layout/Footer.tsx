import { Box, Container, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={(t) => ({ borderTop: `1px solid ${t.palette.divider}` })}>
      <Container
        maxWidth="lg"
        sx={{
          py: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" fontWeight={700} color="primary.main">
          © {new Date().getFullYear()} Marina Cleans
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#services" underline="none">Servicios</Link>
          <Link href="#quote" underline="none">Cotización</Link>
          <Link href="#contact" underline="none">Contacto</Link>
        </Box>
      </Container>
    </Box>
  );
}
