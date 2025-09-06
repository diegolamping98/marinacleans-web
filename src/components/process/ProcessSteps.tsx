// src/components/process/ProcessSteps.tsx
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

// Icons
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

type Step = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  { title: "Request a quote", desc: "Tell us what you need and your location.", icon: <RequestQuoteRoundedIcon /> },
  { title: "Schedule the visit", desc: "We confirm date/time and assign your team.", icon: <EventAvailableRoundedIcon /> },
  { title: "All set!", desc: "Spotless results, satisfaction guaranteed.", icon: <VerifiedRoundedIcon /> },
];

function StepCard({ index, title, desc, icon }: Step & { index: number }) {
  const isLast = index === STEPS.length - 1;

  return (
    <Card
      variant="outlined"
      sx={(t) => ({
        height: "100%",
        borderRadius: 3,
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
        background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.04)}, ${alpha(
          t.palette.secondary.main, 0.04
        )})`,
        borderColor: alpha(t.palette.primary.main, 0.10),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 14px 32px ${alpha(t.palette.primary.main, 0.18)}`,
          borderColor: alpha(t.palette.primary.main, 0.35),
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.07)}, ${alpha(
            t.palette.secondary.main, 0.07
          )})`,
        },

        ...(isLast && {
          borderColor: t.palette.secondary.main,
          boxShadow: `0 10px 28px ${alpha(t.palette.secondary.main, 0.24)}`,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: -2,
            borderRadius: 20,
            pointerEvents: "none",
            background: `linear-gradient(180deg, ${alpha(t.palette.secondary.main, 0.12)}, transparent 60%)`,
          },
        }),

        // En pantallas táctiles evitamos "saltos" al hover
        "@media (pointer: coarse)": {
          transition: "none",
          "&:hover": { transform: "none", boxShadow: "none", borderColor: alpha(t.palette.primary.main, 0.10) },
        },
      })}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={{ xs: 1.5, md: 1.75 }} alignItems="flex-start">
          {/* Badge icónico + número */}
          <Box sx={{ position: "relative" }}>
            <Box
              aria-hidden
              sx={(t) => ({
                position: "absolute",
                inset: { xs: -6, md: -8 },
                borderRadius: "50%",
                background: `radial-gradient(closest-side, ${alpha(t.palette.secondary.main, 0.18)}, transparent 70%)`,
                filter: "blur(2px)",
              })}
            />
            <Box
              sx={(t) => ({
                position: "relative",
                width: { xs: 56, md: 64 },
                height: { xs: 56, md: 64 },
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                color: t.palette.primary.main,
                background: `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.22)}, ${alpha(
                  t.palette.secondary.light, 0.28
                )})`,
                border: `1px solid ${alpha(t.palette.secondary.main, 0.45)}`,
                boxShadow: `0 12px 28px ${alpha(t.palette.secondary.main, 0.28)}, inset 0 1px 0 ${alpha("#fff", 0.35)}`,
                "& svg": { fontSize: { xs: 28, md: 32 } },
              })}
            >
              {icon}
            </Box>
            <Box
              aria-hidden
              sx={(t) => ({
                position: "absolute",
                right: { xs: -4, md: -6 },
                bottom: { xs: -4, md: -6 },
                width: { xs: 22, md: 26 },
                height: { xs: 22, md: 26 },
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: t.palette.primary.main,
                color: t.palette.primary.contrastText,
                fontSize: { xs: 11, md: 12 },
                fontWeight: 800,
                boxShadow: `0 4px 10px ${alpha(t.palette.primary.main, 0.3)}`,
              })}
            >
              {index + 1}
            </Box>
          </Box>

          <Chip
            size="small"
            label={`Step ${index + 1}`}
            variant="outlined"
            sx={(t) => ({
              borderRadius: 2,
              borderColor: alpha(t.palette.primary.main, 0.25),
              color: t.palette.primary.main,
              backgroundColor: alpha(t.palette.primary.main, 0.06),
              fontWeight: 700,
              // más compacto en móvil
              height: { xs: 24, md: 28 },
              "& .MuiChip-label": { px: { xs: 0.75, md: 1 } },
            })}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.01em",
              fontSize: { xs: 18, md: 20 },
              lineHeight: { xs: 1.25, md: 1.3 },
            }}
          >
            {title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: { xs: 1.5, md: 1.6 },
            }}
          >
            {desc}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ProcessSteps() {
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2.5, md: 4 }}   // ↓ spacing en móvil, desktop igual
        alignItems="stretch"
      >
        {STEPS.map((s, i) => (
          <Grid key={i} item xs={12} md={4}>
            <StepCard index={i} {...s} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
