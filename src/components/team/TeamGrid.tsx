// src/components/team/TeamGrid.tsx
import { useState } from "react";
import Grid from "@mui/material/Grid";
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
import { alpha } from "@mui/material/styles";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Member = {
  name: string;
  role: string;
  years: number;
  bio: string;
  longBio?: string;
  photoUrl?: string;
};

const MEMBERS: Member[] = [
  {
    name: "Rosa Rosales",
    role: "Helper",
    years: 6,
    bio: "Detail-oriented, focused on spotless, comfortable homes.",
    longBio:
      "Rosa Rosales, a dedicated team member born in El Salvador, brings six years of experience to our cleaning services. She finds joy in helping families achieve a clean and comfortable home environment. Rosa’s meticulous attention to detail ensures every space shines and meets our high standards.",
  },
  {
    name: "Eluvia Zapet",
    role: "Helper",
    years: 4,
    bio: "Meticulous and proud of transforming spaces in San Francisco.",
    longBio:
      "Eluvia Zapet has been a dedicated team member at our cleaning service for four years. Originally from Guatemala and now based in San Francisco, Eluvia takes pride in transforming spaces and seeing the immediate results of her meticulous work. Her passion and attention to detail elevate our cleaning services.",
  },
  {
    name: "Delmy Zapet",
    role: "Helper",
    years: 4,
    bio: "Creative problem-solver who loves organizing every space.",
    longBio:
      "Delmy Zapet is a dedicated team member with four years of experience, bringing her passion for creative problem-solving to each unique home she helps organize and clean. Born in Guatemala and now residing in San Francisco, Delmy loves how every space offers new challenges and opportunities.",
  },
];

// Motion wrappers correctos (evita component={motion.div})
const MotionGrid = motion(Grid);

function initials(name: string) {
  return name
    .trim()
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

function TeamCard({ name, role, years, bio, longBio, photoUrl }: Member) {
  const [expanded, setExpanded] = useState(false);
  const textId = `${name.replace(/\s+/g, "-").toLowerCase()}-bio`;
  const reduce = useReducedMotion();

  return (
    <Card
      variant="outlined"
      tabIndex={0}
      sx={(t) => ({
        height: "100%",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        transition:
          "transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
        background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.04)}, ${alpha(
          t.palette.secondary.main,
          0.04
        )})`,
        borderColor: alpha(t.palette.primary.main, 0.12),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 14px 32px ${alpha(t.palette.primary.main, 0.18)}`,
          borderColor: alpha(t.palette.primary.main, 0.35),
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.06)}, ${alpha(
            t.palette.secondary.main,
            0.06
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
      })}
      aria-labelledby={`${textId}-title`}
    >
      {/* Franja superior brand */}
      <Box
        aria-hidden
        sx={(t) => ({
          height: 8,
          background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
        })}
      />

      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={1.75} alignItems="center" textAlign="center">
          {/* Avatar con halo y leve float */}
          <Box
            component={motion.div}
            animate={reduce ? undefined : { y: [0, -2, 0] }}
            transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            sx={(t) => ({
              position: "relative",
              p: 0.8,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${alpha(
                t.palette.secondary.main,
                0.22
              )}, ${alpha(t.palette.secondary.light, 0.28)})`,
              border: `1px solid ${alpha(t.palette.secondary.main, 0.45)}`,
              boxShadow: `0 0 0 6px ${alpha(t.palette.primary.main, 0.05)}`,
            })}
          >
            <Avatar
              src={photoUrl}
              alt={name}
              imgProps={{ loading: "lazy", referrerPolicy: "no-referrer" }}
              sx={{
                width: 92,
                height: 92,
                bgcolor: "primary.main",
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
                  width: 28,
                  height: 28,
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
                <VerifiedRoundedIcon fontSize="small" color="primary" />
              </Box>
            </Tooltip>
          </Box>

          {/* Nombre */}
          <Typography
            id={`${textId}-title`}
            variant="h6"
            sx={{ fontWeight: 900, letterSpacing: "-0.01em" }}
          >
            {name}
          </Typography>

          {/* Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
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

          {/* Bio */}
          <Typography
            id={textId}
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: expanded ? "pre-line" : undefined,
              ...(expanded ? {} : { WebkitLineClamp: 3 }),
            }}
          >
            {expanded && longBio ? longBio : bio}
          </Typography>

          {/* Toggle */}
          {longBio && (
            <Button
              variant="text"
              size="small"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={textId}
              sx={(t) => ({
                mt: -0.25,
                color: t.palette.primary.main,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { backgroundColor: alpha(t.palette.primary.main, 0.06) },
              })}
            >
              {expanded ? `Show less` : `Show more`}
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
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }, // easeOut válido
    },
  };

  return (
    <MotionGrid
      container
      spacing={4}
      alignItems="stretch"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {MEMBERS.map((m) => (
        <MotionGrid key={m.name} item xs={12} sm={6} md={4} variants={item}>
          <TeamCard {...m} />
        </MotionGrid>
      ))}
    </MotionGrid>
  );
}
