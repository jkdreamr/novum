'use client';

import { useEffect, useState } from 'react';

/**
 * True only on desktop-width viewports with motion allowed. Used to gate pinned / scroll-linked
 * effects so phones and reduced-motion users get the simple static version instead. Returns false
 * on the server + first client paint (so SSR/mobile render the safe path), then updates on mount.
 */
export function useDesktopMotion() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return on;
}
