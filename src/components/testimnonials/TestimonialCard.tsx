import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { alpha } from "@mui/material/styles";

export default function TestimonialCard({
  name,
  text,
  rating = 5,
}: {
  name: string;
  text: string;
  rating?: number;
}) {
  const MAX = 5;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      variant="outlined"
      sx={(t) => ({
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.03)}, ${alpha(
          t.palette.secondary.main,
          0.03
        )})`,
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease",
        borderColor: alpha(t.palette.primary.main, 0.12),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 14px 32px ${alpha(t.palette.primary.main, 0.18)}`,
          borderColor: alpha(t.palette.primary.main, 0.35),
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.05)}, ${alpha(
            t.palette.secondary.main,
            0.05
          )})`,
        },
      })}
    >
      {/* Banda superior brand */}
      <Box
        aria-hidden
        sx={(t) => ({
          height: 6,
          background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
        })}
      />

      {/* Marca de agua de comillas (muy sutil) */}
      <FormatQuoteRoundedIcon
        aria-hidden
        sx={(t) => ({
          position: "absolute",
          right: -6,
          top: 6,
          fontSize: 96,
          color: alpha(t.palette.secondary.main, 0.08),
          transform: "rotate(180deg)",
        })}
      />

      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={1.75}>
          {/* Badge de quote + avatar inicial */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* Badge de quote con glow rosa */}
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
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: t.palette.primary.main,
                  background: `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.22)}, ${alpha(
                    t.palette.secondary.light,
                    0.28
                  )})`,
                  border: `1px solid ${alpha(t.palette.secondary.main, 0.45)}`,
                  boxShadow: `0 10px 24px ${alpha(t.palette.secondary.main, 0.26)}, inset 0 1px 0 ${alpha(
                    "#fff",
                    0.35
                  )}`,
                })}
              >
                <FormatQuoteRoundedIcon fontSize="small" />
              </Box>
            </Box>

            {/* Avatar inicial en azul suave */}
            <Box
              sx={(t) => ({
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                color: t.palette.primary.dark,
                backgroundColor: alpha(t.palette.primary.main, 0.10),
                border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
              })}
              aria-hidden
            >
              {initials}
            </Box>
          </Stack>

          {/* Estrellas con accesibilidad */}
          <Box
            role="img"
            aria-label={`${rating} out of 5 stars`}
            sx={{ display: "inline-flex", color: "warning.main" }}
          >
            {Array.from({ length: MAX }).map((_, i) =>
              i < rating ? (
                <StarRoundedIcon key={i} fontSize="small" />
              ) : (
                <StarOutlineRoundedIcon key={i} fontSize="small" sx={{ color: "action.disabled" }} />
              )
            )}
          </Box>

          {/* Texto */}
          <Typography sx={{ fontStyle: "italic" }}>"{text}"</Typography>

          {/* Autor */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            — {name}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
