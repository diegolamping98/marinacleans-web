// src/components/work/BeforeAfterSection.tsx
import * as React from "react";
import {
  Box, Container, Stack, Typography, Button, IconButton, useMediaQuery
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import BeforeAfterCard from "./BeforeAfterCard";

const MotionBox = motion(Box);

type Item = {
  beforeSrc?: string;
  afterSrc?: string;
  alt?: string;
  caption?: string;
  tags?: string[];
};

/** Sustituye los src cuando tengas las fotos públicas (p.ej. "/work/kitchen-before.jpg") */
const ITEMS: Item[] = [
  { caption: "Kitchen deep clean",         tags: ["Grease removal", "Detailing"] },
  { caption: "Post-construction bathroom", tags: ["Dust-free", "Glass & grout"] },
  { caption: "Move-out cleaning",          tags: ["Baseboards", "Appliances"] },
  { caption: "Closet organization",        tags: ["Declutter", "Labeling"] },
  { caption: "Office refresh",             tags: ["Desks", "Common areas"] },
  { caption: "Windows & tracks",           tags: ["Squeegee", "Frames & screens"] },
  { caption: "Fridge & oven detail",       tags: ["Degrease", "Sanitize"] },
  { caption: "Tile & grout brightening",   tags: ["Scrub", "Seal-ready"] },
  { caption: "Garage clean-up",            tags: ["Dust", "Cobwebs"] },
  { caption: "Laundry room reset",         tags: ["Surfaces", "Systems"] },
];

export default function BeforeAfterSection() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const perView = isLg ? 3 : isMd ? 2 : 1;  // 1/2/3 tarjetas visibles

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = React.useState(false);

  // autoplay suave usando scroll-snap
  React.useEffect(() => {
    if (paused) return;
    const el = scrollerRef.current;
    if (!el) return;

    const id = window.setInterval(() => {
      const viewW = el.clientWidth;
      const atEnd = el.scrollLeft + viewW >= el.scrollWidth - el.clientWidth - 2;

      if (atEnd) {
        // wrap al inicio
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: viewW, behavior: "smooth" });
      }
    }, 3500);

    return () => window.clearInterval(id);
  }, [paused, perView]);

  const handlePrev = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  };

  const handleNext = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - el.clientWidth - 2;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    }
  };

  // cálculo de “página” para los dots
  const [page, setPage] = React.useState(0);
  const pages = Math.max(1, Math.ceil(ITEMS.length / perView));

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const currentPage = Math.round(el.scrollLeft / w);
    setPage(Math.min(pages - 1, Math.max(0, currentPage)));
  };

  return (
    <Box
      id="work"
      component="section"
      sx={(t) => ({
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha(t.palette.primary.light, 0.10)} 100%)`,
        borderTop: `1px solid ${alpha(t.palette.primary.main, 0.06)}`,
      })}
    >
      <Container maxWidth="xl">
        {/* Encabezado animado */}
        <Stack spacing={1} sx={{ mb: { xs: 3.5, md: 5 }, textAlign: "center" }}>
          <MotionBox
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .55 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-.01em", fontSize: { xs: 28, md: 36 } }}>
              Check out our work
            </Typography>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .55, delay: .05 }}
          >
            <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
              Before/after transformations that speak for themselves. Drag the handle to compare.
            </Typography>
          </MotionBox>
        </Stack>

        {/* Carrusel */}
        <Box
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          sx={{ position: "relative" }}
        >
          {/* Controles flecha */}
          <IconButton
            aria-label="Previous"
            onClick={handlePrev}
            sx={(t) => ({
              position: "absolute",
              zIndex: 2,
              left: { xs: 4, md: 8 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              border: `1px solid ${t.palette.divider}`,
              boxShadow: 2,
              "&:hover": { bgcolor: alpha(t.palette.primary.main, 0.06) },
            })}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <IconButton
            aria-label="Next"
            onClick={handleNext}
            sx={(t) => ({
              position: "absolute",
              zIndex: 2,
              right: { xs: 4, md: 8 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              border: `1px solid ${t.palette.divider}`,
              boxShadow: 2,
              "&:hover": { bgcolor: alpha(t.palette.primary.main, 0.06) },
            })}
          >
            <ChevronRightRoundedIcon />
          </IconButton>

          {/* Viewport con scroll-snap y swipe nativo */}
          <MotionBox
            ref={scrollerRef}
            onScroll={onScroll}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .45 }}
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              display: "grid",
              gridAutoFlow: "column",
              gap: { xs: 2, md: 3 },
              // columnas responsivas (1 / 2 / 3)
              gridAutoColumns: {
                xs: "100%",
                md: "50%",
                lg: "33.3333%",
              },
              px: { xs: 1, md: 2 },
              py: 1,
              // ocultar scrollbar (estilos cross-browser)
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {ITEMS.map((it, i) => (
              <motion.div
                key={i}
                style={{ scrollSnapAlign: "start" }}
                whileHover={{ scale: 1.01 }}
              >
                <BeforeAfterCard
                  beforeSrc={it.beforeSrc}
                  afterSrc={it.afterSrc}
                  alt={it.alt}
                  caption={it.caption}
                  tags={it.tags}
                  ratio="4 / 3"
                />
              </motion.div>
            ))}
          </MotionBox>

          {/* Dots */}
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
            {Array.from({ length: pages }).map((_, i) => (
              <Box
                key={i}
                sx={(t) => ({
                  width: i === page ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  transition: "all .25s ease",
                  bgcolor:
                    i === page
                      ? t.palette.primary.main
                      : alpha(t.palette.primary.main, 0.25),
                })}
              />
            ))}
          </Stack>
        </Box>

        {/* CTA */}
        <Stack spacing={2} alignItems="center" sx={{ mt: { xs: 5, md: 6 } }}>
          <MotionBox
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
          >
           
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
