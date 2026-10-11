import React, { useState } from 'react';
import { Leaf, Droplets, Zap, Shield, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Filter, RefreshCw, Cpu, Lock, Trophy } from 'lucide-react';
import { SDGInfo } from '../types/game';
import { sound } from '../services/sound';

interface WorldEcoMapProps {
  sdgList: SDGInfo[];
  onSelectSDG: (sdg: SDGInfo) => void;
  onTriggerRandomCrisis: () => void;
  onGenerateCustomScenario: () => void;
  onOpenVictory: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const WorldEcoMap: React.FC<WorldEcoMapProps> = ({
  sdgList,
  onSelectSDG,
  onTriggerRandomCrisis,
  onGenerateCustomScenario,
  onOpenVictory,
  activeFilter,
  onFilterChange,
}) => {
  const [hoveredSdg, setHoveredSdg] = useState<SDGInfo | null>(null);

  const completedCount = sdgList.filter((s) => s.completed).length;
  const restorationPercent = Math.round((completedCount / sdgList.length) * 100);

  const filteredList = sdgList.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return item.completed;
    if (activeFilter === 'pending') return !item.completed;
    return item.category === activeFilter;
  });

  const handleSdgClick = (sdg: SDGInfo) => {
    sound.playClick();
    onSelectSDG(sdg);
  };

  return (
    <div className="w-full flex-1 flex flex-col p-4 sm:p-6 max-w-7xl mx-auto font-['Plus_Jakarta_Sans']">
      {/* Top Map Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Fredoka']">
              Global Restoration Map
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold">
              17 SDG Sectors
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Dispatch Pip to heal failing biomes worldwide. Each solved goal permanently restores its sector from toxic smog into flourishing wilderness.
          </p>
        </div>

        {/* Global Restoration Gauge */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-700/80 text-right">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Earth Regenerated</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">
              {completedCount} / 17 <span className="text-xs font-normal text-slate-400">({restorationPercent}%)</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {completedCount === sdgList.length ? (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onOpenVictory();
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 hover:from-amber-300 hover:to-teal-200 text-slate-950 font-black rounded-xl text-xs cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_0_25px_rgba(52,211,153,0.7)] font-['Fredoka'] tracking-wide animate-pulse"
                title="All 17 missions completed! Watch the Victory Ending!"
              >
                <Trophy className="w-4 h-4 text-amber-950" />
                <span>YOU WIN! (Ending Unlocked)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onOpenVictory();
                }}
                className="px-3 py-2 bg-slate-900/90 hover:bg-slate-800 border border-emerald-600/50 hover:border-emerald-400 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-md group"
                title="Click to view the Victory Ending or track progress to restore Earth!"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px]">{completedCount}/17 Done (View Ending)</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playWarning();
                onTriggerRandomCrisis();
              }}
              className="px-3 py-2 bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-200 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-lg"
              title="Simulate sudden environmental crisis triage"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Crisis Triage</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onGenerateCustomScenario();
              }}
              className="px-3 py-2 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-600/60 text-indigo-200 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-lg"
              title="AI Game Director Custom Scenario"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Director</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs">
        <span className="text-slate-400 flex items-center gap-1 mr-1 text-xs shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </span>
        {[
          { key: 'all', label: 'All 17 SDGs' },
          { key: 'Resource Stability', label: '💧 Resource Stability' },
          { key: 'Ecological Health', label: '🌿 Ecological Health' },
          { key: 'Community Well-Being', label: '🤝 Community Well-Being' },
          { key: 'pending', label: '⚠️ Unrestored' },
          { key: 'completed', label: '✨ Restored' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => {
              sound.playClick();
              onFilterChange(f.key);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-all shrink-0 border ${
              activeFilter === f.key
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Visual Interactive Map Canvas / SVG Diagram */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] max-h-[580px] bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl mb-6 select-none">
        {/* Map Background Grids & Topographic Contours */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a1626] to-[#040e1a]">
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Concentric Biome Rings from Verdia */}
            <circle cx="50%" cy="50%" r="18%" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="50%" cy="50%" r="34%" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#6366F1" strokeWidth="0.8" strokeDasharray="8 8" />
          </svg>
        </div>

        {/* Central Sanctuary: VERDIA ECO-DOME */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div className="relative group">
            {/* Radiant sanctuary aura */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
            {/* Verdia Dome Sphere */}
            <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-400 via-teal-600 to-slate-900 border-2 border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.7)] flex flex-col items-center justify-center">
              <span className="text-xl sm:text-2xl">🌱</span>
              <span className="text-[9px] font-bold tracking-widest text-emerald-100 font-['Space_Grotesk'] uppercase mt-0.5">
                VERDIA
              </span>
            </div>
          </div>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
            Sanctuary Core
          </span>
        </div>

        {/* 17 SDG Sector Nodes positioned dynamically across coordinates */}
        {sdgList.map((sdg) => {
          const isHovered = hoveredSdg?.id === sdg.id;
          const isFilteredOut = activeFilter !== 'all' &&
            activeFilter !== 'completed' &&
            activeFilter !== 'pending' &&
            sdg.category !== activeFilter;

          return (
            <div
              key={sdg.id}
              onClick={() => handleSdgClick(sdg)}
              onMouseEnter={() => setHoveredSdg(sdg)}
              onMouseLeave={() => setHoveredSdg(null)}
              className={`absolute cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 z-30 ${
                isFilteredOut ? 'opacity-30 scale-90' : 'opacity-100 scale-100 hover:scale-125 hover:z-40'
              }`}
              style={{ top: `${sdg.coordinates.y}%`, left: `${sdg.coordinates.x}%` }}
            >
              {/* Pulsing Aura if Unrestored vs Restored */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  sdg.completed
                    ? 'bg-emerald-950/90 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]'
                    : 'bg-slate-900/90 border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                }`}
                style={{ borderColor: sdg.completed ? '#34D399' : sdg.unColor }}
              >
                {sdg.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <span className="text-xs sm:text-sm font-bold font-mono text-white">
                    {sdg.id}
                  </span>
                )}
              </div>

              {/* Status Badge beneath Node */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap pointer-events-none">
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow ${
                    sdg.completed
                      ? 'bg-emerald-900 text-emerald-200 border border-emerald-500/60'
                      : 'bg-slate-900 text-slate-300 border border-slate-700'
                  }`}
                >
                  SDG {sdg.id}
                </span>
              </div>
            </div>
          );
        })}

        {/* Hovered Sector Preview Floating Card */}
        {hoveredSdg && (
          <div
            className="absolute bottom-4 left-4 z-40 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border max-w-sm shadow-2xl transition-all pointer-events-none"
            style={{ borderColor: hoveredSdg.unColor }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: hoveredSdg.unColor }}
              />
              <span className="text-xs font-bold text-white truncate">
                SDG {hoveredSdg.id}: {hoveredSdg.title}
              </span>
              <span className={`text-[10px] ml-auto px-1.5 py-0.5 rounded font-bold ${
                hoveredSdg.completed ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
              }`}>
                {hoveredSdg.completed ? 'Restored' : 'Critical'}
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mb-1">
              {hoveredSdg.sectorName}
            </div>
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
              {hoveredSdg.summary}
            </p>
            <div className="mt-2 text-[10px] text-slate-400 italic border-t border-slate-800 pt-1">
              Click to launch sector mission &amp; mini-game →
            </div>
          </div>
        )}
      </div>

      {/* Grid of all 17 SDG Mission Cards for Easy Selection & Overview */}
      <div className="w-full">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-['Fredoka']">
          <span>Mission Catalog ({filteredList.length} Goals)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredList.map((sdg) => (
            <div
              key={sdg.id}
              onClick={() => handleSdgClick(sdg)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                sdg.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 hover:bg-emerald-950/40 hover:border-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-xs text-white shrink-0 shadow"
                      style={{ backgroundColor: sdg.unColor }}
                    >
                      {sdg.id}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {sdg.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 truncate">
                        {sdg.category}
                      </div>
                    </div>
                  </div>

                  {sdg.completed ? (
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/50 px-1.5 py-0.5 rounded font-bold">
                      Restored
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-600/50 px-1.5 py-0.5 rounded font-bold">
                      Pending
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-300 mb-2 line-clamp-2">
                  {sdg.summary}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 text-[10px] truncate max-w-[140px]">
                  {sdg.sectorName}
                </span>
                <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform font-semibold flex items-center">
                  Launch <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
