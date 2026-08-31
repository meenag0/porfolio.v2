'use client';

import dynamic from 'next/dynamic';
import { LenisProvider } from './lenis-context';
import CustomCursor from './CustomCursor';
import MagneticButton from './MagneticButton';
import SplitHeading from './SplitHeading';
import VelocityMarquee from './VelocityMarquee';
import VelocitySkewRow from './VelocitySkewRow';

const ShaderRipple = dynamic(() => import('./ShaderRipple'), { ssr: false });

const SKEW_IMAGES = [1, 2, 3, 4, 5, 6].map((n) => `/placeholders/pin-${((n - 1) % 4) + 8}.svg`);

export default function ScrollV2Page() {
  return (
    <LenisProvider>
      <CustomCursor />
      <main className="min-h-screen bg-[#09000f] text-white overflow-x-hidden">
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
          <span className="font-mono text-sm uppercase tracking-widest text-purple-300/70">
            scroll experiment v2
          </span>
          <SplitHeading
            as="h1"
            text="MUCH COOLER"
            className="text-6xl sm:text-8xl lg:text-[8rem] font-bold tracking-tight leading-[0.95] bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-blue-300"
          />
          <p className="max-w-lg text-purple-100/60">
            Velocity-skewed images, a live WebGL ripple shader, a speed-linked marquee, and a
            magnetic button. Scroll fast.
          </p>
          <MagneticButton className="px-8 py-4 mt-4 rounded-full bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-colors font-display tracking-wide text-purple-100">
            hover / drag me
          </MagneticButton>
        </section>

        <VelocityMarquee text="SCROLL FASTER" />

        {/* Velocity skew gallery */}
        <section className="py-24">
          <div className="px-6 sm:px-12 mb-8">
            <SplitHeading
              text="Velocity Skew"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-purple-100"
            />
            <p className="mt-3 text-purple-100/50 max-w-md">
              These cards read your scroll velocity every frame and skew/scale accordingly.
            </p>
          </div>
          <VelocitySkewRow images={SKEW_IMAGES} />
        </section>

        <VelocityMarquee text="WEBGL SHADER" />

        {/* Shader ripple */}
        <section className="py-24 px-6 sm:px-12 flex flex-col items-center gap-8">
          <SplitHeading
            text="Interactive Shader"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-purple-100"
          />
          <div
            data-cursor-hover
            className="w-full max-w-2xl aspect-square rounded-3xl overflow-hidden border border-purple-500/20"
          >
            <ShaderRipple className="w-full h-full" />
          </div>
          <p className="text-purple-100/50 max-w-md text-center">
            A custom GLSL fragment shader rendered on a Three.js plane, distorting the texture
            around the cursor in real time.
          </p>
        </section>

        <VelocityMarquee text="LETS GO" />

        <section className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
          <SplitHeading
            text="Tell me what to push further."
            className="text-2xl sm:text-4xl font-bold tracking-tight text-purple-100 max-w-2xl"
          />
        </section>
      </main>
    </LenisProvider>
  );
}
