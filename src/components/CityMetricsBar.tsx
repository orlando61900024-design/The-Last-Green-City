import React, { useState } from 'react';
import { Droplets, Leaf, Users, ShieldAlert, Award, Flame, Zap, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { CityMetrics, DifficultyLevel } from '../types/game';
import { DIFFICULTY_PRESETS } from '../data/difficulty';

interface CityMetricsBarProps {
  metrics: CityMetrics;
  ecoPoints: number;
  difficulty?: DifficultyLevel;
  onChangeDifficulty?: (diff: DifficultyLevel) => void;
  onOpenShop?: () => void;
  onOpenSwiftUI?: () => void;
  cityHealthShields?: number;
  hasFastDoorUpgrade?: boolean;
  hasSecondChance?: boolean;
  secondChanceUsed?: boolean;
  hasSolarPanels?: boolean;
  hasWindTurbines?: boolean;
  hasBeaconOfHope?: boolean;
}

export const CityMetricsBar: React.FC<CityMetricsBarProps> = ({
  metrics,
  ecoPoints,
  difficulty = 'normal',
  onChangeDifficulty,
  onOpenShop,
  onOpenSwiftUI,
  cityHealthShields = 0,
  hasFastDoorUpgrade = false,
  hasSecondChance = false,
  secondChanceUsed = false,
  hasSolarPanels = false,
  hasWindTurbines = false,
  hasBeaconOfHope = false,
}) => {
  const [showDiffMenu, setShowDiffMenu] = useState(false);
  const diffConfig = DIFFICULTY_PRESETS[difficulty];

  const averageSanctuaryHealth = Math.round(
    (metrics.resource_stability + metrics.ecological_health + metrics.community_well_being) / 3
  );

  const getMetricColor = (val: number) => {
    if (val >= 70) return 'bg-emerald-500 text-emerald-400';
    if (val >= 40) return 'bg-amber-500 text-amber-400';
    return 'bg-rose-500 text-rose-400';
  };

  const getMetricBorder = (val: number) => {
    if (val >= 70) return 'border-emerald-500/30';
    if (val >= 40) return 'border-amber-500/30';
    return 'border-rose-500/30';
  };

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-emerald-900/40 px-4 py-3 sticky top-0 z-40 text-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Verdia Title & Overall Health */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40">
              <Leaf className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-wide text-white font-['Space_Grotesk']">VERDIA</span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/60">Sanctuary</span>
              </div>
              <p className="text-xs text-slate-400">The Last Green City on Earth</p>
            </div>
          </div>

          {/* Difficulty & Drain Rate Badge with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDiffMenu(!showDiffMenu)}
              className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-750 px-2.5 py-1.5 rounded-xl border border-slate-700 cursor-pointer transition-colors shadow"
              title="Change environmental pressure difficulty"
            >
              <div className="text-left">
                <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <span>Difficulty</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1">
                  <span>{diffConfig.name}</span>
                  <span className="text-[10px] text-rose-400">({diffConfig.drainLabel})</span>
                </div>
              </div>
            </button>

            {/* Difficulty Dropdown */}
            {showDiffMenu && onChangeDifficulty && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 font-['Fredoka']">
                {(['easy', 'normal', 'hard', 'expert'] as DifficultyLevel[]).map((level) => {
                  const cfg = DIFFICULTY_PRESETS[level];
                  const active = level === difficulty;
                  return (
                    <button
                      key={level}
                      onClick={() => {
                        onChangeDifficulty(level);
                        setShowDiffMenu(false);
                      }}
                      className={`text-left p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                        active
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div>{cfg.name}</div>
                        <div className={`text-[10px] ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                          {cfg.badge}
                        </div>
                      </div>
                      <div className="font-mono text-[10px] font-bold">
                        {cfg.drainLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Overall Stability Badge */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <div className="text-right">
              <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-slate-400">
                <span>Stability</span>
                <span className="text-[9px] text-rose-400 font-mono font-bold flex items-center animate-pulse" title={`Environmental decay is draining bars: ${diffConfig.drainLabel}`}>
                  ▼ {diffConfig.drainLabel}
                </span>
              </div>
              <div className="text-sm font-bold text-emerald-300">{averageSanctuaryHealth}%</div>
            </div>
            <div className="w-7 h-7 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-slate-950 text-[11px] font-bold">
              {averageSanctuaryHealth >= 60 ? '🌿' : averageSanctuaryHealth >= 35 ? '⚠️' : '🚨'}
            </div>
          </div>
        </div>

        {/* 3 Core City Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full md:w-auto flex-1 max-w-2xl px-1">
          {/* Resource Stability */}
          <div className={`bg-slate-950/60 p-2 sm:px-3 sm:py-2 rounded-xl border ${getMetricBorder(metrics.resource_stability)} transition-all`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-medium text-cyan-300 truncate">
                <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="hidden sm:inline">Resource</span> Stability
              </span>
              <span className="font-bold text-xs font-mono">{metrics.resource_stability}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, metrics.resource_stability))}%` }}
              />
            </div>
            <div className="text-[9px] text-slate-400 mt-1 truncate hidden sm:block">Water · Energy · Materials</div>
          </div>

          {/* Ecological Health */}
          <div className={`bg-slate-950/60 p-2 sm:px-3 sm:py-2 rounded-xl border ${getMetricBorder(metrics.ecological_health)} transition-all`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-medium text-emerald-300 truncate">
                <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">Ecological</span> Health
              </span>
              <span className="font-bold text-xs font-mono">{metrics.ecological_health}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, metrics.ecological_health))}%` }}
              />
            </div>
            <div className="text-[9px] text-slate-400 mt-1 truncate hidden sm:block">Biodiversity · Oceans · Climate</div>
          </div>

          {/* Community Well-Being */}
          <div className={`bg-slate-950/60 p-2 sm:px-3 sm:py-2 rounded-xl border ${getMetricBorder(metrics.community_well_being)} transition-all`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-medium text-amber-300 truncate">
                <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Community</span> Well-Being
              </span>
              <span className="font-bold text-xs font-mono">{metrics.community_well_being}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, metrics.community_well_being))}%` }}
              />
            </div>
            <div className="text-[9px] text-slate-400 mt-1 truncate hidden sm:block">Equity · Health · Education</div>
          </div>
        </div>

        {/* Action Controls & Eco-Points */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Eco-Points Bank */}
          <button
            onClick={onOpenShop}
            className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 px-3 py-1.5 rounded-xl cursor-pointer text-xs transition-colors"
            title="Click to open Landmark Upgrades Shop"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-300 font-mono">{ecoPoints}</span>
            <span className="text-[10px] text-emerald-400 uppercase">Eco-Pts</span>
          </button>

          {/* SwiftUI / JSON schema debug */}
          {onOpenSwiftUI && (
            <button
              onClick={onOpenSwiftUI}
              className="bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 px-2.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center gap-1"
              title="SwiftUI Data Bridge & JSON Schema"
            >
              <span className="font-mono font-bold text-[11px]">{`{ }`}</span>
              <span className="hidden lg:inline text-[11px]">SwiftUI JSON</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Upgrades & City Tech Perks Ribbon */}
      {(hasFastDoorUpgrade || cityHealthShields > 0 || hasSecondChance || hasSolarPanels || hasWindTurbines || hasBeaconOfHope) && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] font-semibold text-slate-300 scrollbar-none">
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold shrink-0">
            Active Sanctuary Tech:
          </span>
          {cityHealthShields > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 shrink-0 shadow-sm animate-pulse">
              <span>🛡️ {cityHealthShields}/3 Health Shields</span>
            </span>
          )}
          {hasSecondChance && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border shrink-0 ${
              secondChanceUsed
                ? 'bg-slate-900 border-slate-700 text-slate-400 line-through'
                : 'bg-teal-950/90 border-teal-500/60 text-teal-300 shadow-sm'
            }`}>
              <span>♻️ 2nd Chance {secondChanceUsed ? '(Expended)' : '(Armed - 25% Reset)'}</span>
            </span>
          )}
          {hasSolarPanels && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 shrink-0">
              <span>☀️ +10% Solar Bonus</span>
            </span>
          )}
          {hasWindTurbines && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/50 text-sky-300 shrink-0">
              <span>🌬️ +10% Wind Bonus</span>
            </span>
          )}
          {hasBeaconOfHope && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-950/90 border border-yellow-400/60 text-yellow-200 shrink-0 shadow-[0_0_10px_rgba(250,204,21,0.2)]">
              <span>🌟 1.5x Reward Multiplier</span>
            </span>
          )}
          {hasFastDoorUpgrade && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/50 text-indigo-300 shrink-0">
              <span>⚡ 10-Click Airlock</span>
            </span>
          )}
        </div>
      )}
    </header>
  );
};
