import React, { useState } from 'react';
import { X, Zap, Sun, Wind, Waves, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../../services/sound';

interface EnergyGridMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

export const EnergyGridMiniGame: React.FC<EnergyGridMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const targetDemand = 240; // MW
  const [solarMW, setSolarMW] = useState<number>(80);
  const [windMW, setWindMW] = useState<number>(70);
  const [hydroMW, setHydroMW] = useState<number>(50);

  const totalGenerated = solarMW + windMW + hydroMW;
  const difference = totalGenerated - targetDemand;
  const isBalanced = Math.abs(difference) <= 5; // within 5 MW is safe grid stability

  const handleFinish = () => {
    sound.playSuccess();
    onComplete(isBalanced ? 100 : 50);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-amber-900/50 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                SDG 7: Clean Energy Grid Dispatcher
              </h3>
              <p className="text-xs text-amber-300">
                Balance clean baseload power to match Verdia’s urban demand (Target: {targetDemand} MW)
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

        {/* Game Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Grid Telemetry */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Total City Demand</div>
              <div className="text-2xl font-bold font-mono text-white">{targetDemand} <span className="text-sm font-normal text-slate-400">MW</span></div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase">Clean Generation</div>
              <div className={`text-2xl font-bold font-mono ${
                isBalanced ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {totalGenerated} <span className="text-sm font-normal text-slate-400">MW</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase">Frequency Status</div>
              <div className={`text-xs font-bold px-2 py-1 rounded inline-block mt-0.5 ${
                isBalanced ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'
              }`}>
                {isBalanced ? '50.0 Hz (Stable)' : `${difference > 0 ? '+' : ''}${difference} MW Fluctuating`}
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {/* Solar */}
            <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" /> Rooftop &amp; Canopy Solar
                </span>
                <span className="font-mono font-bold text-white">{solarMW} MW</span>
              </div>
              <input
                type="range"
                min="0"
                max="140"
                value={solarMW}
                onChange={(e) => {
                  sound.playClick();
                  setSolarMW(parseInt(e.target.value, 10));
                }}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Wind Spire */}
            <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-400" /> Vertical Ridge Wind Turbines
                </span>
                <span className="font-mono font-bold text-white">{windMW} MW</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                value={windMW}
                onChange={(e) => {
                  sound.playClick();
                  setWindMW(parseInt(e.target.value, 10));
                }}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Gravitational Pumped Hydro */}
            <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-teal-400" /> Pumped-Hydro Gravity Storage
                </span>
                <span className="font-mono font-bold text-white">{hydroMW} MW</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                value={hydroMW}
                onChange={(e) => {
                  sound.playClick();
                  setHydroMW(parseInt(e.target.value, 10));
                }}
                className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 flex items-center justify-between">
          <button
            onClick={() => {
              setSolarMW(80);
              setWindMW(70);
              setHydroMW(50);
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Dispatch
          </button>

          <button
            disabled={!isBalanced}
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Synchronize Grid (+100 Pts)
          </button>
        </div>
      </div>
    </div>
  );
};
