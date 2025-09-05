// src/components/testimonials/TestimonialsGrid.tsx
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { alpha } from "@mui/material/styles";
import TestimonialCard from "./TestimonialCard";

type TItem = { name: string; text: string; rating?: number };

const ITEMS: TItem[] = [
  { name: "Anna G.",   text: "Excellent service, my house looks brand new.",        rating: 5 },
  { name: "Carlos M.", text: "Punctual and careful. 100% recommended.",            rating: 5 },
  { name: "Laura T.",  text: "Professional and friendly team; great experience.",  rating: 5 },
];

export default function TestimonialsGrid() {
  const avg = (
    ITEMS.reduce((a, b) => a + (b.rating ?? 5), 0) / ITEMS.length
  ).toFixed(1);

  return (
    <Box>
      {/* Solo el chip (título lo pone el Home) */}
      <Box
        sx={() => ({
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          mb: 3,
        })}
      >
        <Chip
          icon={<StarRoundedIcon sx={{ color: "warning.main" }} />}
          label={`${avg} average rating`}
          variant="outlined"
          sx={(t) => ({
            borderRadius: 2,
            borderColor: alpha(t.palette.primary.main, 0.25),
            backgroundColor: alpha(t.palette.primary.main, 0.06),
            ".MuiChip-label": { fontWeight: 700 },
          })}
        />
      </Box>

      {/* Rejilla de testimonios */}
      <Grid container spacing={3.5} alignItems="stretch">
        {ITEMS.map((t) => (
          <Grid key={t.name} item xs={12} md={4}>
            <TestimonialCard {...t} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
