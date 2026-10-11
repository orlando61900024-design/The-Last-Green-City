import React, { useState, useEffect } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { CityMetricsBar } from './components/CityMetricsBar';
import { WorldEcoMap } from './components/WorldEcoMap';
import { MissionModal } from './components/MissionModal';
import { ShopModal } from './components/ShopModal';
import { MerchandiseModal } from './components/MerchandiseModal';
import { CreditsModal } from './components/CreditsModal';
import { CrisisAlertModal } from './components/CrisisAlertModal';
import { SwiftUIInspectorModal } from './components/SwiftUIInspectorModal';
import { WaterFiltrationMiniGame } from './components/minigames/WaterFiltrationMiniGame';
import { TreePlantingMiniGame } from './components/minigames/TreePlantingMiniGame';
import { WasteSortingMiniGame } from './components/minigames/WasteSortingMiniGame';
import { EnergyGridMiniGame } from './components/minigames/EnergyGridMiniGame';
import { OceanCleanupMiniGame } from './components/minigames/OceanCleanupMiniGame';
import { CommunityClinicMiniGame } from './components/minigames/CommunityClinicMiniGame';
import { GlobalNetworkMiniGame } from './components/minigames/GlobalNetworkMiniGame';
import { SDGUniqueMiniGameModal } from './components/minigames/SDGUniqueMiniGameModal';
import { VictoryEndingModal } from './components/VictoryEndingModal';
import { GameOverModal } from './components/GameOverModal';
import { CityGateMiniGame } from './components/CityGateMiniGame';

