export default function App() {
  return (
    // THE GRADIENT WRAPPER
    // 1. Starts Obsidian (#0b0c10)
    // 2. Holds Obsidian until 90vh (Just a peek of color at the bottom)
    // 3. Fades to Pale Violet (#B8B8FF) by 170vh
    <div 
      className="w-full min-h-[400vh] bg-[linear-gradient(to_bottom,#0b0c10_0%,#0b0c10_90vh,#B8B8FF_170vh)] text-white"
    >
      
      {/* HERO SECTION - STICKY */}
      {/* This stays fixed on screen while the background changes behind it */}
      <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center">
        
        {/* Main Title */}
        <div className="text-center z-10 mix-blend-difference">
          <h1 className="text-6xl font-mono font-bold tracking-tighter mb-4">
            OBSIDIAN
          </h1>
          <p className="text-sm font-mono opacity-50 tracking-[0.2em] uppercase">
            Scroll to initialize fade
          </p>
        </div>

        {/* Optional: Subtle down arrow to guide the user */}
        <div className="absolute bottom-12 animate-bounce opacity-30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

      </div>

      {/* TRANSITION ZONE */}
      {/* This empty space creates the scroll distance needed to perform the fade */}
      <div className="h-[70vh] pointer-events-none"></div>

      {/* LANDING SECTION */}
      {/* Note: Text color changes to black here for contrast against the pale violet */}
      <div className="h-screen flex items-center justify-center relative z-20">
        <div className="text-center">
          <h1 className="text-5xl font-mono font-bold text-[#0b0c10] mb-2">
            PALE LANDING
          </h1>
          <p className="font-mono text-[#0b0c10]/60">
            The transition is complete.
          </p>
        </div>
      </div>

    </div>
  );
}