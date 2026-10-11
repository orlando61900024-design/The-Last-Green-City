import React, { useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, ArrowRight, Heart, Globe, Star, ShieldCheck, Sun, CheckCircle2, Award } from 'lucide-react';
import { CharacterPip } from './CharacterPip';
import { sound } from '../services/sound';

interface VictoryEndingModalProps {
  onPlayAgain: () => void;
  onClose: () => void;
}

export const VictoryEndingModal: React.FC<VictoryEndingModalProps> = ({
  onPlayAgain,
  onClose,
}) => {
  useEffect(() => {
    sound.playSuccess();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto select-none font-['Fredoka']">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0b1728] via-[#091f38] to-[#041224] border-4 border-emerald-400/80 rounded-3xl shadow-[0_0_100px_rgba(52,211,153,0.6)] overflow-hidden my-auto flex flex-col items-center text-center p-5 sm:p-10">
        {/* Floating Space Stars & Celebration Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: '10%', left: '12%', size: 'w-2 h-2', dur: '2s' },
            { top: '22%', left: '84%', size: 'w-2.5 h-2.5', dur: '3s' },
            { top: '65%', left: '8%', size: 'w-1.5 h-1.5', dur: '2.5s' },
            { top: '78%', left: '88%', size: 'w-2 h-2', dur: '4s' },
            { top: '14%', left: '72%', size: 'w-3 h-3', dur: '3.5s' },
            { top: '88%', left: '28%', size: 'w-2 h-2', dur: '2.8s' },
            { top: '45%', left: '92%', size: 'w-2 h-2', dur: '3.2s' },
          ].map((s, i) => (
            <div
              key={i}
              className={`absolute ${s.size} bg-amber-200 rounded-full animate-ping`}
              style={{ top: s.top, left: s.left, animationDuration: s.dur }}
            />
          ))}
          {/* Soft emerald radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none" />
        </div>

        {/* GIANT "YOU WIN" BANNER */}
        <div className="relative z-10 mb-3 animate-bounce-subtle">
          <div className="inline-flex items-center gap-2 bg-emerald-950/90 border-2 border-emerald-400 text-emerald-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 shadow-lg">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>All 17 UN Sustainable Development Goals Completed</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-teal-200 tracking-wider drop-shadow-[0_8px_30px_rgba(52,211,153,0.8)] leading-none mb-2">
            YOU WIN!
          </h1>
          <p className="text-xl sm:text-2xl text-emerald-200 font-semibold drop-shadow">
            The Earth is Healthy, Restored, and Green Again!
          </p>
        </div>

        {/* PANNED OUT HEALTHY EARTH IN SPACE */}
        <div className="relative z-10 my-3 flex items-center justify-center">
          {/* Outer Atmosphere Glow */}
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full shadow-[0_0_80px_rgba(56,189,248,0.6),inset_0_0_50px_rgba(16,185,129,0.5)] flex items-center justify-center border-4 border-cyan-300/40 bg-gradient-to-tr from-[#024059] via-[#05668D] to-[#028090] overflow-hidden">
            {/* Healthy Green Continents SVG Illustration */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full object-cover animate-spin"
              style={{ animationDuration: '60s' }}
            >
              {/* Vibrant Emerald Continents */}
              <path
                d="M30 70 C40 50, 70 40, 85 60 C95 70, 80 95, 60 110 C45 105, 30 90, 30 70 Z"
                fill="#48BB78"
                stroke="#2F855A"
                strokeWidth="2"
              />
              <path
                d="M100 40 C120 30, 150 45, 160 70 C165 90, 140 100, 125 90 C110 85, 95 60, 100 40 Z"
                fill="#38A169"
                stroke="#22543D"
                strokeWidth="2"
              />
              <path
                d="M80 120 C100 110, 130 130, 120 160 C105 175, 80 165, 75 145 C70 135, 75 125, 80 120 Z"
                fill="#48BB78"
                stroke="#276749"
                strokeWidth="2"
              />
              {/* Swirling clean white clouds */}
              <path
                d="M20 50 Q60 30 110 50 Q160 70 180 50"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M40 130 Q90 150 140 130 Q170 110 190 130"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Tiny glowing eco-cities */}
              <circle cx="65" cy="80" r="3" fill="#FDE68A" />
              <circle cx="120" cy="65" r="3" fill="#FDE68A" />
              <circle cx="100" cy="140" r="3" fill="#FDE68A" />
            </svg>

            {/* Glowing Atmosphere Ring */}
            <div className="absolute inset-0 rounded-full border-8 border-cyan-400/20 pointer-events-none" />
          </div>

          {/* Pip Cheering Beside the Planet! */}
          <div className="absolute -bottom-4 -right-1 sm:-right-6 z-20 animate-bounce-subtle">
            <CharacterPip mood="cheering" size="md" showBackpack={true} />
            <div className="bg-slate-900/95 border border-emerald-400 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full shadow-lg mt-1 whitespace-nowrap">
              "Verdia saved the world!"
            </div>
          </div>
        </div>

        {/* PERMANENT GATE UNSEAL BANNER */}
        <div className="relative z-10 w-full max-w-2xl bg-amber-950/60 border-2 border-amber-500/70 rounded-2xl p-3 my-2 text-xs sm:text-sm text-amber-200 font-['Plus_Jakarta_Sans'] flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong>Verdia Blast Doors Permanently Unsealed:</strong> The toxic smog has cleared from the face of the Earth. Citizens, birds, and animals can venture across continents freely without sealed airlocks!
          </span>
        </div>

        {/* CHRONICLE OF EARTH REBORN STORY TEXT */}
        <div className="relative z-10 max-w-2xl mx-auto my-2 bg-slate-950/80 border border-emerald-700/60 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-slate-200 font-['Plus_Jakarta_Sans'] leading-relaxed shadow-inner">
          <p className="mb-2">
            <strong className="text-emerald-400">Chronicle of Earth Reborn:</strong> Starting from Verdia, the last green sanctuary, you deployed clean technologies, equitable communities, circular recycling loops, and ecological reforestation across all 17 United Nations Sustainable Development Goals.
          </p>
          <p className="text-slate-300 text-xs leading-relaxed">
            The plastic gyres in Coral Bay are gone. The ancient mountain forests hold soil fast against rain, and renewable energy rings illuminate every neighborhood equally. Earth has entered the permanent <strong>Age of Regeneration</strong>.
          </p>
        </div>

        {/* 100% HEALTH METRICS STATS */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xl my-3">
          <div className="bg-slate-950/80 p-3 rounded-2xl border-2 border-cyan-400/60 shadow">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">100%</div>
            <div className="text-xs text-slate-200 font-bold mt-0.5">Resource Stability</div>
            <div className="text-[10px] text-cyan-400">Clean Water &amp; Energy</div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border-2 border-emerald-400/60 shadow">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">100%</div>
            <div className="text-xs text-slate-200 font-bold mt-0.5">Ecological Health</div>
            <div className="text-[10px] text-emerald-400">Forests &amp; Oceans Alive</div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border-2 border-amber-400/60 shadow">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">100%</div>
            <div className="text-xs text-slate-200 font-bold mt-0.5">Community Well-Being</div>
            <div className="text-[10px] text-amber-400">Equality &amp; Peace For All</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mt-3">
          <button
            onClick={() => {
              sound.playSuccess();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base transition-all cursor-pointer shadow-lg shadow-emerald-500/40 flex items-center justify-center gap-2"
          >
            <span>Explore Restored Verdia</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again from Start</span>
          </button>
        </div>
      </div>
    </div>
  );
};
