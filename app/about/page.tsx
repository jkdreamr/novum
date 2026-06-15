import type { Metadata } from 'next';
import { PageShell, Section, Grid, Cell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'About',
  description:
    'NOVUM is an artist-founded creative technology company. The unfair advantage is artistic credibility and taste fused with tool-building capacity.',
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="An artist-founded creative technology company."
      lede="We don’t just release culture. We build the systems culture now requires — tools, rights, releases, and formats, in one company."
    >
      <Section label="Thesis">
        <p>
          NOVUM builds tools, releases, and systems for the next generation of music, visuals, performance, and
          cultural world-building. This is not AI replacing artists — it is artist-built technology expanding what
          artists can make. The technology is part of the art.
        </p>
      </Section>

      <Section label="Founders">
        <p>
          <span className="text-bone">Joshua Koo</span> — Artist / Producer / Builder. Owns thesis, fundraising,
          partnerships, releases, and public narrative.
        </p>
        <p>
          <span className="text-bone">Anna Matsumoto</span> — Creative Technologist / HCI Researcher. Owns product
          architecture, interfaces, experimentation, and build culture.
        </p>
      </Section>

      <Section label="Principles">
        <Grid>
          <Cell k="01" title="Art before abstraction">If a system doesn’t improve the work, it isn’t core.</Cell>
          <Cell k="02" title="Tools are part of the art">Infrastructure is the work, not the back office.</Cell>
          <Cell k="03" title="Authorship stays visible">Every output records the human decisions behind it.</Cell>
          <Cell k="04" title="Consent is design">Voice, likeness, and data permissions are built in.</Cell>
          <Cell k="05" title="Lean is a feature">Compact, high-output team by design.</Cell>
          <Cell k="06" title="Taste is a moat">Point of view is the asset competitors can’t copy.</Cell>
        </Grid>
      </Section>

      <Section label="Position" title="What we are — and are not">
        <p>
          <span className="text-bone">We are</span> a startup whose moat is taste, trust, and rights-aware execution;
          lean and high-output; rights-aware on day one.
        </p>
        <p>
          <span className="text-bone">We are not</span> a boutique collective with startup aesthetics, a moodboard, or
          “AI replaces artists.”
        </p>
      </Section>

      <Section label="Where we work">
        <p>
          A multi-node company: legal HQ in Delaware, an operating studio HQ in Los Angeles, a fundraising and product
          node in San Francisco, and a partnership and editorial node in New York. The space is a studio-lab, not a
          coworking desk.
        </p>
      </Section>
    </PageShell>
  );
}
