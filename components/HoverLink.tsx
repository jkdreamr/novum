'use client';

import type { MouseEvent } from 'react';

type HoverLinkProps = {
  /** The visible label. Kept as a string so we can duplicate it for the mask reveal. */
  children: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  /** Render an external anchor (adds target + rel). */
  external?: boolean;
  ariaLabel?: string;
};

/**
 * Doubled-text reveal link (adcker-style). Two stacked copies of the label sit in an
 * overflow-hidden mask; on hover/focus the stack slides up so a fresh copy rolls into place.
 * Renders an <a> when href is set, a <button> when only onClick is set, otherwise a
 * presentational <span> (so the same hover effect can be used on non-navigating items).
 */
export default function HoverLink({
  children,
  href,
  onClick,
  className = '',
  external = false,
  ariaLabel,
}: HoverLinkProps) {
  const inner = (
    <span className="hover-link__mask">
      <span className="hover-link__line hover-link__line--out">{children}</span>
      <span className="hover-link__line hover-link__line--in" aria-hidden="true">
        {children}
      </span>
    </span>
  );

  const classes = `hover-link ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }

  // Presentational: keeps the hover reveal without being a focusable control.
  return <span className={classes}>{inner}</span>;
}
