import type { ReactNode, SyntheticEvent } from "react";
import {
  Box, Button, Card, Chip, Container, Grid, Stack, Typography, useMediaQuery
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import LocalPhoneRounded from "@mui/icons-material/LocalPhoneRounded";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { MOSAIC, type MosaicPhoto } from "./mosaicPhotos";

const MotionBox = motion(Box);
// ✅ nuevos motion components
const MotionStack = motion(Stack);
const MotionChip = motion(Chip);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } };

export default function Hero() {
  const PHONE_DISPLAY = "(415) 685-1462";
  const PHONE_TEL = "+14156851462";

  const theme = useTheme();
  const prefersReduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <Box component="section" sx={{ position: "relative", overflow: "hidden", py: { xs: 8, md: 10 },
      background:
        "radial-gradient(1200px 400px at 10% -10%, rgba(236,72,153,.12), transparent), radial-gradient(900px 360px at 95% -20%, rgba(167,139,250,.12), transparent), linear-gradient(135deg,#FFF7FB 0%, #FFFFFF 55%, #FDF2FB 100%)",
    }}>
      <Box aria-hidden className="anim-blob" sx={{
        position: "absolute", right: "-10%", top: "-20%", width: 460, height: 460, borderRadius: "50%",
        background: `radial-gradient(closest-side, ${alpha(theme.palette.secondary.main, 0.18)}, transparent)`,
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT */}
          <Grid item xs={12} md={6}>
            {/* ⛏️ reemplaza MotionBox component={Stack} */}
            <MotionStack
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              spacing={2.25}
            >
              {/* ⛏️ reemplaza MotionBox component={Chip} */}
              <MotionChip
                variants={fadeUp}
                color="secondary"
                variant="outlined"
                icon={<VerifiedRounded />}
                label="Trusted residential & commercial cleaning"
                sx={{ alignSelf: "flex-start" }}
                className="anim-border-glow"
              />

              <MotionBox variants={fadeUp}>
                <Typography component="h1" sx={{
                  fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em",
                  fontSize: { xs: 30, sm: 38, md: 46 },
                }}>
                  Sparkling spaces, <span className="anim-shine-text">made in minutes</span>
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
                  <Button size="large" variant="contained" href="#quote" sx={{ borderRadius: 2 }} className="anim-btn-shine">
                    Get a quote in minutes
                  </Button>
                  <Button size="large" variant="outlined" href={`tel:${PHONE_TEL}`} startIcon={<LocalPhoneRounded />}
                    sx={{ borderRadius: 2 }} className="anim-btn-shine">
                    Call {PHONE_DISPLAY}
                  </Button>
                </Stack>
              </MotionBox>
            </MotionStack>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={6}>
            <MotionBox style={prefersReduce ? {} : { y: parallaxY }}>
              <Box sx={{
                position: "relative", p: 2, borderRadius: 3, bgcolor: "background.paper",
                border: "1px solid", borderColor: "divider", boxShadow: 2,
              }}>
                <Box sx={{
                  display: "grid", gap: 1.25,
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "2fr 1fr 1fr" },
                  gridAutoRows: { xs: 120, md: 160 },
                }}>
                  <FloatingMosaic img={MOSAIC[0]} priority span="2x2" delay={0} />
                  <FloatingMosaic img={MOSAIC[1]} delay={0.2} />
                  <FloatingMosaic img={MOSAIC[5]} delay={0.4} />
                  <FloatingMosaic img={MOSAIC[3]} delay={0.6} />
                  <FloatingMosaic img={MOSAIC[4]} delay={0.8} />
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
                    position: "absolute", left: -10, bottom: -10, bgcolor: "background.paper",
                    border: "1px solid", borderColor: "divider", borderRadius: 2,
                    px: 1.5, py: 0.5, boxShadow: 1, fontSize: 13,
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

/* Helpers */
function TrustRow({ items }: { items: { icon: ReactNode; text: string }[] }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items.map((i, idx) => (
        <Stack key={idx} direction="row" spacing={0.75} alignItems="center"
          className="anim-border-glow"
          sx={{ px: 1, py: 0.5, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <Box sx={{ color: "primary.main", display: "inline-flex" }}>{i.icon}</Box>
          <Typography variant="body2">{i.text}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function FloatingMosaic({
  img, span, priority = false,
}: {
  img?: MosaicPhoto;
  span?: "2x2";
  delay?: number;
  priority?: boolean;
}) {
  const theme = useTheme();

  const baseSx =
    span === "2x2"
      ? { gridColumn: { xs: "span 2", md: "span 2" }, gridRow: { xs: "span 2", md: "span 2" } }
      : {};

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <Box
      component={Card}
      variant="outlined"
      className="anim-float-y anim-tilt-hover anim-img-shine"
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 2,
        borderColor: alpha(theme.palette.primary.main, 0.12),
        height: "100%",
        ...baseSx,
      }}
    >
      {img && (
        <Box
          component="img"
          src={img.src}
          alt={img.alt}
          loading={priority ? "eager" : "lazy"}
          onError={handleImgError}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: img.pos || "center",
          }}
        />
      )}
    </Box>
  );
}
