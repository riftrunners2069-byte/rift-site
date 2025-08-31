import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// CRT-styled landing page in phosphor green with RIFT headline
// Fonts: Pixelify Sans (big), Jersey 10 (body)
// Additions: animated center RIFT, subtitle text, terminal typing, footer with links & squares

const PHOS_BRIGHT = "#1cfe98";     // bright green (highlight)
const PHOS_MID = "#20a185";        // mid green (main text)
const PHOS_DARK = "#084639";       // dark green (accents)
const BG = "#040a07";              // deeper green-black background for better contrast
// Legacy compatibility
const PHOS = PHOS_BRIGHT;
const rgbaPhos = (a) => `rgba(28, 254, 152, ${a})`;

export default function App() {
  const [audioOn, setAudioOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [terminalPhase, setTerminalPhase] = useState('type1');
  const [terrainPulse, setTerrainPulse] = useState(0); // For character-level animation
  const audioCtxRef = useRef(null);
  const humNodeRef = useRef(null);
  const humGainRef = useRef(null);
  const musicRef = useRef(null);

  // Tiny star twinkles
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 140; i++) {
      arr.push({ x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 1.2 + 0.2, o: Math.random() * 0.6 + 0.2 });
    }
    return arr;
  }, []);

  // Minimal CRT hum SFX (user-initiated)
  const enableHum = async () => {
    if (audioCtxRef.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 58;
    gain.gain.value = 0.02;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    audioCtxRef.current = ctx;
    humNodeRef.current = osc;
    humGainRef.current = gain;
    setAudioOn(true);
  };

  const toggleAudio = async () => {
    if (!audioCtxRef.current) { await enableHum(); return; }
    if (audioOn) {
      humGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.2);
      setTimeout(() => { audioCtxRef.current.suspend(); }, 220);
    } else {
      await audioCtxRef.current.resume();
      humGainRef.current.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime);
    }
    setAudioOn(v => !v);
  };

  // Music control
  const toggleMusic = () => {
    if (!musicRef.current) {
      // Initialize music
      const audio = new Audio('/rift01.mp3');
      audio.loop = true;
      audio.volume = 0.3; // Set to 30% volume
      musicRef.current = audio;
    }

    if (musicOn) {
      musicRef.current.pause();
    } else {
      musicRef.current.play().catch(err => {
        console.log('Music playback failed:', err);
      });
    }
    setMusicOn(!musicOn);
  };

  // One-shot blip SFX for UI cues
  const blip = () => {
    if (!audioCtxRef.current || !audioOn) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  };

  // Auto-start audio and music
  useEffect(() => {
    const initAudio = async () => {
      // Auto-enable CRT hum
      try {
        await enableHum();
      } catch (e) {
        console.log('Auto audio failed - user interaction required');
      }

      // Auto-start music
      try {
        const audio = new Audio('/rift01.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        musicRef.current = audio;
        await audio.play();
      } catch (e) {
        console.log('Auto music failed - user interaction required');
      }
    };

    initAudio();

    return () => {
      try { 
        humNodeRef.current?.stop?.(); 
        audioCtxRef.current?.close?.(); 
        if (musicRef.current) {
          musicRef.current.pause();
          musicRef.current.src = '';
        }
      } catch {}
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: BG, color: PHOS }}>
      {/* Top bar: Logo left, Socials right */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 md:px-6 pt-4 md:pt-6" style={{fontFamily:'var(--font-body)'}}>
        <Logo />
        
        {/* Center controls without frames */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 md:gap-4">
          <button onClick={toggleMusic} onMouseEnter={blip} className="text-sm md:text-lg opacity-80 hover:opacity-100 active:opacity-100 transition-opacity bg-transparent border-none cursor-pointer" style={{
            textShadow: glowShadow(), 
            color: musicOn ? PHOS_MID : PHOS_DARK,
            minHeight: '32px',
          }}>{musicOn ? 'MUSIC: ON' : 'MUSIC: OFF'}</button>
          <button onClick={toggleAudio} onMouseEnter={blip} className="text-sm md:text-lg opacity-80 hover:opacity-100 active:opacity-100 transition-opacity bg-transparent border-none cursor-pointer" style={{
            textShadow: glowShadow(), 
            color: audioOn ? PHOS_MID : PHOS_DARK,
            minHeight: '32px',
          }}>{audioOn ? 'SFX: ON' : 'SFX: OFF'}</button>
        </div>

        <nav className="flex items-center gap-2 md:gap-4 text-xl md:text-3xl tracking-widest">
          <a href="https://x.com/rift_runners" target="_blank" rel="noopener noreferrer" onMouseEnter={blip} className="opacity-90 hover:opacity-100 active:opacity-100 transition-opacity block md:block" style={{textShadow: glowShadow(), color: PHOS_BRIGHT, textDecoration: 'none', minHeight: '32px', display: 'flex', alignItems: 'center', padding: '4px 8px'}}>X</a>
          <button onMouseEnter={blip} className="opacity-50 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer hidden md:block" style={{textShadow: glowShadow(), color: PHOS_DARK}}>Discord</button>
          <button onMouseEnter={blip} className="opacity-50 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer hidden md:block" style={{textShadow: glowShadow(), color: PHOS_DARK}}>???</button>
        </nav>
      </header>

      {/* CRT glass curvature + vignette - minimal glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: `radial-gradient(120% 80% at 50% 40%, ${rgbaPhos(0.02)} 0%, rgba(0,0,0,0) 35%), radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)`,
        maskImage: 'radial-gradient(130% 100% at 50% 50%, black 60%, transparent 100%)', 
        mixBlendMode: 'screen',
      }} />

      {/* Subtle barrel distortion frame shadow */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(140% 100% at 50% 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ 
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 1px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.0) 3px)', 
        mixBlendMode: 'multiply' 
      }} />

      {/* Shadow mask dots - reduced for better contrast */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, ${PHOS} 0.6px, rgba(0,0,0,0) 0.8px)`, 
        backgroundSize: '3px 3px', 
        filter: 'contrast(120%)', 
        mixBlendMode: 'screen' 
      }} />

      {/* Glow overlay - minimal intensity */}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 160px 40px ${rgbaPhos(0.03)}` }} />

      {/* Content */}
      <main className="relative mx-auto flex h-[85vh] max-w-[1200px] flex-col items-center justify-center px-3 sm:px-4 md:px-6" style={{ paddingTop: '5vh' }}>
        <SubtitleRow />
        <RiftTitle />
        {/* Terrain above terminal */}
        <div className="mx-auto w-[92%] sm:w-[88%] md:w-[75%] mb-4">
          <svg className="w-full block" viewBox="0 0 1100 80" style={{
            filter: `drop-shadow(0 0 8px ${rgbaPhos(0.4)}) drop-shadow(0 0 16px ${rgbaPhos(0.2)})`,
            transform: terminalPhase === 'type1' || terminalPhase === 'type2' || terminalPhase === 'type3' 
              ? `scaleY(${1.02 + Math.sin(terrainPulse) * 0.015}) translateY(${-1 + Math.cos(terrainPulse) * 0.5}px)` 
              : terminalPhase === 'erase' 
                ? `scaleY(${0.98 + Math.sin(terrainPulse) * 0.01}) translateY(${1 + Math.cos(terrainPulse) * 0.3}px)` 
                : 'scaleY(1)',
            transition: 'transform 0.1s ease-out'
          }}>
            <g fill={PHOS_MID} opacity={
              terminalPhase === 'type1' || terminalPhase === 'type2' || terminalPhase === 'type3' 
                ? 0.9 + Math.sin(terrainPulse) * 0.1
                : terminalPhase === 'erase' 
                  ? 0.65 + Math.sin(terrainPulse) * 0.05
                  : 0.85
            } style={{
              transition: 'opacity 0.1s ease-out'
            }}>
              {terrain()}
            </g>
          </svg>
        </div>

        <Terminal onPhaseChange={setTerminalPhase} onCharacterChange={setTerrainPulse} />

        {/* Floating stars - above terminal only */}
        <div className="pointer-events-none absolute z-30" style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '75%', 
          height: '200px' 
        }}>
          {stars.map((s, i) => (
            <div key={i} className="absolute rounded-sm" style={{ 
              left: s.x + '%', 
              top: s.y + '%', 
              width: s.s, 
              height: s.s, 
              background: PHOS_BRIGHT, 
              opacity: s.o, 
              filter: 'blur(0.2px)' 
            }} />
          ))}
        </div>

        {/* RIFT Runner GIF - within hero section */}
        <div className="flex justify-center mt-8">
          <img 
            src="/riftrunner01.gif" 
            alt="RIFT Runner" 
            className="h-19 md:h-24 w-auto opacity-90 pixelated"
            style={{
              filter: `drop-shadow(0 0 12px ${rgbaPhos(0.8)}) drop-shadow(0 0 24px ${rgbaPhos(0.4)})`
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto mt-4 md:mt-6 w-full max-w-[1200px] px-4 md:px-6 pb-4 md:pb-6" style={{fontFamily:'var(--font-body)'}}>
        <div className="flex items-center justify-center gap-4">
          <div className="text-lg md:text-2xl opacity-90" style={{textShadow: glowShadow(), color: PHOS_MID}}>
            <span className="hidden md:inline">ALPHA: Abstract Trenches Spaces live on X Mon - Fri at 3pm EST</span>
            <span className="md:hidden">ALPHA: Trenches live on X 3pm EST</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://x.com/geist254" target="_blank" rel="noreferrer" title="@geist254" className="block h-4 w-4 md:h-5 md:w-5 transition-all hover:scale-110" style={{background:'#ffffff', boxShadow: `0 0 8px rgba(255,255,255,0.6)`}} />
            <a href="https://x.com/kairo8080" target="_blank" rel="noreferrer" title="@kairo8080" className="block h-4 w-4 md:h-5 md:w-5 transition-all hover:scale-110" style={{background:PHOS_BRIGHT, boxShadow: `0 0 10px ${rgbaPhos(0.8)}`}} />
          </div>
        </div>
      </footer>

      {/* Glass glare sweep */}
      <div className="pointer-events-none absolute inset-0" style={{ 
        background: 'linear-gradient(105deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 8%, rgba(255,255,255,0.0) 14%)', 
        mixBlendMode: 'overlay' 
      }} />
    </div>
  );
}

