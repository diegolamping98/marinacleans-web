// src/components/services/ServicesGrid.tsx
import type { Variants } from "framer-motion";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ConstructionIcon from "@mui/icons-material/Construction";
import WindowIcon from "@mui/icons-material/Window";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ServiceCard from "./ServiceCard";
import { motion, useReducedMotion } from "framer-motion";

const MotionGrid = motion(Grid);

const SERVICES = [
  {
    icon: <CleaningServicesIcon />,
    title: "House Cleaning",
    desc:
      "Recurring maintenance or deep cleaning tailored to kitchens, bathrooms, bedrooms and common areas.",
    more:
      "Includes dusting, vacuuming, mopping, surfaces, baseboards, and detail on high-touch points. We adapt frequency and checklist to your routine.",
    imgSrc: "/cleanhouse.png",
    imgAlt: "Team performing detailed house cleaning in a living room",
  },
  {
    icon: <ConstructionIcon />,
    title: "Post-Construction",
    desc:
      "Fine dust removal and debris cleanup so your space is safe, spotless and move-in ready.",
    more:
      "We handle multi-pass dusting, HEPA vacuuming, vents and tracks, sticker removal and final detailing of fixtures and glass.",
    imgSrc: "/construc.png",
    imgAlt: "Cleaning crew handling post-construction dust and debris",
  },
  {
    icon: <WindowIcon />,
    title: "Window Cleaning",
    desc:
      "Crystal-clear windows inside & out—frames, tracks and screens included when accessible.",
    more:
      "Streak-free method, safe products and proper tools for different glass types. Scheduling available as add-on or standalone.",
    imgSrc: "/window.png",
    imgAlt: "Technician cleaning an office window with squeegee",
  },
  {
    icon: <Inventory2Icon />,
    title: "Space Organization",
    desc:
      "Decluttering and storage systems that actually stick for kitchens, closets and more.",
    more:
      "Sort, categorize, label and optimize layouts. We design systems that are easy to maintain for your daily flow.",
    imgSrc: "/organized.png",
    imgAlt: "Well organized shelves and storage containers",
  },
] as const;

export default function ServicesGrid() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        // cubic-bezier equivalente a un easeOut suave
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Box>
      <MotionGrid
        container
        spacing={{ xs: 2.5, md: 3 }}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map((s) => (
          <MotionGrid
            key={s.title}
            item
            xs={12}
            sm={6}
            md={3}
            variants={item}
          >
            <ServiceCard
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              more={s.more}
              imgSrc={s.imgSrc}
              imgAlt={s.imgAlt}
            />
          </MotionGrid>
        ))}
      </MotionGrid>
    </Box>
  );
}
