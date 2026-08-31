'use client';

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function ShaderGradientBackground() {
  return (
    <ShaderGradientCanvas
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      pixelDensity={1.2}
      fov={45}
    >
      <ShaderGradient
        type="plane"
        animate="on"
        color1="#0a1a2e"
        color2="#1c4d8c"
        color3="#5aa9ff"
        uSpeed={0.15}
        uStrength={2.4}
        uDensity={1.3}
        uFrequency={5.5}
        uAmplitude={1.2}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={0}
        rotationZ={50}
        cAzimuthAngle={180}
        cPolarAngle={115}
        cDistance={3.2}
        cameraZoom={1}
        lightType="3d"
        brightness={1.1}
        reflection={0.15}
        grain="on"
        grainBlending={0.15}
        wireframe={false}
        shader="defaults"
      />
    </ShaderGradientCanvas>
  );
}
