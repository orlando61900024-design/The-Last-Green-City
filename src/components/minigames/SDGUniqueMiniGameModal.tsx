import React, { useState, useEffect } from 'react';
import {
  X, CheckCircle2, RotateCcw, Sparkles, Award, ArrowRight,
  Droplets, Zap, Leaf, Recycle, Waves, HeartPulse, Globe,
  Scale, BookOpen, Briefcase, Cpu, Users, Building2, CloudRain,
  ShieldCheck, ShieldAlert, Sun, Wind, Wrench, Compass
} from 'lucide-react';
import { TurnScenarioJSON, SDGInfo } from '../../types/game';
import { sound } from '../../services/sound';

interface SDGUniqueMiniGameModalProps {
  sdgId: number;
  scenario: TurnScenarioJSON;
  sdgInfo?: SDGInfo;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export const SDGUniqueMiniGameModal: React.FC<SDGUniqueMiniGameModalProps> = ({
  sdgId,
  scenario,
  sdgInfo,
  onComplete,
  onClose,
}) => {
  // Game states based on SDG id
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isWon, setIsWon] = useState<boolean>(false);

  // SDG 1: Community Pantry & Tool Cooperative
  const [pantryItems, setPantryItems] = useState([
    { id: 1, name: 'Heirloom Vegetable Seeds', emoji: '🌱', shared: false },
    { id: 2, name: 'Steel Farming Trowels', emoji: '⛏️', shared: false },
    { id: 3, name: 'Whole Grain Sacks', emoji: '🌾', shared: false },
    { id: 4, name: 'Solar Food Dehydrator', emoji: '☀️', shared: false },
    { id: 5, name: 'Warm Woven Blankets', emoji: '🧶', shared: false },
    { id: 6, name: 'Fruit Tree Saplings', emoji: '🍎', shared: false },
  ]);

  // SDG 2: Pollinator Garden Bloom
  const [crops, setCrops] = useState([
    { id: 1, name: 'Wild Strawberries', emoji: '🍓', ready: false },
    { id: 2, name: 'Sweet Squash Blossoms', emoji: '🌼', ready: false },
    { id: 3, name: 'Sunflower Canopy', emoji: '🌻', ready: false },
    { id: 4, name: 'Heirloom Tomato Vines', emoji: '🍅', ready: false },
    { id: 5, name: 'Bumblebee Honey Hive', emoji: '🐝', ready: false },
  ]);

  // SDG 3: Clean Air & Botanical Health
  const [airScrubber, setAirScrubber] = useState(40);
  const [eucalyptusMist, setEucalyptusMist] = useState(30);
  const [freeMedicine, setFreeMedicine] = useState(50);

  // SDG 4: Treehouse Science Lab Modules
  const [scienceModules, setScienceModules] = useState([
    { id: 1, name: 'Solar Circuit Breadboard', emoji: '⚡', built: false },
    { id: 2, name: 'Microscope Cell Slide', emoji: '🔬', built: false },
    { id: 3, name: 'Seed Germination Box', emoji: '🌱', built: false },
    { id: 4, name: 'Planetary Weather Chart', emoji: '🌍', built: false },
  ]);

  // SDG 5: Council Representation Balance
  const [councilBalance, setCouncilBalance] = useState(50);

  // SDG 6: Oasis Lake Wetland Filtration
  const [sandFilter, setSandFilter] = useState(40);
  const [reedBed, setReedBed] = useState(30);
  const [phLevel, setPhLevel] = useState(6.0);

  // SDG 7: Tri-Source Renewable Grid
  const [solarGrid, setSolarGrid] = useState(30);
  const [windGrid, setWindGrid] = useState(30);
  const [hydroGrid, setHydroGrid] = useState(40);

  // SDG 8: Artisan Repair Cafe Tools
  const [repairedItems, setRepairedItems] = useState([
    { id: 1, name: 'Commuter Bicycle Axle', emoji: '🚲', fixed: false },
    { id: 2, name: 'Irrigation Water Pump', emoji: '⚙️', fixed: false },
    { id: 3, name: 'Solar Camp Lantern', emoji: '💡', fixed: false },
    { id: 4, name: 'Wooden Cotton Loom', emoji: '🧶', fixed: false },
  ]);

