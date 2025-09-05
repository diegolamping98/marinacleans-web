import { useMemo, useState } from "react";
import {
  Card, CardContent, Alert, Button, TextField, MenuItem, Stack, Typography,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  Checkbox, FormGroup, ListSubheader, InputAdornment, Box, FormHelperText
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";

// Icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

// Endpoints y contacto
const FORM_ENDPOINT = "https://formspree.io/f/xvgbonek";
const PHONE_TEL = "+14156851462"; // (415) 685-1462

// Opciones
const FACILITY_OPTIONS: { group: string; items: string[] }[] = [
  { group: "Residential", items: [
    "Single-family home","Apartment / Condo","Townhouse",
    "Move-in / Move-out","Post-construction (home)","Airbnb / Short-term rental",
  ]},
  { group: "Commercial", items: [
    "Office (general)","Multi-tenant building","Retail store / Showroom",
    "Medical / Dental office","School / Daycare","Warehouse / Industrial",
    "Gym / Studio","Restaurant / Café","Post-construction (commercial)",
  ]},
];
const FREQUENCY_OPTIONS = ["One-time","Weekly","Bi-weekly","Monthly","As needed"];
const CONTACT_METHODS = ["Phone call","WhatsApp","Email"] as const;
type ContactMethod = typeof CONTACT_METHODS[number];
const BEST_TIME = ["Morning (8–11)","Midday (11–2)","Afternoon (2–5)","Evening (5–7)"];

// Helpers de validación
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const onlyDigits = (s: string) => s.replace(/\D/g, "");

type Errors = Partial<{
  name: string;
  city: string;
  email: string;
  phone: string;
  facility: string;
  frequency: string;
  consent: string;
}>;

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");

  // Estados controlados
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facility, setFacility] = useState("");
  const [frequency, setFrequency] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("Phone call");
  const [bestTime, setBestTime] = useState("");
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  // Validación
  const validateAll = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Your name is required.";
    if (!city.trim()) next.city = "Your city is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(email.trim())) next.email = "Enter a valid email.";
    const digits = onlyDigits(phone);
    if (!phone.trim()) next.phone = "Phone number is required.";
    else if (digits.length < 8) next.phone = "Enter a valid phone (min. 8 digits).";
    if (!facility) next.facility = "Please select a facility type.";
    if (!frequency) next.frequency = "Please select a cleaning frequency.";
    if (!consent) next.consent = "You must agree to be contacted to proceed.";
    return next;
  };

  const validateField = (field: keyof Errors, value: string | boolean) => {
    let msg = "";
    if (field === "name" && !String(value).trim()) msg = "Your name is required.";
    if (field === "city" && !String(value).trim()) msg = "Your city is required.";
    if (field === "email") {
      const v = String(value).trim();
      if (!v) msg = "Email is required.";
      else if (!emailRegex.test(v)) msg = "Enter a valid email.";
    }
    if (field === "phone") {
      const v = String(value);
      if (!v.trim()) msg = "Phone number is required.";
      else if (onlyDigits(v).length < 8) msg = "Enter a valid phone (min. 8 digits).";
    }
    if (field === "facility" && !String(value)) msg = "Please select a facility type.";
    if (field === "frequency" && !String(value)) msg = "Please select a cleaning frequency.";
    if (field === "consent" && !Boolean(value)) msg = "You must agree to be contacted to proceed.";
    setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
  };

  // WhatsApp prellenado (para CTA post-envío)
  const waText = useMemo(() => {
    const lines = [
      `Hi Marina Cleans! I'm ${name || "a new lead"} from ${city || "the SF Bay Area"}.`,
      facility ? `Facility: ${facility}.` : "",
      frequency ? `Frequency: ${frequency}.` : "",
      bestTime ? `Best time to contact: ${bestTime}.` : "",
      "I'd like to schedule a quick call for a custom quote.",
    ].filter(Boolean);
    return encodeURIComponent(lines.join(" "));
  }, [name, city, facility, frequency, bestTime]);
  const waHref = `https://wa.me/${PHONE_TEL.replace(/\D/g, "")}?text=${waText}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const raw = new FormData(e.currentTarget);
    if ((raw.get("company") as string)?.length) return; // honeypot

    const v = validateAll();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      const firstKey = Object.keys(v)[0] as keyof Errors;
      const el = e.currentTarget.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      el?.focus();
      return;
    }

    // Solo enviamos los campos que el usuario completó
    const data = new FormData();
    for (const [k, val] of raw.entries()) {
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (!trimmed) continue;
        data.append(k, trimmed);
      } else {
        data.append(k, val);
      }
    }

    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) {
        (e.currentTarget as HTMLFormElement).reset();
        setName(""); setCity(""); setEmail(""); setPhone("");
        setFacility(""); setFrequency(""); setContactMethod("Phone call");
        setBestTime(""); setConsent(true); setErrors({});
      }
    } catch {
      setStatus("err");
    }
  }

  // Estilo
  const CARD_SX = (t: any) => ({
    borderRadius: 3,
    borderColor: alpha(t.palette.primary.main, 0.12),
    boxShadow: "0 1px 2px rgba(16,24,40,.06)",
    overflow: "hidden",
    background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.03)}, ${alpha(t.palette.secondary.main, 0.03)})`,
  });

  const inputSx = {
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    "& .MuiFormLabel-asterisk": { color: "error.main" },
  } as const;

  const iconAdornment = (icon: React.ReactNode) => (
    <InputAdornment position="start">
      <Box sx={{ color: "text.disabled", display: "inline-flex" }}>{icon}</Box>
    </InputAdornment>
  );

  return (
    <Card variant="outlined" sx={CARD_SX as any}>
      {/* franja superior estética (azul → rosa) */}
      <Box sx={(t) => ({ height: 6, background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})` })} />

      <CardContent component="form" onSubmit={onSubmit} noValidate sx={{ p: { xs: 2.5, md: 3 } }}>
        {/* ❌ Se eliminaron los inputs ocultos _subject, _replyto y summary */}

        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          {/* Row 1 */}
          <Grid item xs={12} md={6}>
            <TextField
              name="name" label="Your Name" required fullWidth autoComplete="name"
              placeholder="Full name" sx={inputSx}
              value={name}
              onChange={(e)=>{ setName(e.target.value); validateField("name", e.target.value); }}
              error={!!errors.name} helperText={errors.name}
              InputProps={{ startAdornment: iconAdornment(<PersonRoundedIcon />) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="city" label="Your City" required fullWidth autoComplete="address-level2"
              placeholder="e.g., San Francisco" sx={inputSx}
              value={city}
              onChange={(e)=>{ setCity(e.target.value); validateField("city", e.target.value); }}
              error={!!errors.city} helperText={errors.city}
              InputProps={{ startAdornment: iconAdornment(<LocationCityRoundedIcon />) }}
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={12} md={6}>
            <TextField
              name="email" type="email" label="Email Address" required fullWidth autoComplete="email"
              placeholder="you@email.com" sx={inputSx}
              value={email}
              onChange={(e)=>{ setEmail(e.target.value); validateField("email", e.target.value); }}
              error={!!errors.email} helperText={errors.email}
              InputProps={{ startAdornment: iconAdornment(<EmailRoundedIcon />) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="phone" label="Phone Number" required fullWidth autoComplete="tel"
              inputProps={{ inputMode: "tel", pattern: "[0-9()+\\-\\s]{7,}" }}
              placeholder="(xxx) xxx-xxxx" sx={inputSx}
              value={phone}
              onChange={(e)=>{ setPhone(e.target.value); validateField("phone", e.target.value); }}
              error={!!errors.phone} helperText={errors.phone}
              InputProps={{ startAdornment: iconAdornment(<PhoneRoundedIcon />) }}
            />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={12} md={6}>
            <TextField
              select fullWidth required label="Type of Facility" name="facility"
              value={facility}
              onChange={(e)=>{ setFacility(e.target.value); validateField("facility", e.target.value); }}
              sx={inputSx}
              error={!!errors.facility} helperText={errors.facility}
              SelectProps={{ displayEmpty: true, MenuProps:{ sx:{ "& .MuiListSubheader-root":{ fontWeight:700, color:"text.primary"} } } }}
              InputProps={{ startAdornment: iconAdornment(<BusinessRoundedIcon />) }}
            >
              <MenuItem value="" disabled>Select facility type</MenuItem>
              {FACILITY_OPTIONS.flatMap((g)=>[
                <ListSubheader key={`h-${g.group}`} disableSticky>— {g.group} —</ListSubheader>,
                ...g.items.map((opt)=> <MenuItem key={`${g.group}-${opt}`} value={opt}>{opt}</MenuItem>)
              ])}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select fullWidth required label="Cleaning Frequency" name="frequency"
              value={frequency}
              onChange={(e)=>{ setFrequency(e.target.value); validateField("frequency", e.target.value); }}
              sx={inputSx}
              error={!!errors.frequency} helperText={errors.frequency}
              SelectProps={{ displayEmpty: true }}
              InputProps={{ startAdornment: iconAdornment(<UpdateRoundedIcon />) }}
            >
              <MenuItem value="" disabled>Select frequency</MenuItem>
              {FREQUENCY_OPTIONS.map((opt)=> <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Row 4 – preferencia de contacto */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel>Preferred contact</FormLabel>
              <RadioGroup row name="contact_method" value={contactMethod}
                onChange={(e)=>setContactMethod(e.target.value as ContactMethod)}>
                <FormControlLabel value="Phone call" control={<Radio />} label={
                  <Stack direction="row" spacing={0.75} alignItems="center"><CallRoundedIcon fontSize="small" /> Phone</Stack>
                }/>
                <FormControlLabel value="WhatsApp" control={<Radio />} label={
                  <Stack direction="row" spacing={0.75} alignItems="center"><WhatsAppIcon fontSize="small" /> WhatsApp</Stack>
                }/>
                <FormControlLabel value="Email" control={<Radio />} label={
                  <Stack direction="row" spacing={0.75} alignItems="center"><AlternateEmailRoundedIcon fontSize="small" /> Email</Stack>
                }/>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select fullWidth label="Best time to contact" name="best_time"
              value={bestTime} onChange={(e)=>setBestTime(e.target.value)} sx={inputSx}
              SelectProps={{ displayEmpty: true }}
              InputProps={{ startAdornment: iconAdornment(<AccessTimeRoundedIcon />) }}
            >
              <MenuItem value="" disabled>Select a time window</MenuItem>
              {BEST_TIME.map((t)=> <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Row 5 – notas */}
          <Grid item xs={12}>
            <TextField
              name="notes" label="(Optional) Anything else you'd like us to know?"
              placeholder="Preferred days, rooms, access, pets, special requests…"
              multiline minRows={3} fullWidth sx={inputSx}
              InputProps={{ startAdornment: iconAdornment(<NotesRoundedIcon />) }}
            />
          </Grid>

          {/* Consentimiento */}
          <Grid item xs={12}>
            <FormControl error={!!errors.consent} component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={consent}
                      onChange={(e)=>{ setConsent(e.target.checked); validateField("consent", e.target.checked); }}
                      name="consent"
                    />
                  }
                  label="I agree to be contacted about my quote via the selected method."
                />
              </FormGroup>
              {!!errors.consent && <FormHelperText>{errors.consent}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Honeypot */}
          <input type="text" name="company" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          {/* Submit */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Button type="submit" variant="contained" size="large" disabled={status==="loading"} sx={{ borderRadius: 2 }}>
                {status==="loading" ? "Sending…" : "Get my quote"}
              </Button>
              <Typography variant="caption" color="text.secondary" aria-live="polite">
                Fast response — usually in minutes.
              </Typography>
            </Stack>
          </Grid>

          {/* Post-envío */}
          {status==="ok" && (
            <Grid item xs={12}>
              <Alert
                severity="success"
                action={
                  <Stack direction="row" spacing={1} sx={{ mt: { xs: 1, md: 0 } }}>
                    <Button href={`tel:${PHONE_TEL}`} variant="outlined">Call now</Button>
                    <Button href={waHref} variant="contained" color="success">WhatsApp</Button>
                  </Stack>
                }
              >
                Thanks! We’ll reply in minutes. Prefer to talk now?
              </Alert>
            </Grid>
          )}
          {status==="err" && (
            <Grid item xs={12}>
              <Alert severity="error">Couldn’t send the form. Please try again.</Alert>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
