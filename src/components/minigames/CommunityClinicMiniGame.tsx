import React, { useState } from 'react';
import { X, CheckCircle2, HeartPulse, Sparkles, Wind, Droplets, Scale } from 'lucide-react';
import { sound } from '../../services/sound';

interface CommunityClinicMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

export const CommunityClinicMiniGame: React.FC<CommunityClinicMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const [oxygenLevel, setOxygenLevel] = useState<number>(40);
  const [herbalPotency, setHerbalPotency] = useState<number>(30);
  const [equalAccess, setEqualAccess] = useState<number>(35);

  // Target ranges: All between 70% and 95%
  const isOxygenOptimal = oxygenLevel >= 70 && oxygenLevel <= 95;
  const isHerbalOptimal = herbalPotency >= 70 && herbalPotency <= 95;
  const isEqualOptimal = equalAccess >= 70 && equalAccess <= 95;

  const isBalanced = isOxygenOptimal && isHerbalOptimal && isEqualOptimal;

  const handleAdjust = (type: 'oxygen' | 'herbal' | 'equal', delta: number) => {
    sound.playClick();
    if (type === 'oxygen') {
      setOxygenLevel((prev) => Math.min(100, Math.max(10, prev + delta)));
    } else if (type === 'herbal') {
      setHerbalPotency((prev) => Math.min(100, Math.max(10, prev + delta)));
    } else if (type === 'equal') {
      setEqualAccess((prev) => Math.min(100, Math.max(10, prev + delta)));
    }
  };

  const handleComplete = () => {
    sound.playSuccess();
    onComplete(90);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md font-['Plus_Jakarta_Sans'] select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-emerald-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-emerald-900/60 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                Healing Park Botanical Clinic
              </h3>
              <p className="text-xs text-emerald-300">
                Balance clean air scrubbers, plant remedies, and equal care distribution!
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

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
            Tune all three dispensary stations into the <strong>Green Optimal Zone (70% - 95%)</strong> so children, elders, and families receive pure medicine with fair equality!
          </p>

          {/* Station 1: Clean Air & Oxygen Scrubbers */}
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-400" />
                <span>Micro-Filtered Pure Air: {oxygenLevel}%</span>
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                isOxygenOptimal ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'text-slate-400'
              }`}>
                {isOxygenOptimal ? '✓ OPTIMAL' : 'Needs Balance'}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-200 ${
                  isOxygenOptimal ? 'bg-emerald-400' : 'bg-sky-500'
                }`}
                style={{ width: `${oxygenLevel}%` }}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleAdjust('oxygen', -10)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
              >
                -10%
              </button>
              <button
                onClick={() => handleAdjust('oxygen', 15)}
                className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white"
              >
                +15%
              </button>
            </div>
          </div>

          {/* Station 2: Herbal Eucalyptus Tincture */}
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-emerald-400" />
                <span>Medicinal Plant Potency: {herbalPotency}%</span>
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                isHerbalOptimal ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'text-slate-400'
              }`}>
                {isHerbalOptimal ? '✓ OPTIMAL' : 'Needs Balance'}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-200 ${
                  isHerbalOptimal ? 'bg-emerald-400' : 'bg-emerald-600'
                }`}
                style={{ width: `${herbalPotency}%` }}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleAdjust('herbal', -10)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
              >
                -10%
              </button>
              <button
                onClick={() => handleAdjust('herbal', 15)}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
              >
                +15%
              </button>
            </div>
          </div>

          {/* Station 3: Equal Community Distribution */}
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Equal Access & Fair Distribution: {equalAccess}%</span>
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                isEqualOptimal ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'text-slate-400'
              }`}>
                {isEqualOptimal ? '✓ OPTIMAL' : 'Needs Balance'}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-200 ${
                  isEqualOptimal ? 'bg-emerald-400' : 'bg-amber-500'
                }`}
                style={{ width: `${equalAccess}%` }}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleAdjust('equal', -10)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
              >
                -10%
              </button>
              <button
                onClick={() => handleAdjust('equal', 15)}
                className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white"
              >
                +15%
              </button>
            </div>
          </div>

          {/* Balanced Complete State */}
          {isBalanced ? (
            <div className="bg-emerald-950/90 border-2 border-emerald-400 p-4 rounded-2xl text-center flex flex-col items-center gap-2 animate-bounce-subtle mt-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <div className="font-bold text-white font-['Fredoka'] text-base">
                Community Health Balanced!
              </div>
              <p className="text-xs text-emerald-200">
                Fresh herbal mist, pure air, and fair medical supplies are now reaching all neighborhoods equally!
              </p>
              <button
                onClick={handleComplete}
                className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm cursor-pointer shadow-lg shadow-emerald-500/30"
              >
                Deliver Health Care (+90 Eco-Pts)
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 mt-1 font-mono">
              Adjust each station so all three indicators show "✓ OPTIMAL"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
