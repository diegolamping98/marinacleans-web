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
          t.palette.secondary.main,
          0.04
        )})`,
        borderColor: alpha(t.palette.primary.main, 0.10),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 14px 32px ${alpha(t.palette.primary.main, 0.18)}`,
          borderColor: alpha(t.palette.primary.main, 0.35),
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.07)}, ${alpha(
            t.palette.secondary.main,
            0.07
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

        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
        },
      })}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={1.75} alignItems="flex-start">
          {/* Badge icónico (más grande, con glow rosa) + número */}
          <Box sx={{ position: "relative" }}>
            <Box
              aria-hidden
              sx={(t) => ({
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                background: `radial-gradient(closest-side, ${alpha(t.palette.secondary.main, 0.18)}, transparent 70%)`,
                filter: "blur(2px)",
              })}
            />
            <Box
              sx={(t) => ({
                position: "relative",
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                color: t.palette.primary.main,
                background: `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.22)}, ${alpha(
                  t.palette.secondary.light,
                  0.28
                )})`,
                border: `1px solid ${alpha(t.palette.secondary.main, 0.45)}`,
                boxShadow: `0 12px 28px ${alpha(t.palette.secondary.main, 0.28)}, inset 0 1px 0 ${alpha(
                  "#fff",
                  0.35
                )}`,
                "& svg": { fontSize: 32 },
              })}
            >
              {icon}
            </Box>
            <Box
              aria-hidden
              sx={(t) => ({
                position: "absolute",
                right: -6,
                bottom: -6,
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: t.palette.primary.main,
                color: t.palette.primary.contrastText,
                fontSize: 12,
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
            })}
          />

          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: "-0.01em" }}>
            {title}
          </Typography>

          <Typography color="text.secondary">{desc}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ProcessSteps() {
  return (
    <Box>
      <Grid container spacing={4} alignItems="stretch">
        {STEPS.map((s, i) => (
          <Grid key={i} item xs={12} md={4}>
            <StepCard index={i} {...s} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
