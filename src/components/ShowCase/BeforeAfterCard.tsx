import * as React from "react";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  beforeSrc?: string;
  afterSrc?: string;
  alt?: string;
  caption?: string;
  tags?: string[];
  ratio?: `${number} / ${number}`;
};

const MotionCard = motion(Card);

export default function BeforeAfterCard({
  beforeSrc,
  afterSrc,
  alt = "Before and after comparison",
  caption,
  tags = [],
  ratio = "4 / 3",
}: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();

  // ✅ ref tipado correctamente (sin "| null" en el genérico)
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const [percent, setPercent] = React.useState(50);
  const draggingRef = React.useRef(false);

  const setByClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, p)));
  };

  // 🔧 Handlers separados para mouse/touch (evita uniones raras)
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    draggingRef.current = true;
    setByClientX(e.clientX);
  };
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    setByClientX(e.clientX);
  };
  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    draggingRef.current = false;
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    draggingRef.current = true;
    setByClientX(e.touches[0].clientX);
  };
  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    setByClientX(e.touches[0].clientX);
  };
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    draggingRef.current = false;
  };

  const onKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 5));
  };

  const borderCol = alpha(theme.palette.primary.main, 0.12);

  const cardIn: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, // ✅ easing válido
    },
  };

  return (
    <MotionCard
      variant="outlined"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={cardIn}
      whileHover={reduce ? undefined : { y: -4, boxShadow: theme.shadows[8] }}
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        borderColor: borderCol,
      }}
    >
      {/* Comparador */}
      <Box
        ref={wrapRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={onKey}
        tabIndex={0}
        role="group"
        aria-label="Before and after photo comparison"
        sx={{
          position: "relative",
          aspectRatio: ratio,
          userSelect: "none",
          outline: "none",
          "&:focus-visible .ba-handle": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        }}
      >
        {/* AFTER (fondo completo) */}
        <ImageOrPlaceholder src={afterSrc} alt={`${alt} — after`} label="After" side="after" />

        {/* BEFORE (clip por porcentaje) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: `${percent}%`,
            overflow: "hidden",
            borderRight: `1px solid ${alpha(theme.palette.common.black, 0.18)}`,
          }}
          aria-hidden
        >
          <ImageOrPlaceholder src={beforeSrc} alt={`${alt} — before`} label="Before" side="before" />
        </Box>

        {/* Handle / Guía */}
        <Box
          className="ba-handle"
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `calc(${percent}% - 14px)`,
            width: 28,
            display: "grid",
            placeItems: "center",
            cursor: "ew-resize",
            touchAction: "none",
          }}
        >
          <Box
            sx={{
              width: 6,
              height: "64%",
              borderRadius: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
              boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.25)}`,
              position: "relative",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                border: "6px solid transparent",
              },
              "&::before": {
                top: -14,
                borderBottomColor: alpha(theme.palette.background.paper, 0.8),
                filter: `drop-shadow(0 -1px 0 ${alpha(theme.palette.primary.main, 0.2)})`,
              },
              "&::after": {
                bottom: -14,
                borderTopColor: alpha(theme.palette.background.paper, 0.8),
                filter: `drop-shadow(0 1px 0 ${alpha(theme.palette.primary.main, 0.2)})`,
              },
            }}
          />
        </Box>

        {/* Range oculto para ATs */}
        <Box
          component="input"
          type="range"
          min={0}
          max={100}
          value={percent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPercent(parseInt(e.target.value, 10))
          }
          aria-label="Slide to compare before and after"
          sx={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}
        />
      </Box>

      {(caption || tags.length) && (
        <Stack spacing={1.25} sx={{ p: { xs: 2, md: 2.5 } }}>
          {caption && (
            <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}>
              {caption}
            </Typography>
          )}
          {tags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.25),
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </MotionCard>
  );
}

/* ---------------- Helpers ---------------- */

function ImageOrPlaceholder({
  src,
  alt,
  label,
  side,
}: {
  src?: string;
  alt: string;
  label: "Before" | "After";
  side: "before" | "after";
}) {
  const theme = useTheme();

  if (!src) {
    const bg =
      side === "before"
        ? `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.16)}, ${alpha(
            theme.palette.error.light,
            0.12
          )})`
        : `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.18)}, ${alpha(
            theme.palette.success.light,
            0.12
          )})`;

    return (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: bg,
          display: "grid",
          placeItems: "center",
          color: alpha(theme.palette.common.black, 0.5),
          borderRight: "inherit",
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: { xs: 20, sm: 24 },
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="lazy"
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}
