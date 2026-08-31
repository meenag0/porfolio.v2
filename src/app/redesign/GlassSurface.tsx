import type { CSSProperties, ReactNode } from 'react';

export default function GlassSurface({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`backdrop-blur-md bg-[var(--rd-accent-soft)] border border-[var(--rd-line)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
