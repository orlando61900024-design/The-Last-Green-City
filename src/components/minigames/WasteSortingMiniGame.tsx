import React, { useState } from 'react';
import { X, Recycle, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../../services/sound';

interface WasteSortingMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface WasteItem {
  id: number;
  name: string;
  icon: string;
  category: 'compost' | 'ewaste' | 'bioplastic' | 'glass';
}

const ITEMS: WasteItem[] = [
  { id: 1, name: 'Apple Core & Fruit Peels', icon: '🍎', category: 'compost' },
  { id: 2, name: 'Burnt Circuit Board', icon: '💾', category: 'ewaste' },
  { id: 3, name: 'Algae Water Bottle', icon: '🧴', category: 'bioplastic' },
  { id: 4, name: 'Laboratory Borosilicate Flask', icon: '🧪', category: 'glass' },
  { id: 5, name: 'Mycelium Packaging Tray', icon: '🍄', category: 'compost' },
  { id: 6, name: 'Lithium Battery Cell', icon: '🔋', category: 'ewaste' },
  { id: 7, name: 'Starch Food Container', icon: '🥡', category: 'bioplastic' },
  { id: 8, name: 'Broken Solar Glass Pane', icon: '🪟', category: 'glass' },
];

export const WasteSortingMiniGame: React.FC<WasteSortingMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentItem = ITEMS[currentIndex];
  const isFinished = currentIndex >= ITEMS.length;

  const handleSort = (chosenCategory: 'compost' | 'ewaste' | 'bioplastic' | 'glass') => {
    if (!currentItem) return;

    if (chosenCategory === currentItem.category) {
      sound.playSuccess();
      setScore((prev) => prev + 15);
      setFeedback(`✓ Correct! ${currentItem.name} sorted into circular loop.`);
    } else {
      sound.playWarning();
      setFeedback(`⚠️ Cross-contamination! That item belonged in ${currentItem.category}.`);
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex((prev) => prev + 1);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-amber-900/50 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Recycle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                SDG 12: Circular Material Loop Sorter
              </h3>
              <p className="text-xs text-amber-300">
                Route urban items into closed-loop recovery without landfill contamination
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Game Stage */}
        <div className="p-6 flex flex-col items-center justify-center space-y-6">
          {!isFinished ? (
            <>
              {/* Progress */}
              <div className="w-full flex items-center justify-between text-xs text-slate-400">
                <span>Item {currentIndex + 1} of {ITEMS.length}</span>
                <span className="font-mono text-emerald-400 font-bold">Score: {score} Pts</span>
              </div>

              {/* Current Waste Item on Conveyor */}
              <div className="w-full max-w-xs bg-slate-950 p-6 rounded-3xl border-2 border-slate-800 flex flex-col items-center justify-center text-center shadow-inner relative">
                <span className="text-5xl mb-2 animate-bounce-subtle">{currentItem.icon}</span>
                <div className="text-base font-bold text-white">{currentItem.name}</div>
                <div className="text-xs text-slate-400 mt-1">Select the correct recovery bin below</div>

                {feedback && (
                  <div className="absolute inset-0 bg-slate-900/95 rounded-3xl flex items-center justify-center p-4 text-xs font-bold text-center">
                    <span className={feedback.startsWith('✓') ? 'text-emerald-300' : 'text-rose-300'}>
                      {feedback}
                    </span>
                  </div>
                )}
              </div>

              {/* 4 Circular Bins */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {[
                  { cat: 'compost' as const, label: 'Organic Compost', icon: '🌱', border: 'border-emerald-500/40 hover:border-emerald-400', bg: 'bg-emerald-950/40' },
                  { cat: 'ewaste' as const, label: 'E-Waste / Alloys', icon: '⚡', border: 'border-cyan-500/40 hover:border-cyan-400', bg: 'bg-cyan-950/40' },
                  { cat: 'bioplastic' as const, label: 'Bio-Polymers', icon: '♻️', border: 'border-amber-500/40 hover:border-amber-400', bg: 'bg-amber-950/40' },
                  { cat: 'glass' as const, label: 'Pure Glass', icon: '💎', border: 'border-indigo-500/40 hover:border-indigo-400', bg: 'bg-indigo-950/40' },
                ].map((bin) => (
                  <button
                    key={bin.cat}
                    onClick={() => handleSort(bin.cat)}
                    className={`p-3 rounded-2xl border-2 ${bin.border} ${bin.bg} flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95`}
                  >
                    <span className="text-2xl">{bin.icon}</span>
                    <span className="text-[11px] font-bold text-white text-center leading-tight">
                      {bin.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-3">
              <span className="text-5xl">🎉</span>
              <h4 className="text-lg font-bold text-white">All Materials Successfully Processed!</h4>
              <p className="text-xs text-slate-300 max-w-sm">
                You prevented toxic heavy metal leaching and diverted 100% of valuable biomass into Verdia's organic soil reserves.
              </p>
              <div className="font-mono text-xl font-bold text-emerald-400">Final Score: {score} Pts</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 flex items-center justify-end">
          <button
            onClick={() => onComplete(score || 45)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isFinished ? 'Collect Rewards' : 'Finish Run'}
          </button>
        </div>
      </div>
    </div>
  );
};
