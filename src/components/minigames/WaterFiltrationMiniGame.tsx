import React, { useState, useEffect } from 'react';
import { X, Droplets, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { sound } from '../../services/sound';

interface WaterFiltrationMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

export const WaterFiltrationMiniGame: React.FC<WaterFiltrationMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const [phLevel, setPhLevel] = useState<number>(5.2);
  const [minerals, setMinerals] = useState<number>(35); // target: 50-80 mg/L
  const [bioFilterStage, setBioFilterStage] = useState<number>(1); // 1 to 4 stages
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [flowActive, setFlowActive] = useState<boolean>(true);

  // Validation
  const isPhValid = phLevel >= 6.5 && phLevel <= 8.5;
  const isMineralsValid = minerals >= 50 && minerals <= 80;
  const isFilterReady = bioFilterStage === 4;

  const purityScore = Math.min(
    100,
    Math.round(
      (isPhValid ? 40 : Math.max(0, 40 - Math.abs(phLevel - 7.5) * 15)) +
      (isMineralsValid ? 30 : Math.max(0, 30 - Math.abs(minerals - 65) * 0.8)) +
      bioFilterStage * 7.5
    )
  );

  useEffect(() => {
    if (isPhValid && isMineralsValid && isFilterReady && !isSuccess) {
      setIsSuccess(true);
      sound.playSuccess();
    }
  }, [isPhValid, isMineralsValid, isFilterReady, isSuccess]);

  const handleFinish = () => {
    sound.playSuccess();
    onComplete(purityScore);
  };

  const handleReset = () => {
    sound.playClick();
    setPhLevel(5.2);
    setMinerals(35);
    setBioFilterStage(1);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-cyan-900/50 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <Droplets className="w-4 h-4 fill-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                SDG 6: Water Filtration Balancer
              </h3>
              <p className="text-xs text-cyan-300">
                Calibrate pH and mineral equilibrium to supply safe drinking water
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
        <div className="p-5 sm:p-6 space-y-6">
          {/* Water Purification Column Visualization */}
          <div className="relative bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-xs uppercase font-bold text-slate-400 mb-1">
                Purification Reservoir
              </div>
              <div className="text-sm text-slate-200">
                Purity Index:{' '}
                <span className={`font-mono font-bold text-lg ${
                  purityScore >= 90 ? 'text-emerald-400' : purityScore >= 60 ? 'text-cyan-400' : 'text-amber-400'
                }`}>
                  {purityScore}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 mt-2 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${purityScore}%` }}
                />
              </div>
            </div>

            {/* Animated Water Flask */}
            <div className="w-20 h-28 relative rounded-b-2xl rounded-t-lg border-2 border-cyan-400/60 bg-cyan-950/30 overflow-hidden flex flex-col justify-end p-1 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <div
                className={`w-full transition-all duration-500 rounded-b-xl ${
                  isPhValid && isMineralsValid
                    ? 'bg-gradient-to-t from-cyan-400 to-teal-300'
                    : 'bg-gradient-to-t from-amber-700 to-amber-500'
                }`}
                style={{ height: `${bioFilterStage * 25}%` }}
              >
                <div className="w-full h-1 bg-white/40 animate-pulse"></div>
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-300 font-bold">
                {bioFilterStage}/4 Stages
              </div>
            </div>
          </div>

          {/* 1. pH Slider (Goal: 6.5 to 8.5) */}
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-200">
                1. Water pH Level <span className="text-[11px] text-slate-400">(Safe Range: 6.5 – 8.5)</span>
              </span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                isPhValid ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/60' : 'bg-rose-950 text-rose-300 border border-rose-600/60'
              }`}>
                pH {phLevel.toFixed(1)} {isPhValid ? '✓ Balanced' : '⚠️ Acidic/Basic'}
              </span>
            </div>
            <input
              type="range"
              min="4.0"
              max="10.0"
              step="0.1"
              value={phLevel}
              onChange={(e) => {
                sound.playWaterDrop();
                setPhLevel(parseFloat(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>4.0 (Acidic)</span>
              <span className="text-cyan-400 font-bold">7.0 (Neutral)</span>
              <span>10.0 (Alkaline)</span>
            </div>
          </div>

          {/* 2. Mineral & Electrolyte Balancer (Goal: 50 - 80 mg/L) */}
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-200">
                2. Essential Minerals (Ca, Mg, K){' '}
                <span className="text-[11px] text-slate-400">(Optimal: 50 – 80 mg/L)</span>
              </span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                isMineralsValid ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/60' : 'bg-rose-950 text-rose-300 border border-rose-600/60'
              }`}>
                {minerals} mg/L {isMineralsValid ? '✓ Potable' : '⚠️ Unbalanced'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="1"
              value={minerals}
              onChange={(e) => {
                sound.playWaterDrop();
                setMinerals(parseInt(e.target.value, 10));
              }}
              className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* 3. Bio-Filtration Stages (Reeds, Biochar, Sand, Solar UV) */}
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-slate-200 mb-2">
              3. Activate Bio-Filtration Stages (Reeds → Gravel → Biochar → Solar UV)
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { stage: 1, label: 'Reed Bed' },
                { stage: 2, label: 'Fine Sand' },
                { stage: 3, label: 'Biochar' },
                { stage: 4, label: 'Solar UV' },
              ].map((s) => (
                <button
                  key={s.stage}
                  onClick={() => {
                    sound.playClick();
                    setBioFilterStage(s.stage);
                  }}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    bioFilterStage >= s.stage
                      ? 'bg-cyan-950 text-cyan-200 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Calibrators
          </button>

          <button
            disabled={purityScore < 70}
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Distribute Clean Water (+{purityScore} Pts)
          </button>
        </div>
      </div>
    </div>
  );
};
