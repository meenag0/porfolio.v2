'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenisRef } from './lenis-context';

export default function VelocityMarquee({ text }: { text: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;

    const tick = () => {
      const velocity = lenisRef.current?.velocity ?? 0;
      const baseSpeed = 0.7;
      const speed = baseSpeed + Math.min(Math.abs(velocity) * 0.08, 3);
      xRef.current -= speed;
      if (-xRef.current >= halfWidth) xRef.current += halfWidth;
      gsap.set(track, { x: xRef.current });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [lenisRef]);

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[var(--rd-line)] py-5 sm:py-6">
      <div ref={trackRef} className="inline-flex will-change-transform">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-5xl sm:text-8xl font-bold uppercase tracking-tight px-6 text-[var(--rd-muted)]"
          >
            {text}&nbsp;/&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