  // SDG 9: Bio-Composite Maglev Transit Circuit
  const [maglevNodes, setMaglevNodes] = useState([
    { id: 1, name: 'Hemp Concrete Pylon', active: false },
    { id: 2, name: 'Induction Copper Track', active: false },
    { id: 3, name: 'Solar Battery Storage', active: false },
    { id: 4, name: 'River Bridge Span', active: false },
  ]);

  // SDG 10: Inclusive Outer Ring Fountains & Parks
  const [districtParks, setDistrictParks] = useState([
    { id: 1, name: 'North Outer Ring: Solar Water Well', funded: false, emoji: '🚰' },
    { id: 2, name: 'South Outer Ring: Shaded Playground', funded: false, emoji: '🛝' },
    { id: 3, name: 'East Outer Ring: Free Public Tram Stop', funded: false, emoji: '🚊' },
    { id: 4, name: 'West Outer Ring: Community Seed Garden', funded: false, emoji: '🌱' },
  ]);

  // SDG 11: Town Square Urban Canopy
  const [canopyPoints, setCanopyPoints] = useState([
    { id: 1, name: 'Ancient Shady Oak', planted: false },
    { id: 2, name: 'Ivy Wall Noise Buffer', planted: false },
    { id: 3, name: 'Permeable Cobblestone Path', planted: false },
    { id: 4, name: 'Mist Cooling Pergola', planted: false },
  ]);

  // SDG 12: Circular Loop Waste Sorter
  const [wasteIndex, setWasteIndex] = useState(0);
  const wasteList = [
    { name: 'Apple Core & Peels', category: 'compost', emoji: '🍎' },
    { name: 'Burnt Circuit Board', category: 'ewaste', emoji: '💾' },
    { name: 'Cornstarch Cup', category: 'bioplastic', emoji: '🥤' },
    { name: 'Broken Jam Jar', category: 'glass', emoji: '🫙' },
  ];

  // SDG 13: Great Green Windbreak Wall
  const [windbreakTrees, setWindbreakTrees] = useState([
    { id: 1, planted: false },
    { id: 2, planted: false },
    { id: 3, planted: false },
    { id: 4, planted: false },
    { id: 5, planted: false },
  ]);

  // SDG 14: Coral Bay Marine Cleanup
  const [oceanTrash, setOceanTrash] = useState([
    { id: 1, name: 'Plastic Soda Bottle', emoji: '🍾', cleared: false },
    { id: 2, name: 'Ghost Fishing Net', emoji: '🕸️', cleared: false },
    { id: 3, name: 'Trapped Baby Turtle', emoji: '🐢', cleared: false, isTurtle: true },
    { id: 4, name: 'Oil Waste Drum', emoji: '🛢️', cleared: false },
    { id: 5, name: 'Polystyrene Cup', emoji: '📦', cleared: false },
  ]);

  // SDG 15: Ancient Forest Rewilding
  const [forestNodes, setForestNodes] = useState([
    { id: 1, name: 'Mycorrhizal Fungal Inoculant', done: false, emoji: '🍄' },
    { id: 2, name: 'Native Alder Saplings', done: false, emoji: '🌲' },
    { id: 3, name: 'Barn Owl Nesting Hollow', done: false, emoji: '🦉' },
    { id: 4, name: 'Wild Deer Stream Corridor', done: false, emoji: '🦌' },
  ]);

  // SDG 16: Restorative Peace Accord Clauses
  const [treatyClauses, setTreatyClauses] = useState([
    { id: 1, title: 'Rotational Water Quota Clause', ratified: false },
    { id: 2, title: 'Open Stream Data Transparency', ratified: false },
    { id: 3, title: 'Farmer Mediation Council Pact', ratified: false },
    { id: 4, title: 'Restorative Ecology Guarantee', ratified: false },
  ]);

  // SDG 17: Global Satellite & Seed Relay
  const [relays, setRelays] = useState([
    { id: 1, name: 'Global Seed Bank Frequency', freq: 100, target: 160, linked: false },
    { id: 2, name: 'Open Clean Tech Blueprint Node', freq: 120, target: 180, linked: false },
    { id: 3, name: 'Peace & Climate Science Beacon', freq: 140, target: 200, linked: false },
  ]);

