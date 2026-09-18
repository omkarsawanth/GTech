import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

/**
 * FluidShaderGradient
 * High-performance 3D fluid mesh gradient powered by shadergradient (Three.js WebGL shaders)
 * Configured for Kalpa's Sunset Cyber / Solar Flare dark obsidian aesthetic.
 */
export const FluidShaderGradient = ({
  color1 = '#FF8A00', // Amber
  color2 = '#FF3366', // Coral Rose
  color3 = '#8B5CF6', // Ultra Violet
  type = 'waterPlane', // 'plane' | 'sphere' | 'waterPlane'
  uSpeed = 0.25,
  uStrength = 2.5,
  uDensity = 1.3,
  uFrequency = 4.0,
  grain = 'on',
  cDistance = 8,
  cPolarAngle = 105,
  cAzimuthAngle = 180,
  className = '',
  opacity = 0.35,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#FF8A00]/10 via-[#FF3366]/10 to-[#8B5CF6]/10 ${className}`} />
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        pixelDensity={1.2}
        fov={45}
        lazyLoad={true}
      >
        <ShaderGradient
          type={type}
          animate="on"
          uSpeed={uSpeed}
          uStrength={uStrength}
          uDensity={uDensity}
          uFrequency={uFrequency}
          color1={color1}
          color2={color2}
          color3={color3}
          grain={grain}
          lightType="3d"
          brightness={0.8}
          cDistance={cDistance}
          cPolarAngle={cPolarAngle}
          cAzimuthAngle={cAzimuthAngle}
          cameraZoom={1}
        />
      </ShaderGradientCanvas>
    </div>
  );
};

export default FluidShaderGradient;
