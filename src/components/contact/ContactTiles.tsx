// src/components/contact/ContactTiles.tsx
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";

// Lista unificada (incluye Los Altos; sin Hillsborough ni Mountain View)
const AREAS = [
  "San Francisco, CA",
  "Daly City, CA",
  "South San Francisco, CA",
  "San Bruno, CA",
  "Pacifica, CA",
  "Millbrae, CA",
  "Burlingame, CA",
  "San Mateo, CA",
  "Foster City, CA",
  "Redwood City, CA",
  "Belmont, CA",
  "San Carlos, CA",
  "Menlo Park, CA",
  "Palo Alto, CA",
  "Los Altos, CA",
];

function InfoRow({
  icon, label, value,
}: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
      <Box sx={{ color: "primary.main", display: "inline-flex" }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 76 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={(t) => ({
          width: 34,
          height: 34,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          color: t.palette.primary.main,
          background: `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.22)}, ${alpha(
            t.palette.secondary.light, 0.28
          )})`,
          border: `1px solid ${alpha(t.palette.secondary.main, 0.45)}`,
          boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.35)}`,
        })}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={800}>
        {title}
      </Typography>
    </Box>
  );
}

export default function ContactTiles({
  stacked = false,
  dense = false,
}: {
  stacked?: boolean; // true = una columna (ideal cuando va junto al mapa)
  dense?: boolean;   // true = menos padding
}) {
  const contentPad = dense ? { xs: 2, md: 2.5 } : { xs: 2.5, md: 3 };

  const AreasCard = (
    <Card
      variant="outlined"
      sx={(t) => ({
        height: "100%",
        borderRadius: 3,
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
      <CardContent sx={{ p: contentPad }}>
        <CardHeader icon={<MapOutlinedIcon fontSize="small" />} title="Service Areas" />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          SF Peninsula &amp; Silicon Valley
        </Typography>

        {/* Lista responsiva en columnas con bullets azules */}
        <Box
          component="ul"
          sx={(t) => ({
            mt: 1.5,
            mb: 0,
            pl: 2.5,
            columnGap: 4,
            columns: stacked ? 1 : { xs: 2, md: 3 },
            listStyle: "none",
            "& li": { position: "relative", pl: 1.5, mb: 0.5 },
            "& li::before": {
              content: '"•"',
              position: "absolute",
              left: 0,
              top: -1,
              lineHeight: 1,
              fontSize: 18,
              color: t.palette.primary.main,
            },
          })}
        >
          {AREAS.map((city) => (
            <li key={city}>
              <Typography variant="body2">{city}</Typography>
            </li>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const ContactCard = (
    <Card
      variant="outlined"
      sx={(t) => ({
        height: "100%",
        borderRadius: 3,
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
      <CardContent sx={{ p: contentPad }}>
        <CardHeader icon={<PlaceOutlinedIcon fontSize="small" />} title="Contact Us" />
        <InfoRow icon={<PlaceOutlinedIcon fontSize="small" />} label="Address:" value="San Francisco, CA" />
        <InfoRow
          icon={<PhoneIphoneOutlinedIcon fontSize="small" />}
          label="Phone:"
          value={<Link underline="none" href="tel:+14156851462">(415) 685-1462</Link>}
        />
        <InfoRow
          icon={<MailOutlineOutlinedIcon fontSize="small" />}
          label="Email:"
          value={<Link underline="none" href="mailto:info@marinacleans.com">info@marinacleans.com</Link>}
        />

        <Divider sx={{ my: 2 }} />

        {/* Mensaje alineado al resto del sitio */}
        <Typography variant="body2" color="text.secondary">
          Fast response — usually in minutes. Prefer WhatsApp or a quick call? Use the buttons in the quote section or tap the links above.
        </Typography>
      </CardContent>
    </Card>
  );

  // Layout: stacked (una columna) vs grid 2 columnas
  if (stacked) {
    return (
      <Stack spacing={2.5}>
        {AreasCard}
        {ContactCard}
      </Stack>
    );
  }

  return (
    <Grid container spacing={4} alignItems="stretch">
      <Grid item xs={12} md={6}>{AreasCard}</Grid>
      <Grid item xs={12} md={6}>{ContactCard}</Grid>
    </Grid>
  );
}
