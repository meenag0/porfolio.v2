'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        'loading-anim-type'?: string;
        style?: React.CSSProperties;
        className?: string;
        onLoad?: () => void;
      }
    }
  }
}

const SplineViewer = ({ onLoad }: { onLoad?: () => void }) => {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.35/build/spline-viewer.js';
    
    script.onload = () => {
      // Give a small delay to ensure Spline is properly initialized
      setTimeout(() => {
        onLoad?.();
      }, 1000);
    };
    
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [onLoad]);

  return (
    <spline-viewer 
      url="https://prod.spline.design/HAOKORm48KNkNoHH/scene.splinecode"
      loading-anim-type="spinner-small-dark"
      className="w-[500px] h-[500px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px]"
    />
  );
};

export default SplineViewer;