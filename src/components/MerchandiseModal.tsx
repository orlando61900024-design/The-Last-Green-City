import React, { useState } from 'react';
import { X, Gift, Award, Sparkles, Check, RotateCw, Heart, Eye } from 'lucide-react';
import { MerchandiseItem } from '../types/game';
import { CharacterPip } from './CharacterPip';
import { sound } from '../services/sound';

interface MerchandiseModalProps {
  items: MerchandiseItem[];
  ecoPoints: number;
  onUnlockItem: (item: MerchandiseItem) => void;
  onClose: () => void;
}

export const MerchandiseModal: React.FC<MerchandiseModalProps> = ({
  items,
  ecoPoints,
  onUnlockItem,
  onClose,
}) => {
  const [selectedItem, setSelectedItem] = useState<MerchandiseItem>(items[0]);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  const handleSelect = (item: MerchandiseItem) => {
    sound.playClick();
    setSelectedItem(item);
    setRotationAngle(0);
  };

  const handleRotate = () => {
    sound.playClick();
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-cyan-900/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Fredoka']">
                The Last Green City — Official Merchandise
              </h2>
              <p className="text-xs text-slate-300">
                Eco-crafted physical goods celebrating Verdia's living heritage. Produced under closed-loop circular standards.
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

        {/* Showcase Stage */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Left: Merchandise Items List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Item ({items.length} Concept Collectibles)
            </h3>
            {items.map((item) => {
              const isSelected = selectedItem.id === item.id;
              const canUnlock = ecoPoints >= item.pricePoints;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                      {item.type === 'standee' ? '🧍‍♂️' : item.type === 'keychain' ? '🔮' : item.type === 'hat' ? '🧢' : '📖'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.tagline}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {item.unlocked ? (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded font-bold">
                        Owned
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold text-cyan-300">
                        {item.pricePoints} Pts
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive 3D / Detailed Inspection Showcase */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between">
            {/* Visual Display Center */}
            <div className="relative w-full aspect-square max-h-[300px] flex items-center justify-center bg-gradient-to-b from-slate-900/60 to-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden shadow-inner">
              {/* Product Visual based on type */}
              <div
                className="transition-transform duration-500 flex items-center justify-center w-full h-full p-4"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
              >
                {selectedItem.type === 'standee' && (
                  /* Acrylic Standee with clear base and gloss */
                  <div className="flex flex-col items-center justify-center relative">
                    {/* Clear acrylic outline border */}
                    <div className="relative p-3 rounded-3xl border-2 border-cyan-400/50 bg-cyan-400/5 backdrop-blur-sm shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                      <CharacterPip mood="happy" size="md" showBackpack={true} />
                      {/* Acrylic Light Reflection Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-3xl" />
                    </div>
                    {/* Acrylic Stand Base (From user sketch) */}
                    <div className="w-36 h-6 rounded-full bg-white/90 border-2 border-slate-400 shadow-xl -mt-2 flex items-center justify-center">
                      <div className="w-24 h-1.5 rounded-full bg-slate-300" />
                    </div>
                  </div>
                )}

                {selectedItem.type === 'keychain' && (
                  /* Terrarium Keychain from user sketch */
                  <div className="flex flex-col items-center justify-center">
                    {/* Carabiner & Swivel Chain */}
                    <div className="w-12 h-14 rounded-full border-4 border-amber-500/80 flex flex-col items-center -mb-2 shadow-md">
                      <div className="w-4 h-4 rounded-full border-2 border-amber-600 bg-slate-900 mt-6" />
                    </div>
                    {/* Glass Bulb Terrarium */}
                    <div className="relative w-36 h-44 rounded-b-[45px] rounded-t-[30px] border-4 border-slate-300 bg-gradient-to-b from-cyan-400/10 via-emerald-400/15 to-emerald-950/50 backdrop-blur-sm shadow-[0_0_30px_rgba(52,211,153,0.4)] flex flex-col items-center justify-end p-3 overflow-hidden">
                      {/* Miniature Forest inside */}
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-3xl">🌲</span>
                        <span className="text-4xl -mx-1">🌳</span>
                        <span className="text-3xl">🌱</span>
                      </div>
                      {/* Green grass layer */}
                      <div className="w-full h-3 bg-emerald-500 rounded-t-md"></div>
                      {/* Rich Loam soil with visible root tendrils */}
                      <div className="w-full h-8 bg-[#8B5A2B] rounded-b-[35px] relative flex flex-col items-center justify-center">
                        <span className="text-[10px] text-amber-200 font-mono font-bold">Living Roots</span>
                      </div>
                      {/* Glass highlight glare */}
                      <div className="absolute top-2 right-3 w-3 h-16 rounded-full bg-white/30 rotate-12 pointer-events-none" />
                    </div>
                  </div>
                )}

                {selectedItem.type === 'hat' && (
                  /* Two-tone bucket hat from user sketch */
                  <div className="flex flex-col items-center justify-center relative">
                    <div className="w-48 h-36 relative flex items-center justify-center">
                      {/* Hat Crown Split: Left Green, Right Terracotta Orange */}
                      <div className="w-36 h-24 rounded-t-3xl overflow-hidden flex border-2 border-slate-900 shadow-xl">
                        <div className="w-1/2 h-full bg-[#5EAA48] border-r border-slate-800"></div>
                        <div className="w-1/2 h-full bg-[#D9772B]"></div>
                      </div>
                      {/* Hat Brim */}
                      <div className="absolute bottom-2 w-48 h-10 rounded-b-2xl rounded-t-lg overflow-hidden flex border-2 border-slate-900 shadow-2xl">
                        <div className="w-1/2 h-full bg-[#4E943A]"></div>
                        <div className="w-1/2 h-full bg-[#B86220]"></div>
                      </div>
                      {/* Circular Embroidered Tree Badge from sketch */}
                      <div className="absolute top-8 left-12 w-10 h-10 rounded-full bg-emerald-950 border-2 border-amber-300 shadow-md flex items-center justify-center text-sm">
                        🌳
                      </div>
                      {/* Side Authenticity Tag */}
                      <div className="absolute bottom-4 left-4 w-4 h-5 bg-white border border-slate-600 rounded-xs flex items-center justify-center text-[7px] font-bold">
                        VER
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem.type === 'book' && (
                  /* Deluxe Artbook & Field Guide */
                  <div className="w-44 h-56 rounded-r-2xl rounded-l-md bg-gradient-to-r from-emerald-950 via-[#1e3a2f] to-[#122820] border-2 border-amber-400/50 shadow-2xl p-4 flex flex-col justify-between text-left relative">
                    <div className="w-3 h-full absolute left-0 top-0 bg-amber-900/60 border-r border-amber-500/40 rounded-l-md"></div>
                    <div className="ml-3">
                      <div className="text-[9px] uppercase font-bold tracking-widest text-amber-300">Official Lore</div>
                      <div className="text-sm font-bold text-white font-['Fredoka'] mt-1">THE LAST GREEN CITY</div>
                      <div className="text-[10px] text-emerald-300">Field Guide &amp; Turnaround Sheet</div>
                    </div>
                    <div className="ml-3 text-center">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <div className="ml-3 text-[9px] text-slate-400 font-mono">
                      UN SDG Compendium · 96 Pages
                    </div>
                  </div>
                )}
              </div>

              {/* Rotate 360 Inspection button */}
              <button
                onClick={handleRotate}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 text-[11px] font-medium cursor-pointer shadow"
                title="Rotate 90 degrees"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotate</span>
              </button>
            </div>

            {/* Description & Real-World Eco Pledge */}
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-base font-bold text-white">{selectedItem.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {selectedItem.description}
                </p>
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800/50 text-xs text-emerald-200">
                <span className="font-bold text-emerald-300">🌍 Real-World Eco Pledge:</span>{' '}
                {selectedItem.realWorldEcoPledge}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-slate-400 font-mono">
                  Price: <span className="text-emerald-400 font-bold">{selectedItem.pricePoints} Eco-Points</span>
                </div>

                {selectedItem.unlocked ? (
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-600">
                    <Check className="w-4 h-4" /> Added to Collection
                  </div>
                ) : (
                  <button
                    disabled={ecoPoints < selectedItem.pricePoints}
                    onClick={() => {
                      sound.playSuccess();
                      onUnlockItem(selectedItem);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Unlock Merch Collectible ({selectedItem.pricePoints} Pts)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 text-xs text-slate-400 text-center">
          Designs created faithfully from the original hand-drawn sketchbook concept art.
        </div>
      </div>
    </div>
  );
};
