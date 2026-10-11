import React, { useState } from 'react';
import { X, CheckCircle2, Globe, Radio, Sparkles, BookOpen, Handshake, Cpu } from 'lucide-react';
import { sound } from '../../services/sound';

interface GlobalNetworkMiniGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface RelayNode {
  id: number;
  name: string;
  icon: string;
  targetFreq: number;
  currentFreq: number;
  synced: boolean;
}

const INITIAL_NODES: RelayNode[] = [
  { id: 1, name: 'Open Nature Curriculum', icon: '📚', targetFreq: 140, currentFreq: 100, synced: false },
  { id: 2, name: 'Global Seed Bank Radio', icon: '🌾', targetFreq: 220, currentFreq: 180, synced: false },
  { id: 3, name: 'Clean Tech Blueprint Link', icon: '🔬', targetFreq: 310, currentFreq: 250, synced: false },
  { id: 4, name: 'Inter-City Peace Accord', icon: '🕊️', targetFreq: 450, currentFreq: 390, synced: false },
];

export const GlobalNetworkMiniGame: React.FC<GlobalNetworkMiniGameProps> = ({
  onComplete,
  onClose,
}) => {
  const [nodes, setNodes] = useState<RelayNode[]>(INITIAL_NODES);
  const [score, setScore] = useState<number>(0);

  const allSynced = nodes.every((n) => n.synced);

  const handleTuneNode = (id: number) => {
    sound.playClick();
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;
        const nextFreq = n.currentFreq + 20;
        const isNowSynced = nextFreq >= n.targetFreq;
        if (isNowSynced && !n.synced) {
          sound.playSuccess();
          setScore((s) => s + 25);
        }
        return {
          ...n,
          currentFreq: Math.min(n.targetFreq, nextFreq),
          synced: isNowSynced,
        };
      })
    );
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete(100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md font-['Plus_Jakarta_Sans'] select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-indigo-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-indigo-900/60 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white font-['Fredoka']">
                Global Partnership Radio Relay
              </h3>
              <p className="text-xs text-indigo-300">
                SDG 17: Sync world communication relays to share seeds, books & clean technology!
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
          <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-indigo-950">
            Tune all 4 international relay frequencies to transmit knowledge, open green patents, and friendship worldwide!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map((n) => {
              const progress = Math.min(100, Math.round((n.currentFreq / n.targetFreq) * 100));
              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    n.synced
                      ? 'bg-indigo-950/60 border-indigo-400/80 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{n.icon}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        n.synced
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {n.synced ? 'LINKED ✓' : `${n.currentFreq} MHz`}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-white mb-2">{n.name}</div>

                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 mb-3 border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${
                        n.synced ? 'bg-emerald-400' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <button
                    onClick={() => handleTuneNode(n.id)}
                    disabled={n.synced}
                    className={`w-full py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      n.synced
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95'
                    }`}
                  >
                    {n.synced ? 'Node Online' : 'Tune Frequency (+20)'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* All Linked Victory */}
          {allSynced ? (
            <div className="bg-emerald-950/90 border-2 border-emerald-400 p-4 rounded-2xl text-center flex flex-col items-center gap-2 animate-bounce-subtle mt-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <div className="font-bold text-white font-['Fredoka'] text-base">
                Global Network Synchronized!
              </div>
              <p className="text-xs text-emerald-200">
                Verdia is now beaming regenerative blueprints, peaceful cooperation, and shared seeds across all continents!
              </p>
              <button
                onClick={handleFinish}
                className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm cursor-pointer shadow-lg shadow-emerald-500/30"
              >
                Complete Mission (+100 Eco-Pts)
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 font-mono">
              Tune each node until all four signals lock onto target frequency!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
