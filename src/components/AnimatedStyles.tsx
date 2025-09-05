
import { GlobalStyles } from "@mui/material";

export default function AnimatedStyles() {
  return (
    <GlobalStyles
      styles={(t) => ({
        /* ===== UTILIDADES REUSABLES ===== */

        /* Texto con gradiente animado (brillo sutil) */
        ".anim-shine-text": {
          backgroundImage: "linear-gradient(90deg,#EC4899,#A78BFA,#EC4899)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "shineShift 6s linear infinite",
        },

        /* Botón con brillo que cruza de izquierda a derecha en hover */
        ".anim-btn-shine": {
          position: "relative",
          overflow: "hidden",
          willChange: "transform",
          transition: "transform .2s ease",
        },
        ".anim-btn-shine:hover": { transform: "translateY(-1px)" },
        ".anim-btn-shine::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          transform: "translateX(-120%)",
          background:
            "linear-gradient(120deg, transparent 20%, rgba(255,255,255,.35) 50%, transparent 80%)",
          animation: "none",
          pointerEvents: "none",
        },
        ".anim-btn-shine:hover::after": {
          animation: "btnSweep .9s ease",
        },

        /* Borde con glow respirando (chips, tarjetas, etc.) */
        ".anim-border-glow": {
          borderColor: t.palette.mode === "light"
            ? "rgba(14,165,164,.25)"
            : "rgba(125,211,252,.3)",
          boxShadow: `0 0 0 0 rgba(14,165,164,.0)`,
          animation: "borderGlow 3.5s ease-in-out infinite",
        },

        /* Flotado vertical muy sutil (para mosaicos, badges, etc.) */
        ".anim-float-y": {
          animation: "floatY 6s ease-in-out infinite",
        },

        /* Tilt ligero al hover (no JS) */
        ".anim-tilt-hover": {
          transition: "transform .25s ease, box-shadow .25s ease",
        },
        ".anim-tilt-hover:hover": {
          transform: "rotate(.4deg) translateY(-2px)",
          boxShadow: t.shadows[4],
        },

        /* Shine sobre imágenes (barrido suave periódico) */
        ".anim-img-shine": {
          position: "relative",
          overflow: "hidden",
        },
        ".anim-img-shine::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-60%",
          width: "40%",
          height: "100%",
          transform: "skewX(-20deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)",
          animation: "imgShine 7s ease-in-out infinite",
          pointerEvents: "none",
        },

        /* “Blob” de fondo que palpita muy suave */
        ".anim-blob": {
          animation: "blobPulse 10s ease-in-out infinite",
          filter: "blur(18px)",
        },

        /* Respeto a motion-reduce */
        "@media (prefers-reduced-motion: reduce)": {
          ".anim-shine-text, .anim-btn-shine::after, .anim-border-glow, .anim-float-y, .anim-img-shine::before, .anim-blob":
            { animation: "none" },
          ".anim-tilt-hover:hover": { transform: "none" },
        },

        /* ====== KEYFRAMES ====== */
        "@keyframes shineShift": {
          "0%": { backgroundPositionX: "0%" },
          "100%": { backgroundPositionX: "200%" },
        },
        "@keyframes btnSweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "@keyframes borderGlow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(14,165,164,.0)" },
          "50%": { boxShadow: "0 0 0 4px rgba(14,165,164,.08)" },
        },
        "@keyframes floatY": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "@keyframes imgShine": {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "25%": { transform: "translateX(120%) skewX(-20deg)" },
          "100%": { transform: "translateX(120%) skewX(-20deg)" },
        },
        "@keyframes blobPulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      })}
    />
  );
}
