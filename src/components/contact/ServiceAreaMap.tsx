// src/components/contact/ServiceAreaMap.tsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { alpha } from "@mui/material/styles";

export default function ServiceAreaMap({
  query = "San Francisco, CA",
  areas = [],
  zone,
  zoom = 12,
  height = 320,
  title = "Service area map",
  compact = false,
}: {
  query?: string;
  areas?: string[];   // NUEVO: chips de zonas (Bay Area, Peninsula, etc.)
  zone?: string;
  zoom?: number;
  height?: number;
  title?: string;
  compact?: boolean;
}) {
  const q = encodeURIComponent(query);
  const embedUrl = `https://www.google.com/maps?q=${q}&z=${zoom}&output=embed`;
  const viewUrl  = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <Card
      variant="outlined"
      sx={(t) => ({
        borderRadius: 3,
        height: "100%",
        overflow: "hidden",
        borderColor: alpha(t.palette.primary.main, 0.12),
        background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.03)}, ${alpha(
          t.palette.secondary.main,
          0.03
        )})`,
      })}
    >
      {/* franja superior brand */}
      <Box
        aria-hidden
        sx={(t) => ({
          height: 6,
          background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
        })}
      />

      <CardContent sx={{ p: compact ? { xs: 2, md: 2.25 } : { xs: 2.5, md: 3 } }}>
        {/* Encabezado con chips */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
          <Typography variant="h6" fontWeight={900}>
            Our service area
          </Typography>
          <Chip size="small" color="default" icon={<PublicRoundedIcon />} label={query} />
          {zone && <Chip size="small" variant="outlined" label={zone} />}
        </Box>

        {/* Chips de áreas (opcional) */}
        {areas.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.5 }}>
            {areas.map((a) => (
              <Chip
                key={a}
                size="small"
                label={a}
                variant="outlined"
                sx={(t) => ({
                  borderRadius: 2,
                  borderColor: alpha(t.palette.primary.main, 0.25),
                  backgroundColor: alpha(t.palette.primary.main, 0.06),
                })}
              />
            ))}
          </Box>
        )}

        {/* Mapa */}
        <Box
          sx={{
            borderRadius: 1.5,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            component="iframe"
            title={title}
            src={embedUrl}
            width="100%"
            height={height}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </Box>

        {/* CTA para abrir en Google Maps */}
        {!compact && (
          <Box sx={{ mt: 1.5 }}>
            <Chip
              size="small"
              icon={<RoomRoundedIcon />}
              label="Open Google Maps"
              component="a"
              clickable
              href={viewUrl}
              target="_blank"
              rel="noreferrer"
              sx={(t) => ({
                borderRadius: 2,
                borderColor: alpha(t.palette.primary.main, 0.25),
                backgroundColor: alpha(t.palette.primary.main, 0.06),
              })}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
