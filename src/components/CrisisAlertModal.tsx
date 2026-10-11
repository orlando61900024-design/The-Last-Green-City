import React from 'react';
import { X, AlertTriangle, ShieldAlert, Zap, Droplets, CheckCircle2 } from 'lucide-react';
import { CrisisEvent, MetricImpact } from '../types/game';
import { sound } from '../services/sound';

interface CrisisAlertModalProps {
  event: CrisisEvent;
  ecoPoints: number;
  onResolve: (impact: MetricImpact, cost: number) => void;
  onClose: () => void;
}

export const CrisisAlertModal: React.FC<CrisisAlertModalProps> = ({
  event,
  ecoPoints,
  onResolve,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-amber-500/80 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col font-['Plus_Jakarta_Sans'] animate-shake-subtle">
        {/* Urgent Header */}
        <div className="bg-amber-950/80 border-b border-amber-700/60 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-900 border border-amber-500 flex items-center justify-center text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400">
                Verdia Perimeter Emergency Triage
              </span>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                {event.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {event.description}
          </p>

          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 text-xs font-bold text-amber-300">
            Dilemma: {event.dilemma}
          </div>

          {/* Choices */}
          <div className="space-y-3 pt-2">
            {event.choices.map((choice, i) => {
              const canAfford = ecoPoints >= choice.cost;

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (canAfford) {
                      sound.playSuccess();
                      onResolve(choice.impact, choice.cost);
                    } else {
                      sound.playWarning();
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    canAfford
                      ? 'bg-slate-950/60 border-slate-700 hover:border-amber-400 hover:bg-amber-950/20'
                      : 'bg-slate-950/30 border-slate-900 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white mb-1">
                      {choice.label}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono font-semibold">
                      {choice.impact.resource_stability !== undefined && (
                        <span className={choice.impact.resource_stability >= 0 ? 'text-cyan-400' : 'text-rose-400'}>
                          💧 {choice.impact.resource_stability >= 0 ? '+' : ''}{choice.impact.resource_stability}%
                        </span>
                      )}
                      {choice.impact.ecological_health !== undefined && (
                        <span className={choice.impact.ecological_health >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          🌿 {choice.impact.ecological_health >= 0 ? '+' : ''}{choice.impact.ecological_health}%
                        </span>
                      )}
                      {choice.impact.community_well_being !== undefined && (
                        <span className={choice.impact.community_well_being >= 0 ? 'text-amber-400' : 'text-rose-400'}>
                          🤝 {choice.impact.community_well_being >= 0 ? '+' : ''}{choice.impact.community_well_being}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
                      choice.cost > 0
                        ? canAfford ? 'bg-amber-950 text-amber-300 border-amber-700' : 'bg-rose-950 text-rose-300 border-rose-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {choice.cost > 0 ? `${choice.cost} Eco-Pts` : 'Free (Costly Consequences)'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 text-xs text-slate-400 text-center">
          Decisions immediately impact citywide stability. Triage wisely.
        </div>
      </div>
    </div>
  );
};
