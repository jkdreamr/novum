import type { CSSProperties } from 'react';

type Mark3DProps = {
  shape?: 'cube' | 'gyro';
  /** CSS size for the mark (sets the --s custom property). */
  size?: string;
  className?: string;
};

/**
 * A small auto-rotating 3D mark built with pure CSS 3D transforms (no WebGL) — performant on
 * every device, and it freezes to a static wireframe under prefers-reduced-motion. Two shapes:
 * a wireframe cube and a gyroscope of rings. Decorative (aria-hidden).
 */
export default function Mark3D({ shape = 'cube', size = 'clamp(2.5rem,6vw,3.75rem)', className = '' }: Mark3DProps) {
  const style = { '--s': size } as CSSProperties;
  return (
    <span className={`mark3d ${className}`} style={style} aria-hidden="true">
      {shape === 'cube' ? (
        <span className="cube">
          <span className="face fr" />
          <span className="face bk" />
          <span className="face rt" />
          <span className="face lf" />
          <span className="face tp" />
          <span className="face bm" />
        </span>
      ) : (
        <span className="gyro">
          <span className="ring r1" />
          <span className="ring r2" />
          <span className="ring r3" />
        </span>
      )}
    </span>
  );
}
