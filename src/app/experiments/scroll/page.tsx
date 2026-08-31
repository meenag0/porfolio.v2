'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_IMAGES = [1, 2, 3, 4].map((n) => `/placeholders/reveal-${n}.svg`);

const PARALLAX_IMAGES = [5, 6, 7].map((n) => `/placeholders/parallax-${n}.svg`);

const PIN_PANELS = [8, 9, 10, 11].map((n) => `/placeholders/pin-${n}.svg`);

export default function ScrollExperimentPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Staggered reveal on scroll
      gsap.utils.toArray<HTMLElement>('.reveal-img').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 120, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      });

      // Parallax drift
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((el) => {
        gsap.to(el, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Pinned horizontal scroll section
      const panels = gsap.utils.toArray<HTMLElement>('.pin-panel');
      if (panels.length) {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.pin-section',
            start: 'top top',
            pin: true,
            scrub: 1,
            end: () => `+=${window.innerWidth * (panels.length - 1)}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Big centered scale
      gsap.fromTo(
        '.zoom-img',
        { scale: 0.7, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.zoom-section',
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#09000f] text-white overflow-x-hidden">
      {/* Intro */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-purple-300/70">
          scroll experiment
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-blue-300">
          Lenis + GSAP
        </h1>
        <p className="max-w-md text-purple-100/60">
          Scroll down to see reveal, parallax, pin, and zoom effects with placeholder images.
        </p>
      </section>

      {/* Staggered reveal */}
      <section className="py-32 px-6 max-w-4xl mx-auto flex flex-col gap-32">
        {REVEAL_IMAGES.map((src, i) => (
          <div
            key={src}
            className="reveal-img rounded-2xl overflow-hidden border border-purple-500/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`reveal ${i}`} className="w-full h-[60vh] object-cover" />
          </div>
        ))}
      </section>

      {/* Parallax */}
      <section className="py-32 px-6 flex flex-col gap-16 items-center overflow-hidden">
        <h2 className="font-mono text-sm uppercase tracking-widest text-blue-300/70">
          parallax
        </h2>
        {PARALLAX_IMAGES.map((src, i) => (
          <div key={src} className="relative w-full max-w-3xl h-[70vh] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`parallax ${i}`}
              className="parallax-img absolute inset-0 w-full h-[130%] -top-[15%] object-cover"
            />
          </div>
        ))}
      </section>

      {/* Pinned horizontal scroll */}
      <section className="pin-section relative h-screen overflow-hidden">
        <div className="pin-track flex h-full w-max">
          {PIN_PANELS.map((src, i) => (
            <div
              key={src}
              className="pin-panel relative h-full flex items-center justify-center px-12"
              style={{ width: '100vw' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`panel ${i}`}
                className="max-h-[70vh] rounded-2xl border border-purple-500/20 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Zoom */}
      <section className="zoom-section min-h-screen flex items-center justify-center px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/placeholders/zoom-final.svg"
          alt="zoom"
          className="zoom-img w-full max-w-2xl rounded-2xl object-cover"
        />
      </section>

      <section className="h-[50vh] flex items-center justify-center">
        <p className="text-purple-200/50 font-mono text-sm">end of experiment</p>
      </section>
    </div>
  );
}
