import React, { useState, useEffect } from 'react';
import { X, Trees, CheckCircle2, RotateCcw, Sprout, ShieldAlert, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';

interface TreePlantingMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface Tile {
  id: number;
  planted: boolean;
  species?: 'alder' | 'willow' | 'oak' | 'acacia';
  mycorrhizal: boolean;
}

export const TreePlantingMiniGame: React.FC<TreePlantingMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const [tiles, setTiles] = useState<Tile[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      planted: false,
      mycorrhizal: false,
    }))
  );
  const [selectedTool, setSelectedTool] = useState<'pioneer' | 'mycorrhizae'>('pioneer');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft <= 0 || tiles.every((t) => t.planted && t.mycorrhizal)) {
      setGameOver(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, tiles]);

  const handleTileClick = (index: number) => {
    if (gameOver) return;
    const newTiles = [...tiles];
    const target = newTiles[index];

    if (selectedTool === 'pioneer') {
      if (!target.planted) {
        sound.playPlantSprout();
        target.planted = true;
        target.species = index % 2 === 0 ? 'alder' : 'willow';
      }
    } else {
      // Inoculate mycorrhizae
      if (target.planted && !target.mycorrhizal) {
        sound.playSuccess();
        target.mycorrhizal = true;
      }
    }
    setTiles(newTiles);
  };

  const plantedCount = tiles.filter((t) => t.planted).length;
  const mycorrhizalCount = tiles.filter((t) => t.mycorrhizal).length;
  const totalScore = plantedCount * 5 + mycorrhizalCount * 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-emerald-900/50 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Trees className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                SDG 15: Rapid Slope Reforestation
              </h3>
              <p className="text-xs text-emerald-300">
                Plant native saplings and inoculate root fungal networks before topsoil erodes!
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

        {/* Game Stats & Tools */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Time Left:</span>
              <span className={`font-mono font-bold text-sm ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-emerald-400">Trees: {plantedCount}/12</span>
              <span className="text-teal-300">Mycorrhizae: {mycorrhizalCount}/12</span>
            </div>
          </div>

          {/* Tool Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedTool('pioneer');
              }}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                selectedTool === 'pioneer'
                  ? 'bg-emerald-950 text-emerald-200 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Sprout className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <div className="text-xs font-bold">Step 1: Pioneer Sapling</div>
                <div className="text-[10px] text-slate-400">Nitrogen-fixing Alder &amp; Willow</div>
              </div>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedTool('mycorrhizae');
              }}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                selectedTool === 'mycorrhizae'
                  ? 'bg-teal-950 text-teal-200 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]'
                  : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <div className="text-left">
                <div className="text-xs font-bold">Step 2: Mycorrhizae Fungi</div>
                <div className="text-[10px] text-slate-400">Binds root network to soil</div>
              </div>
            </button>
          </div>

          {/* Terraced Planting Grid (12 plots) */}
          <div className="grid grid-cols-4 gap-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            {tiles.map((tile, i) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(i)}
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${
                  tile.planted && tile.mycorrhizal
                    ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]'
                    : tile.planted
                    ? 'bg-lime-950/50 border-lime-500'
                    : 'bg-amber-950/20 border-amber-800/40 hover:border-amber-600'
                }`}
              >
                {tile.planted ? (
                  <div className="flex flex-col items-center animate-bounce-subtle">
                    <span className="text-xl">🌳</span>
                    {tile.mycorrhizal ? (
                      <span className="text-[9px] font-bold text-teal-300 mt-0.5">Symbiotic</span>
                    ) : (
                      <span className="text-[9px] font-bold text-amber-400 mt-0.5">+Fungi</span>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-[10px] text-amber-500/80">
                    <span className="text-base block">🪨</span>
                    Barren Soil
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {tiles.every((t) => t.planted && t.mycorrhizal) ? (
              <span className="text-emerald-400 font-bold">Slope stabilized! Maximum canopy established.</span>
            ) : (
              <span>Tap tiles to plant trees, then apply mycorrhizae.</span>
            )}
          </div>

          <button
            onClick={() => onComplete(totalScore)}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Complete Reforestation (+{totalScore} Pts)
          </button>
        </div>
      </div>
    </div>
  );
};
