import { useRef, useEffect } from 'react';

const LivingTexture = ({ 
  color = '#B8B8FF', 
  opacity = 0.1,
  fontSizePx = 24, // FIXED SIZE DEFAULT
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~"
}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let grid = []; 
    
    // SPEED CONTROL: 60 Seconds to flip the full screen
    const CYCLE_DURATION_SECONDS = 60; 

    const resizeAndSetup = () => {
      if (!parent) return;

      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      // 1. Set Resolution
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // 2. Set CSS Size
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      ctx.scale(dpr, dpr);

      // 3. USE FIXED FONT SIZE (No 'vh' math here)
      ctx.font = `${fontSizePx}px monospace`;
      ctx.textBaseline = 'top';
      
      // 4. Grid Calculation
      // 0.6 is the standard aspect ratio for monospace fonts
      const charWidth = fontSizePx * 0.6; 
      
      // Add buffer (+4) to ensure no gaps at edges
      const cols = Math.ceil(width / charWidth) + 4; 
      const rows = Math.ceil(height / fontSizePx) + 4; 

      // Populate Grid
      grid = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          grid.push({
            char: characters[Math.floor(Math.random() * characters.length)],
            // Start negative to handle the buffer
            x: (x * charWidth) - (charWidth * 2), 
            y: (y * fontSizePx) - (fontSizePx * 2)
          });
        }
      }
      
      drawFull();
    };

    const drawFull = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.font = `${fontSizePx}px monospace`;

      grid.forEach(cell => {
        ctx.fillText(cell.char, cell.x, cell.y);
      });
    };

    const animate = () => {
      if (grid.length === 0) return;

      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.font = `${fontSizePx}px monospace`;

      const updatesPerFrame = grid.length / (60 * CYCLE_DURATION_SECONDS);
      let count = Math.floor(updatesPerFrame);
      if (Math.random() < (updatesPerFrame % 1)) {
        count++;
      }

      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * grid.length);
        const cell = grid[index];
        
        ctx.clearRect(cell.x, cell.y, fontSizePx, fontSizePx + 1); 
        cell.char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(cell.char, cell.x, cell.y);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeAndSetup();
    animate();

    const handleResize = () => resizeAndSetup();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, opacity, characters, fontSizePx]); // Re-run if font size changes

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};

export default LivingTexture;