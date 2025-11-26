import LetterGlitch from './LetterGlitch';

const COLORS = {
  obsidian: '#0b0c10',       // Deep Black
  charcoalMist: '#1a1b26',   // Ease In: Very subtle dark grey-blue
  slatePurple: '#565676',    // Middle: Desaturated Steel Purple
  ultraPale: '#E2E2FF',      // Landing: Whitish Lavender
};

export default function App() {
  return (
    <div 
      className="w-full min-h-[400vh] text-white relative"
      style={{
        // THE SHIFTED GRADIENT STACK (Moved up another 10vh)
        // 0% - 70vh:   Hold Obsidian (Starts fading while hero is still largely visible)
        // 95vh:        Ease into Charcoal Mist
        // 115vh:       Hit the Slate Purple
        // 160vh:       Land on Ultra Pale
        background: `linear-gradient(
          to bottom, 
          ${COLORS.obsidian} 0%, 
          ${COLORS.obsidian} 70vh, 
          ${COLORS.charcoalMist} 95vh, 
          ${COLORS.slatePurple} 115vh, 
          ${COLORS.ultraPale} 160vh
        )`
      }}
    >
      
      {/* --- LAYER 1: TALL GLITCH TEXTURE --- */}
      {/* Adjusted height to 160vh to match the new gradient end point */}
      <div className="absolute top-0 left-0 w-full h-[160vh] z-0 opacity-20 mix-blend-lighten pointer-events-none">
          <LetterGlitch
            glitchSpeed={120} 
            smooth={true}
            glitchColors={[COLORS.ultraPale]} 
          />
          
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-transparent"></div>
      </div>

      {/* HERO SECTION - STICKY & EMPTY */}
      <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center overflow-hidden z-20 pointer-events-none">
        
        {/* Scroll Arrow */}
        <div className="absolute bottom-12 animate-bounce opacity-30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

      </div>

      {/* TRANSITION ZONE */}
      <div className="h-[70vh] pointer-events-none"></div>

      {/* LANDING SECTION */}
      <div className="h-screen flex items-center justify-center relative z-20">
         {/* Clean Slate */}
      </div>

    </div>
  );
}