function glowShadow() { 
  return `0 0 6px ${rgbaPhos(0.7)}, 0 0 18px ${rgbaPhos(0.4)}, 0 0 32px ${rgbaPhos(0.25)}`; 
}

// --- Top-left logo ---
function Logo() {
  return (
    <div className="flex items-center gap-2 select-none" style={{filter: 'contrast(115%)', fontFamily:'var(--font-big)'}}>
      <svg width="96" height="42" viewBox="0 0 128 56" className="rift-anim">
        <defs>
          <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={PHOS_BRIGHT} />
            <stop offset="60%" stopColor={PHOS_MID} />
            <stop offset="100%" stopColor={PHOS_DARK} />
          </linearGradient>
          <pattern id="p" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="6" height="6" fill={PHOS_MID} />
            <circle cx="2" cy="2" r="1.2" fill={BG} />
            <circle cx="4" cy="4" r="1.2" fill={BG} />
          </pattern>
          <filter id="glo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g filter="url(#glo)"><text x="4" y="40" fontSize="38" fontWeight="900" letterSpacing="4" fill="url(#lg)">RIFT</text></g>
        <g opacity="0.9" style={{mixBlendMode:'multiply'}}><text x="4" y="40" fontSize="38" fontWeight="900" letterSpacing="4" fill="url(#p)">RIFT</text></g>
        <rect x="68" y="10" width="2" height="28" fill={PHOS_DARK} opacity="0.9" />
      </svg>
    </div>
  );
}

// --- Centerpiece Title ---
function RiftTitle() {
  return (
    <div className="relative w-full" style={{fontFamily:'var(--font-big)'}}>
      <svg viewBox="0 0 1200 280" className="w-full rift-anim rift-glitch">
        <defs>
          <pattern id="dot" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="8" height="8" fill={PHOS_MID} />
            <circle cx="2" cy="2" r="1.6" fill={BG} />
            <circle cx="6" cy="2" r="1.6" fill={BG} />
            <circle cx="2" cy="6" r="1.6" fill={BG} />
            <circle cx="6" cy="6" r="1.6" fill={BG} />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="bevel" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={PHOS_BRIGHT} stopOpacity="0.95" />
            <stop offset="55%" stopColor={PHOS_MID} stopOpacity="0.95" />
            <stop offset="100%" stopColor={PHOS_DARK} stopOpacity="0.98" />
          </linearGradient>
        </defs>

        <g filter="url(#glow)">
          <text x="50%" y="65%" textAnchor="middle" fontSize="220" fontWeight="900" letterSpacing="14" fill="url(#bevel)">RIFT</text>
        </g>
        <g style={{mixBlendMode: 'multiply', opacity: 0.88}}>
          <text x="50%" y="65%" textAnchor="middle" fontSize="220" fontWeight="900" letterSpacing="14" fill="url(#dot)">RIFT</text>
        </g>
        <g style={{mixBlendMode: 'screen', opacity: 0.75}}>
          <text x="50%" y="59%" textAnchor="middle" fontSize="220" fontWeight="900" letterSpacing="14" fill={PHOS_BRIGHT}>RIFT</text>
        </g>

        {/* tiny invaders + blobs - COMMENTED OUT */}
        {/* <g fill={PHOS} opacity="0.85">{invader({x: 1020, y: 170, scale: 0.65})}{invader({x: 150, y: 200, scale: 0.5})}</g> */}
        {/* {pixelBlob(80, 160, 36)} */}
        {/* {pixelBlob(1120, 220, 40)} */}
      </svg>
    </div>
  );
}

function SubtitleRow() {
  return (
    <div className="relative mt-1 w-full text-center" style={{fontFamily:'var(--font-body)'}}>
      <div className="inline-block rounded px-4 py-2 text-sm tracking-[0.6em] opacity-90" style={{ 
        color: PHOS_DARK, 
        textShadow: glowShadow(), 
        filter: 'contrast(110%)' 
      }}>
        RIFT RUNNERS NFT COLLECTION
      </div>
    </div>
  );
}

// --- Terminal typing area ---
function Terminal({ onPhaseChange, onCharacterChange }) {
  const lines = useMemo(() => [
    'Stability level at 69%...',
    'Trenches status report - high activity',
    'Initiating Network Protocol: Abstract',
  ], []);
  const [display, setDisplay] = useState(['','','']);
  const [phase, setPhase] = useState('type1'); // type1 -> type2 -> type3 -> hold -> erase -> repeat
  const idxRef = useRef(0);
  const pulseRef = useRef(0);

  // Notify parent of phase changes for terrain animation sync
  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange(phase);
    }
  }, [phase, onPhaseChange]);

  // Trigger terrain pulse on every character change
  const triggerTerrainPulse = useCallback(() => {
    if (onCharacterChange) {
      pulseRef.current += Math.PI / 3; // Increment for wave effect
      onCharacterChange(pulseRef.current);
    }
  }, [onCharacterChange]);

  // Minimal runtime tests to ensure newline joining/splitting works
  useEffect(() => {
    const t = ['A','B'];
    const joined = t.join('\n');
    console.assert(joined === 'A\nB', 'TEST FAIL: join("\\n")');
    const parts = joined.split('\n');
    console.assert(parts[0] === 'A' && parts[1] === 'B', 'TEST FAIL: split("\\n")');
  }, []);

  useEffect(() => {
    let t;
    const speed = 60; // ms per char - slower typing speed
    if (phase === 'type1') {
      const i = idxRef.current;
      if (i < lines[0].length) {
        t = setTimeout(() => { 
          idxRef.current++; 
          setDisplay([lines[0].slice(0, idxRef.current), '', '']);
          triggerTerrainPulse();
        }, speed);
      } else { 
        idxRef.current = 0; 
        setPhase('type2'); 
      }
    } else if (phase === 'type2') {
      const i = idxRef.current;
      if (i < lines[1].length) {
        t = setTimeout(() => { 
          idxRef.current++; 
          setDisplay([lines[0], lines[1].slice(0, idxRef.current), '']);
          triggerTerrainPulse();
        }, speed);
      } else { 
        idxRef.current = 0; 
        setPhase('type3'); 
      }
    } else if (phase === 'type3') {
      const i = idxRef.current;
      if (i < lines[2].length) {
        t = setTimeout(() => { 
          idxRef.current++; 
          setDisplay([lines[0], lines[1], lines[2].slice(0, idxRef.current)]);
          triggerTerrainPulse();
        }, speed);
      } else { 
        setTimeout(() => setPhase('hold'), 1200); 
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => { 
        setPhase('erase'); 
        idxRef.current = lines.join('\n').length; 
      }, 600);
    } else if (phase === 'erase') {
      const total = lines.join('\n');
      const i = idxRef.current;
      if (i > 0) {
        t = setTimeout(() => { 
          idxRef.current--; 
          const flat = total.slice(0, idxRef.current); 
          const parts = flat.split('\n'); 
          setDisplay([parts[0] || '', parts[1] || '', parts[2] || '']);
          triggerTerrainPulse();
        }, 20);
      } else { 
        setPhase('type1'); 
      }
    }
    return () => clearTimeout(t);
  }, [phase, display, lines, triggerTerrainPulse]);

  return (
    <div className="relative mt-6 w-full text-center select-none" style={{fontFamily:'var(--font-body)'}}>
      <div className="mx-auto w-[92%] sm:w-[88%] md:w-[75%] rounded-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[16px] sm:text-[20px] md:text-[28px] leading-tight" style={{
        color: '#f0f8ff', 
        textShadow: `0 0 8px ${rgbaPhos(0.8)}, 0 0 22px ${rgbaPhos(0.45)}`,
        background: 'rgba(0,0,0,0.35)', 
        border: `1px solid ${PHOS_DARK}`,
        boxShadow: `0 0 24px ${rgbaPhos(0.15)} inset, 0 0 24px ${rgbaPhos(0.2)}`,
      }}>
        <div style={{ minHeight: '1.2em' }}>{display[0] || '\u00A0'}{phase === 'type1' && <span className="cursor">█</span>}</div>
        <div style={{ minHeight: '1.2em' }}>{display[1] || '\u00A0'}{phase === 'type2' && <span className="cursor">█</span>}</div>
        <div style={{ minHeight: '1.2em' }}>{display[2] || '\u00A0'}{(phase === 'type3' || phase === 'hold' || phase === 'erase') && <span className="cursor">█</span>}</div>
      </div>




    </div>
  );
}

