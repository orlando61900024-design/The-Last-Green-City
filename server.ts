import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI if key is present
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Built-in fallback database of rich SDG scenarios for offline/instant play
interface Option {
  text: string;
  is_correct: boolean;
  metric_impact: {
    resource_stability?: number;
    ecological_health?: number;
    community_well_being?: number;
  };
  feedback: string;
}

interface ScenarioData {
  sdg_goal: string;
  sdg_number: number;
  character_dialogue: string;
  location_background: string;
  question: string;
  options: Option[];
  mini_game_prompt: string;
  mini_game_type?: 'water' | 'energy' | 'waste' | 'trees' | 'ocean' | 'clinic' | 'network';
}

const SDG_PRESETS: Record<number, ScenarioData> = {
  1: {
    sdg_goal: "SDG 1: No Poverty",
    sdg_number: 1,
    character_dialogue: "Commander, outer fringe refugees arrived at Verdia's perimeter gates. They lost their ancestral farmlands to soil salinization and extreme floods. We must secure their livelihoods immediately!",
    location_background: "Perimeter Sector 01: Clay-brick shelters bordering Verdia's western bioswales, where families seek sustainable integration.",
    question: "How should Verdia empower incoming families for long-term self-sufficiency?",
    options: [
      {
        text: "A) Enroll families in the Eco-Cooperatives, providing micro-grants and vertical farm training with guaranteed seed equity.",
        is_correct: true,
        metric_impact: { community_well_being: 18, resource_stability: 8, ecological_health: 5 },
        feedback: "Empowering communities with green skills and seed equity breaks poverty traps while boosting Verdia's regenerative harvest capacity."
      },
      {
        text: "B) Establish temporary ration distribution tents without long-term employment pathways.",
        is_correct: false,
        metric_impact: { community_well_being: 5, resource_stability: -10, ecological_health: 0 },
        feedback: "Emergency rations alleviate hunger for a day but drain city reserves without building economic resilience or independence."
      },
      {
        text: "C) Restrict perimeter access to preserve existing citizens' food allotments.",
        is_correct: false,
        metric_impact: { community_well_being: -20, resource_stability: 5, ecological_health: -5 },
        feedback: "Exclusion fosters humanitarian crisis, civil unrest, and violates our core regenerative pact."
      }
    ],
    mini_game_prompt: "Resource Allocation: Balance micro-grant toolkits and seed packets across 4 vulnerable frontier districts.",
    mini_game_type: "waste"
  },
  2: {
    sdg_goal: "SDG 2: Zero Hunger",
    sdg_number: 2,
    character_dialogue: "Look at the hydroponic yield sensors, Commander! A pollinator collapse outside our biodomes has halved food crops in Sector 2. We need climate-resilient polyculture crops immediately!",
    location_background: "Terraced aeroponic towers overlooking misted vertical greenhouse galleries in Northern Verdia.",
    question: "Which regenerative food production initiative should we deploy to restore nutritional security?",
    options: [
      {
        text: "A) Propagate drought-hardy heritage grains, mycelium protein bioreactors, and stingless native bee micro-hives.",
        is_correct: true,
        metric_impact: { resource_stability: 16, ecological_health: 12, community_well_being: 10 },
        feedback: "Biodiverse cropping paired with mycelium nutrition creates climate-proof food resilience and restores natural pollinator networks."
      },
      {
        text: "B) Switch entirely to synthetic nutrient paste manufactured via high-energy thermal synthesis.",
        is_correct: false,
        metric_impact: { resource_stability: -12, community_well_being: -5, ecological_health: 2 },
        feedback: "Synthetic paste demands massive electric wattage from our grid and neglects the ecosystem services of living soil and plants."
      },
      {
        text: "C) Import chemically fertilized monoculture soybeans from exhausted exterior plains.",
        is_correct: false,
        metric_impact: { resource_stability: -5, ecological_health: -15, community_well_being: -5 },
        feedback: "Chemical fertilizers cause toxic nitrous oxide runoff and rapidly degrade whatever topsoil remains."
      }
    ],
    mini_game_prompt: "Agroforestry Balance: Distribute nitrogen-fixing legumes, deep-root trees, and pollinators across the canopy.",
    mini_game_type: "trees"
  },
  6: {
    sdg_goal: "SDG 6: Clean Water & Sanitation",
    sdg_number: 6,
    character_dialogue: "Commander, a nearby settlement's filtration system just failed! Toxic industrial sediment is flowing downstream toward our drinking reservoirs. We need an immediate sustainable intervention.",
    location_background: "A sun-baked river basin surrounded by rusted aqueducts, dry gravel beds, and Verdia's reed filtration wetland.",
    question: "Which water reclamation and sanitization strategy should we deploy?",
    options: [
      {
        text: "A) Construct multi-stage engineered bio-wetlands with biochar gravel and solar-driven UV disinfection arrays.",
        is_correct: true,
        metric_impact: { resource_stability: 18, ecological_health: 14, community_well_being: 8 },
        feedback: "Correct! Constructed bio-wetlands filter contaminants biologically using reeds, biochar, and solar UV without harmful synthetic chemicals."
      },
      {
        text: "B) Drill high-pressure boreholes into the ancient deep fossil aquifer.",
        is_correct: false,
        metric_impact: { resource_stability: 5, ecological_health: -15, community_well_being: 2 },
        feedback: "Deep fossil aquifers take millennia to recharge. Depleting them causes land subsidence, sinkholes, and irreversible loss."
      },
      {
        text: "C) Truck in single-use plastic bottled water from offshore distribution hubs.",
        is_correct: false,
        metric_impact: { resource_stability: -10, ecological_health: -18, community_well_being: -5 },
        feedback: "Truck transport creates massive greenhouse emissions and leaves hundreds of tons of plastic waste."
      }
    ],
    mini_game_prompt: "Water Filtration Slider: Balance pH and mineral levels between 6.5 and 8.5 to distribute clean water.",
    mini_game_type: "water"
  },
  7: {
    sdg_goal: "SDG 7: Affordable & Clean Energy",
    sdg_number: 7,
    character_dialogue: "Our power grid is fluctuating! Cloud cover from exterior dust storms has dropped solar intake by 40%. The medical units in District 4 risk brownouts unless we balance generation!",
    location_background: "Sun-swept ridge lined with vertical wind spires, bifacial solar canopies, and molten salt thermal storage vaults.",
    question: "How do we stabilize Verdia's clean energy grid while exterior dust storms persist?",
    options: [
      {
        text: "A) Activate closed-loop pumped-hydro gravitational storage and geothermal district steam exchangers.",
        is_correct: true,
        metric_impact: { resource_stability: 16, ecological_health: 10, community_well_being: 10 },
        feedback: "Superb! Gravitational pumped hydro and deep geothermal provide dispatchable baseload clean power without fossil fuel emissions."
      },
      {
        text: "B) Restart the mothballed petroleum diesel generators in Sector 9.",
        is_correct: false,
        metric_impact: { resource_stability: 5, ecological_health: -20, community_well_being: -8 },
        feedback: "Burning diesel spews particulate smog directly into Verdia's clean air shed, triggering respiratory spikes."
      },
      {
        text: "C) Cut electrical supply to residential lighting and air purification scrubbers.",
        is_correct: false,
        metric_impact: { resource_stability: 8, community_well_being: -22, ecological_health: -4 },
        feedback: "Disabling air scrubbers leaves families breathing dust contaminants, causing severe distress and health hazards."
      }
    ],
    mini_game_prompt: "Clean Energy Grid Dispatcher: Balance solar, wind, and pumped hydro to match peak demand without overloading.",
    mini_game_type: "energy"
  },
  11: {
    sdg_goal: "SDG 11: Sustainable Cities & Communities",
    sdg_number: 11,
    character_dialogue: "Commander, urban heat island effects are intensifying in Verdia's eastern plaza! Heat levels are 6°C hotter than surrounding parks. Our citizens need cool, accessible public spaces.",
    location_background: "Paved limestone plaza flanked by arched green buildings, overhead vine trellises, and micro-transit tramlines.",
    question: "What urban architecture overhaul will permanently cool the district?",
    options: [
      {
        text: "A) Replace heat-absorbing pavement with permeable bioswales, reflective cool roofs, and shade-canopy pocket forests.",
        is_correct: true,
        metric_impact: { community_well_being: 15, ecological_health: 15, resource_stability: 8 },
        feedback: "Permeable pavers soak up rainwater while urban tree canopies lower temperatures naturally via evapotranspiration."
      },
      {
        text: "B) Install mega industrial air conditioners along outdoor walkways.",
        is_correct: false,
        metric_impact: { resource_stability: -18, ecological_health: -10, community_well_being: 4 },
        feedback: "Outdoor air conditioning rejects exhaust heat into the surrounding street, worsening the local microclimate."
      },
      {
        text: "C) Close off the plaza to pedestrians and cover it with heavy vinyl tarps.",
        is_correct: false,
        metric_impact: { community_well_being: -15, resource_stability: -4, ecological_health: -5 },
        feedback: "Vinyl tarps trap stagnant air, deteriorate into microplastics, and strip citizens of vital civic gathering space."
      }
    ],
    mini_game_prompt: "Urban Greening Layout: Place green roofs, bioswales, and pocket parks to bring district heat below 28°C.",
    mini_game_type: "trees"
  },
  12: {
    sdg_goal: "SDG 12: Responsible Consumption & Production",
    sdg_number: 12,
    character_dialogue: "Look at the material intake facility, Commander! Obsolete circuit boards and packaging waste are piling up faster than our recyclers can break them down. We need circular economy protocols!",
    location_background: "Verdia Material Reclamation Foundry: Robotic sorting arms scanning discarded devices and bioplastics.",
    question: "Which circular manufacturing framework should Verdia enforce city-wide?",
    options: [
      {
        text: "A) Mandate Modular Design standards with right-to-repair kits, bio-based mycelium packaging, and automated alloy recovery.",
        is_correct: true,
        metric_impact: { resource_stability: 20, ecological_health: 10, community_well_being: 8 },
        feedback: "Modular repair and circular material loops eliminate planned obsolescence and reclaim 98% of rare earth metals."
      },
      {
        text: "B) Dump unsorted electronics into deep subterranean geological cavities.",
        is_correct: false,
        metric_impact: { resource_stability: -15, ecological_health: -25, community_well_being: -10 },
        feedback: "Heavy metals (lead, cadmium) leach through fractures directly into aquifers, causing centuries of contamination."
      },
      {
        text: "C) Incinerate all refuse in high-temperature blast furnaces to generate quick steam electricity.",
        is_correct: false,
        metric_impact: { resource_stability: 4, ecological_health: -18, community_well_being: -12 },
        feedback: "Incineration releases toxic dioxins and destroys valuable finite metals that took enormous energy to extract."
      }
    ],
    mini_game_prompt: "Circular Sorter: Swiftly sort incoming waste stream into Compost, Rare Alloys, Bio-polymers, and Clean Glass.",
    mini_game_type: "waste"
  },
  13: {
    sdg_goal: "SDG 13: Climate Action",
    sdg_number: 13,
    character_dialogue: "Atmospheric sensors are blaring red! A catastrophic super-cell dust storm generated by exterior desertification is rolling toward Verdia. We must activate our regional climate defense!",
    location_background: "Observation deck atop Verdia's Central Spire, overlooking looming ochre storm clouds and defensive windbreaks.",
    question: "What integrated climate mitigation & adaptation protocol should we mobilize?",
    options: [
      {
        text: "A) Deploy deep-rooted Great Green Wall shelterbelts, misting bio-shields, and emergency atmospheric CO2 algae bioreactors.",
        is_correct: true,
        metric_impact: { ecological_health: 20, resource_stability: 10, community_well_being: 12 },
        feedback: "Dense multi-tier windbreak agroforestry blunts gale winds, stabilizes loose soils, and captures gigatons of carbon."
      },
      {
        text: "B) Release uncalibrated sulfur aerosol canisters into the upper troposphere.",
        is_correct: false,
        metric_impact: { ecological_health: -25, resource_stability: -10, community_well_being: -15 },
        feedback: "Reckless geoengineering risks ozone layer depletion, acid rain, and sudden unpredictable monsoon disruptions."
      },
      {
        text: "C) Seal all dome blast doors and ignore the degradation of exterior settlements.",
        is_correct: false,
        metric_impact: { community_well_being: -20, ecological_health: -15, resource_stability: 4 },
        feedback: "Isolationism cannot hold. Unchecked exterior desertification will eventually breach any fortress dome."
      }
    ],
    mini_game_prompt: "Canopy Defense: Plant resilient acacia and mangrove barrier belts to halt the advancing dust wall.",
    mini_game_type: "trees"
  },
  14: {
    sdg_goal: "SDG 14: Life Below Water",
    sdg_number: 14,
    character_dialogue: "Submersible drones near Coastal Basin 7 are reporting severe coral bleaching and vast rafts of discarded plastic ghost nets trapping sea turtles. We must intervene before the food chain snaps!",
    location_background: "Submarine research laboratory with curved glass bays looking out onto a fragile coral shelf and murky ocean currents.",
    question: "What oceanic restoration operation should we launch?",
    options: [
      {
        text: "A) Deploy autonomous solar skimmer boats with turtle-safe net deflectors and seed heat-tolerant micro-fragmented coral polyps.",
        is_correct: true,
        metric_impact: { ecological_health: 22, resource_stability: 8, community_well_being: 6 },
        feedback: "Micro-fragmentation accelerates coral regrowth 25x, while solar autonomous skimmers retrieve plastics without bycatch."
      },
      {
        text: "B) Pour chemical algaecide into the coastal basin to clear murky green surface blooms.",
        is_correct: false,
        metric_impact: { ecological_health: -24, resource_stability: -8, community_well_being: -6 },
        feedback: "Algaecides kill beneficial zooplankton and create massive dead zones stripped of dissolved oxygen."
      },
      {
        text: "C) Drag heavy metal chain trawls across the seafloor to collect sunken trash quickly.",
        is_correct: false,
        metric_impact: { ecological_health: -28, resource_stability: -5, community_well_being: -8 },
        feedback: "Benthic bottom trawling obliterates centuries-old coral reef nurseries and pulverizes fragile sea bottom ecosystems."
      }
    ],
    mini_game_prompt: "Ocean Skimmer: Steer the solar retrieval boat to collect floating plastics while steering clear of marine life.",
    mini_game_type: "ocean"
  },
  15: {
    sdg_goal: "SDG 15: Life on Land",
    sdg_number: 15,
    character_dialogue: "Commander, illegal salvage crews outside our valley logged an ancient temperate woodland corridor! Soil erosion is now washing hillsides away. We need a rapid biodiversity recovery plan.",
    location_background: "Steep terraced hillside scarred by clear-cutting, gullies of red clay, and misted cloud forest remnants.",
    question: "How should we remediate this scarred ecosystem and prevent catastrophic mudslides?",
    options: [
      {
        text: "A) Seed pioneer alder and willow saplings with mycorrhizal fungal inoculants to bind soil, establishing protected wildlife corridors.",
        is_correct: true,
        metric_impact: { ecological_health: 22, resource_stability: 10, community_well_being: 8 },
        feedback: "Mycorrhizal networks knit soil particles together, while pioneer trees rapidly fix nitrogen and halt hillside erosion."
      },
      {
        text: "B) Spray thick concrete slurry over the hillside to seal the loose dirt permanently.",
        is_correct: false,
        metric_impact: { ecological_health: -26, resource_stability: -10, community_well_being: -4 },
        feedback: "Shotcrete destroys biological soil life forever, blocks groundwater percolation, and overheats the surrounding terrain."
      },
      {
        text: "C) Plant a single fast-growing eucalyptus monoculture for timber resale.",
        is_correct: false,
        metric_impact: { resource_stability: 6, ecological_health: -15, community_well_being: -5 },
        feedback: "Eucalyptus monocultures guzzle scarce groundwater, secrete oils that inhibit native vegetation, and fuel wildfire hazards."
      }
    ],
    mini_game_prompt: "Tree Planting Blitz: Plant mixed native saplings on critical slope contour lines within 45 seconds.",
    mini_game_type: "trees"
  }
};

