import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Lenis from 'lenis';

// --- 0. BioMesh Background ---
const BioMesh = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // CONFIGURATION
    const NODE_COUNT = 40; 
    const CONNECTION_DIST = 200; 
    const MOUSE_REPEL_RADIUS = 300; 
    const MOUSE_REPEL_FORCE = 0.02; 
    const DRIFT_SPEED = 0.1;

    let nodes = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    class Node {
      constructor() {
        this.originX = Math.random() * canvas.width;
        this.originY = Math.random() * canvas.height;
        this.x = this.originX;
        this.y = this.originY;
        this.vx = (Math.random() - 0.5) * DRIFT_SPEED;
        this.vy = (Math.random() - 0.5) * DRIFT_SPEED;
      }

      update() {
        this.originX += this.vx;
        this.originY += this.vy;

        if (this.originX < 0 || this.originX > canvas.width) this.vx *= -1;
        if (this.originY < 0 || this.originY > canvas.height) this.vy *= -1;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = this.originX;
        let targetY = this.originY;

        if (dist < MOUSE_REPEL_RADIUS) {
          const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * MOUSE_REPEL_RADIUS * MOUSE_REPEL_FORCE * 10;
          const pushY = Math.sin(angle) * force * MOUSE_REPEL_RADIUS * MOUSE_REPEL_FORCE * 10;
          
          targetX = this.originX - pushX;
          targetY = this.originY - pushY;
        }

        this.x += (targetX - this.x) * 0.05;
        this.y += (targetY - this.y) * 0.05;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        // Accent color (Indigo) for nodes
        ctx.fillStyle = 'rgba(129, 140, 248, 0.4)'; 
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(new Node());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(node => node.update());

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = 1 - (dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            // Accent color for lines
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity * 0.15})`; 
            ctx.stroke();
          }
        }
        nodeA.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    resize();
    initNodes();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// --- 1. Navbar Component ---
const Navbar = ({ onOpen }) => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center backdrop-blur-md bg-cyber-black/30 border-b border-white/5">
    <div className="flex items-center gap-2 select-none cursor-pointer group">
      <span className="font-tech text-xl tracking-widest text-cyber-accent font-bold glitch-hover">
        &lt;CODE<span className="opacity-50 text-cyber-text group-hover:text-cyber-accent transition-colors">IO</span>/&gt;
      </span>
    </div>

    <button 
      onClick={onOpen}
      className="p-2 rounded-full hover:bg-cyber-accent/10 transition-colors duration-300 active:scale-95 text-cyber-text group"
    >
      {/* Menu Icon turns accent on hover */}
      <Menu size={28} strokeWidth={1.5} className="group-hover:text-cyber-accent transition-colors" />
    </button>
  </nav>
);

// --- 2. Sidebar Component ---
const Sidebar = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-cyber-dark z-[70] border-l border-cyber-gray p-8 flex flex-col"
        >
          <div className="flex justify-end mb-12">
            <button 
              onClick={onClose}
              className="p-2 hover:rotate-90 transition-transform duration-500 text-cyber-text hover:text-cyber-accent"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          <div className="flex flex-col gap-6 font-tech text-3xl text-cyber-text">
            {['About', 'Projects', 'Contact', 'Careers'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={onClose}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="group flex items-center gap-4 transition-colors cursor-pointer glitch-hover"
              >
                {/* Numbers turn accent on hover */}
                <span className="text-sm text-cyber-gray font-sans opacity-50 group-hover:text-cyber-accent transition-colors">0{i+1}</span>
                {item}
                <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-cyber-accent">
                  <ArrowRight size={20} />
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-auto text-cyber-gray text-sm font-sans">
            &copy; 2025 CODEIO SYSTEMS
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- 3. Hero Component ---
const Hero = () => (
  <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden pt-20">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center z-10 max-w-4xl flex flex-col items-center"
    >
      {/* --- NEW BMSCE PILL --- */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 px-5 py-2 mb-8 rounded-full border border-cyber-accent/20 bg-cyber-accent/5 shadow-[0_0_15px_rgba(129,140,248,0.1)] backdrop-blur-sm cursor-default"
      >
        <span className="font-tech text-cyber-accent tracking-widest text-xs md:text-sm font-semibold">
          BMSCE CHAPTER
        </span>
        <span className="relative flex h-2 w-2">
          {/* Pulsing Dot */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-accent"></span>
        </span>
      </motion.div>
      
      <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight mb-8">
        Less Code. <br />
        <span className="font-semibold text-cyber-accent drop-shadow-[0_0_25px_rgba(129,140,248,0.3)]">
          More Impact.
        </span>
      </h1>
      <p className="text-lg md:text-xl text-cyber-text/60 max-w-2xl mx-auto font-light leading-relaxed">
        We engineer digital simplicity. 
        Stripping away the noise to reveal the architecture beneath.
      </p>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-8 py-3 border border-cyber-gray rounded-full text-sm 
        text-cyber-text backdrop-blur-sm bg-cyber-black/40 
        hover:border-cyber-accent hover:text-white hover:bg-cyber-accent/10
        hover:shadow-[0_0_30px_rgba(129,140,248,0.3)] 
        transition-all duration-300 tracking-wide font-medium"
      >
        INITIALIZE PROJECT
      </motion.button>
    </motion.div>
  </section>
);

// --- 4. Recent Uploads Component ---
const RecentUploads = () => {
  const uploads = [
    { title: "Neural Interface V1", category: "AI Module", date: "2 Hours Ago" },
    { title: "Quantum Encryption", category: "Security", date: "1 Day Ago" },
    { title: "React Grid System", category: "Frontend", date: "3 Days Ago" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="flex items-center justify-between mb-12 border-b border-cyber-gray/30 pb-4">
        <h2 className="font-tech text-2xl tracking-wide">RECENT UPLOADS</h2>
        <span className="text-xs font-tech text-cyber-gray cursor-pointer hover:text-cyber-accent transition-colors glitch-hover">VIEW ARCHIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {uploads.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="group relative bg-cyber-dark/80 backdrop-blur-sm border border-cyber-gray/30 p-8 cursor-pointer hover:border-cyber-accent/50 transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyber-accent">
              <ArrowRight size={20} />
            </div>
            {/* Category tag uses accent color now */}
            <p className="text-xs text-cyber-accent font-tech mb-4 uppercase tracking-wider">{item.category}</p>
            <h3 className="text-xl font-medium mb-2 group-hover:text-cyber-accent transition-colors duration-300">{item.title}</h3>
            <p className="text-sm text-cyber-gray mt-8 font-mono">{item.date}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Main App Component ---
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text selection:bg-cyber-accent selection:text-black font-sans relative">
      <BioMesh />
      <div className="relative z-10">
        <Navbar onOpen={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main>
          <Hero />
          <RecentUploads />
          <div className="h-[50vh] flex items-center justify-center text-cyber-gray/30 font-tech text-sm">
            END OF SYSTEM
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;