import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, Waves, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';

interface OceanCleanupMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface MarineTarget {
  id: number;
  name: string;
  emoji: string;
  isTrash: boolean;
  cleared: boolean;
}

const INITIAL_TARGETS: MarineTarget[] = [
  { id: 1, name: 'Plastic Soda Bottle', emoji: '🍾', isTrash: true, cleared: false },
  { id: 2, name: 'Trapped Sea Turtle', emoji: '🐢', isTrash: false, cleared: false },
  { id: 3, name: 'Ghost Fishing Net', emoji: '🕸️', isTrash: true, cleared: false },
  { id: 4, name: 'Baby Clownfish', emoji: '🐠', isTrash: false, cleared: false },
  { id: 5, name: 'Toxic Oil Canister', emoji: '🛢️', isTrash: true, cleared: false },
  { id: 6, name: 'Microplastic Bag', emoji: '🛍️', isTrash: true, cleared: false },
  { id: 7, name: 'Living Coral Colony', emoji: '🪸', isTrash: false, cleared: false },
  { id: 8, name: 'Styrofoam Takeout Box', emoji: '📦', isTrash: true, cleared: false },
];

export const OceanCleanupMiniGame: React.FC<OceanCleanupMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const [targets, setTargets] = useState<MarineTarget[]>(INITIAL_TARGETS);
  const [score, setScore] = useState<number>(0);
  const [rescuedTurtles, setRescuedTurtles] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const trashRemaining = targets.filter((t) => t.isTrash && !t.cleared).length;
  const isFinished = trashRemaining === 0;

  const handleClickTarget = (target: MarineTarget) => {
    if (target.cleared) return;

    if (target.isTrash) {
      sound.playSuccess();
      setScore((prev) => prev + 20);
      setFeedback(`🌊 Collected ${target.name}! Coral reef cleaned.`);
      setTargets((prev) =>
        prev.map((t) => (t.id === target.id ? { ...t, cleared: true } : t))
      );
    } else {
      // Friendly creature or coral
      sound.playClick();
      setScore((prev) => prev + 15);
      if (target.name.includes('Turtle')) {
        setRescuedTurtles((prev) => prev + 1);
        setFeedback(`🐢 Safely untangled the Sea Turtle! It swims happily!`);
      } else {
        setFeedback(`🪸 Gentle care! ${target.name} is flourishing in clean waters.`);
      }
      setTargets((prev) =>
        prev.map((t) => (t.id === target.id ? { ...t, cleared: true } : t))
      );
    }

    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete(Math.max(50, score + 40));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md font-['Plus_Jakarta_Sans'] select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-cyan-900/60 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⛵</span>
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                Coral Bay Solar Skimmer
              </h3>
              <p className="text-xs text-cyan-300">
                SDG 14: Scoop ocean plastics & rescue trapped marine wildlife!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ocean Bay Content */}
        <div className="p-5 flex flex-col items-center">
          {/* Status Bar */}
          <div className="w-full flex items-center justify-between text-xs bg-slate-950/70 p-3 rounded-2xl border border-cyan-900/40 mb-4">
            <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Trash Left: {trashRemaining}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300 font-mono font-bold">
              <span>🐢 Turtles Rescued: {rescuedTurtles}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 font-mono font-bold">
              <span>Score: {score} pts</span>
            </div>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className="w-full text-xs sm:text-sm font-semibold text-center text-cyan-200 bg-cyan-950/80 border border-cyan-600/50 py-1.5 px-3 rounded-xl mb-3 animate-fade-in">
              {feedback}
            </div>
          )}

          {/* Lagoon Bay Grid */}
          <div className="w-full bg-gradient-to-b from-[#024059] to-[#04668d] rounded-2xl p-4 border-2 border-cyan-400/30 relative overflow-hidden shadow-inner">
            <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-200/80 mb-2 flex items-center justify-between">
              <span>🌊 Coral Lagoon Surface</span>
              <span>Tap to scoop trash & free wildlife</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 py-2">
              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleClickTarget(t)}
                  disabled={t.cleared}
                  className={`h-20 sm:h-24 rounded-2xl border flex flex-col items-center justify-center p-1.5 transition-all cursor-pointer ${
                    t.cleared
                      ? 'bg-cyan-950/30 border-cyan-800/20 opacity-40 grayscale cursor-not-allowed'
                      : t.isTrash
                      ? 'bg-sky-900/60 border-amber-400/50 hover:border-amber-300 hover:scale-105 shadow-md shadow-amber-500/10'
                      : 'bg-emerald-900/50 border-emerald-400/60 hover:border-emerald-300 hover:scale-105 shadow-md shadow-emerald-500/10'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl filter drop-shadow">
                    {t.cleared ? '🫧' : t.emoji}
                  </span>
                  <span className="text-[10px] font-bold text-center mt-1 leading-tight text-slate-200 truncate w-full">
                    {t.cleared ? 'Cleaned!' : t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Victory Completion state */}
          {isFinished && (
            <div className="w-full mt-4 bg-emerald-950/80 border-2 border-emerald-400 p-4 rounded-2xl text-center flex flex-col items-center gap-2 animate-bounce-subtle">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <div className="font-bold text-white font-['Fredoka'] text-base sm:text-lg">
                Lagoon Fully Restored! Marine Life Safe!
              </div>
              <p className="text-xs text-emerald-200">
                You collected all toxic plastics, prevented reef degradation, and saved Coral Bay!
              </p>
              <button
                onClick={handleFinish}
                className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm cursor-pointer shadow-lg shadow-emerald-500/30"
              >
                Complete Mission (+{score + 40} Eco-Pts)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