  // Win condition checker per SDG
  useEffect(() => {
    let won = false;

    if (sdgId === 1) {
      won = pantryItems.every((i) => i.shared);
    } else if (sdgId === 2) {
      won = crops.every((c) => c.ready);
    } else if (sdgId === 3) {
      won = airScrubber >= 70 && eucalyptusMist >= 70 && freeMedicine >= 70;
    } else if (sdgId === 4) {
      won = scienceModules.every((m) => m.built);
    } else if (sdgId === 5) {
      won = councilBalance >= 48 && councilBalance <= 52;
    } else if (sdgId === 6) {
      won = sandFilter >= 75 && reedBed >= 75 && phLevel >= 7.0 && phLevel <= 7.4;
    } else if (sdgId === 7) {
      won = solarGrid + windGrid + hydroGrid === 100;
    } else if (sdgId === 8) {
      won = repairedItems.every((i) => i.fixed);
    } else if (sdgId === 9) {
      won = maglevNodes.every((n) => n.active);
    } else if (sdgId === 10) {
      won = districtParks.every((p) => p.funded);
    } else if (sdgId === 11) {
      won = canopyPoints.every((p) => p.planted);
    } else if (sdgId === 12) {
      won = wasteIndex >= wasteList.length;
    } else if (sdgId === 13) {
      won = windbreakTrees.every((t) => t.planted);
    } else if (sdgId === 14) {
      won = oceanTrash.every((t) => t.cleared);
    } else if (sdgId === 15) {
      won = forestNodes.every((n) => n.done);
    } else if (sdgId === 16) {
      won = treatyClauses.every((c) => c.ratified);
    } else if (sdgId === 17) {
      won = relays.every((r) => r.linked);
    }

    if (won && !isWon) {
      sound.playSuccess();
      setIsWon(true);
    }
  }, [
    sdgId, pantryItems, crops, airScrubber, eucalyptusMist, freeMedicine,
    scienceModules, councilBalance, sandFilter, reedBed, phLevel,
    solarGrid, windGrid, hydroGrid, repairedItems, maglevNodes,
    districtParks, canopyPoints, wasteIndex, windbreakTrees, oceanTrash,
    forestNodes, treatyClauses, relays, isWon
  ]);

