import type { Metadata } from 'next';
import { PageShell, Section } from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Apply',
  description: 'Build with NOVUM. For artists and builders who refuse the split between the work and the tools.',
};

export default function ApplyPage() {
  return (
    <PageShell
      eyebrow="Apply — artists & builders"
      title="Build with NOVUM."
      lede="We work with artists and builders who refuse the split between making the work and making the tools."
    >
      <Section label="Who">
        <p>
          Tell us what you make and what you’d build if the tooling weren’t in the way. We read everything. We work with
          a small number of people at a time, deliberately.
        </p>
      </Section>
      <Section label="Apply" title="Send your work">
        <ContactForm kind="artist" />
      </Section>
    </PageShell>
  );
}
