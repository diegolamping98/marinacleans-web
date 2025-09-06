import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { alpha } from "@mui/material/styles";
import TestimonialCard from "./TestimonialCard";
import { usePublicReviews } from "./hooks/usePublicReviews";

const CSV_URL = import.meta.env.VITE_REVIEWS_CSV_URL as string;

export default function TestimonialsGrid() {
  const { reviews, average, loading, error } = usePublicReviews(CSV_URL);

  // Cabecera con promedio
  const Header = (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-end" },
        mb: { xs: 2.5, md: 3 },
      }}
    >
      <Chip
        icon={<StarRoundedIcon sx={{ color: "warning.main" }} />}
        label={
          reviews.length
            ? `${average} average rating • ${reviews.length} review${reviews.length === 1 ? "" : "s"}`
            : "No reviews yet"
        }
        variant="outlined"
        sx={(t) => ({
          borderRadius: 2,
          borderColor: alpha(t.palette.primary.main, 0.25),
          backgroundColor: alpha(t.palette.primary.main, 0.06),
          ".MuiChip-label": {
            fontWeight: 700,
            px: { xs: 0.75, md: 1.25 },
            py: { xs: 0.25, md: 0.5 },
            fontSize: { xs: 13, md: 14 },
          },
          height: { xs: 28, md: 32 },
        })}
      />
    </Box>
  );

  if (loading) {
    return (
      <Box>
        {Header}
        <Box sx={{ display: "grid", placeItems: "center", py: { xs: 5, md: 6 } }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        {Header}
        <Alert severity="warning">
          We couldn’t load the reviews right now. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {Header}

      <Grid container spacing={{ xs: 2.5, md: 3.5 }} alignItems="stretch">
        {reviews.map((r, i) => (
          <Grid key={`${r.name}-${i}`} item xs={12} md={4}>
            <TestimonialCard name={r.name} text={r.text} rating={r.rating} />
          </Grid>
        ))}
      </Grid>

      {/* Fallback visual si aún no hay reseñas aprobadas */}
      {!reviews.length && (
        <Box sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}>
          Be the first to leave a review ✨
        </Box>
      )}
    </Box>
  );
}