  const handleFinish = () => {
    sound.playSuccess();
    onComplete(Math.max(60, score + 40));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto select-none font-['Plus_Jakarta_Sans']">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-slate-900 border-2 rounded-3xl shadow-2xl flex flex-col p-4 sm:p-6"
           style={{ borderColor: sdgInfo?.unColor || '#10B981' }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow"
                 style={{ backgroundColor: sdgInfo?.unColor || '#10B981' }}>
              {sdgId}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                SDG {sdgId} Exclusive Level Challenge
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Fredoka'] leading-none">
                {scenario.sdg_goal}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt */}
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 mb-4 text-xs sm:text-sm text-slate-200">
          <span className="text-emerald-400 font-bold mr-1">🎯 Objective:</span>
          {scenario.mini_game_prompt}
        </div>

        {/* MINI GAME PLAY AREA BY SDG ID */}
        <div className="flex-1 flex flex-col justify-center">

          {/* SDG 1: Help Everyone - Community Pantry */}
          {sdgId === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {pantryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.shared) return;
                    sound.playClick();
                    setScore((s) => s + 15);
                    setPantryItems((prev) => prev.map((i) => i.id === item.id ? { ...i, shared: true } : i));
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    item.shared
                      ? 'bg-emerald-950/40 border-emerald-500/50 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-emerald-400 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl block mb-1">{item.emoji}</span>
                  <span className="text-xs font-bold text-white block">{item.name}</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">
                    {item.shared ? 'Distributed ✓' : 'Tap to Share'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 2: Zero Hunger - Pollinator Gardens */}
          {sdgId === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {crops.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    if (c.ready) return;
                    sound.playClick();
                    setScore((s) => s + 18);
                    setCrops((prev) => prev.map((item) => item.id === c.id ? { ...item, ready: true } : item));
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    c.ready
                      ? 'bg-amber-950/40 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-amber-400 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl block mb-1">{c.ready ? '✨' : c.emoji}</span>
                  <span className="text-xs font-bold text-white block">{c.name}</span>
                  <span className="text-[10px] text-amber-300 block mt-1">
                    {c.ready ? 'Pollinated & Harvested ✓' : 'Tap to Cultivate'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 3: Clean Air & Botanical Health */}
          {sdgId === 3 && (
            <div className="space-y-3">
              {[
                { label: 'Eucalyptus Steam Filter', val: airScrubber, set: setAirScrubber },
                { label: 'Medicinal Tea Potency', val: eucalyptusMist, set: setEucalyptusMist },
                { label: 'Universal Health Care Coverage', val: freeMedicine, set: setFreeMedicine },
              ].map((bar, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-white">{bar.label}: {bar.val}%</span>
                    <span className={bar.val >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                      {bar.val >= 70 ? '✓ Healthy' : 'Low'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-emerald-400 transition-all duration-200" style={{ width: `${bar.val}%` }} />
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      bar.set((v) => Math.min(100, v + 20));
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs"
                  >
                    Boost Level (+20%)
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SDG 4: Quality Education - Nature Lab */}
          {sdgId === 4 && (
            <div className="grid grid-cols-2 gap-2.5">
              {scienceModules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    if (m.built) return;
                    sound.playClick();
                    setScienceModules((prev) => prev.map((item) => item.id === m.id ? { ...item, built: true } : item));
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    m.built
                      ? 'bg-rose-950/40 border-rose-400/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-rose-400 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl block mb-1">{m.emoji}</span>
                  <span className="text-xs font-bold text-white block">{m.name}</span>
                  <span className="text-[10px] text-rose-300 block mt-1">
                    {m.built ? 'Module Active ✓' : 'Tap to Assemble'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 5: Gender Equality - Council Balance Scale */}
          {sdgId === 5 && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs font-bold text-white mb-2">
                Municipal Leadership Representation: {councilBalance}% Women / {100 - councilBalance}% Men
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden mb-4 p-0.5">
                <div className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full transition-all duration-200"
                     style={{ width: `${councilBalance}%` }} />
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setCouncilBalance((b) => Math.max(10, b - 5));
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                >
                  -5% Shift
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setCouncilBalance((b) => Math.min(90, b + 5));
                  }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold"
                >
                  +5% Shift (Balance to 50%)
                </button>
              </div>
            </div>
          )}

          {/* SDG 6: Clean Water Filtration */}
          {sdgId === 6 && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-sky-300">Natural Reed Beds: {reedBed}%</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setReedBed((v) => Math.min(100, v + 25));
                  }}
                  className="px-3 py-1 bg-sky-600 text-white font-bold text-xs rounded-lg"
                >
                  Clean Reeds
                </button>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-sky-300">Silica Sand Filtration: {sandFilter}%</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSandFilter((v) => Math.min(100, v + 25));
                  }}
                  className="px-3 py-1 bg-sky-600 text-white font-bold text-xs rounded-lg"
                >
                  Clean Sand
                </button>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-sky-300">Water pH Balance: {phLevel.toFixed(1)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setPhLevel((p) => Math.max(5.0, p - 0.2));
                    }}
                    className="px-2.5 py-1 bg-slate-800 text-white font-bold text-xs rounded-lg"
                  >
                    -pH
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setPhLevel((p) => Math.min(9.0, p + 0.2));
                    }}
                    className="px-2.5 py-1 bg-slate-800 text-white font-bold text-xs rounded-lg"
                  >
                    +pH (Target 7.2)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SDG 7: Clean Energy Tri-Source */}
          {sdgId === 7 && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-amber-300 text-center">
                Grid Total: {solarGrid + windGrid + hydroGrid}% / 100%
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>☀️ Solar Power: {solarGrid}%</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSolarGrid((s) => (s + 10) % 60);
                  }}
                  className="px-2.5 py-1 bg-amber-600 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Cycle (+10)
                </button>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>🌬️ Wind Power: {windGrid}%</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setWindGrid((w) => (w + 10) % 60);
                  }}
                  className="px-2.5 py-1 bg-sky-600 text-white font-bold rounded-lg text-xs"
                >
                  Cycle (+10)
                </button>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>🌊 Hydro Dam: {hydroGrid}%</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setHydroGrid((h) => (h + 10) % 60);
                  }}
                  className="px-2.5 py-1 bg-teal-600 text-white font-bold rounded-lg text-xs"
                >
                  Cycle (+10)
                </button>
              </div>
            </div>
          )}

          {/* SDG 8: Decent Work - Artisan Repair */}
          {sdgId === 8 && (
            <div className="grid grid-cols-2 gap-2.5">
              {repairedItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.fixed) return;
                    sound.playClick();
                    setRepairedItems((prev) => prev.map((i) => i.id === item.id ? { ...i, fixed: true } : i));
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    item.fixed
                      ? 'bg-rose-950/40 border-rose-500/50 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-rose-400 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl block mb-1">{item.emoji}</span>
                  <span className="text-xs font-bold text-white block">{item.name}</span>
                  <span className="text-[10px] text-rose-300 block mt-1">
                    {item.fixed ? 'Repaired & Working ✓' : 'Tap to Repair'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 9: Green Inventions - Maglev Transit */}
          {sdgId === 9 && (
            <div className="grid grid-cols-2 gap-2.5">
              {maglevNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    if (n.active) return;
                    sound.playClick();
                    setMaglevNodes((prev) => prev.map((item) => item.id === n.id ? { ...item, active: true } : item));
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    n.active
                      ? 'bg-orange-950/40 border-orange-400/60 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-orange-400 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl block mb-1">🚝</span>
                  <span className="text-xs font-bold text-white block">{n.name}</span>
                  <span className="text-[10px] text-orange-300 block mt-1">
                    {n.active ? 'Powered & Connected ✓' : 'Tap to Activate'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 10: Fairness for All - District Equity */}
          {sdgId === 10 && (
            <div className="space-y-2.5">
              {districtParks.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    if (p.funded) return;
                    sound.playClick();
                    setDistrictParks((prev) => prev.map((item) => item.id === p.id ? { ...item, funded: true } : item));
                  }}
                  className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    p.funded
                      ? 'bg-pink-950/40 border-pink-500/50 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-pink-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.emoji}</span>
                    <span className="text-xs font-bold text-white">{p.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-pink-400">
                    {p.funded ? 'Funded ✓' : 'Tap to Fund'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 11: Cool Green Cities - Urban Canopy */}
          {sdgId === 11 && (
            <div className="grid grid-cols-2 gap-2.5">
              {canopyPoints.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    if (c.planted) return;
                    sound.playClick();
                    setCanopyPoints((prev) => prev.map((item) => item.id === c.id ? { ...item, planted: true } : item));
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    c.planted
                      ? 'bg-amber-950/40 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-amber-400 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl block mb-1">🌳</span>
                  <span className="text-xs font-bold text-white block">{c.name}</span>
                  <span className="text-[10px] text-amber-300 block mt-1">
                    {c.planted ? 'Installed & Shaded ✓' : 'Tap to Plant'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 12: Zero Waste Circular Sorter */}
          {sdgId === 12 && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              {wasteIndex < wasteList.length ? (
                <>
                  <div className="text-4xl mb-2">{wasteList[wasteIndex].emoji}</div>
                  <div className="text-xs font-bold text-white mb-3">{wasteList[wasteIndex].name}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['compost', 'ewaste', 'bioplastic', 'glass'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          if (cat === wasteList[wasteIndex].category) {
                            sound.playSuccess();
                            setWasteIndex((i) => i + 1);
                          } else {
                            sound.playWarning();
                          }
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-900 border border-slate-700 text-xs font-bold text-white capitalize cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-emerald-400 font-bold text-sm">All materials sorted in 100% circular loop!</div>
              )}
            </div>
          )}

          {/* SDG 13: Climate Action - Great Green Wall */}
          {sdgId === 13 && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs font-bold text-emerald-300 mb-3">
                Tap to plant deep-rooted acacia trees to block the desert storm:
              </div>
              <div className="flex justify-center gap-3">
                {windbreakTrees.map((tree) => (
                  <button
                    key={tree.id}
                    onClick={() => {
                      if (tree.planted) return;
                      sound.playClick();
                      setWindbreakTrees((prev) => prev.map((t) => t.id === tree.id ? { ...t, planted: true } : t));
                    }}
                    className={`w-12 h-14 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      tree.planted
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-xl">{tree.planted ? '🌲' : '🌱'}</span>
                    <span className="text-[9px] font-bold">{tree.planted ? 'Rooted' : 'Plant'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SDG 14: Life in the Ocean - Marine Cleanup */}
          {sdgId === 14 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {oceanTrash.map((trash) => (
                <button
                  key={trash.id}
                  onClick={() => {
                    if (trash.cleared) return;
                    sound.playClick();
                    setOceanTrash((prev) => prev.map((t) => t.id === trash.id ? { ...t, cleared: true } : t));
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    trash.cleared
                      ? 'bg-sky-950/40 border-sky-500/50 opacity-40'
                      : 'bg-slate-950 border-slate-800 hover:border-sky-400 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl block mb-1">{trash.cleared ? '🫧' : trash.emoji}</span>
                  <span className="text-xs font-bold text-white block">{trash.name}</span>
                  <span className="text-[10px] text-sky-300 block mt-1">
                    {trash.cleared ? 'Rescued ✓' : trash.isTurtle ? 'Untangle Turtle' : 'Scoop Trash'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 15: Life on Land - Ancient Forest Rewilding */}
          {sdgId === 15 && (
            <div className="grid grid-cols-2 gap-2.5">
              {forestNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    if (n.done) return;
                    sound.playClick();
                    setForestNodes((prev) => prev.map((item) => item.id === n.id ? { ...item, done: true } : item));
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    n.done
                      ? 'bg-emerald-950/40 border-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                      : 'bg-slate-950 border-slate-800 hover:border-emerald-400 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl block mb-1">{n.emoji}</span>
                  <span className="text-xs font-bold text-white block">{n.name}</span>
                  <span className="text-[10px] text-emerald-300 block mt-1">
                    {n.done ? 'Rewilded & Thriving ✓' : 'Tap to Rewild'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 16: Peace & Justice - Water Treaty Assembly */}
          {sdgId === 16 && (
            <div className="space-y-2.5">
              {treatyClauses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    if (c.ratified) return;
                    sound.playClick();
                    setTreatyClauses((prev) => prev.map((item) => item.id === c.id ? { ...item, ratified: true } : item));
                  }}
                  className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    c.ratified
                      ? 'bg-blue-950/40 border-blue-400/60 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-blue-400'
                  }`}
                >
                  <span className="text-xs font-bold text-white">{c.title}</span>
                  <span className="text-[10px] font-bold text-blue-300">
                    {c.ratified ? 'Ratified ✓' : 'Sign & Ratify'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SDG 17: Partnerships for the Goals - Satellite Relay */}
          {sdgId === 17 && (
            <div className="space-y-2.5">
              {relays.map((r) => (
                <div key={r.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-white block">{r.name}</span>
                    <span className="text-[10px] text-indigo-300 font-mono">
                      {r.linked ? 'Linked at ' + r.target + ' MHz ✓' : `${r.freq} / ${r.target} MHz`}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (r.linked) return;
                      sound.playClick();
                      setRelays((prev) =>
                        prev.map((item) => {
                          if (item.id !== r.id) return item;
                          const next = item.freq + 20;
                          return { ...item, freq: next, linked: next >= item.target };
                        })
                      );
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      r.linked ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {r.linked ? 'Online' : 'Tune Relay'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Win Completion Banner */}
        {isWon && (
          <div className="mt-4 bg-emerald-950/90 border-2 border-emerald-400 p-4 rounded-2xl text-center flex flex-col items-center gap-2 animate-bounce-subtle">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <div className="font-bold text-white font-['Fredoka'] text-base">
              SDG {sdgId} Challenge Complete!
            </div>
            <p className="text-xs text-emerald-200">
              Sector goals accomplished. Planet Earth is being restored!
            </p>
            <button
              onClick={handleFinish}
              className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm cursor-pointer shadow-lg shadow-emerald-500/30"
            >
              Complete Level &amp; Restore Sector (+80 Eco-Pts)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
