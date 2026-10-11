import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Terminal, Flame, Zap, Clock, ShieldCheck, ArrowLeft, Play } from 'lucide-react';
import { sound } from '../services/sound';
import { DifficultyLevel } from '../types/game';
import { DIFFICULTY_PRESETS } from '../data/difficulty';

interface TitleScreenProps {
  onSelectPlay: (difficulty: DifficultyLevel) => void;
  onSelectMenu: (menu: 'shop' | 'merchandise' | 'credits') => void;
  onOpenSwiftUIInspector?: () => void;
  ecoPoints: number;
}

type MainMenuItem = 'play' | 'shop' | 'merchandise' | 'credits';

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onSelectPlay,
  onSelectMenu,
  onOpenSwiftUIInspector,
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [viewState, setViewState] = useState<'main' | 'difficulty'>('main');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hoveredItem, setHoveredItem] = useState<MainMenuItem | null>('play');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('normal');

  const menuItems: { id: MainMenuItem; label: string }[] = [
    { id: 'play', label: 'PLAY' },
    { id: 'shop', label: 'SHOP' },
    { id: 'merchandise', label: 'MERCHANDISE' },
    { id: 'credits', label: 'CREDITS' },
  ];

  const difficultyList: DifficultyLevel[] = ['easy', 'normal', 'hard', 'expert'];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewState === 'main') {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => {
            const next = (prev + 1) % menuItems.length;
            setHoveredItem(menuItems[next].id);
            sound.playClick();
            return next;
          });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => {
            const next = (prev - 1 + menuItems.length) % menuItems.length;
            setHoveredItem(menuItems[next].id);
            sound.playClick();
            return next;
          });
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const active = menuItems[selectedIndex].id;
          if (active === 'play') {
            sound.playClick();
            setViewState('difficulty');
          } else {
            sound.playSuccess();
            onSelectMenu(active);
          }
        }
      } else if (viewState === 'difficulty') {
        if (e.key === 'Escape') {
          sound.playClick();
          setViewState('main');
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedDifficulty((prev) => {
            const idx = difficultyList.indexOf(prev);
            const next = difficultyList[(idx + 1) % difficultyList.length];
            sound.playClick();
            return next;
          });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedDifficulty((prev) => {
            const idx = difficultyList.indexOf(prev);
            const next = difficultyList[(idx - 1 + difficultyList.length) % difficultyList.length];
            sound.playClick();
            return next;
          });
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sound.playSuccess();
          onSelectPlay(selectedDifficulty);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, viewState, selectedDifficulty]);

  const handleMenuClick = (menu: MainMenuItem) => {
    if (menu === 'play') {
      sound.playClick();
      setViewState('difficulty');
    } else {
      sound.playSuccess();
      onSelectMenu(menu);
    }
  };

  const handleDifficultyClick = (diff: DifficultyLevel) => {
    sound.playSuccess();
    onSelectPlay(diff);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.startAmbient();
      sound.playSuccess();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0c1626] font-['Fredoka'] select-none flex flex-col justify-between">
      {/* Background: Exact, unmodified concept artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cf53fe71-38b9-4af2-972d-4202d086fad8.jpeg"
          alt="The Last Green City - Night Balcony Overlook"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.indexOf('menu_bg.jpg') === -1) {
              target.src = '/menu_bg.jpg';
            }
          }}
        />
      </div>

      {/* Subtle Floating Embers / Bioluminescent Spores */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[
          { left: '10%', bottom: '20%', delay: '0s', dur: '7s' },
          { left: '22%', bottom: '15%', delay: '2s', dur: '9s' },
          { left: '35%', bottom: '25%', delay: '4s', dur: '8s' },
          { left: '48%', bottom: '10%', delay: '1s', dur: '10s' },
          { left: '62%', bottom: '30%', delay: '3s', dur: '7.5s' },
          { left: '75%', bottom: '18%', delay: '5s', dur: '8.5s' },
          { left: '88%', bottom: '22%', delay: '2.5s', dur: '9.5s' },
        ].map((ember, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-200/60 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse"
            style={{
              left: ember.left,
              bottom: ember.bottom,
              animationDuration: ember.dur,
              animationDelay: ember.delay,
            }}
          />
        ))}
      </div>

      {/* Top Corner Utilities */}
      <div className="relative z-30 flex items-center justify-between p-4 sm:p-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300 font-['Plus_Jakarta_Sans'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Verdia Sanctuary Protocol</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-slate-200 transition-all hover:scale-110 cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Soundscape' : 'Mute Soundscape'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-300" />
            )}
          </button>

          {/* SwiftUI JSON Bridge Inspector */}
          {onOpenSwiftUIInspector && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenSwiftUIInspector();
              }}
              className="bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans'] font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer shadow-lg"
              title="SwiftUI Data Bridge"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline text-[11px]">SwiftUI Bridge</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-30 flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-20 lg:px-24 max-w-7xl mx-auto w-full pb-16">
        {viewState === 'main' ? (
          /* MAIN MENU (Matching uploaded sketch layout) */
          <div className="max-w-xl">
            {/* Game Title:
                THE LAST
                GREEN
                CITY
            */}
            <div className="mb-8 sm:mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-normal text-white uppercase leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] font-['Fredoka']">
                THE LAST<br />
                GREEN<br />
                CITY
              </h1>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col items-start gap-4 sm:gap-5">
              {menuItems.map((item, index) => {
                const isCurrent = hoveredItem === item.id || selectedIndex === index;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    onMouseEnter={() => {
                      setHoveredItem(item.id);
                      setSelectedIndex(index);
                      sound.playClick();
                    }}
                    className={`text-left text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer font-['Fredoka'] relative group ${
                      isCurrent
                        ? 'text-white scale-105 pl-3'
                        : 'text-white/80 hover:text-white pl-0'
                    }`}
                    style={{
                      textShadow: isCurrent
                        ? '0 0 25px rgba(254, 215, 170, 0.95), 0 0 50px rgba(251, 191, 36, 0.75), 0 2px 8px rgba(0, 0, 0, 0.9)'
                        : '0 2px 8px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {isCurrent && (
                      <span className="absolute inset-0 bg-amber-400/25 blur-xl -z-10 rounded-full pointer-events-none scale-125" />
                    )}

                    <span className="relative z-10 flex items-center gap-2">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* DIFFICULTY SELECTION SCREEN (Appears when PLAY is pressed) */
          <div className="max-w-xl animate-fade-in">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewState('main');
                }}
                className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
                title="Back to Main Menu"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  Select Difficulty
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Environmental Pressure
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 mb-5 font-['Plus_Jakarta_Sans'] font-medium drop-shadow leading-relaxed">
              Choose how fast your city metrics slowly drain. Higher difficulties drain bars faster!
            </p>

            {/* 4 Difficulty Cards */}
            <div className="space-y-3">
              {difficultyList.map((levelKey) => {
                const config = DIFFICULTY_PRESETS[levelKey];
                const isSelected = selectedDifficulty === levelKey;

                const iconMap: Record<DifficultyLevel, React.ReactNode> = {
                  easy: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                  normal: <Clock className="w-5 h-5 text-amber-400" />,
                  hard: <Zap className="w-5 h-5 text-orange-400" />,
                  expert: <Flame className="w-5 h-5 text-rose-400 animate-pulse" />,
                };

                const borderMap: Record<DifficultyLevel, string> = {
                  easy: isSelected ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_25px_rgba(52,211,153,0.4)]' : 'border-slate-800/80 bg-slate-950/70',
                  normal: isSelected ? 'border-amber-400 bg-amber-950/70 shadow-[0_0_25px_rgba(251,191,36,0.4)]' : 'border-slate-800/80 bg-slate-950/70',
                  hard: isSelected ? 'border-orange-400 bg-orange-950/70 shadow-[0_0_25px_rgba(251,146,60,0.4)]' : 'border-slate-800/80 bg-slate-950/70',
                  expert: isSelected ? 'border-rose-400 bg-rose-950/70 shadow-[0_0_25px_rgba(244,63,94,0.4)]' : 'border-slate-800/80 bg-slate-950/70',
                };

                return (
                  <div
                    key={levelKey}
                    onClick={() => handleDifficultyClick(levelKey)}
                    onMouseEnter={() => {
                      setSelectedDifficulty(levelKey);
                      sound.playClick();
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 backdrop-blur-md ${borderMap[levelKey]} ${
                      isSelected ? 'scale-[1.02]' : 'hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center shrink-0 shadow">
                        {iconMap[levelKey]}
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl font-bold text-white leading-none">
                            {config.name}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {config.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 font-['Plus_Jakarta_Sans']">
                          {config.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-bold text-amber-300 font-mono">
                        {config.drainLabel}
                      </div>
                      <div className="text-[10px] text-slate-400 font-['Plus_Jakarta_Sans']">
                        Drain Rate
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Start Button */}
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => handleDifficultyClick(selectedDifficulty)}
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-lg transition-all cursor-pointer shadow-lg shadow-amber-400/40 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Start with {DIFFICULTY_PRESETS[selectedDifficulty].name}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setViewState('main');
                }}
                className="py-3 px-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-sm transition-all cursor-pointer border border-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Bottom Instruction */}
      <div className="relative z-30 w-full p-4 sm:p-6 text-center text-xs text-white/50 font-['Plus_Jakarta_Sans'] pointer-events-none flex items-center justify-between max-w-7xl mx-auto">
        <span className="text-[11px] hidden sm:inline">Use ↑ ↓ Arrow Keys or Click to Choose</span>
        <span className="text-[11px] mx-auto sm:mx-0">United Nations 17 Sustainable Development Goals (SDGs)</span>
      </div>
    </div>
  );
};
