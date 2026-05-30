'use client';

import { Component, type ReactNode } from 'react';

/**
 * Minimal error boundary. If the WebGL glass scene throws (no WebGL, context loss, etc.) it
 * renders the fallback (the CSS-3D mark) instead — so the page can never break.
 */
export default class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    /* swallow — the fallback is enough */
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
