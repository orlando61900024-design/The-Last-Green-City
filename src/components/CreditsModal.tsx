import React from 'react';
import { X, Heart, Globe, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { CharacterPip } from './CharacterPip';

interface CreditsModalProps {
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Fredoka']">
                The Last Green City — Credits &amp; Mission
              </h2>
              <p className="text-xs text-slate-400">
                A serious eco-strategy and narrative simulation for planetary recovery
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

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Hero Note */}
          <div className="bg-gradient-to-r from-emerald-950/50 to-teal-950/40 p-4 rounded-2xl border border-emerald-500/40 flex items-center gap-4">
            <CharacterPip mood="cheering" size="sm" showBackpack={true} />
            <div>
              <h3 className="text-sm font-bold text-emerald-300 font-['Fredoka']">
                "No Sanctuary Can Survive As An Island"
              </h3>
              <p className="text-xs text-slate-200 mt-1">
                Verdia represents human ingenuity and ecological balance, but our true goal is restoring the entire planet. Every choice in this game is grounded in peer-reviewed sustainability sciences and the United Nations 2030 Agenda.
              </p>
            </div>
          </div>

          {/* 1. Global Goals Foundation */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> United Nations Sustainable Development Goals (SDGs 1-17)
            </h4>
            <p className="text-xs text-slate-300">
              Adopted by all United Nations Member States in 2015, the 17 SDGs provide a shared blueprint for peace and prosperity for people and the planet, now and into the future. From ending poverty to clean water, affordable energy, climate action, and life beneath water.
            </p>
          </div>

          {/* 2. Scientific Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <div className="font-bold text-cyan-300 mb-1">💧 Resource Stability</div>
              <p className="text-[11px] text-slate-400">
                Closed-loop circular hydrology, solar-wind micro-grids, and zero-waste material cascades.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <div className="font-bold text-emerald-300 mb-1">🌿 Ecological Health</div>
              <p className="text-[11px] text-slate-400">
                Mycorrhizal rewilding, coral micro-fragmentation, bioswales, and atmospheric algae carbon scrubbers.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <div className="font-bold text-amber-300 mb-1">🤝 Community Well-Being</div>
              <p className="text-[11px] text-slate-400">
                Participatory governance, open knowledge repositories, gender parity, and environmental justice.
              </p>
            </div>
          </div>

          {/* 3. Concept Art & Character Design */}
          <div className="space-y-1">
            <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Character &amp; World Creation
            </h4>
            <p className="text-xs text-slate-300">
              Original visual concepts for <strong>Pip the Botanist Scout</strong>, the <strong>Living Terrarium Keychain</strong>, the <strong>Two-Tone Bucket Hat</strong>, and the <strong>Verdia Night Balcony</strong> were created directly from hand-drawn concept sketches provided by the author.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 text-center text-xs text-slate-400">
          Created for Google AI Studio · The Last Green City © 2026
        </div>
      </div>
    </div>
  );
};
