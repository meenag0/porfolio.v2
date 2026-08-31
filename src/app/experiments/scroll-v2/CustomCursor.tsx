'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    window.addEventListener('mousemove', onMove);

    const onEnter = () =>
      gsap.to(ring, { scale: 2.4, backgroundColor: 'rgba(255,255,255,0.08)', duration: 0.3, ease: 'power3.out' });
    const onLeave = () =>
      gsap.to(ring, { scale: 1, backgroundColor: 'rgba(255,255,255,0)', duration: 0.3, ease: 'power3.out' });

    const attach = () => {
      document.querySelectorAll('[data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document.body.style.cursor = prevCursor;
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-purple-100 mix-blend-difference hidden md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-9 w-9 rounded-full border border-purple-200/70 mix-blend-difference hidden md:block"
      />
    </>
  );
}
