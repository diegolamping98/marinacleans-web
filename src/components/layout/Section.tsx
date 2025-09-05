// src/components/layout/Section.tsx
import type { PropsWithChildren } from "react";
import type { Variants } from "framer-motion";
import { Box, Container, Typography, Divider } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";

type Props = PropsWithChildren<{
  id?: string;
  title: string;
  subtitle?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}>;

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const dividerGrow: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show:   { opacity: 1, scaleX: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Section({ id, title, subtitle, maxWidth = "lg", children }: Props) {
  const reduce = useReducedMotion();

  return (
    <Box id={id} component="section" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 80 }}>
      <Container maxWidth={maxWidth}>
        <MotionBox
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }}
        >
          <MotionTypography
            variants={fadeUp}
            variant="h4"
            fontWeight={800}
            textAlign="center"
            gutterBottom
            sx={{ fontSize: { xs: 28, md: 36 }, letterSpacing: "-0.01em" }}
          >
            {title}
          </MotionTypography>

          {subtitle && (
            <MotionBox variants={fadeUp}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: 640, mx: "auto", mb: 4 }}
              >
                {subtitle}
              </Typography>
            </MotionBox>
          )}

          <MotionBox variants={dividerGrow} style={{ transformOrigin: "center" }}>
            <Divider sx={{ maxWidth: 80, mx: "auto", mb: { xs: 4, md: 6 } }} />
          </MotionBox>

          <MotionBox variants={fadeUp}>{children}</MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
