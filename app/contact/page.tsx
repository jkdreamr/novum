import type { Metadata } from 'next';
import { PageShell, Section, Grid, Cell } from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach NOVUM — general, artist, builder, partner, press, and investor inquiries.',
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Reach out."
      lede="We only write when there’s something real to say. Same for you — tell us what you’re actually trying to do."
    >
      <Section label="Inboxes" title="Where things route">
        <Grid>
          <Cell k="General" title="novumcreate@gmail.com">General inbound and everything not listed below.</Cell>
          <Cell k="Artists & builders" title="novumcreate@gmail.com">Collaborations, submissions, technical contributors.</Cell>
          <Cell k="Partners & sponsors" title="novumcreate@gmail.com">Brands, venues, institutions, residencies.</Cell>
          <Cell k="Investors & press" title="novumcreate@gmail.com">Investor inbound, diligence, and media.</Cell>
        </Grid>
        <p className="text-sm text-bone/50">
          Role-based aliases (artists@, builders@, partners@, investors@, press@) go live with the company domain.
        </p>
      </Section>

      <Section label="Message" title="Or send a note">
        <ContactForm kind="general" />
      </Section>
    </PageShell>
  );
}