// --- Helpers ---
// COMMENTED OUT - not currently used
/* 
function invader({x, y, scale = 1}) {
  const size = 20 * scale;
  const px = (dx, dy, w = 1, h = 1) => (
    <rect key={`${dx}-${dy}`} x={x + dx * size} y={y + dy * size} width={w * size} height={h * size} />
  );
  return (
    <g>
      {px(0,2)}{px(1,1)}{px(1,3)}{px(2,0)}{px(2,2)}{px(2,4)}
      {px(3,0)}{px(3,1)}{px(3,2)}{px(3,3)}{px(3,4)}
      {px(4,1)}{px(4,3)}{px(5,0)}{px(5,2)}{px(5,4)}
      {px(6,1)}{px(6,3)}{px(7,2)}
    </g>
  );
}

function pixelBlob(cx, cy, r) {
  const dots = [];
  for (let a = 0; a < 360; a += 8) {
    const rad = (a * Math.PI) / 180; 
    const rr = r + (Math.sin(rad * 3) * r) / 6;
    const x = cx + Math.cos(rad) * rr; 
    const y = cy + Math.sin(rad) * rr;
    dots.push(<circle key={a + "d"} cx={x} cy={y} r={2} fill={PHOS} opacity="0.9" />);
  }
  return <g opacity="0.7">{dots}</g>;
}
*/

function terrain() {
  const rects = []; 
  let x = 0; 
  const w = 1100;
  while (x < w) { 
    const h = Math.floor(Math.random() * 16) + 2; 
    rects.push(
      <rect key={x} x={x} y={80 - h} width={Math.random() * 20 + 6} height={h} />
    ); 
    x += Math.random() * 18 + 8; 
  }
  return rects;
}
