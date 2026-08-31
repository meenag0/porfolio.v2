'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenisRef } from './lenis-context';

export default function VelocitySkewRow({ images }: { images: string[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();

  useEffect(() => {
    const items = Array.from(rowRef.current?.querySelectorAll<HTMLElement>('.skew-item') ?? []);
    if (!items.length) return;

    const setSkew = items.map((item) => gsap.quickTo(item, 'skewY', { duration: 0.5, ease: 'power3' }));
    const setScale = items.map((item) => gsap.quickTo(item, 'scale', { duration: 0.5, ease: 'power3' }));
    const clamp = gsap.utils.clamp(-14, 14);

    const tick = () => {
      const velocity = lenisRef.current?.velocity ?? 0;
      const skew = clamp(velocity * 1.4);
      const scale = 1 - Math.min(Math.abs(velocity) * 0.012, 0.1);
      setSkew.forEach((set) => set(skew));
      setScale.forEach((set) => set(scale));
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [lenisRef]);

  return (
    <div ref={rowRef} className="flex gap-6 px-6 sm:px-12 overflow-x-hidden py-12">
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="skew-item shrink-0 w-[220px] sm:w-[280px] h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-purple-500/20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} className="w-full h-full object-cover" alt={`skew ${i}`} />
        </div>
      ))}
    </div>
  );
}
