import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NOVUM — Artists building the tools behind their art';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A857B', fontSize: 24, letterSpacing: 2 }}>
          <span>NOVUM</span>
          <span>CREATIVE TECHNOLOGY</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ color: '#EDE8DF', fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
            Artists building the tools behind their art.
          </div>
          <div style={{ color: '#8A857B', fontSize: 30 }}>The next label is a lab.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A5159', fontSize: 22 }}>
          <span>music · visuals · performance · systems</span>
          <span>novum-mu.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
