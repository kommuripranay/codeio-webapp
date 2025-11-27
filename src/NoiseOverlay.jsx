import React from 'react';

const NoiseOverlay = ({ opacity = 0.0, visible = true }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{
        opacity: opacity,
        mixBlendMode: 'overlay', // Blends with the gradient
        
        // 1. THE STATIC NOISE SVG
        // baseFrequency='0.6' creates a nice rough texture.
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        
        // 2. MAKE IT BIG
        // By setting this to a large size (e.g., 180px), we "zoom in" on the noise,
        // making the grain appear much larger and chunkier.
        backgroundSize: '180px 180px',
        
        // 3. STATIC
        // No animation code here. It just sits there.
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export default NoiseOverlay;