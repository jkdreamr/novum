import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Manifesto',
  description: 'The future of culture will not be built by teams that separate art from infrastructure.',
};

export default function ManifestoPage() {
  return (
    <PageShell
      eyebrow="Manifesto"
      title="We are building the new medium."
      lede="The future of culture will not be built by teams that separate art from infrastructure."
    >
      <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-bone/80 sm:text-xl">
        <p>
          The old model made artists dependent on tools they did not control, platforms they did not shape, and
          systems that captured more value than they returned. NOVUM exists to reverse that arrangement.
        </p>
        <p>
          We build from the inside out: artist first, system second, audience always. We do not treat technology as
          decoration or automation as a substitute for taste. We use tools to increase authorship, precision, speed,
          memory, intimacy, and scale.
        </p>
        <p>
          The next label is not only a label. It is a lab, a studio, a software practice, a performance engine, a
          visual language, a release system, and a world-building discipline.
        </p>
        <p>
          AI should augment human craft, not erase it. Identity, voice, likeness, authorship, consent, and attribution
          are not edge cases. They are the foundation of any creative system worth trusting.
        </p>
        <p>
          We build things that can be experienced, not just explained: songs, interfaces, visuals, performances, tools,
          formats, rituals, and communities.
        </p>
        <p>
          We value beauty with rigor, experimentation with accountability, speed with editorial judgment, and ambition
          with actual receipts.
        </p>
        <p className="font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
          We are here to build the new medium.
        </p>
      </div>
    </PageShell>
  );
}
