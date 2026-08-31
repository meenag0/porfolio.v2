'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitHeading({
  text,
  className,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll('.char-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 120, rotate: 8 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.018,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {text.split('').map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="char-inner inline-block">{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </Tag>
  );
}