// API: Generate scenario (with Gemini or Fallback)
app.post('/api/director/generate', async (req, res) => {
  const { sdg_number, custom_context } = req.body;
  const targetSdg = sdg_number ? parseInt(sdg_number, 10) : Math.floor(Math.random() * 17) + 1;

  // If Gemini AI is available, use it to generate a unique, richly detailed scenario turn
  if (ai) {
    try {
      const prompt = `You are the Game Director and Narrator for "The Last Green City", an interactive ecological strategy game set in Verdia—the last green sanctuary on Earth.
The companion character is "Pip" (a brave, curious young botanist scout with messy brown hair and a patched green eco-suit) and Dr. Maya.

Generate an interactive mission for UN Sustainable Development Goal (SDG) #${targetSdg}.
${custom_context ? `Special player circumstance or crisis prompt: "${custom_context}"` : ''}

You MUST output ONLY a valid JSON object matching this EXACT schema (no markdown fences, just pure JSON):
{
  "sdg_goal": "SDG ${targetSdg}: [Name of SDG]",
  "sdg_number": ${targetSdg},
  "character_dialogue": "Pip's briefing to the Commander (2-3 sentences, urgent, evocative, hopeful)",
  "location_background": "Visual setting description in or around Verdia",
  "question": "A decisive 1-sentence dilemma asking which sustainable technology or social solution to deploy",
  "options": [
    {
      "text": "A) [Scientifically sound, regenerative sustainable solution]",
      "is_correct": true,
      "metric_impact": {
        "resource_stability": 15,
        "ecological_health": 12,
        "community_well_being": 10
      },
      "feedback": "Educational explanation of why this works in real-world sustainability science"
    },
    {
      "text": "B) [Shortsighted or extractive technological fix]",
      "is_correct": false,
      "metric_impact": {
        "resource_stability": 5,
        "ecological_health": -15,
        "community_well_being": -5
      },
      "feedback": "Why this short-term fix backfires ecologically"
    },
    {
      "text": "C) [Harmful, polluting or regressive shortcut]",
      "is_correct": false,
      "metric_impact": {
        "resource_stability": -10,
        "ecological_health": -20,
        "community_well_being": -10
      },
      "feedback": "Severe environmental or social consequences of this approach"
    }
  ],
  "mini_game_prompt": "1-sentence description of an interactive task",
  "mini_game_type": "water" | "energy" | "waste" | "trees" | "ocean"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      return res.json({ success: true, scenario: parsed, source: 'gemini-3.8-flash' });
    } catch (err: any) {
      console.warn('Gemini generation failed, falling back to curated preset:', err?.message);
    }
  }

  // Fallback to rich curated preset or generated preset
  const preset = SDG_PRESETS[targetSdg] || {
    sdg_goal: `SDG ${targetSdg}: Global Eco Target #${targetSdg}`,
    sdg_number: targetSdg,
    character_dialogue: `Commander, telemetry in Sector ${targetSdg} indicates urgent ecological imbalances. We must act decisively to safeguard Verdia's perimeter and restore regional equilibrium.`,
    location_background: `Border Sector ${targetSdg} showing degraded soil and damaged bioswales awaiting remediation.`,
    question: "Which high-impact sustainable policy should Verdia implement immediately?",
    options: [
      {
        text: `A) Mobilize decentralized ecological cooperatives and circular technology transfer.`,
        is_correct: true,
        metric_impact: { resource_stability: 14, ecological_health: 12, community_well_being: 10 },
        feedback: "Community-led circular restoration yields proven multi-generational resilience."
      },
      {
        text: `B) Rely on centralized heavy-duty mechanical filtration and high-cost imports.`,
        is_correct: false,
        metric_impact: { resource_stability: -10, ecological_health: 2, community_well_being: -4 },
        feedback: "High capital overheads and energy drain make this solution brittle during grid stress."
      },
      {
        text: `C) Delay intervention until the next fiscal council cycle.`,
        is_correct: false,
        metric_impact: { resource_stability: -5, ecological_health: -18, community_well_being: -12 },
        feedback: "Ecological degradation accelerates exponentially if unaddressed; delaying worsens the crisis."
      }
    ],
    mini_game_prompt: `Sector ${targetSdg} Rapid Remediation: Calibrate restorative inputs to achieve eco-equilibrium.`,
    mini_game_type: targetSdg % 5 === 0 ? 'trees' : targetSdg % 3 === 0 ? 'water' : targetSdg % 2 === 0 ? 'energy' : 'waste'
  };

  return res.json({ success: true, scenario: preset, source: 'curated-database' });
});

// API: Generate unexpected random crisis event
app.post('/api/director/random-event', async (req, res) => {
  const events = [
    {
      title: "Sudden Microplastic Inversion",
      description: "A thermal air pocket collapsed, showering the eastern algae reservoirs with concentrated airborne microplastics.",
      dilemma: "How do we filter the water before it enters the residential aqueducts?",
      choices: [
        {
          label: "Deploy acoustic ultrasound microplastic agglutinators",
          cost: 15,
          impact: { resource_stability: 10, ecological_health: 8 }
        },
        {
          label: "Flush contaminated reservoirs into exterior wasteland",
          cost: 0,
          impact: { resource_stability: -15, ecological_health: -18 }
        }
      ]
    },
    {
      title: "Solstice Solar Flare Surge",
      description: "Intense solar flaring is overloading rooftop photovoltaic converters across District 3.",
      dilemma: "Direct the surge to prevent grid transformers from exploding!",
      choices: [
        {
          label: "Divert peak surge into subterranean thermal sand batteries",
          cost: 20,
          impact: { resource_stability: 15, community_well_being: 5 }
        },
        {
          label: "Disconnect District 3 residential branch lines for 6 hours",
          cost: 0,
          impact: { community_well_being: -14, resource_stability: -5 }
        }
      ]
    },
    {
      title: "Migratory Pollinator Haven Alert",
      description: "A swarm of rare wild honeybees escaping exterior wildfires has arrived at Verdia's bio-filter dome.",
      dilemma: "Provide immediate sanctuary without disrupting existing hive zones.",
      choices: [
        {
          label: "Open high-altitude botanical solarium and plant clover pathways",
          cost: 25,
          impact: { ecological_health: 20, community_well_being: 8 }
        },
        {
          label: "Use sonic repellents to divert the swarm around the city",
          cost: 0,
          impact: { ecological_health: -12, community_well_being: -6 }
        }
      ]
    }
  ];

  const randomEv = events[Math.floor(Math.random() * events.length)];
  res.json({ success: true, event: randomEv });
});

// Mount Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Last Green City server running on http://localhost:${PORT}`);
  });
}

startServer();
