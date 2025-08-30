import * as React from "react";
import {
  Box, Button, Card, Chip, Container, Grid, Stack, Typography,
  useMediaQuery
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import LocalPhoneRounded from "@mui/icons-material/LocalPhoneRounded";

import { motion, useScroll, useTransform } from "framer-motion";
import { MOSAIC, type MosaicPhoto } from "./mosaicPhotos";

/* Motion helpers */
const MotionBox = motion(Box);
const fadeUp: any = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: "easeOut" } }
};
const stagger: any = { show: { transition: { staggerChildren: 0.08 } } };

export default function Hero() {
  // ✅ Teléfono correcto
  const PHONE_DISPLAY = "(415) 685-1462";
  const PHONE_TEL = "+14156851462";

  const theme = useTheme();
  const prefersReduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Parallax del mosaico con el scroll
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 10 },
        background:
          "radial-gradient(1200px 400px at 10% -10%, rgba(236,72,153,.12), transparent), radial-gradient(900px 360px at 95% -20%, rgba(167,139,250,.12), transparent), linear-gradient(135deg,#FFF7FB 0%, #FFFFFF 55%, #FDF2FB 100%)",
      }}
    >
      {/* “Blob” luminoso animado detrás (parpadeo muy sutil) */}
      <MotionBox
        aria-hidden
        sx={{
          position: "absolute",
          right: "-10%",
          top: "-20%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${alpha(theme.palette.secondary.main, .18)}, transparent)`,
          filter: "blur(18px)",
        }}
        animate={prefersReduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left */}
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              component={Stack}
              spacing={2.25}
            >
              <MotionBox variants={fadeUp} component={Chip}
                color="secondary" variant="outlined" icon={<VerifiedRounded />}
                label="Trusted residential & commercial cleaning"
                sx={{ alignSelf: "flex-start" }}
              />

              <MotionBox variants={fadeUp}>
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    fontSize: { xs: 30, sm: 38, md: 46 },
                  }}
                >
                  Sparkling spaces,{" "}
                  <motion.span
                    style={{
                      backgroundImage: "linear-gradient(90deg,#EC4899,#A78BFA)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block"
                    }}
                    initial={{ backgroundPositionX: "0%" }}
                    whileInView={prefersReduce ? {} : { backgroundPositionX: ["0%","100%","0%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  >
                    made in minutes
                  </motion.span>
                </Typography>
              </MotionBox>

              <MotionBox variants={fadeUp}>
                <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
                  Fast, reliable cleaning by an experienced female team. Eco-friendly,
                  detail-oriented, and satisfaction guaranteed.
                </Typography>
              </MotionBox>

              <MotionBox variants={fadeUp}>
                <TrustRow
                  items={[
                    { icon: <WorkspacePremiumRounded fontSize="small" />, text: "Women-led, vetted team" },
                    { icon: <SpaOutlined fontSize="small" />, text: "Eco-friendly products" },
                  ]}
                />
              </MotionBox>

              <MotionBox variants={fadeUp}>
                <Stack direction="row" spacing={1.25} flexWrap="wrap">
                  <motion.div whileHover={!prefersReduce ? { scale: 1.02 } : undefined}>
                    <Button size="large" variant="contained" href="#quote" sx={{ borderRadius: 2 }}>
                      Get a quote in minutes
                    </Button>
                  </motion.div>
                  <motion.div whileHover={!prefersReduce ? { scale: 1.02 } : undefined}>
                    <Button
                      size="large"
                      variant="outlined"
                      href={`tel:${PHONE_TEL}`}
                      startIcon={<LocalPhoneRounded />}
                      sx={{ borderRadius: 2 }}
                    >
                      Call {PHONE_DISPLAY}
                    </Button>
                  </motion.div>
                </Stack>
              </MotionBox>
            </MotionBox>
          </Grid>

          {/* Right: mosaic con parallax y “float” */}
          <Grid item xs={12} md={6}>
            <MotionBox style={prefersReduce ? {} : { y: parallaxY }}>
              <Box
                sx={{
                  position: "relative",
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: 2,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gap: 1.25,
                    gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "2fr 1fr 1fr" },
                    gridAutoRows: { xs: 120, md: 160 },
                  }}
                >
                  <FloatingMosaic img={MOSAIC[0]} priority span="2x2" delay={0} />
                  <FloatingMosaic img={MOSAIC[1]} delay={.2} />
                  <FloatingMosaic img={MOSAIC[5]} delay={.4} />
                  <FloatingMosaic img={MOSAIC[3]} delay={.6} />
                  <FloatingMosaic img={MOSAIC[4]} delay={.8} />
                  {MOSAIC[5] && (
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                      <FloatingMosaic img={MOSAIC[2]} delay={1.0} />
                    </Box>
                  )}
                </Box>

                <MotionBox
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  sx={{
                    position: "absolute",
                    left: -10,
                    bottom: -10,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    boxShadow: 1,
                    fontSize: 13,
                  }}
                >
                  <b>250+</b> homes served
                </MotionBox>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* helpers */
function TrustRow({ items }: { items: { icon: React.ReactNode; text: string }[] }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items.map((i, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ color: "primary.main", display: "inline-flex" }}>{i.icon}</Box>
          <Typography variant="body2">{i.text}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

/* Tarjeta del mosaico con flotado y micro-tilt */
// cambios en FloatingMosaic
import type { SxProps, Theme } from "@mui/material/styles";

function FloatingMosaic({
  img, span, delay = 0, priority = false, sx,
}: {
  img?: MosaicPhoto;
  span?: "2x2";
  delay?: number;
  priority?: boolean;
  sx?: SxProps<Theme>;
}) {
  const theme = useTheme();
  const prefersReduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const baseSx =
    span === "2x2"
      ? { gridColumn: { xs: "span 2", md: "span 2" }, gridRow: { xs: "span 2", md: "span 2" } }
      : {};

  return (
    <MotionBox
      component={Card}
      variant="outlined"
      whileHover={prefersReduce ? undefined : { scale: 1.02, rotate: 0.3 }}
      animate={prefersReduce ? undefined : { y: [0, -6, 0] }}
      transition={prefersReduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 2,
        borderColor: alpha(theme.palette.primary.main, 0.12),
        height: "100%",         // 👈 clave
        ...baseSx,
        ...(sx as object),
      }}
    >
      {img && (
        <Box
          component="img"
          src={img.src}
          alt={img.alt}
          loading={priority ? "eager" : "lazy"}
          onError={(e: any) => { e.currentTarget.style.display = "none"; }}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: img.pos || "center" }}
        />
      )}
    </MotionBox>
  );
}
