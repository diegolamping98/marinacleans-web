import * as React from "react";
import {
  Card, CardActionArea, CardContent, Typography, Box, Button, Collapse
} from "@mui/material";
import { alpha } from "@mui/material/styles";

type Props = {
  icon: React.ReactNode;
  title: string;
  desc: string;           // texto corto (visible)
  more?: string;          // texto extendido (colapsable)
  href?: string;          // default: #quote
  imgSrc?: string;        // ruta pública (e.g. "/cleanhouse.png")
  imgAlt?: string;
};

export default function ServiceCard({
  icon, title, desc, more, href = "#quote", imgSrc, imgAlt
}: Props) {
  const [open, setOpen] = React.useState(false);
  const slug = React.useMemo(() => title.toLowerCase().replace(/\s+/g, "-"), [title]);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen((v) => !v);
  };

  return (
    <Card
      variant="outlined"
      sx={(t) => ({
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        transition: "box-shadow .25s ease, transform .25s ease, border-color .25s",
        "&:hover": {
          boxShadow: `0 14px 32px ${alpha(t.palette.primary.main, 0.18)}`,
          transform: "translateY(-3px)",
          borderColor: alpha(t.palette.primary.main, 0.35),
        },
      })}
    >
      <CardActionArea component="a" href={href} aria-label={title} sx={{ display: "block" }}>
        {/* Imagen real si existe; fallback a placeholder con gradiente */}
        {imgSrc ? (
          <Box
            component="img"
            src={imgSrc}
            alt={imgAlt || title}
            loading="lazy"
            sx={(t) => ({
              width: "100%",
              aspectRatio: "4 / 3",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              borderBottom: `1px solid ${alpha(t.palette.primary.main, 0.12)}`,
            })}
          />
        ) : (
          <Box
            sx={(t) => ({
              aspectRatio: "4 / 3",
              width: "100%",
              bgcolor: alpha(t.palette.primary.light, 0.08),
              borderBottom: `1px solid ${alpha(t.palette.primary.main, 0.12)}`,
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                ${alpha(t.palette.primary.main, 0.06)} 0 10px,
                ${alpha(t.palette.secondary.main, 0.06)} 10px 20px
              )`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            })}
            role="img"
            aria-label={imgAlt || title}
          />
        )}

        {/* Contenido */}
        <CardContent sx={{ pt: 3, px: { xs: 2.5, md: 3 }, pb: 2.5 }}>
          {/* Badge del ícono (vertical, centrado) */}
          <Box
            sx={(t) => ({
              display: "flex",
              justifyContent: "center",
              mb: 1.5,
              "& .lozenge": {
                width: 72,
                height: 72,
                borderRadius: 3,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.palette.secondary.dark,
                background: `linear-gradient(135deg, ${alpha(t.palette.secondary.main, 0.22)}, ${alpha(
                  t.palette.secondary.light, 0.28
                )})`,
                border: `1px solid ${alpha(t.palette.secondary.main, 0.45)}`,
                boxShadow: `0 12px 28px ${alpha(t.palette.secondary.main, 0.28)}, inset 0 1px 0 ${alpha(
                  "#fff", 0.35
                )}`,
              },
              "& svg": { fontSize: 34 },
            })}
          >
            <Box className="lozenge">{icon}</Box>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 900, letterSpacing: "-0.01em", textAlign: "center" }}
          >
            {title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.75,
              textAlign: "center",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: open ? "unset" : 3,
              overflow: "hidden",
            }}
          >
            {desc}
          </Typography>

          {more && (
            <>
              <Collapse in={open} unmountOnExit>
                <Typography id={`more-${slug}`} color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
                  {more}
                </Typography>
              </Collapse>

              <Button
                size="small"
                color="primary"
                onClick={handleToggle}
                sx={{ mt: 0.75, px: 0, minWidth: "auto", fontWeight: 700, display: "block", mx: "auto" }}
                aria-expanded={open}
                aria-controls={`more-${slug}`}
              >
                {open ? "Show less" : "Show more"}
              </Button>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
