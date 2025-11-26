export default function App() {
  return (
    // Gradient Update:
    // End color changed to Pale Lavender (#B8B8FF)
    <div 
      className="w-full min-h-[400vh] bg-[linear-gradient(to_bottom,#0b0c10_0%,#0b0c10_90vh,#B8B8FF_170vh)] text-white"
    >
      
      {/* HERO SECTION */}
      <div className="h-screen w-full flex items-center justify-center sticky top-0">
        <div className="text-center z-10">
          <h1 className="text-4xl font-mono font-bold tracking-tighter opacity-20">
            OBSIDIAN_HERO
          </h1>
          <p className="mt-4 text-xs opacity-40 font-mono">
            (Transitioning to Pale Violet)
          </p>
        </div>
      </div>

      {/* TRANSITION ZONE */}
      <div className="h-[70vh] flex items-center justify-center pointer-events-none">
        {/* Shorter scroll space */}
      </div>

      {/* LANDING SECTION */}
      {/* Changed text color to black for better contrast against the pale background */}
      <div className="h-screen flex items-center justify-center relative z-20">
        <h1 className="text-5xl font-mono font-bold text-[#0b0c10] drop-shadow-xl">
          PALE LANDING
        </h1>
      </div>

    </div>
  );
}