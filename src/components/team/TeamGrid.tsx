import { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { alpha } from "@mui/material/styles";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Member = {
  name: string;
  role: string;
  years: number;
  bio: string;
  longBio?: string;
  photoUrl?: string;
  featured?: boolean; // highlight (owner/founder)
};

const MEMBERS: Member[] = [
  {
    name: "Laura Sampson",
    role: "Owner & Founder",
    years: 13,
    featured: true,
    bio: "Trusted house cleaner in the Bay Area, known for reliability and excellence.",
    longBio:
      "I have built a solid reputation as a trusted house cleaner in the San Francisco Bay Area. For more than 13 years our work is distinguished by reliability, attention to detail, and a commitment to excellence. We approach every home with care and respect, ensuring that each space feels fresh, organized, and welcoming.",
    photoUrl: "/team/laura.jpg",
  },
  {
    name: "Rosa Rosales",
    role: "Helper",
    years: 6,
    bio: "Detail-oriented and focused on spotless, comfortable homes.",
    longBio:
      "Rosa brings six years of experience. She loves helping families keep a clean and comfortable home, and her meticulous "
      + "attention to detail ensures every space shines.",
    photoUrl: "/team/rosa.jpg",
  },
  {
    name: "Eluvia Zapet",
    role: "Helper",
    years: 4,
    bio: "Meticulous and proud of transforming spaces in San Francisco.",
    longBio:
      "Eluvia has been part of our team for four years. Based in San Francisco, she takes pride in transforming spaces and "
      + "seeing the immediate impact of careful work.",
    photoUrl: "/team/eluvia.jpg",
  },
  {
    name: "Delmy Zapet",
    role: "Helper",
    years: 4,
    bio: "A creative problem-solver who loves organizing every space.",
    longBio:
      "Delmy brings four years of experience and a passion for creative problem-solving. Every home is a new challenge and "
      + "opportunity to make systems easier to maintain.",
    photoUrl: "/team/delmy.jpg",
  },
];


function initials(name: string) {
  return name
    .trim()
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

function TeamCard({ name, role, years, bio, longBio, photoUrl, featured }: Member) {
  const [expanded, setExpanded] = useState(false);
  const textId = `${name.replace(/\s+/g, "-").toLowerCase()}-bio`;

  return (
    <Card
      variant="outlined"
      tabIndex={0}
      sx={(t) => {
        const base = {
          height: "100%",
          borderRadius: 3,
          position: "relative" as const,
          overflow: "hidden",
          transition:
            "transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.04)}, ${alpha(
            t.palette.secondary.main, 0.04
          )})`,
          borderColor: alpha(t.palette.primary.main, 0.12),
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 14px 32px ${alpha(t.palette.primary.main, 0.18)}`,
            borderColor: alpha(t.palette.primary.main, 0.35),
            background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.06)}, ${alpha(
              t.palette.secondary.main, 0.06
            )})`,
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 4px ${alpha(t.palette.primary.main, 0.28)}`,
            borderColor: t.palette.primary.main,
          },
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
            "&:hover": { transform: "none", boxShadow: 4 },
          },
        } as const;

        if (!featured) return base;

        return {
          ...base,
          borderColor: alpha(t.palette.secondary.main, 0.6),
          boxShadow: `0 12px 34px ${alpha(t.palette.secondary.main, 0.28)}`,
          background: `linear-gradient(180deg, ${alpha(t.palette.secondary.light, 0.12)}, ${alpha(
            t.palette.primary.light, 0.06
          )})`,
          "&:hover": {
            ...(base["&:hover"] ?? {}),
            boxShadow: `0 16px 40px ${alpha(t.palette.secondary.main, 0.34)}`,
          },
          "&::after": {
            content: '"OWNER"',
            position: "absolute",
            top: 10,
            right: -34,
            transform: "rotate(45deg)",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: t.palette.secondary.contrastText,
            background: t.palette.secondary.main,
            padding: "6px 48px",
            boxShadow: `0 6px 16px ${alpha(t.palette.secondary.main, 0.35)}`,
          },
        };
      }}
      aria-labelledby={`${textId}-title`}
    >
      {/* brand bar */}
      <Box
        aria-hidden
        sx={(t) => ({
          height: 8,
          background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
        })}
      />

      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={{ xs: 1.5, md: 1.75 }} alignItems="center" textAlign="center">
          {/* Avatar + halo */}
          <Box
            component={motion.div}
            animate={useReducedMotion() ? undefined : { y: [0, -2, 0] }}
            transition={useReducedMotion() ? undefined : { duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            sx={(t) => ({
              position: "relative",
              p: { xs: 0.6, md: 0.8 },
              borderRadius: "50%",
              background: featured
                ? `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.35)}, ${alpha(
                    t.palette.secondary.light, 0.45
                  )})`
                : `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.22)}, ${alpha(
                    t.palette.secondary.light, 0.28
                  )})`,
              border: `1px solid ${alpha(t.palette.secondary.main, featured ? 0.7 : 0.45)}`,
              boxShadow: featured
                ? `0 0 0 8px ${alpha(t.palette.secondary.main, 0.12)}`
                : `0 0 0 6px ${alpha(t.palette.primary.main, 0.05)}`,
            })}
          >
            <Avatar
              src={photoUrl}
              alt={name}
              imgProps={{ loading: "lazy", referrerPolicy: "no-referrer" }}
              sx={{
                width: { xs: 88, md: 96 },
                height: { xs: 88, md: 96 },
                bgcolor: featured ? "secondary.main" : "primary.main",
                color: "common.white",
                fontWeight: 700,
              }}
            >
              {initials(name)}
            </Avatar>

            <Tooltip title="Background-checked & verified" arrow>
              <Box
                sx={(t) => ({
                  position: "absolute",
                  right: -2,
                  bottom: -2,
                  width: { xs: 26, md: 28 },
                  height: { xs: 26, md: 28 },
                  borderRadius: "50%",
                  bgcolor: t.palette.background.paper,
                  border: `1px solid ${t.palette.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                })}
                aria-hidden
              >
                {featured ? (
                  <WorkspacePremiumRoundedIcon fontSize="small" color="secondary" />
                ) : (
                  <VerifiedRoundedIcon fontSize="small" color="primary" />
                )}
              </Box>
            </Tooltip>
          </Box>

          {/* Name */}
          <Typography
            id={`${textId}-title`}
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.01em",
              fontSize: { xs: 18, md: 20 },
            }}
          >
            {name}
          </Typography>

          {/* Chips */}
          <Stack direction="row" spacing={1} rowGap={0.75} flexWrap="wrap" justifyContent="center" useFlexGap>
            <Chip
              size="small"
              icon={<BadgeRoundedIcon sx={{ fontSize: 18 }} />}
              label={role}
              variant="outlined"
              sx={(t) => ({
                borderColor: alpha(t.palette.primary.main, 0.3),
                color: t.palette.primary.main,
                backgroundColor: alpha(t.palette.primary.main, 0.06),
              })}
            />
            <Chip
              size="small"
              icon={<WorkOutlineRoundedIcon sx={{ fontSize: 18 }} />}
              label={`${years} yrs exp.`}
              variant="outlined"
              sx={(t) => ({
                borderColor: alpha(t.palette.secondary.main, 0.35),
                color: t.palette.secondary.dark,
                backgroundColor: alpha(t.palette.secondary.main, 0.12),
              })}
            />
          </Stack>

          {/* Bio + Show more */}
          <Typography
            id={textId}
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: { xs: 1.5, md: 1.6 },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: expanded ? "pre-line" : undefined,
              ...(expanded ? {} : { WebkitLineClamp: { xs: 4, md: 3 } }),
            }}
          >
            {expanded && longBio ? longBio : bio}
          </Typography>

          {longBio && (
            <Button
              variant="text"
              size="small"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={textId}
              sx={(t) => ({
                mt: -0.25,
                px: 1.25,
                py: 0.75,
                color: t.palette.primary.main,
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 1.5,
                "&:hover": { backgroundColor: alpha(t.palette.primary.main, 0.06) },
              })}
            >
              {expanded ? "Show less" : "Show more"}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TeamGrid() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
      {/* GRID centrado con columnas responsivas */}
      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        sx={{
          "--colMin": "280px",           // ancho mínimo cómodo por card
          "--colMax": "1fr",
          "--cardMax": "330px",          // límite visual de cada card
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(var(--colMin), var(--colMax)))",
            md: "repeat(4, minmax(var(--colMin), var(--colMax)))",
          },
          justifyContent: "center",
          gap: { xs: 3, md: 4 },
        }}
      >
        {MEMBERS.map((m) => (
          <Box
            key={m.name}
            component={motion.div}
            variants={item}
            sx={{
              maxWidth: m.featured ? "360px" : "var(--cardMax)", // featured un pelín más ancho (opcional)
              width: "100%",
              mx: "auto",
            }}
          >
            <TeamCard {...m} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
