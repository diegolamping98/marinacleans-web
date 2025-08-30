import Box from "@mui/material/Box";
export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <Box sx={{ position: "relative", width: small ? 28 : 36, height: small ? 28 : 36 }}>
      <Box sx={{ position: "absolute", inset: 0, borderRadius: 2, background: "linear-gradient(135deg,#047857,#0284C7)" }} />
      <Box sx={{ position: "absolute", inset: 2, borderRadius: 1.5, bgcolor: "white" }} />
      <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        color: "primary.dark", fontWeight: 800, fontSize: 14 }}>MC</Box>
    </Box>
  );
}