import { CityMetrics, MetricImpact, TurnScenarioJSON, SDGInfo, Landmark, MerchandiseItem, CrisisEvent, DifficultyLevel } from './types/game';
import { SDG_LIST, DEFAULT_SCENARIOS } from './data/sdgData';
import { LANDMARK_UPGRADES } from './data/landmarks';
import { MERCHANDISE_ITEMS } from './data/merchData';
import { DIFFICULTY_PRESETS } from './data/difficulty';
import { sound } from './services/sound';
import { ArrowLeft, Sparkles, Award } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'title' | 'map'>('title');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');

  // Core Game State
  const [metrics, setMetrics] = useState<CityMetrics>({
    resource_stability: 65,
    ecological_health: 60,
    community_well_being: 62,
  });

  const [ecoPoints, setEcoPoints] = useState<number>(140);
  const [sdgList, setSdgList] = useState<SDGInfo[]>(SDG_LIST);
  const [landmarks, setLandmarks] = useState<Landmark[]>(LANDMARK_UPGRADES);
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>(MERCHANDISE_ITEMS);

  // Active Modals
  const [activeModal, setActiveModal] = useState<
    'none' | 'mission' | 'shop' | 'merchandise' | 'credits' | 'crisis' | 'swiftui' | 'minigame' | 'victory' | 'gameover' | 'gate_minigame'
  >('none');

  const [currentScenario, setCurrentScenario] = useState<TurnScenarioJSON>(DEFAULT_SCENARIOS[6]);
  const [activeMiniGame, setActiveMiniGame] = useState<string>('water');
  const [pendingSectorSdgId, setPendingSectorSdgId] = useState<number | null>(null);
  const [activeCrisis, setActiveCrisis] = useState<CrisisEvent | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Landmark and Tech Upgrades State
  const [cityHealthShields, setCityHealthShields] = useState<number>(0);
  const [secondChanceUsed, setSecondChanceUsed] = useState<boolean>(false);

  // Shop item effects
  const hasFastDoorUpgrade = landmarks.some((l) => l.id === 'hydraulic_door_crank' && l.unlocked);
  const doorRequiredClicks = hasFastDoorUpgrade ? 10 : 25;

  const hasSolarPanels = landmarks.some((l) => l.id === 'solar_panel_arrays' && l.unlocked);
  const hasWindTurbines = landmarks.some((l) => l.id === 'wind_turbines' && l.unlocked);
  const hasSecondChance = landmarks.some((l) => l.id === 'advanced_recycling_centers' && l.unlocked);
  const hasFarmingDomes = landmarks.some((l) => l.id === 'vertical_farming_domes' && l.unlocked);
  const hasBeaconOfHope = landmarks.some((l) => l.id === 'beacon_of_hope' && l.unlocked);

  // Passive Environmental Pressure: Drain rate scales with selected difficulty
  useEffect(() => {
    if (currentView !== 'map') return;

    const intervalTime = DIFFICULTY_PRESETS[difficulty].drainIntervalMs;
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        resource_stability: Math.max(0, prev.resource_stability - 1),
        ecological_health: Math.max(0, prev.ecological_health - 1),
        community_well_being: Math.max(0, prev.community_well_being - 1),
      }));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentView, difficulty]);

  // Game Over Defeat Check: when all bars reach zero, check Second Chance or lose!
  useEffect(() => {
    if (currentView !== 'map') return;
    if (
      metrics.resource_stability <= 0 &&
      metrics.ecological_health <= 0 &&
      metrics.community_well_being <= 0 &&
      activeModal !== 'gameover'
    ) {
      // Advanced Recycling Centers gives players a Second Chance!
      if (hasSecondChance && !secondChanceUsed) {
        setSecondChanceUsed(true);
        sound.playSuccess();
        setMetrics({
          resource_stability: 25,
          ecological_health: 25,
          community_well_being: 25,
        });
        showToast('♻️ SECOND CHANCE ACTIVATED! Advanced Recycling Centers rebooted the sanctuary! All bars restored to 25%!');
        return;
      }

      setActiveModal('gameover');
    }
  }, [metrics, currentView, activeModal, hasSecondChance, secondChanceUsed]);

  // Victory Ending Check: when all 17 missions are completed, trigger the ending!
  useEffect(() => {
    if (currentView !== 'map') return;
    if (
      sdgList.length > 0 &&
      sdgList.every((s) => s.completed) &&
      activeModal !== 'victory' &&
      activeModal !== 'gameover'
    ) {
      sound.playSuccess();
      setActiveModal('victory');
    }
  }, [sdgList, currentView, activeModal]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Launch game with selected difficulty from Title Screen
  const handleSelectPlay = (chosenDifficulty: DifficultyLevel) => {
    setDifficulty(chosenDifficulty);
    const initial = DIFFICULTY_PRESETS[chosenDifficulty].initialStability;
    setMetrics({
      resource_stability: initial,
      ecological_health: Math.max(10, initial - 5),
      community_well_being: Math.max(10, initial - 2),
    });
    setCurrentView('map');
    sound.startAmbient();
    showToast(`🌍 Starting on ${DIFFICULTY_PRESETS[chosenDifficulty].name} (${DIFFICULTY_PRESETS[chosenDifficulty].drainLabel})`);
  };

  // Handlers for Title Screen Menu
  const handleSelectMenu = (menu: 'shop' | 'merchandise' | 'credits') => {
    if (menu === 'shop') {
      setActiveModal('shop');
    } else if (menu === 'merchandise') {
      setActiveModal('merchandise');
    } else if (menu === 'credits') {
      setActiveModal('credits');
    }
  };

  // Open Gate Mini-Game before mission quiz
  const handleSelectSDG = (sdg: SDGInfo) => {
    const scenario = DEFAULT_SCENARIOS[sdg.id] || {
      ...DEFAULT_SCENARIOS[6],
      sdg_goal: `SDG ${sdg.id}: ${sdg.title}`,
      sdg_number: sdg.id,
      location_background: sdg.sectorName,
    };
    setCurrentScenario(scenario);
    setPendingSectorSdgId(sdg.id);
    setActiveModal('gate_minigame');
  };

  // Apply outcome after player makes a decision
  const handleApplyOutcome = (
    impact: MetricImpact,
    pointsEarned: number,
    completedSdgId?: number,
    isWrongAnswer?: boolean
  ) => {
    // If wrong answer, check if City Health Shields protect the sanctuary!
    if (isWrongAnswer) {
      if (cityHealthShields > 0) {
        setCityHealthShields((prev) => Math.max(0, prev - 1));
        sound.playSuccess();
        showToast(`🛡️ CITY HEALTH SHIELD ACTIVE! Absorbed wrong answer penalty! (${cityHealthShields - 1} shields left, no bars lost)`);
        return;
      }

      sound.playWarning();
      setMetrics((prev) => ({
        resource_stability: Math.max(0, prev.resource_stability + (impact.resource_stability || -12)),
        ecological_health: Math.max(0, prev.ecological_health + (impact.ecological_health || -12)),
        community_well_being: Math.max(0, prev.community_well_being + (impact.community_well_being || -10)),
      }));
      showToast('🚨 Wrong Choice! Bars drained: -12% Resources, -12% Nature, -10% Community. Choose another option!');
      return;
    }

    // Solar Panel Arrays (+10%) & Wind Turbines (+10%) bonus on correct answers
    let bonusMultiplier = 1;
    if (hasSolarPanels) bonusMultiplier += 0.10;
    if (hasWindTurbines) bonusMultiplier += 0.10;
    let finalPoints = Math.round(pointsEarned * bonusMultiplier);

    // Beacon of Hope Generator: 1.5x Multiplier on all rewards
    if (hasBeaconOfHope) {
      finalPoints = Math.round(finalPoints * 1.5);
    }

    setMetrics((prev) => ({
      resource_stability: Math.min(100, Math.max(0, prev.resource_stability + (impact.resource_stability || 0))),
      ecological_health: Math.min(100, Math.max(0, prev.ecological_health + (impact.ecological_health || 0))),
      community_well_being: Math.min(100, Math.max(0, prev.community_well_being + (impact.community_well_being || 0))),
    }));

    setEcoPoints((prev) => Math.max(0, prev + finalPoints));

    const bonusLabels: string[] = [];
    if (hasSolarPanels) bonusLabels.push('+10% Solar');
    if (hasWindTurbines) bonusLabels.push('+10% Wind');
    if (hasBeaconOfHope) bonusLabels.push('1.5x Beacon');
    const bonusTag = bonusLabels.length > 0 ? ` (${bonusLabels.join(', ')})` : '';

    if (completedSdgId) {
      showToast(`🎉 Sector ${completedSdgId} restored! +${finalPoints} Eco-Points${bonusTag}`);
    } else {
      showToast(`⚡ Correct Solution (+${finalPoints} Pts${bonusTag})! Now complete the mandatory Mini-Game!`);
    }
  };

  // Mini-Game launcher (Mandatory to complete level)
  const handleLaunchMiniGame = (gameType: string, sdgId?: number) => {
    setActiveMiniGame(gameType);
    if (sdgId !== undefined) {
      setPendingSectorSdgId(sdgId);
    }
    setActiveModal('minigame');
  };

  // Mini-Game completion (Restores sector when completed)
  const handleCompleteMiniGame = (score: number) => {
    let bonusPoints = Math.round(score / 2);
    // Beacon of Hope Generator: 1.5x Multiplier on all rewards
    if (hasBeaconOfHope) {
      bonusPoints = Math.round(bonusPoints * 1.5);
    }
    setEcoPoints((prev) => prev + bonusPoints);

    if (pendingSectorSdgId) {
      const completedId = pendingSectorSdgId;
      const nextList = sdgList.map((s) => (s.id === completedId ? { ...s, completed: true } : s));
      setSdgList(nextList);

      const allFinished = nextList.every((s) => s.completed);
      const finishedCount = nextList.filter((s) => s.completed).length;

      setMetrics((prev) => ({
        resource_stability: Math.min(100, prev.resource_stability + 25),
        ecological_health: Math.min(100, prev.ecological_health + 25),
        community_well_being: Math.min(100, prev.community_well_being + 25),
      }));

      if (allFinished) {
        sound.playSuccess();
        showToast('🌟 ALL 17 MISSIONS COMPLETED! EARTH IS HEALED!');
        setPendingSectorSdgId(null);
        setActiveModal('victory');
        return;
      } else {
        showToast(`🎉 LEVEL COMPLETE! Sector ${completedId} is green and healthy! (${finishedCount}/${nextList.length} Complete)`);
      }

      setPendingSectorSdgId(null);
    } else {
      setMetrics((prev) => ({
        resource_stability: Math.min(100, prev.resource_stability + 5),
        ecological_health: Math.min(100, prev.ecological_health + 5),
        community_well_being: Math.min(100, prev.community_well_being + 5),
      }));
      showToast(`🌟 Micro-Challenge Complete! +${bonusPoints} Eco-Points awarded!`);
    }

    setActiveModal('none');
  };

  // Only allow opening victory ending once all 17 missions are completed
  const handleOpenVictory = () => {
    const allFinished = sdgList.every((s) => s.completed);
    if (allFinished) {
      sound.playSuccess();
      setActiveModal('victory');
    } else {
      const done = sdgList.filter((s) => s.completed).length;
      sound.playWarning();
      showToast(`🔒 Ending Locked! Complete all 17 missions to heal Earth (${done}/${sdgList.length} completed).`);
    }
  };

  // Trigger random unexpected crisis triage
  const handleTriggerRandomCrisis = async () => {
    try {
      const res = await fetch('/api/director/random-event', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.event) {
        setActiveCrisis(data.event);
        setActiveModal('crisis');
        sound.playWarning();
        return;
      }
    } catch {
      // fallback
    }

    // fallback crisis event
    setActiveCrisis({
      title: "Sudden Microplastic Inversion",
      description: "A thermal air pocket collapsed, showering eastern algae reservoirs with concentrated airborne microplastics.",
      dilemma: "Filter the reservoirs immediately before citywide contamination!",
      choices: [
        {
          label: "Deploy acoustic ultrasound microplastic agglutinators",
          cost: 20,
          impact: { resource_stability: 10, ecological_health: 8 }
        },
        {
          label: "Flush contaminated reservoirs into exterior wasteland",
          cost: 0,
          impact: { resource_stability: -15, ecological_health: -18 }
        }
      ]
    });
    setActiveModal('crisis');
    sound.playWarning();
  };

  // Resolve random crisis
  const handleResolveCrisis = (impact: MetricImpact, cost: number) => {
    setEcoPoints((prev) => Math.max(0, prev - cost));
    setMetrics((prev) => ({
      resource_stability: Math.min(100, Math.max(0, prev.resource_stability + (impact.resource_stability || 0))),
      ecological_health: Math.min(100, Math.max(0, prev.ecological_health + (impact.ecological_health || 0))),
      community_well_being: Math.min(100, Math.max(0, prev.community_well_being + (impact.community_well_being || 0))),
    }));
    setActiveModal('none');
    showToast('Crisis resolved. Telemetry updated.');
  };

  // Shop purchase
  const handlePurchaseLandmark = (item: Landmark) => {
    if (ecoPoints < item.cost) return;
    setEcoPoints((prev) => prev - item.cost);
    setLandmarks((prev) =>
      prev.map((l) => (l.id === item.id ? { ...l, unlocked: true } : l))
    );
    setMetrics((prev) => ({
      resource_stability: Math.min(100, prev.resource_stability + (item.metricBonus.resource_stability || 0)),
      ecological_health: Math.min(100, prev.ecological_health + (item.metricBonus.ecological_health || 0)),
      community_well_being: Math.min(100, prev.community_well_being + (item.metricBonus.community_well_being || 0)),
    }));
    if (item.id === 'hydraulic_door_crank') {
      showToast('⚡ Fast-Crank Installed! City blast doors now open with only 10 pumps!');
    } else if (item.id === 'solar_panel_arrays') {
      showToast('☀️ Solar Panel Arrays Built! +10% Eco-Points per correct answer activated!');
    } else if (item.id === 'wind_turbines') {
      showToast('🌬️ Wind Turbines Built! +10% Eco-Points per correct answer activated!');
    } else if (item.id === 'advanced_recycling_centers') {
      setSecondChanceUsed(false);
      showToast('♻️ Advanced Recycling Centers Built! "Second Chance" armed: Restores all bars to 25% upon defeat!');
    } else if (item.id === 'vertical_farming_domes') {
      setCityHealthShields(3);
      showToast('🛡️ Vertical Farming Domes Built! Granted 3 City Health Shields (blocks wrong answer penalties)!');
    } else if (item.id === 'beacon_of_hope') {
      showToast('🌟 Beacon of Hope Generator Built! 1.5x Multiplier on all rewards activated!');
    } else {
      showToast(`🏛️ Landmark "${item.name}" Constructed in Verdia!`);
    }
  };

  // Merch unlock
  const handleUnlockMerch = (item: MerchandiseItem) => {
    if (ecoPoints < item.pricePoints) return;
    setEcoPoints((prev) => prev - item.pricePoints);
    setMerchandise((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, unlocked: true } : m))
    );
    showToast(`🎁 Unlocked "${item.name}" for your collection!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-950/95 border-2 border-emerald-400 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Views */}
      {currentView === 'title' ? (
        <TitleScreen
          onSelectPlay={handleSelectPlay}
          onSelectMenu={handleSelectMenu}
          onOpenSwiftUIInspector={() => setActiveModal('swiftui')}
          ecoPoints={ecoPoints}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Top Verdia Metrics Bar */}
          <CityMetricsBar
            metrics={metrics}
            ecoPoints={ecoPoints}
            difficulty={difficulty}
            onChangeDifficulty={(newDiff) => {
              setDifficulty(newDiff);
              showToast(`⚙️ Difficulty changed to ${DIFFICULTY_PRESETS[newDiff].name} (${DIFFICULTY_PRESETS[newDiff].drainLabel})`);
            }}
            onOpenShop={() => setActiveModal('shop')}
            onOpenSwiftUI={() => setActiveModal('swiftui')}
            cityHealthShields={cityHealthShields}
            hasFastDoorUpgrade={hasFastDoorUpgrade}
            hasSecondChance={hasSecondChance}
            secondChanceUsed={secondChanceUsed}
            hasSolarPanels={hasSolarPanels}
            hasWindTurbines={hasWindTurbines}
            hasBeaconOfHope={hasBeaconOfHope}
          />

          {/* Navigation Bar inside Map View */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-3 flex items-center justify-between">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('title');
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to City Balcony</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveModal('shop');
                }}
                className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Upgrades Shop
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveModal('merchandise');
                }}
                className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-700/50 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Merchandise
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveModal('credits');
                }}
                className="text-xs font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Credits
              </button>
            </div>
          </div>

          {/* 17 SDG World Eco-Map */}
          <WorldEcoMap
            sdgList={sdgList}
            onSelectSDG={handleSelectSDG}
            onTriggerRandomCrisis={handleTriggerRandomCrisis}
            onGenerateCustomScenario={() => setActiveModal('swiftui')}
            onOpenVictory={handleOpenVictory}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      )}

      {/* Modals */}
      {activeModal === 'gate_minigame' && (
        <CityGateMiniGame
          sectorName={currentScenario.location_background || 'Sector'}
          sdgGoal={currentScenario.sdg_goal}
          questionVisual={currentScenario.question_visual}
          sdgId={pendingSectorSdgId || currentScenario.sdg_number}
          requiredClicks={doorRequiredClicks}
          hasFastDoorUpgrade={hasFastDoorUpgrade}
          onComplete={() => {
            setActiveModal('mission');
          }}
          onCancel={() => {
            setActiveModal('none');
          }}
        />
      )}

      {activeModal === 'gameover' && (
        <GameOverModal
          onRestart={() => {
            const initial = DIFFICULTY_PRESETS[difficulty].initialStability;
            setMetrics({
              resource_stability: initial,
              ecological_health: Math.max(10, initial - 5),
              community_well_being: Math.max(10, initial - 2),
            });
            setEcoPoints(140);
            setSecondChanceUsed(false);
            if (hasFarmingDomes) {
              setCityHealthShields(3);
            }
            setActiveModal('none');
          }}
        />
      )}

      {activeModal === 'victory' && (
        <VictoryEndingModal
          onClose={() => setActiveModal('none')}
          onPlayAgain={() => {
            setSdgList(SDG_LIST);
            setMetrics({
              resource_stability: 65,
              ecological_health: 60,
              community_well_being: 62,
            });
            setEcoPoints(140);
            setSecondChanceUsed(false);
            if (hasFarmingDomes) {
              setCityHealthShields(3);
            }
            setActiveModal('none');
            setCurrentView('title');
          }}
        />
      )}

      {activeModal === 'mission' && (
        <MissionModal
          scenario={currentScenario}
          onClose={() => setActiveModal('none')}
          onApplyOutcome={handleApplyOutcome}
          onLaunchMiniGame={handleLaunchMiniGame}
          onOpenSwiftUIInspector={() => setActiveModal('swiftui')}
          currentMetrics={metrics}
          cityHealthShields={cityHealthShields}
        />
      )}

      {activeModal === 'shop' && (
        <ShopModal
          landmarks={landmarks}
          ecoPoints={ecoPoints}
          onPurchaseLandmark={handlePurchaseLandmark}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'merchandise' && (
        <MerchandiseModal
          items={merchandise}
          ecoPoints={ecoPoints}
          onUnlockItem={handleUnlockMerch}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'credits' && (
        <CreditsModal onClose={() => setActiveModal('none')} />
      )}

      {activeModal === 'crisis' && activeCrisis && (
        <CrisisAlertModal
          event={activeCrisis}
          ecoPoints={ecoPoints}
          onResolve={handleResolveCrisis}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'swiftui' && (
        <SwiftUIInspectorModal
          currentScenario={currentScenario}
          onPlayScenario={(scen) => {
            setCurrentScenario(scen);
            setActiveModal('mission');
          }}
          onClose={() => setActiveModal('none')}
        />
      )}

      {/* 17 Bespoke SDG Mini-Games - Every SDG has a completely unique interactive game */}
      {activeModal === 'minigame' && (
        <SDGUniqueMiniGameModal
          sdgId={pendingSectorSdgId || currentScenario.sdg_number || 1}
          scenario={currentScenario}
          sdgInfo={sdgList.find((s) => s.id === (pendingSectorSdgId || currentScenario.sdg_number))}
          onComplete={handleCompleteMiniGame}
          onClose={() => setActiveModal('none')}
        />
      )}
    </div>
  );
}
