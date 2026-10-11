import React from 'react';
import { X, Award, Check, Sparkles, Building, Lock } from 'lucide-react';
import { Landmark } from '../types/game';
import { sound } from '../services/sound';

interface ShopModalProps {
  landmarks: Landmark[];
  ecoPoints: number;
  onPurchaseLandmark: (landmark: Landmark) => void;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  landmarks,
  ecoPoints,
  onPurchaseLandmark,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-emerald-900/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Fredoka']">
                Verdia Special Tech &amp; Upgrades Shop
              </h2>
              <p className="text-xs text-slate-300">
                Unlock unique special abilities: fast airlock crank, point multipliers, shields, and second chance!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-emerald-950 px-3.5 py-1.5 rounded-xl border border-emerald-700/60">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="font-mono font-bold text-emerald-300 text-sm">{ecoPoints}</span>
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Eco-Pts</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Landmark Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto">
          {landmarks.map((item) => {
            const canAfford = ecoPoints >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  item.unlocked
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                    : canAfford
                    ? 'bg-slate-950/60 border-slate-700 hover:border-emerald-500/50'
                    : 'bg-slate-950/30 border-slate-800/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">{item.name}</h3>
                        {item.unlocked && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-1.5 py-0.2 rounded font-bold">
                            Constructed
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <div className="font-mono font-bold text-xs px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-200">
                      {item.cost} Pts
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-teal-300 bg-teal-950/50 px-2.5 py-1.5 rounded-xl border border-teal-800/50 mb-3">
                    <span className="font-bold">Special Power:</span> {item.impactLabel}
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    "{item.lore}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end">
                  {item.unlocked ? (
                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Active in Verdia
                    </div>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => {
                        sound.playSuccess();
                        onPurchaseLandmark(item);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Build Upgrade ({item.cost} Pts)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 text-xs text-slate-400 text-center">
          Every upgrade in this shop grants an active special ability to help you clear missions and prevent sanctuary collapse.
        </div>
      </div>
    </div>
  );
};
