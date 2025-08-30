import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { alpha } from "@mui/material/styles";
import QuickContact from "../contact/QuickContact";

type Props = {
  hideQuickChips?: boolean; // úsalo en páginas donde también muestras ContactTiles
};

export default function WhyUsCard({ hideQuickChips = false }: Props) {
  const CARD_SX = (t: any) => ({
    borderRadius: 3,
    borderColor: alpha(t.palette.primary.main, 0.12),
    boxShadow: "0 1px 2px rgba(16,24,40,.04)",
    overflow: "hidden",
    position: { md: "sticky" as const },
    top: { md: 96 },
    background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.03)}, ${alpha(t.palette.secondary.main, 0.03)})`,
  });

  return (
    <Card variant="outlined" sx={CARD_SX as any}>
      {/* franja superior brand */}
      <Box sx={(t) => ({ height: 6, background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})` })} />
      <CardContent sx={{ p: { xs: 2.25, md: 2.75 } }}>
        <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: "-0.01em", mb: 1 }}>
          Why choose us?
        </Typography>

        <List dense disablePadding sx={{ mb: 1.5 }}>
          {[
            "Vetted and punctual teams",
            "Professional materials & techniques",
            "Satisfaction guaranteed",
          ].map((t) => (
            <ListItem key={t} disableGutters sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Box sx={(theme) => ({
                  width: 22, height: 22, borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`
                })}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
                </Box>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ color: "text.secondary" }} primary={t} />
            </ListItem>
          ))}
        </List>

        <Typography variant="caption" color="text.secondary">
          Fast response — usually in minutes.
        </Typography>

        <Divider sx={{ my: 1.75 }} />

        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
          Quick contact
        </Typography>

        {/* Evita duplicar info si en la página también muestras ContactTiles */}
        <QuickContact showChips={!hideQuickChips} showActions />
      </CardContent>
    </Card>
  );
}
