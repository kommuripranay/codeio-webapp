import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Code2 } from 'lucide-react';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Components ---

  // 1. Navbar: Transparent with backdrop blur
  // The 'backdrop-blur-md' applies the blur to content behind it
  const Navbar = () => (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center backdrop-blur-md bg-cyber-black/30">
      {/* Logo Area */}
      <div className="flex items-center gap-2 select-none cursor-pointer">
        <Code2 size={24} className="text-cyber-accent" />
        <span className="font-tech text-xl tracking-widest text-cyber-accent font-bold">
          CODE<span className="opacity-50">IO</span>
        </span>
      </div>

      {/* Menu Trigger */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 rounded-full hover:bg-cyber-accent/10 transition-colors duration-300 active:scale-95"
      >
        <Menu size={28} strokeWidth={1.5} />
      </button>
    </nav>
  );

  // 2. Sidebar: Full screen overlay with slide animation
  const Sidebar = () => (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop (Dark overlay) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          
          {/* Sidebar Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-cyber-dark z-[70] border-l border-cyber-gray p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-500"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 font-tech text-3xl">
              {['About', 'Projects', 'Contact', 'Careers'].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="group flex items-center gap-4 hover:text-cyber-accent transition-colors cursor-pointer"
                >
                  <span className="text-sm text-cyber-gray font-sans opacity-50">0{i+1}</span>
                  {item}
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
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

  // 3. Hero Section
  const Hero = () => (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden pt-20">
      {/* Background Decor: A subtle blurred orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl"
      >
        <p className="font-tech text-cyber-accent/60 text-sm mb-6 tracking-[0.3em] uppercase">
          System Online
        </p>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight mb-8">
          Less Code. <br />
          <span className="font-semibold text-cyber-accent">More Impact.</span>
        </h1>
        <p className="text-lg md:text-xl text-cyber-text/60 max-w-2xl mx-auto font-light leading-relaxed">
          We engineer digital simplicity. 
          Stripping away the noise to reveal the architecture beneath.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-8 py-3 border border-cyber-gray rounded-full text-sm hover:bg-cyber-accent hover:text-black transition-all duration-300 tracking-wide font-medium"
        >
          INITIALIZE PROJECT
        </motion.button>
      </motion.div>
    </section>
  );

  // 4. Recent Uploads Section
  const RecentUploads = () => {
    const uploads = [
      { title: "Neural Interface V1", category: "AI Module", date: "2 Hours Ago" },
      { title: "Quantum Encryption", category: "Security", date: "1 Day Ago" },
      { title: "React Grid System", category: "Frontend", date: "3 Days Ago" },
    ];

    return (
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-cyber-gray/30 pb-4">
          <h2 className="font-tech text-2xl tracking-wide">RECENT UPLOADS</h2>
          <span className="text-xs font-tech text-cyber-gray cursor-pointer hover:text-cyber-accent transition-colors">VIEW ARCHIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {uploads.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="group relative bg-cyber-dark border border-cyber-gray/30 p-8 cursor-pointer hover:border-cyber-accent/50 transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} />
              </div>
              <p className="text-xs text-cyber-accent/50 font-tech mb-4 uppercase">{item.category}</p>
              <h3 className="text-xl font-medium mb-2 group-hover:text-cyber-accent transition-colors">{item.title}</h3>
              <p className="text-sm text-cyber-gray mt-8 font-mono">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text selection:bg-cyber-accent selection:text-black font-sans">
      <Navbar />
      <Sidebar />
      <main>
        <Hero />
        <RecentUploads />
      </main>
    </div>
  );
};

export default App;