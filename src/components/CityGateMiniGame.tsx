import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldAlert, Lock, Zap, CheckCircle2 } from 'lucide-react';
import { CharacterPip } from './CharacterPip';
import { sound } from '../services/sound';

interface CityGateMiniGameProps {
  sectorName: string;
  sdgGoal: string;
  questionVisual?: string;
  sdgId?: number;
  requiredClicks?: number;
  hasFastDoorUpgrade?: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

export const CityGateMiniGame: React.FC<CityGateMiniGameProps> = ({
  sectorName,
  sdgGoal,
  questionVisual,
  sdgId,
  requiredClicks = 25,
  hasFastDoorUpgrade = false,
  onComplete,
  onCancel,
}) => {
  const REQUIRED_CLICKS = requiredClicks; // Reduced to 10 if shop upgrade is purchased!
  const [clickCount, setClickCount] = useState<number>(0);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3);
  const [isPumping, setIsPumping] = useState<boolean>(false);

  // Store onComplete in a ref so background interval or parent re-renders never tear down or reset the timer
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const progressPercent = Math.min(100, Math.round((clickCount / REQUIRED_CLICKS) * 100));

  // Direct trigger to start the mission immediately once doors are open
  const handleEnterMission = useCallback(() => {
    sound.playSuccess();
    onCompleteRef.current();
  }, []);

