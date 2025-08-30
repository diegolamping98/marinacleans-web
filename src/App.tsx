import { Routes, Route } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import QuoteForm from "./components/quote/QuoteForm";

function QuotePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
        Request your quote
      </Typography>
      <QuoteForm />
    </Container>
  );
}

export default function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Accesibilidad: salto a contenido */}
      <Box component="a" href="#main" sx={{ position: "absolute", left: -9999, "&:focus": { left: 16 } }}>
        Skip to content
      </Box>

      {/* Header en todas las páginas */}
      <Header />

      {/* Contenido */}
      <Box
        id="main"
        component="main"
        sx={{
          flexGrow: 1,
          // Compensa el AppBar fijo cuando se navega a anchors (#services, etc.)
          "& section[id]": { scrollMarginTop: { xs: 76, md: 88 } },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route
            path="*"
            element={
              <Container sx={{ py: 6 }}>
                <Typography>404</Typography>
              </Container>
            }
          />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
