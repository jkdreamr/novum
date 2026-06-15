import type { Metadata } from 'next';
import { PageShell, Section, Grid, Cell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'NOVUM builds across four surfaces: artist tools, release and rights systems, visual and performance formats, and community and residency infrastructure.',
};

export default function LabPage() {
  return (
    <PageShell
      eyebrow="Lab"
      title="A company, not a single artifact."
      lede="Our stack turns taste into repeatable systems. We start where artistic pain is greatest and proof is most visible."
    >
      <Section label="Surfaces" title="Four surfaces we build on">
        <Grid>
          <Cell k="S1" title="Artist tools">Software that increases authorship, precision, and speed.</Cell>
          <Cell k="S2" title="Release & rights systems">Metadata, splits, registrations, consent, distribution.</Cell>
          <Cell k="S3" title="Visual & performance formats">World-building, live systems, new formats.</Cell>
          <Cell k="S4" title="Community & residency">Applications, cohorts, residencies, partner programs.</Cell>
        </Grid>
      </Section>

      <Section label="First wedge" title="Where we start">
        <p>
          A rights-aware, artist-built release and creative-tooling system — used end to end by pilot artists, with
          consent and human-authorship metadata native to the workflow. Demonstrable, and it produces visible
          artifacts: songs, interfaces, performances.
        </p>
      </Section>

      <Section label="Stack" title="How the system works">
        <p className="font-mono text-sm leading-loose text-bone/70">
          brief → tool / system layer → production → rights / metadata → release → audience / community → feedback into
          the product
        </p>
        <p>
          Every release passes a gate: split sheets signed, consent cleared, and a human-authorship record present. If
          rights or consent are unclear, it doesn’t ship.
        </p>
      </Section>

      <Section label="Model" title="A portfolio, not one narrow product">
        <p>
          <span className="text-bone">Near term:</span> commissioned systems, pilots, brand-backed residencies, and
          release services.
        </p>
        <p>
          <span className="text-bone">Mid term:</span> software subscription, enterprise creative systems, rights-linked
          tooling, and membership and cohort products.
        </p>
      </Section>
    </PageShell>
  );
}
