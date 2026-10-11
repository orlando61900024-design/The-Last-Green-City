import React, { useEffect } from 'react';
import { Skull, AlertOctagon, RotateCcw, Flame, ShieldAlert, Wind, CloudFog } from 'lucide-react';
import { sound } from '../services/sound';

interface GameOverModalProps {
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ onRestart }) => {
  useEffect(() => {
    sound.playWarning();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto select-none font-['Fredoka']">
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#1a0505] via-[#240808] to-[#0d0202] border-4 border-rose-600/80 rounded-3xl shadow-[0_0_100px_rgba(225,29,72,0.6)] overflow-hidden my-auto flex flex-col items-center text-center p-6 sm:p-10 animate-fade-in">
        {/* Ash / Toxic Ember Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: '10%', left: '20%', size: 'w-2 h-2', dur: '4s' },
            { top: '35%', left: '75%', size: 'w-3 h-3', dur: '5s' },
            { top: '60%', left: '15%', size: 'w-2 h-2', dur: '6s' },
            { top: '80%', left: '80%', size: 'w-2.5 h-2.5', dur: '3.5s' },
            { top: '25%', left: '45%', size: 'w-1.5 h-1.5', dur: '4.5s' },
          ].map((ash, idx) => (
            <div
              key={idx}
              className={`absolute ${ash.size} bg-rose-500/70 rounded-full animate-ping`}
              style={{ top: ash.top, left: ash.left, animationDuration: ash.dur }}
            />
          ))}
          {/* Apocalyptic Red Fog Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-900/25 blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* Warning Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 bg-rose-950/90 border-2 border-rose-600 text-rose-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 shadow-lg animate-pulse">
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <span>Sanctuary Protocol Failed · 0% All Bars</span>
        </div>

        {/* Big Ruin Title */}
        <h1 className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-red-500 tracking-wider drop-shadow-[0_8px_30px_rgba(225,29,72,0.8)] leading-tight mb-2">
          EARTH IN RUINS
        </h1>
        <p className="relative z-10 text-lg sm:text-xl text-rose-200/90 font-medium mb-5">
          All city metrics reached zero. Toxic smog engulfed the last sanctuary.
        </p>

        {/* SCORCHED / RUINED EARTH VISUAL IN SPACE */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full shadow-[0_0_80px_rgba(244,63,94,0.6),inset_0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center border-4 border-rose-600/50 bg-gradient-to-tr from-[#1a0808] via-[#381010] to-[#591414] overflow-hidden">
            {/* Toxic yellow/sulfur cloud belts */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent rotate-12" />
            
            {/* Cracked scorched continents */}
            <div className="absolute inset-0 flex flex-col justify-around opacity-75">
              <div className="w-48 h-14 bg-stone-900/90 rounded-full blur-[2px] border border-amber-900/50 -rotate-12 translate-x-4 flex items-center justify-center text-xs text-amber-500/80 font-mono">
                [WASTELAND CRUST]
              </div>
              <div className="w-56 h-20 bg-stone-950/95 rounded-full blur-[1px] border border-rose-900/60 rotate-6 -translate-x-3 flex items-center justify-center text-xs text-rose-500/80 font-mono">
                [POISONED SEAS]
              </div>
              <div className="w-40 h-14 bg-stone-900/90 rounded-full blur-[2px] border border-amber-900/50 -rotate-6 translate-x-8 flex items-center justify-center text-xs text-amber-600/80 font-mono">
                [DESERTIFIED BIOMES]
              </div>
            </div>

            {/* Red Fissures glowing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(244,63,94,0.4)_90%)]" />

            {/* Toxic Smog Atmosphere Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-amber-950/40 to-transparent mix-blend-color-burn" />

            {/* Center Skull Emblem */}
            <div className="relative z-20 flex flex-col items-center">
              <Skull className="w-16 h-16 text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.9)] animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest text-rose-300 font-bold mt-1">EXTINCTION</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE RUINS TEXT */}
        <div className="relative z-10 max-w-xl mx-auto my-4 bg-slate-950/80 border border-rose-900/70 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-slate-300 font-['Plus_Jakarta_Sans'] leading-relaxed shadow-inner">
          <p className="mb-2.5">
            <strong className="text-rose-400">Chronicle of Verdia's Fall:</strong> Without adequate resource stability, clean water, or ecological balance, the environmental pressure breached the city domes. The bio-filters failed, acidic microplastic clouds smothered the gardens, and the sanctuary fell into dead stillness.
          </p>
          <p className="text-slate-400 text-xs">
            "We thought there was still time to act. But the balance tipped, and the green world became a memory of stone and dust."
          </p>
        </div>

        {/* RESTART BUTTON */}
        <div className="relative z-10 mt-3 flex items-center gap-3 w-full max-w-md justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg transition-all cursor-pointer shadow-[0_0_35px_rgba(244,63,94,0.7)] flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>Restart Sanctuary Protocol (Try Again)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
