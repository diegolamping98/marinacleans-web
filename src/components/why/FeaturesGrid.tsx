// src/components/why/FeaturesGrid.tsx
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

// Icons (Material Design)
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";

type Accent = "primary" | "secondary" | "success" | "warning";

type Feature = {
  icon: React.ElementType;
  title: string;
  desc: string;
  accent?: Accent;
};

const FEATURES: Feature[] = [
  {
    icon: CheckCircleOutlineRoundedIcon,
    title: "Reliable Team",
    desc: "Punctual, vetted professionals with consistent quality.",
    accent: "primary",
  },
  {
    icon: NatureOutlinedIcon,
    title: "Eco-Friendly",
    desc: "Non-toxic products and methods safe for family & pets.",
    accent: "success",
  },
  {
    icon: HomeOutlinedIcon,
    title: "Tailored Services",
    desc: "Plans adapted to your home, schedule and budget.",
    accent: "secondary",
  },
  {
    icon: AssignmentTurnedInOutlinedIcon,
    title: "Expert Organizing",
    desc: "Decluttering and storage systems that actually last.",
    accent: "warning",
  },
];

function getAccentColors(t: any, accent: Accent = "primary") {
  const c =
    accent === "secondary"
      ? t.palette.secondary.main
      : accent === "success"
      ? t.palette.success.main
      : accent === "warning"
      ? t.palette.warning.main
      : t.palette.primary.main;

  return {
    fg: c,
    bg: alpha(c, 0.12),
    bd: alpha(c, 0.35),
    glow: alpha(c, 0.22),
    ink: accent === "secondary" ? t.palette.secondary.dark : c,
  };
}

function AccentLozenge({
  Icon,
  accent = "primary",
}: {
  Icon: React.ElementType;
  accent?: Accent;
}) {
  return (
    <Box
      sx={(t) => {
        const { fg, bg, bd, glow } = getAccentColors(t, accent);
        return {
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          borderRadius: 2.5,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: fg,
          background: `linear-gradient(135deg, ${alpha(fg, 0.12)} 0%, ${bg} 100%)`,
          border: `1px solid ${bd}`,
          boxShadow: `0 10px 24px ${glow}, inset 0 1px 0 ${alpha("#fff", 0.35)}`,
          flexShrink: 0,
        };
      }}
    >
      <Icon sx={{ fontSize: { xs: 28, md: 32 } }} />
    </Box>
  );
}

function FeatureRow({ icon: Icon, title, desc, accent = "primary" }: Feature) {
  return (
    <Paper
      variant="outlined"
      sx={(t) => {
        const { fg } = getAccentColors(t, accent);
        return {
          p: { xs: 2.25, md: 2.75 },
          borderRadius: 3,
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow .25s ease, transform .25s ease, border-color .25s",
          "&:hover": {
            boxShadow: `0 12px 28px ${alpha(fg, 0.22)}, 0 1px 0 ${alpha("#000", 0.02)}`,
            transform: "translateY(-3px)",
            borderColor: alpha(fg, 0.35),
          },
          // halo decorativo
          "&::after": {
            content: '""',
            position: "absolute",
            right: -40,
            top: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle at 50% 50%, ${alpha(fg, 0.10)} 0%, transparent 60%)`,
            filter: "blur(6px)",
            pointerEvents: "none",
          },
        };
      }}
    >
      <AccentLozenge Icon={Icon} accent={accent} />
      <Box>
        <Typography
          variant="subtitle1"
          sx={(t) => ({
            fontWeight: 900,
            letterSpacing: "-0.01em",
            color: t.palette.text.primary,
          })}
        >
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          {desc}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function FeaturesGrid() {
  return (
    <Box
      sx={(t) => ({
        p: { xs: 2.25, md: 3 },
        borderRadius: 3.5,
        background: `linear-gradient(135deg, ${alpha(t.palette.secondary.light, 0.18)} 0%, #FFFFFF 58%, ${alpha(
          t.palette.primary.light,
          0.12
        )} 100%)`,
        border: `1px solid ${alpha(t.palette.primary.main, 0.08)}`,
      })}
    >
      <Grid container spacing={2.75}>
        {FEATURES.map((f) => (
          <Grid key={f.title} item xs={12} md={6}>
            <FeatureRow {...f} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
