import { useRef, useEffect } from 'react';

const LetterGlitch = ({
  // Using pure white with varying opacity for depth
  glitchColors = ['#FFFFFF', '#AAAAAA', '#555555'],
  glitchSpeed = 50,
  updateCount = 300, // Number of characters changing per frame
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const grid = useRef([]);
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());

  const fontSize = 16; 
  const charWidth = 10; // Fixed width for cleaner grid

  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];
  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

  // Create the grid state
  const setupGrid = (cols, rows) => {
    grid.current = [];
    for (let i = 0; i < cols * rows; i++) {
      grid.current.push({
        char: getRandomChar(),
        color: getRandomColor()
      });
    }
  };

  const resizeCanvas = () => {
    if (!containerRef.current || !canvasRef.current) return;
    const parent = containerRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    
    // Force canvas to match parent exactly
    canvas.width = parent.width * dpr;
    canvas.height = parent.height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Calculate grid size based on actual pixels
    const cols = Math.ceil(parent.width / charWidth);
    const rows = Math.ceil(parent.height / fontSize);
    
    // Build the grid
    setupGrid(cols, rows);
    draw(); 
  };

  const draw = () => {
    if (!context.current || !canvasRef.current || !containerRef.current) return;
    const ctx = context.current;
    const parent = containerRef.current.getBoundingClientRect();
    
    // Clear screen
    ctx.clearRect(0, 0, parent.width, parent.height);
    
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';

    const cols = Math.ceil(parent.width / charWidth);

    // Render the grid
    grid.current.forEach((cell, i) => {
      const x = (i % cols) * charWidth;
      const y = Math.floor(i / cols) * fontSize;
      
      ctx.fillStyle = cell.color;
      ctx.fillText(cell.char, x, y);
    });
  };

  const update = () => {
    if (grid.current.length === 0) return;
    // Update a random subset of characters
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * grid.current.length);
      if (grid.current[index]) {
        grid.current[index].char = getRandomChar();
        grid.current[index].color = getRandomColor();
      }
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      update(); 
      draw();
      lastGlitchTime.current = now;
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext('2d');
    
    // Initial setup with delay to catch layout stability
    setTimeout(() => {
        resizeCanvas();
        animate();
    }, 50);

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [glitchSpeed]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default LetterGlitch;