// src/pages/Home.tsx
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";

import Hero from "../components/layout/hero/Hero";
import Section from "../components/layout/Section";
import ServicesGrid from "../components/services/ServicesGrid";
import ProcessSteps from "../components/process/ProcessSteps";
import TeamGrid from "../components/team/TeamGrid";
import QuoteForm from "../components/quote/QuoteForm";
import ContactTiles from "../components/contact/ContactTiles";
import WhyUsCard from "../components/quote/WhyUsCard";
import TestimonialsGrid from "../components/testimnonials/TestimonialsGrid";
import ServiceAreaMap from "../components/contact/ServiceAreaMap";
import FeaturesGrid from "../components/why/FeaturesGrid";
import BeforeAfterSection from "../components/ShowCase/BeforeAfterSection";

export default function Home() {
  return (
    <Box>
      <Hero />

      <Box
        sx={(t) => ({
          py: { xs: 5, md: 8 }, // móvil más compacto
          background: `linear-gradient(180deg, ${alpha(t.palette.secondary.light, 0.16)} 0%, #FFFFFF 60%)`,
        })}
      >
        <Container maxWidth="lg">
          <Section
            id="why"
            title="Why Choose Marina Cleans?"
            subtitle="Experience top-notch cleaning and organizing tailored for every home and business."
          >
            <FeaturesGrid />
          </Section>
        </Container>
      </Box>

      <Box
        sx={(t) => ({
          py: { xs: 5, md: 8 },
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha(t.palette.primary.light, 0.10)} 100%)`,
          borderTop: `1px solid ${alpha(t.palette.primary.main, 0.08)}`,
          borderBottom: `1px solid ${alpha(t.palette.primary.main, 0.08)}`,
        })}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Section
            id="services"
            title="Our services"
            subtitle="Complete, detail-oriented solutions for every need"
            maxWidth="xl"
          >
            <ServicesGrid />
          </Section>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Section id="process" title="How we work" subtitle="Simple and transparent process">
            <ProcessSteps />
          </Section>
        </Container>
      </Box>

      <Box
        sx={(t) => ({
          py: { xs: 5, md: 8 },
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.06)} 0%, #FFFFFF 70%)`,
        })}
      >
        <Container maxWidth="lg">
          <Section id="testimonials" title="Customer Reviews" subtitle="What our clients say">
            <TestimonialsGrid />
          </Section>
        </Container>
      </Box>

      {/* Before / After */}
      <BeforeAfterSection />

      <Box
        sx={(t) => ({
          py: { xs: 5, md: 8 },
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha(t.palette.secondary.main, 0.10)} 100%)`,
          borderTop: `1px solid ${alpha(t.palette.secondary.main, 0.12)}`,
        })}
      >
        <Container maxWidth="lg">
          <Section
            id="quote"
            title="Request your quote"
            subtitle="Fast response — typically within minutes."
          >
            <Container disableGutters>
              {/* ⬇︎ Alineación perfecta en desktop, sin tocar móvil */}
              <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
                <Grid item xs={12} md={6} sx={{ display: { md: "flex" } }}>
                  <Box sx={{ flex: 1 }}>
                    <QuoteForm />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: { md: "flex" } }}>
                  <Box sx={{ flex: 1 }}>
                    <WhyUsCard />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Section>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Section id="team" title="Meet our team" subtitle="Real people committed to quality">
            <TeamGrid />
          </Section>
        </Container>
      </Box>

      <Box
        sx={(t) => ({
          py: { xs: 5, md: 8 },
          background: `linear-gradient(180deg, ${alpha(t.palette.primary.light, 0.08)} 0%, #FFFFFF 100%)`,
        })}
      >
        <Container maxWidth="lg">
          <Section id="contact" title="Contact" subtitle="We’re close to you">
            <ContactTiles />
            <Box sx={{ mt: 3 }}>
              <ServiceAreaMap query="San Francisco, CA" zoom={11} height={320} />
            </Box>
          </Section>
        </Container>
      </Box>
    </Box>
  );
}
