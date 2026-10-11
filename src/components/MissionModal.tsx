import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, AlertCircle, Play, Code2, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { TurnScenarioJSON, ScenarioOption, CityMetrics, MetricImpact } from '../types/game';
import { CharacterPip } from './CharacterPip';
import { sound } from '../services/sound';

interface MissionModalProps {
  scenario: TurnScenarioJSON;
  onClose: () => void;
  onApplyOutcome: (impact: MetricImpact, pointsEarned: number, completedSdgId?: number, isWrongAnswer?: boolean) => void;
  onLaunchMiniGame: (gameType: string, sdgId?: number) => void;
  onOpenSwiftUIInspector: () => void;
  currentMetrics: CityMetrics;
  cityHealthShields?: number;
}

export const MissionModal: React.FC<MissionModalProps> = ({
  scenario,
  onClose,
  onApplyOutcome,
  onLaunchMiniGame,
  onOpenSwiftUIInspector,
  currentMetrics,
  cityHealthShields = 0,
}) => {
  const [shuffledOptions, setShuffledOptions] = useState<ScenarioOption[]>(() =>
    [...scenario.options].sort(() => Math.random() - 0.5)
  );
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [stage, setStage] = useState<'question' | 'ready_for_minigame'>('question');

  // Randomize question options whenever scenario changes so the correct option is not always first
  useEffect(() => {
    const randomized = [...scenario.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(randomized);
    setSelectedOption(null);
    setHasSubmitted(false);
    setStage('question');
  }, [scenario]);

  const handleSelect = (option: ScenarioOption) => {
    if (hasSubmitted && stage === 'ready_for_minigame') return;
    sound.playClick();
    setSelectedOption(option);
    // If previously submitted an incorrect answer and changing selection, reset submit state
    if (hasSubmitted && !selectedOption?.is_correct) {
      setHasSubmitted(false);
    }
  };

  const handleSubmitChoice = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);

    if (selectedOption.is_correct) {
      sound.playSuccess();
      // Partial knowledge points, but sector is NOT restored until mandatory mini-game is won!
      onApplyOutcome(selectedOption.metric_impact, 20, undefined, false);
      setStage('ready_for_minigame');
    } else {
      sound.playWarning();
      // Wrong answer directly penalizes and drains city bars!
      const wrongImpact: MetricImpact = {
        resource_stability: selectedOption.metric_impact.resource_stability !== undefined && selectedOption.metric_impact.resource_stability < 0
          ? selectedOption.metric_impact.resource_stability
          : -12,
        ecological_health: selectedOption.metric_impact.ecological_health !== undefined && selectedOption.metric_impact.ecological_health < 0
          ? selectedOption.metric_impact.ecological_health
          : -12,
        community_well_being: selectedOption.metric_impact.community_well_being !== undefined && selectedOption.metric_impact.community_well_being < 0
          ? selectedOption.metric_impact.community_well_being
          : -10,
      };
      onApplyOutcome(wrongImpact, 0, undefined, true);
    }
  };

  const handleStartMandatoryMiniGame = () => {
    sound.playClick();
    onClose();
    onLaunchMiniGame(scenario.mini_game_type || 'water', scenario.sdg_number);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-emerald-500/50 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col font-['Fredoka']">
        {/* Top Header Bar */}
        <div className="bg-slate-950/90 border-b border-emerald-900/60 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{scenario.question_visual || '🌱'}</span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {scenario.sdg_goal}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSwiftUIInspector}
              className="text-xs text-indigo-300 hover:text-white bg-indigo-950/70 border border-indigo-700/60 px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{`{ } JSON`}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {/* Character Speech Bubble: Pip's Friendly Briefing */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-950/80 to-slate-950 border border-emerald-500/40 rounded-3xl p-4 flex items-center gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <CharacterPip
                mood={
                  stage === 'ready_for_minigame'
                    ? 'cheering'
                    : hasSubmitted
                    ? selectedOption?.is_correct
                      ? 'cheering'
                      : 'concerned'
                    : 'thinking'
                }
                size="sm"
                showBackpack={true}
              />
              <span className="text-[11px] font-bold text-emerald-300 mt-1">
                Pip Scout
              </span>
            </div>

            <div className="flex-1">
              <p className="text-base text-slate-100 leading-snug font-medium">
                "{scenario.character_dialogue}"
              </p>
              <div className="mt-2 text-xs text-emerald-400/90 font-['Plus_Jakarta_Sans'] font-medium">
                📍 {scenario.location_background}
              </div>
            </div>
          </div>

          {/* VISUAL QUESTION CARD */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-amber-400/40 shadow-inner flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400/20 border-2 border-amber-400/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-lg">
              {scenario.question_visual || '❓'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  Step 1: Choose the Right Solution (Randomized Order)
                </span>
                {cityHealthShields > 0 && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 flex items-center gap-1 shadow-sm animate-pulse">
                    <span>🛡️ {cityHealthShields}/3 Health Shields</span>
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {scenario.question}
              </h3>
            </div>
          </div>

          {/* SHUFFLED VISUAL CHOICES */}
          <div className="space-y-3">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              let borderStyle = 'border-slate-800 bg-slate-950/60 hover:border-slate-600';
              let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';

              if (hasSubmitted) {
                if (option.is_correct) {
                  borderStyle = 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(52,211,153,0.3)]';
                  badgeColor = 'bg-emerald-500 text-slate-950 border-emerald-300 font-bold';
                } else if (isSelected && !option.is_correct) {
                  borderStyle = 'border-rose-500 bg-rose-950/70 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
                  badgeColor = 'bg-rose-500 text-white border-rose-300';
                } else {
                  borderStyle = 'border-slate-900 bg-slate-950/30 opacity-50';
                }
              } else if (isSelected) {
                borderStyle = 'border-amber-400 bg-amber-950/50 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-[1.01]';
                badgeColor = 'bg-amber-400 text-slate-950 border-amber-300 font-bold';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className={`p-4 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col gap-2 ${borderStyle}`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Visual Icon Box */}
                    <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow">
                      {option.visual_icon || (option.is_correct ? '🌱' : '⚠️')}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          Option {String.fromCharCode(65 + idx)} {option.visual_tag ? `· ${option.visual_tag}` : ''}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-slate-100 leading-snug">
                        {option.text}
                      </p>
                    </div>
                  </div>

                  {/* Feedback explanation when submitted */}
                  {hasSubmitted && isSelected && (
                    <div className="mt-2 pt-2 border-t border-slate-700/60 text-xs sm:text-sm flex items-start gap-2 animate-bounce-subtle">
                      {option.is_correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-bold text-white mb-0.5">
                          {option.is_correct
                            ? 'Great Choice!'
                            : cityHealthShields > 0
                            ? 'Wrong Answer (Shield Absorbed!)'
                            : 'Wrong Answer (Bars Lost!)'}
                        </div>
                        <p className="text-slate-200 leading-relaxed font-['Plus_Jakarta_Sans']">
                          {option.feedback}
                        </p>
                        {!option.is_correct && (
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs font-mono font-bold">
                            {cityHealthShields > 0 ? (
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/70 flex items-center gap-1 shadow">
                                <span>🛡️</span> Protected by City Health Shield! (0 bars deducted)
                              </span>
                            ) : (
                              <>
                                <span className="px-2 py-0.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-600/60 flex items-center gap-1">
                                  <span>💧</span> -12% Resources
                                </span>
                                <span className="px-2 py-0.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-600/60 flex items-center gap-1">
                                  <span>🌿</span> -12% Nature
                                </span>
                                <span className="px-2 py-0.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-600/60 flex items-center gap-1">
                                  <span>🤝</span> -10% Community
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* MANDATORY MINI-GAME NOTICE / CARD */}
          <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
            stage === 'ready_for_minigame'
              ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-pulse'
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎮</span>
              <div>
                <div className={`text-xs uppercase font-bold ${
                  stage === 'ready_for_minigame' ? 'text-amber-300' : 'text-slate-400'
                }`}>
                  Step 2: Mandatory Hands-On Mini-Game
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  {stage === 'ready_for_minigame'
                    ? '⚡ You must beat this mini-game to finish restoring this sector!'
                    : scenario.mini_game_prompt}
                </div>
              </div>
            </div>

            {stage === 'ready_for_minigame' && (
              <button
                onClick={handleStartMandatoryMiniGame}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-2xl text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-lg shadow-amber-400/40"
              >
                <span>Play Mini-Game to Win</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-['Plus_Jakarta_Sans']">
            {stage === 'ready_for_minigame'
              ? '⚠️ Mini-game required to complete the level.'
              : hasSubmitted && !selectedOption?.is_correct
              ? 'Pick another choice above to proceed.'
              : 'Pick an answer and click Submit.'}
          </div>

          {stage === 'ready_for_minigame' ? (
            <button
              onClick={handleStartMandatoryMiniGame}
              className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-lg shadow-amber-400/30 flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Launch Mini-Game</span>
            </button>
          ) : (
            <button
              disabled={!selectedOption}
              onClick={handleSubmitChoice}
              className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