  // Handle clicking the crank / heavy gate button
  const handleGateClick = () => {
    if (isOpened) return;

    sound.playClick();
    setIsPumping(true);
    setTimeout(() => setIsPumping(false), 120);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= REQUIRED_CLICKS) {
      sound.playSuccess();
      setIsOpened(true);
    }
  };

  // Once opened, keep door open for 3 seconds before automatically transitioning to the quiz
  useEffect(() => {
    if (!isOpened) return;

    let timeLeft = 3;
    setSecondsRemaining(3);

    const intervalId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setSecondsRemaining(0);
        onCompleteRef.current();
      } else {
        setSecondsRemaining(timeLeft);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isOpened]);

  // Lock document body scroll while gate modal is active so clicking doesn't scroll the background map
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto select-none font-['Fredoka']">
      <div className="relative w-full max-w-2xl max-h-[94vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-[#10192a] to-slate-950 border-4 border-amber-500/70 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.4)] my-auto flex flex-col p-4 sm:p-6 animate-fade-in">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-amber-900/50 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                City Airlock Protocol
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white leading-none">
                Unseal Verdia Blast Doors
              </h2>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={isOpened}
            className="text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 disabled:opacity-30 cursor-pointer"
          >
            Cancel Expedition
          </button>
        </div>

        {/* Narrative Banner: Exterior world is toxic */}
        <div className="bg-amber-950/50 border border-amber-600/40 rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 mb-3 text-left">
          <CharacterPip mood={isOpened ? 'cheering' : 'thinking'} size="sm" showBackpack={true} />
          <div className="text-xs sm:text-sm text-slate-200 font-['Plus_Jakarta_Sans'] flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-0.5">
              <p className="font-semibold text-amber-300 text-xs sm:text-sm">
                ⚠️ Warning: The exterior world is toxic!
              </p>
              {(hasFastDoorUpgrade || REQUIRED_CLICKS <= 10) && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 flex items-center gap-1 shadow-sm animate-pulse">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Fast-Crank Active: 10 Clicks Only!</span>
                </span>
              )}
            </div>
            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
              The city blast doors are sealed tight with heavy hydraulic locks. Rapidly pump the manual pressure lever to unseal the gates for{' '}
              <strong className="text-white">{sectorName}</strong>!
            </p>
          </div>
        </div>

        {/* BLAST DOOR CHAMBER (VISUAL GATE) */}
        <div className="relative w-full h-40 sm:h-48 md:h-52 rounded-2xl bg-slate-950 border-2 border-slate-800 overflow-hidden flex items-center justify-center shadow-inner mb-3 shrink-0">
          {/* Exterior Landscape (Visible when doors open) */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/80 via-emerald-950/40 to-slate-950 flex flex-col items-center justify-center p-3 text-center">
            <div className="text-3xl sm:text-4xl animate-bounce-subtle mb-1">
              {questionVisual || '🌫️🌲🏭'}
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-200">
              Toxic Wilderness: {sectorName}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
              Mission Target: {sdgGoal}
            </div>

            {isOpened && (
              <button
                onClick={handleEnterMission}
                className="mt-2 px-4 py-1.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 animate-pulse"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>DOORS OPEN! Enter Mission ({secondsRemaining}s) →</span>
              </button>
            )}
          </div>

          {/* Left Blast Door */}
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600 border-r-4 border-amber-500 shadow-2xl flex flex-col justify-between p-2.5 transition-transform duration-1000 ease-out z-10 ${
              isOpened ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <div className="h-5 w-full bg-amber-400/20 border border-amber-400/60 rounded flex items-center justify-center text-[9px] font-mono font-bold text-amber-300 tracking-wider">
              VERDIA-GATE-L
            </div>
            <div className="flex flex-col items-center gap-0.5 opacity-70">
              <div className="w-10 h-10 rounded-full border-4 border-stone-900 bg-stone-800 flex items-center justify-center text-amber-400 font-mono text-xs font-black shadow-inner">
                ⚙️
              </div>
              <span className="text-[8px] font-mono text-stone-300">HYDRAULIC-A</span>
            </div>
            <div className="h-3 w-full bg-gradient-to-r from-yellow-500 via-black to-yellow-500 rounded-sm opacity-80" />
          </div>

          {/* Right Blast Door */}
          <div
            className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-stone-800 via-stone-700 to-stone-600 border-l-4 border-amber-500 shadow-2xl flex flex-col justify-between p-2.5 transition-transform duration-1000 ease-out z-10 ${
              isOpened ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            <div className="h-5 w-full bg-amber-400/20 border border-amber-400/60 rounded flex items-center justify-center text-[9px] font-mono font-bold text-amber-300 tracking-wider">
              VERDIA-GATE-R
            </div>
            <div className="flex flex-col items-center gap-0.5 opacity-70">
              <div className="w-10 h-10 rounded-full border-4 border-stone-900 bg-stone-800 flex items-center justify-center text-amber-400 font-mono text-xs font-black shadow-inner">
                ⚙️
              </div>
              <span className="text-[8px] font-mono text-stone-300">HYDRAULIC-B</span>
            </div>
            <div className="h-3 w-full bg-gradient-to-r from-yellow-500 via-black to-yellow-500 rounded-sm opacity-80" />
          </div>

          {/* Center Lock Core (Visible before opened) */}
          {!isOpened && (
            <div className="relative z-20 w-14 h-14 rounded-full bg-stone-900 border-4 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center">
              <Lock className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          )}
        </div>

        {/* Hydraulic Pressure Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px] sm:text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Hydraulic Valve Pressure</span>
            </span>
            <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm">
              {clickCount} / {REQUIRED_CLICKS} Pumps ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-slate-950 border border-slate-700 rounded-full h-3 overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* CLICK BUTTON: "PUMP VALVE LEVER" / "START MISSION" */}
        <div className="flex flex-col items-center justify-center">
          {!isOpened ? (
            <button
              onClick={handleGateClick}
              className={`w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-lg sm:text-xl transition-all cursor-pointer shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 sm:gap-3 active:scale-95 touch-manipulation ${
                isPumping ? 'scale-95 brightness-125' : 'hover:scale-[1.01]'
              }`}
            >
              <span className="text-xl sm:text-2xl">⚡</span>
              <span>RAPID CLICK TO OPEN GATES! ({REQUIRED_CLICKS - clickCount} Left)</span>
              <span className="text-xl sm:text-2xl">⚡</span>
            </button>
          ) : (
            <button
              onClick={handleEnterMission}
              className="w-full py-3.5 sm:py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 hover:from-emerald-400 hover:to-teal-200 text-slate-950 font-black text-lg sm:text-xl flex items-center justify-center gap-2 animate-pulse cursor-pointer shadow-[0_0_35px_rgba(52,211,153,0.7)] hover:scale-[1.01] active:scale-95"
            >
              <CheckCircle2 className="w-6 h-6 text-slate-950" />
              <span>DOORS OPEN! START MISSION ({secondsRemaining}s) →</span>
            </button>
          )}

          <p className="text-[11px] text-slate-400 mt-1.5 text-center font-['Plus_Jakarta_Sans']">
            {isOpened
              ? 'Blast doors are wide open! Click above or wait to begin the quiz.'
              : 'Click rapidly as fast as you can to break the hydraulic vacuum seal!'}
          </p>
        </div>
      </div>
    </div>
  );
};
