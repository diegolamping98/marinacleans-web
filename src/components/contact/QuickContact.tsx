import { Stack, Chip, Button } from "@mui/material";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { CONTACT } from "../../config/contact";
import { alpha } from "@mui/material/styles";

type Props = {
  showChips?: boolean;
  showActions?: boolean;
  dense?: boolean;
  waMessage?: string;
};

export default function QuickContact({
  showChips = true,
  showActions = true,
  dense = false,
  waMessage = "Hi! I'm interested in a cleaning quote. Could you help me schedule an estimate?"
}: Props) {
  const { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS } = CONTACT;
  const waNumber = PHONE_TEL.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <Stack spacing={dense ? 1 : 1.5}>
      {showChips && (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {[{
            icon: <LocalPhoneRoundedIcon />, label: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`
          },{
            icon: <MailOutlineRoundedIcon />, label: EMAIL, href: `mailto:${EMAIL}`
          },{
            icon: <PlaceOutlinedIcon />, label: ADDRESS
          }].map((c) => (
            <Chip
              key={c.label}
              icon={c.icon}
              label={c.label}
              clickable={!!c.href}
              component={c.href ? "a" : "div"}
              href={c.href}
              variant="outlined"
              size="medium"
              sx={(t) => ({
                borderRadius: 2,
                borderColor: alpha(t.palette.primary.main,.25),
                backgroundColor: alpha(t.palette.primary.main,.06),
                "& .MuiChip-icon": { color: "text.secondary" },
              })}
            />
          ))}
        </Stack>
      )}

      {showActions && (
        <Stack direction="row" spacing={1.25}>
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            href={waHref}
            target="_blank"
            rel="noopener"
            sx={(t) => ({
              borderRadius: 2,
              minHeight: 40,
              px: 2,
              boxShadow: `0 6px 16px ${alpha(t.palette.success.main, 0.25)}`,
            })}
            aria-label="Contact via WhatsApp"
          >
            WhatsApp
          </Button>
          <Button
            variant="outlined"
            startIcon={<LocalPhoneRoundedIcon />}
            href={`tel:${PHONE_TEL}`}
            sx={{ borderRadius: 2, minHeight: 40, px: 2 }}
          >
            Call
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
