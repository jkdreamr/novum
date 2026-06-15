import type { Metadata } from 'next';
import { PageShell, Section, Grid, Cell } from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Investors & Partners',
  description:
    'NOVUM is raising a pre-seed to build the first real operating layer — at the intersection of music, AI-native tooling, and an urgent authorship and rights landscape.',
};

export default function InvestorsPage() {
  return (
    <PageShell
      eyebrow="Investors & Partners"
      title="Built for investors who underwrite culture and software."
      lede="Music is growing and monetizing, AI is reshaping creation, and authorship and likeness law is becoming urgent. Into that: an artist-founded company with the tools, the rights workflow, and the taste."
    >
      <Section label="The raise" title="Pre-seed">
        <p>
          We’re raising a <span className="text-bone">$1M pre-seed</span> on a post-money SAFE — roughly eighteen months
          of runway for productization, artist pilots, rights and ops infrastructure, and brand launch. We convert to a
          priced seed on proof: usage, paid pilots, recurring sponsorship, or clearly documented pull.
        </p>
      </Section>

      <Section label="Investor fit" title="Who we’re built for">
        <Grid>
          <Cell title="Artist-tech angels">Operators who understand creator tools and cultural products.</Cell>
          <Cell title="Pre-seed AI funds">Comfortable underwriting technical ambition pre-revenue.</Cell>
          <Cell title="Creator-economy seed">Understand distribution, rights, audiences, monetization.</Cell>
          <Cell title="Cultural family offices">Value long-term cultural IP, not only SaaS dashboards.</Cell>
          <Cell title="Strategic music-tech">Distribution, rights, tooling, creator-platform adjacency.</Cell>
          <Cell title="Brand innovation sponsors">Early capital via commissioned pilots, salons, residencies.</Cell>
        </Grid>
      </Section>

      <Section label="Partners" title="Ways to work together">
        <Grid>
          <Cell title="Commissioned System">A fixed-scope build for a brand or artist, with clear usage rights.</Cell>
          <Cell title="Brand-Backed Residency">A sponsored cohort or salon series with shared outputs.</Cell>
          <Cell title="Pilot Partnership">A co-developed tool with a community or venue.</Cell>
          <Cell title="Infra Partnership">Compute, model access, or integration for reference-customer status.</Cell>
        </Grid>
      </Section>

      <Section label="Contact" title="Start the conversation">
        <ContactForm kind="investor" />
      </Section>
    </PageShell>
  );
}
