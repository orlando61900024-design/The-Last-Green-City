import { SDGInfo, TurnScenarioJSON } from '../types/game';

export const SDG_LIST: SDGInfo[] = [
  {
    id: 1,
    title: "No Poverty",
    shortTitle: "Help Everyone",
    unColor: "#E5243B",
    icon: "Users",
    category: "Community Well-Being",
    sectorName: "Western Village Shelters",
    coordinates: { x: 18, y: 32 },
    initialPollution: 65,
    completed: false,
    summary: "Help new families build safe homes, warm gardens, and good jobs.",
    realWorldTarget: "Make sure all people have safe shelter, food, and fair opportunities."
  },
  {
    id: 2,
    title: "Zero Hunger",
    shortTitle: "Healthy Food",
    unColor: "#DDA63A",
    icon: "Wheat",
    category: "Resource Stability",
    sectorName: "Northern Rooftop Gardens",
    coordinates: { x: 34, y: 22 },
    initialPollution: 50,
    completed: false,
    summary: "Grow fresh veggies, fruits, and grains so nobody goes hungry.",
    realWorldTarget: "Grow healthy food naturally using vertical farms and pollinator bees."
  },
  {
    id: 3,
    title: "Good Health",
    shortTitle: "Clean Air & Health",
    unColor: "#4C9F38",
    icon: "HeartPulse",
    category: "Community Well-Being",
    sectorName: "Central Healing Park",
    coordinates: { x: 42, y: 45 },
    initialPollution: 40,
    completed: false,
    summary: "Breathe clean air and give everyone good doctors and plant medicine.",
    realWorldTarget: "Keep air and water clean so kids and families stay healthy."
  },
  {
    id: 4,
    title: "Quality Education",
    shortTitle: "Fun Learning",
    unColor: "#C5192D",
    icon: "GraduationCap",
    category: "Community Well-Being",
    sectorName: "Treehouse Science School",
    coordinates: { x: 55, y: 36 },
    initialPollution: 35,
    completed: false,
    summary: "Teach all kids how to take care of nature, plants, and clean energy.",
    realWorldTarget: "Free, joyful education about nature and planetary care for every child."
  },
  {
    id: 5,
    title: "Gender Equality",
    shortTitle: "Equal Voices",
    unColor: "#FF3A21",
    icon: "Scale",
    category: "Community Well-Being",
    sectorName: "Council Garden Hall",
    coordinates: { x: 68, y: 30 },
    initialPollution: 30,
    completed: false,
    summary: "Make sure girls, boys, women, and men make decisions together equally.",
    realWorldTarget: "Equal chances and shared leadership for everyone."
  },
  {
    id: 6,
    title: "Clean Water",
    shortTitle: "Pure Water",
    unColor: "#26BDE2",
    icon: "Droplets",
    category: "Resource Stability",
    sectorName: "Southern Oasis Lake",
    coordinates: { x: 26, y: 64 },
    initialPollution: 80,
    completed: false,
    summary: "Filter dirty water with reed plants and sunshine so it is sweet and safe.",
    realWorldTarget: "Clean drinking water and safe sanitation for all living things."
  },
  {
    id: 7,
    title: "Clean Energy",
    shortTitle: "Sun & Wind Power",
    unColor: "#FCC30B",
    icon: "Zap",
    category: "Resource Stability",
    sectorName: "Sunny Wind Ridge",
    coordinates: { x: 48, y: 68 },
    initialPollution: 70,
    completed: false,
    summary: "Power homes with warm sunshine, spinning windmills, and flowing rivers.",
    realWorldTarget: "100% renewable electricity with zero black smoke."
  },
  {
    id: 8,
    title: "Good Work",
    shortTitle: "Green Jobs",
    unColor: "#A21942",
    icon: "Briefcase",
    category: "Community Well-Being",
    sectorName: "Artisan & Repair Workshop",
    coordinates: { x: 62, y: 55 },
    initialPollution: 45,
    completed: false,
    summary: "Fun jobs where workers fix machines, plant trees, and earn fair rewards.",
    realWorldTarget: "Safe, happy work that protects nature and supports families."
  },
  {
    id: 9,
    title: "Green Inventions",
    shortTitle: "Smart Inventions",
    unColor: "#FD6925",
    icon: "Cpu",
    category: "Resource Stability",
    sectorName: "Eco-Invention Lab",
    coordinates: { x: 74, y: 48 },
    initialPollution: 55,
    completed: false,
    summary: "Build bridges and houses using strong wood, bio-materials, and clean tools.",
    realWorldTarget: "Smart technology inspired by nature."
  },
  {
    id: 10,
    title: "Fairness for All",
    shortTitle: "Sharing Fairly",
    unColor: "#DD1367",
    icon: "Users2",
    category: "Community Well-Being",
    sectorName: "Friendly Neighborhood Rings",
    coordinates: { x: 80, y: 62 },
    initialPollution: 40,
    completed: false,
    summary: "Every neighborhood gets cool green parks and plenty of pure water.",
    realWorldTarget: "Fairness and equal green spaces for rich and poor alike."
  },
  {
    id: 11,
    title: "Cool Green Cities",
    shortTitle: "Green Streets",
    unColor: "#FD9D24",
    icon: "Building2",
    category: "Community Well-Being",
    sectorName: "Verdia Central Town Square",
    coordinates: { x: 50, y: 50 },
    initialPollution: 50,
    completed: false,
    summary: "Plant shady trees over sidewalks so streets stay cool and safe for bicycles.",
    realWorldTarget: "Walkable, leafy neighborhoods with zero traffic pollution."
  },
  {
    id: 12,
    title: "Zero Waste",
    shortTitle: "Fix & Recycle",
    unColor: "#BF8B2E",
    icon: "Recycle",
    category: "Resource Stability",
    sectorName: "Recycling & Compost Hub",
    coordinates: { x: 38, y: 78 },
    initialPollution: 75,
    completed: false,
    summary: "Turn food scraps into soil, repair broken toys, and say no to plastic trash.",
    realWorldTarget: "Recycle 100% of materials in a clean loop."
  },
  {
    id: 13,
    title: "Climate Action",
    shortTitle: "Cool the Planet",
    unColor: "#3F7E44",
    icon: "CloudRain",
    category: "Ecological Health",
    sectorName: "Great Forest Windbreak",
    coordinates: { x: 15, y: 55 },
    initialPollution: 85,
    completed: false,
    summary: "Plant thick belts of trees to calm big storms and soak up greenhouse heat.",
    realWorldTarget: "Stop global warming by protecting trees, soils, and clean air."
  },
  {
    id: 14,
    title: "Life in the Ocean",
    shortTitle: "Happy Oceans",
    unColor: "#0A97D9",
    icon: "Fish",
    category: "Ecological Health",
    sectorName: "Coral Reef Bay",
    coordinates: { x: 82, y: 78 },
    initialPollution: 90,
    completed: false,
    summary: "Clean up plastic trash and grow colorful coral nurseries for sea turtles.",
    realWorldTarget: "Keep oceans clean and protect colorful fish, whales, and reefs."
  },
  {
    id: 15,
    title: "Life on Land",
    shortTitle: "Save the Forests",
    unColor: "#56C02B",
    icon: "Trees",
    category: "Ecological Health",
    sectorName: "Misty Mountain Forest",
    coordinates: { x: 22, y: 15 },
    initialPollution: 85,
    completed: false,
    summary: "Plant millions of native trees so birds, deer, and butterflies have a safe home.",
    realWorldTarget: "Stop deforestation and restore lush wildlife habitats."
  },
  {
    id: 16,
    title: "Peace & Kindness",
    shortTitle: "Peace & Kindness",
    unColor: "#00689D",
    icon: "ShieldCheck",
    category: "Community Well-Being",
    sectorName: "Friendship Peace Pavilion",
    coordinates: { x: 66, y: 18 },
    initialPollution: 30,
    completed: false,
    summary: "Listen to each other, solve problems with kindness, and protect nature by law.",
    realWorldTarget: "Peaceful communities where everyone is respected and safe."
  },
  {
    id: 17,
    title: "Working Together",
    shortTitle: "Global Friends",
    unColor: "#19486A",
    icon: "Globe",
    category: "Community Well-Being",
    sectorName: "World Radio & Seed Library",
    coordinates: { x: 50, y: 12 },
    initialPollution: 45,
    completed: false,
    summary: "Share seeds, clean energy, and friendship with all cities across the world.",
    realWorldTarget: "Teamwork across all nations to heal planet Earth together."
  }
];

export const DEFAULT_SCENARIOS: Record<number, TurnScenarioJSON> = {
  1: {
    sdg_goal: "SDG 1: No Poverty",
    sdg_number: 1,
    character_dialogue: "Commander! Families just arrived at our city gate after floods destroyed their farms. How should we empower them for long-term security?",
    location_background: "Western Village Shelters: Earth-brick cottages where newly arrived families build fresh lives.",
    question: "What is the most sustainable way to help families build thriving livelihoods?",
    question_visual: "🏘️🌱",
    options: [
      {
        text: "Give them heirloom seeds, gardening tools, and cooperative land plots so they can grow food and earn together!",
        is_correct: true,
        visual_icon: "🌱🤝",
        visual_tag: "Self-Reliance",
        visual_color: "emerald",
        metric_impact: { community_well_being: 20, resource_stability: 10, ecological_health: 5 },
        feedback: "Brilliant! Empowering people with tools, fertile soil, and cooperative ownership permanently lifts families out of poverty!"
      },
      {
        text: "Hand out emergency bread rations today without teaching farming or offering tools.",
        is_correct: false,
        visual_icon: "🍞⏳",
        visual_tag: "Temporary Fix",
        visual_color: "amber",
        metric_impact: { community_well_being: -8, resource_stability: -12, ecological_health: 0 },
        feedback: "Emergency food helps for a day, but without land and tools, families remain vulnerable to hunger tomorrow."
      },
      {
        text: "Lock the city perimeter gates and turn them away into the contaminated wasteland.",
        is_correct: false,
        visual_icon: "🔒❌",
        visual_tag: "Inhumane",
        visual_color: "rose",
        metric_impact: { community_well_being: -25, resource_stability: -12, ecological_health: -10 },
        feedback: "Cruel and short-sighted! Rejecting families weakens the city and destroys trust and humanity."
      }
    ],
    mini_game_prompt: "Sort and distribute farming seeds and repair tools fairly to all new families!",
    mini_game_type: "waste"
  },

  2: {
    sdg_goal: "SDG 2: Zero Hunger",
    sdg_number: 2,
    character_dialogue: "Look at our rooftop gardens, Commander! We need abundant, nutritious food without degrading our living soil. What should we cultivate?",
    location_background: "Northern Rooftop Gardens: Tiered sunny balconies with vertical hydroponics and beehives.",
    question: "How can Verdia grow plentiful, vitamin-rich food while nurturing the soil?",
    question_visual: "🥗🌾",
    options: [
      {
        text: "Plant diverse heirloom crops, companion herbs, and install beehives to maximize natural pollination!",
        is_correct: true,
        visual_icon: "🍓🐝",
        visual_tag: "Biodiverse Harvest",
        visual_color: "emerald",
        metric_impact: { resource_stability: 20, ecological_health: 15, community_well_being: 10 },
        feedback: "Outstanding! Biodiverse crops and pollinator bees yield delicious, resilient harvests with zero toxic runoff!"
      },
      {
        text: "Manufacture synthetic gray nutrient paste in a loud, power-draining chemical factory.",
        is_correct: false,
        visual_icon: "🥫⚡",
        visual_tag: "Energy Drain",
        visual_color: "amber",
        metric_impact: { resource_stability: -12, community_well_being: -10, ecological_health: -5 },
        feedback: "Synthetic paste consumes immense electricity, tastes terrible, and offers no living microbial nutrients."
      },
      {
        text: "Drench the soil in chemical pesticides that kill weeds but poison earthworms and honeybees.",
        is_correct: false,
        visual_icon: "☠️🛢️",
        visual_tag: "Toxic Chemicals",
        visual_color: "rose",
        metric_impact: { resource_stability: -10, ecological_health: -24, community_well_being: -12 },
        feedback: "Chemical pesticides kill beneficial worms, poison groundwater, and destroy natural pollinators!"
      }
    ],
    mini_game_prompt: "Cultivate lush vertical berry bushes and welcome friendly pollinator bees!",
    mini_game_type: "trees"
  },

  3: {
    sdg_goal: "SDG 3: Good Health & Well-Being",
    sdg_number: 3,
    character_dialogue: "Doctor Lin here! Toxic smog from outside blew over the ridge, causing respiratory coughs. How should our wellness clinic respond?",
    location_background: "Central Healing Park: A serene botanical arboretum with herbal steam baths and wellness pavilions.",
    question: "What is the best way to safeguard community respiratory health and prevent illness?",
    question_visual: "🏥🩺",
    options: [
      {
        text: "Deploy botanical eucalyptus bio-filters and distribute free herbal teas and clean air respirators to every citizen!",
        is_correct: true,
        visual_icon: "🌿🫁",
        visual_tag: "Preventative Care",
        visual_color: "emerald",
        metric_impact: { community_well_being: 22, ecological_health: 12, resource_stability: 8 },
        feedback: "Excellent! Botanical clean air filtration and universal natural medicine treat coughs quickly and protect everybody equally!"
      },
      {
        text: "Only give medicine to wealthy citizens who can pay premium gold coins.",
        is_correct: false,
        visual_icon: "💰🚫",
        visual_tag: "Unequal Access",
        visual_color: "rose",
        metric_impact: { community_well_being: -22, resource_stability: -10, ecological_health: -5 },
        feedback: "Denying healthcare based on wealth leaves epidemics to spread unchecked through the entire city!"
      },
      {
        text: "Tell people to simply hold their breath when walking through the smoggy streets.",
        is_correct: false,
        visual_icon: "🤐💨",
        visual_tag: "Absurd Advice",
        visual_color: "rose",
        metric_impact: { community_well_being: -20, resource_stability: -12, ecological_health: -10 },
        feedback: "Holding breath is impossible! Without clean air filters and medicine, respiratory illnesses worsen rapidly."
      }
    ],
    mini_game_prompt: "Balance clean air scrubbers, herbal extracts, and universal medicine in the dispensary!",
    mini_game_type: "clinic"
  },

  4: {
    sdg_goal: "SDG 4: Quality Education",
    sdg_number: 4,
    character_dialogue: "Teacher Maya calling! The young students want to understand how renewable solar energy and planetary ecosystems work. How should we teach them?",
    location_background: "Treehouse Science School: Open-air classrooms built in the branches of giant cork oaks.",
    question: "How can we provide joyful, hands-on environmental education for all young minds?",
    question_visual: "📚🎒",
    options: [
      {
        text: "Build open outdoor living laboratories where students assemble solar toys, observe soil microbes, and learn planetary stewardship!",
        is_correct: true,
        visual_icon: "🔬🌳",
        visual_tag: "Hands-on Discovery",
        visual_color: "emerald",
        metric_impact: { community_well_being: 22, resource_stability: 10, ecological_health: 12 },
        feedback: "Inspiring! Children who learn by observing living nature grow into creative planetary protectors and scientists!"
      },
      {
        text: "Force kids to memorize dry numbers inside dark rooms without touching plants or testing equipment.",
        is_correct: false,
        visual_icon: "📋💤",
        visual_tag: "Boring Rote Learning",
        visual_color: "amber",
        metric_impact: { community_well_being: -12, resource_stability: -5, ecological_health: -8 },
        feedback: "Rote memorization disconnects kids from nature and extinguishes natural curiosity and innovation."
      },
      {
        text: "Cancel all science and environmental classes to put children to work cleaning smokestacks.",
        is_correct: false,
        visual_icon: "🏭⚠️",
        visual_tag: "Child Exploitation",
        visual_color: "rose",
        metric_impact: { community_well_being: -28, resource_stability: -15, ecological_health: -15 },
        feedback: "Exploiting youth denies them a future and stunts the intelligence and moral foundation of society."
      }
    ],
    mini_game_prompt: "Tune and transmit open nature science curricula across the education relay network!",
    mini_game_type: "network"
  },

  5: {
    sdg_goal: "SDG 5: Gender Equality",
    sdg_number: 5,
    character_dialogue: "Welcome to the Council Garden! We are voting on our 5-year water and energy master plan. Who should be at the decision table?",
    location_background: "Council Garden Hall: A circular cedar amphitheater surrounded by flowering elderberry trees.",
    question: "How do we ensure all voices, genders, and backgrounds lead Verdia together fairly?",
    question_visual: "⚖️🤝",
    options: [
      {
        text: "Ensure equal representation of women, men, and diverse community leaders in every council vote and leadership role!",
        is_correct: true,
        visual_icon: "👩🏽‍🌾🧑🏼‍🔬",
        visual_tag: "Equal Leadership",
        visual_color: "emerald",
        metric_impact: { community_well_being: 22, resource_stability: 12, ecological_health: 8 },
        feedback: "Brilliant! When leadership reflects the full diversity of our people, decisions are wiser, fairer, and far more resilient!"
      },
      {
        text: "Only allow a single elder patriarch to make all city decisions from behind closed doors.",
        is_correct: false,
        visual_icon: "👴🏼🔒",
        visual_tag: "One-Man Rule",
        visual_color: "rose",
        metric_impact: { community_well_being: -20, resource_stability: -10, ecological_health: -8 },
        feedback: "Concentrating power in one person ignores crucial community needs and sparks division."
      },
      {
        text: "Exclude women from environmental planning and engineering roles.",
        is_correct: false,
        visual_icon: "🚫👩‍🦱",
        visual_tag: "Unfair Exclusion",
        visual_color: "rose",
        metric_impact: { community_well_being: -24, resource_stability: -12, ecological_health: -10 },
        feedback: "Excluding half the population robs the city of vital engineering expertise, empathy, and leadership."
      }
    ],
    mini_game_prompt: "Calibrate equal representation balances and universal community clinic resources!",
    mini_game_type: "clinic"
  },

  6: {
    sdg_goal: "SDG 6: Clean Water & Sanitation",
    sdg_number: 6,
    character_dialogue: "Commander, rainwater runoff in Southern Oasis Lake contains silt and mud! We need crystalline, sweet water for drinking and irrigation.",
    location_background: "Southern Oasis Lake: Natural reed-fringed reservoir reflecting mountain peaks.",
    question: "What is the purest, most regenerative way to purify municipal water?",
    question_visual: "💧🚰",
    options: [
      {
        text: "Channel water through constructed reed wetlands, silica sand beds, and natural solar ultraviolet disinfection!",
        is_correct: true,
        visual_icon: "🌾☀️",
        visual_tag: "Natural Bio-Filter",
        visual_color: "emerald",
        metric_impact: { resource_stability: 22, ecological_health: 15, community_well_being: 10 },
        feedback: "Flawless! Reed beds and sand naturally trap silt and bacteria, creating sparkling pure water with zero chemical residue!"
      },
      {
        text: "Over-pump ancient deep aquifers until the underground water table permanently collapses.",
        is_correct: false,
        visual_icon: "🕳️📉",
        visual_tag: "Depletes Aquifer",
        visual_color: "amber",
        metric_impact: { resource_stability: -10, ecological_health: -18, community_well_being: -8 },
        feedback: "Draining fossil aquifers causes ground subsidence and leaves future generations with bone-dry wells."
      },
      {
        text: "Truck in thousands of disposable single-use plastic water bottles from diesel-burning factories.",
        is_correct: false,
        visual_icon: "🚛🗑️",
        visual_tag: "Plastic Pollution",
        visual_color: "rose",
        metric_impact: { resource_stability: -12, ecological_health: -24, community_well_being: -8 },
        feedback: "Truck exhaust pollutes the air, and mountains of plastic bottles choke waterways and oceans."
      }
    ],
    mini_game_prompt: "Slide biological filters to balance pH between 6.5 and 8.5 for sweet drinking water!",
    mini_game_type: "water"
  },

  7: {
    sdg_goal: "SDG 7: Affordable & Clean Energy",
    sdg_number: 7,
    character_dialogue: "Storm clouds are rolling over the solar panels on Sunny Wind Ridge! The city grid needs continuous electricity. How do we power Verdia?",
    location_background: "Sunny Wind Ridge: High bluffs where wind turbines and pumped hydro reservoirs harmonize.",
    question: "How can our microgrid guarantee 100% reliable clean electricity day and night?",
    question_visual: "⚡☀️",
    options: [
      {
        text: "Harness high-altitude wind gusts and release gravity-fed water from pumped hydro reservoirs into clean turbines!",
        is_correct: true,
        visual_icon: "🌬️🌊",
        visual_tag: "Renewable Synergy",
        visual_color: "emerald",
        metric_impact: { resource_stability: 20, ecological_health: 12, community_well_being: 10 },
        feedback: "Brilliant engineering! Combining wind, solar, and gravity pumped-hydro keeps the city humming with zero smoke!"
      },
      {
        text: "Fire up old rusty diesel generators that billow black soot into the residential skies.",
        is_correct: false,
        visual_icon: "🛢️💨",
        visual_tag: "Smog & Soot",
        visual_color: "rose",
        metric_impact: { resource_stability: -8, ecological_health: -24, community_well_being: -12 },
        feedback: "Burning oil fills citizens' lungs with soot and accelerates toxic atmospheric warming!"
      },
      {
        text: "Shut off power to hospitals and schools whenever the sun hides behind a cloud.",
        is_correct: false,
        visual_icon: "💡❌",
        visual_tag: "Catastrophic Blackout",
        visual_color: "rose",
        metric_impact: { resource_stability: -5, community_well_being: -26, ecological_health: -8 },
        feedback: "Blacking out critical community facilities endangers lives and halts city operations."
      }
    ],
    mini_game_prompt: "Harmonize solar, wind, and hydro levels to balance the grid at 100% stable output!",
    mini_game_type: "energy"
  },

  8: {
    sdg_goal: "SDG 8: Decent Work & Economic Growth",
    sdg_number: 8,
    character_dialogue: "Greetings from the Artisan Quarter! Workers want meaningful careers that repair nature rather than exploit it. What green economy should we foster?",
    location_background: "Artisan & Repair Workshop: Timber timberframing hall buzzing with upcycling lathes and cob construction.",
    question: "How do we create dignified, well-paying green jobs for all citizens?",
    question_visual: "🛠️💼",
    options: [
      {
        text: "Establish cooperative repair cafes, eco-craft apprenticeships, and rewilding careers with fair profit-sharing!",
        is_correct: true,
        visual_icon: "🌱⚙️",
        visual_tag: "Circular Economy",
        visual_color: "emerald",
        metric_impact: { community_well_being: 20, resource_stability: 15, ecological_health: 10 },
        feedback: "Tremendous! Repairing equipment and restoring biomes creates meaningful work, fair prosperity, and zero waste!"
      },
      {
        text: "Force laborers to work 16-hour shifts in unsafe conditions for meager bread scraps.",
        is_correct: false,
        visual_icon: "⛓️😓",
        visual_tag: "Sweatshop Labor",
        visual_color: "rose",
        metric_impact: { community_well_being: -25, resource_stability: -10, ecological_health: -8 },
        feedback: "Exploitative sweatshops cause injuries, depression, and social unrest, destroying community well-being."
      },
      {
        text: "Automate all jobs with unmonitored robotics and leave all human workers without income.",
        is_correct: false,
        visual_icon: "🤖📉",
        visual_tag: "Mass Unemployment",
        visual_color: "amber",
        metric_impact: { community_well_being: -20, resource_stability: -12, ecological_health: -5 },
        feedback: "Discarding human workers destroys purchasing power, community dignity, and economic equity."
      }
    ],
    mini_game_prompt: "Link apprentice blueprints and green skill networks across regional trade hubs!",
    mini_game_type: "network"
  },

  9: {
    sdg_goal: "SDG 9: Industry, Innovation & Infrastructure",
    sdg_number: 9,
    character_dialogue: "Chief Engineer Suki here! We are designing new city bridges and transit lines across the river. What infrastructure should we construct?",
    location_background: "Eco-Invention Lab: Bio-composite workshop where mycelium bricks and carbon-negative concrete are engineered.",
    question: "How should Verdia build durable, climate-resilient infrastructure?",
    question_visual: "🔬🏗️",
    options: [
      {
        text: "Use carbon-absorbing bio-concrete, hemp-reinforced bridges, and silent solar-electric light rail!",
        is_correct: true,
        visual_icon: "🚝🌿",
        visual_tag: "Living Infrastructure",
        visual_color: "emerald",
        metric_impact: { resource_stability: 20, ecological_health: 14, community_well_being: 12 },
        feedback: "Superb! Bio-materials and electric light rail connect neighborhoods without polluting air or draining finite quarries!"
      },
      {
        text: "Construct 8-lane asphalt highways that encourage smoky fossil cars and divide neighborhoods.",
        is_correct: false,
        visual_icon: "🚗💨",
        visual_tag: "Fossil Urban Sprawl",
        visual_color: "rose",
        metric_impact: { resource_stability: -15, ecological_health: -24, community_well_being: -10 },
        feedback: "Massive highways cause gridlock, smog, heat island effects, and severe noise pollution!"
      },
      {
        text: "Build cheap, fragile bridges from uninspected scrap metal to save coins.",
        is_correct: false,
        visual_icon: "⚠️💥",
        visual_tag: "Hazardous Collapse",
        visual_color: "rose",
        metric_impact: { resource_stability: -18, community_well_being: -20, ecological_health: -10 },
        feedback: "Substandard construction collapses during spring floods, causing deaths and catastrophic repairs."
      }
    ],
    mini_game_prompt: "Balance the clean power flow into the new bio-composite light rail network!",
    mini_game_type: "energy"
  },

  10: {
    sdg_goal: "SDG 10: Reduced Inequalities",
    sdg_number: 10,
    character_dialogue: "Look across our districts, Commander. Outer suburbs have fewer shade trees and parks than the downtown plaza. How do we bridge this gap?",
    location_background: "Friendly Neighborhood Rings: Circular housing rings interconnected by leafy public tramways.",
    question: "How can we ensure every single neighborhood enjoys equal green beauty and resources?",
    question_visual: "🌈🏘️",
    options: [
      {
        text: "Distribute municipal funding equitably so underserved outer rings receive green parks, clean water fountains, and tram stops first!",
        is_correct: true,
        visual_icon: "⛲🌳",
        visual_tag: "Equitable Investment",
        visual_color: "emerald",
        metric_impact: { community_well_being: 22, resource_stability: 10, ecological_health: 12 },
        feedback: "Heartwarming! Prioritizing equal access ensures every child grows up with cool green trees, pure water, and clean mobility!"
      },
      {
        text: "Concentrate all beautiful fountains and parks only inside a gated wealthy quarter.",
        is_correct: false,
        visual_icon: "🏰⛔",
        visual_tag: "Segregated Wealth",
        visual_color: "rose",
        metric_impact: { community_well_being: -24, resource_stability: -10, ecological_health: -8 },
        feedback: "Gated luxury creates bitter inequality, resentment, and neglect of the wider environment."
      },
      {
        text: "Ignore the outer districts and let their infrastructure decay into ruins.",
        is_correct: false,
        visual_icon: "🏚️🚫",
        visual_tag: "Neglect",
        visual_color: "rose",
        metric_impact: { community_well_being: -22, resource_stability: -12, ecological_health: -10 },
        feedback: "Neglecting neighborhoods causes pollution to fester and eventually spread throughout the whole city."
      }
    ],
    mini_game_prompt: "Balance equitable clinic dispensary supplies and community access across all districts!",
    mini_game_type: "clinic"
  },

  11: {
    sdg_goal: "SDG 11: Sustainable Cities & Communities",
    sdg_number: 11,
    character_dialogue: "Phew, it's so sweltering out in the stone square! Sun is baking the stone tiles. How should we cool our city streets naturally?",
    location_background: "Verdia Central Town Square: Bustling stone square where pedestrians, market stalls, and kids meet.",
    question: "What is the most effective way to beat urban heat islands and make streets enjoyable?",
    question_visual: "🌳🚲",
    options: [
      {
        text: "Plant broadleaf shady trees, install living ivy walls, and pave streets with permeable grass pavers!",
        is_correct: true,
        visual_icon: "🌳🌸",
        visual_tag: "Natural Cooling",
        visual_color: "emerald",
        metric_impact: { community_well_being: 20, ecological_health: 16, resource_stability: 10 },
        feedback: "Marvelous! Tree canopies transpire cool water vapor, reducing street temperatures by 8°C while singing birds return!"
      },
      {
        text: "Mount giant electric air conditioners on streetlamps that blow hot exhaust into strollers.",
        is_correct: false,
        visual_icon: "❄️🔥",
        visual_tag: "Heat Wasteland",
        visual_color: "amber",
        metric_impact: { resource_stability: -16, ecological_health: -12, community_well_being: -8 },
        feedback: "Air conditioners dump intense waste heat onto sidewalks, exacerbating the outdoor heat island!"
      },
      {
        text: "Cut down all remaining trees to make more room for concrete parking lots.",
        is_correct: false,
        visual_icon: "🪓🅿️",
        visual_tag: "Concrete Oven",
        visual_color: "rose",
        metric_impact: { ecological_health: -26, community_well_being: -20, resource_stability: -10 },
        feedback: "Removing trees turns the city into an uninhabitable frying pan of heat and glare."
      }
    ],
    mini_game_prompt: "Plant shady oaks and flowering climber trellises along the avenues!",
    mini_game_type: "trees"
  },

  12: {
    sdg_goal: "SDG 12: Responsible Consumption & Production",
    sdg_number: 12,
    character_dialogue: "Look at the salvage bins! Vegetable peelings, worn clothes, and chipped glass are arriving. How do we keep Verdia zero-waste?",
    location_background: "Recycling & Compost Hub: Solar sorting facility converting scrap streams into valuable inputs.",
    question: "How do we create a closed-loop circular economy where nothing goes to landfill?",
    question_visual: "♻️📦",
    options: [
      {
        text: "Turn all organic scraps into nutrient-rich compost and remelt glass and aluminum in solar furnaces!",
        is_correct: true,
        visual_icon: "🍎🔄",
        visual_tag: "Zero-Waste Loop",
        visual_color: "emerald",
        metric_impact: { resource_stability: 22, ecological_health: 14, community_well_being: 10 },
        feedback: "Genius! Food waste regenerates farm soils, and remelted glass prevents quarrying virgin sands!"
      },
      {
        text: "Bury toxic lithium batteries and electronic scrap in an unlined ditch behind the playground.",
        is_correct: false,
        visual_icon: "🕳️🔋",
        visual_tag: "Toxic Leaching",
        visual_color: "rose",
        metric_impact: { resource_stability: -15, ecological_health: -26, community_well_being: -14 },
        feedback: "Heavy metals and battery acid seep into drinking water, causing irreversible brain and organ damage!"
      },
      {
        text: "Burn all plastic packaging in a roaring bonfire that blows thick carcinogens across the valley.",
        is_correct: false,
        visual_icon: "🔥☁️",
        visual_tag: "Dioxin Smoke",
        visual_color: "rose",
        metric_impact: { ecological_health: -24, community_well_being: -20, resource_stability: -8 },
        feedback: "Incinerating plastic releases deadly dioxins and microplastics into our lungs and gardens."
      }
    ],
    mini_game_prompt: "Rapidly sort incoming waste items into Compost, E-Waste, Bioplastic, and Clean Glass!",
    mini_game_type: "waste"
  },

  13: {
    sdg_goal: "SDG 13: Climate Action",
    sdg_number: 13,
    character_dialogue: "Look toward the western horizon! Fierce desert heatstorms and wildfire smoke are marching toward Verdia. How do we defend our sanctuary?",
    location_background: "Great Forest Windbreak: High defensive boundary ridge facing the exterior wasteland.",
    question: "What is our strongest shield against planetary climate extremes?",
    question_visual: "🛡️🌪️",
    options: [
      {
        text: "Plant the Great Green Wall of deep-rooted drought-hardy acacia, olive, and cypress to buffer storms and sequester carbon!",
        is_correct: true,
        visual_icon: "🌳🛡️",
        visual_tag: "Living Bioshield",
        visual_color: "emerald",
        metric_impact: { ecological_health: 24, resource_stability: 12, community_well_being: 10 },
        feedback: "Magnificent! A dense belt of living root systems slows hurricane-force winds, traps dust, and stores thousands of tons of carbon!"
      },
      {
        text: "Spray untested sulfur chemicals into the upper stratosphere without studying climate side effects.",
        is_correct: false,
        visual_icon: "🧪☁️",
        visual_tag: "Catastrophic Risk",
        visual_color: "rose",
        metric_impact: { ecological_health: -26, resource_stability: -14, community_well_being: -15 },
        feedback: "Uncontrolled aerosol geoengineering can trigger devastating monsoon failures and permanent acid rain!"
      },
      {
        text: "Ignore the incoming dust storm and hope the weather fixes itself.",
        is_correct: false,
        visual_icon: "🙈🏜️",
        visual_tag: "Blind Neglect",
        visual_color: "rose",
        metric_impact: { ecological_health: -22, resource_stability: -16, community_well_being: -16 },
        feedback: "Inaction guarantees destruction! When the storm arrives, crops are smothered and water canals choke with sand."
      }
    ],
    mini_game_prompt: "Plant deep-rooted windbreak trees along the defensive hillside!",
    mini_game_type: "trees"
  },

  14: {
    sdg_goal: "SDG 14: Life in the Ocean",
    sdg_number: 14,
    character_dialogue: "Look down into Coral Reef Bay! Old ghost fishing nets and discarded plastic containers are trapping baby sea turtles. How do we save the bay?",
    location_background: "Coral Reef Bay: Coastal lagoon where sea turtles graze on seagrass beds amidst vibrant coral heads.",
    question: "How can we permanently restore marine ecosystems and free trapped sea life?",
    question_visual: "🐢🌊",
    options: [
      {
        text: "Deploy quiet solar skimmer boats to retrieve plastics, untangle sea turtles, and plant heat-resilient coral polyps!",
        is_correct: true,
        visual_icon: "⛵🪸",
        visual_tag: "Ocean Sanctuary",
        visual_color: "emerald",
        metric_impact: { ecological_health: 24, resource_stability: 12, community_well_being: 10 },
        feedback: "Heroic! Marine wildlife swims freely, microplastic ingestion drops to zero, and glowing coral reefs thrive!"
      },
      {
        text: "Dump toxic chlorine bleach into the bay to kill brown algae and make water look blue.",
        is_correct: false,
        visual_icon: "☠️🐟",
        visual_tag: "Total Reef Bleaching",
        visual_color: "rose",
        metric_impact: { ecological_health: -28, resource_stability: -12, community_well_being: -10 },
        feedback: "Bleach instantly murders fish, delicate coral polyps, and sea anemones, turning the bay into an aquatic graveyard!"
      },
      {
        text: "Drag weighted industrial bottom trawlers across the seabed to scoop up everything at once.",
        is_correct: false,
        visual_icon: "⚓💥",
        visual_tag: "Habitat Ruin",
        visual_color: "rose",
        metric_impact: { ecological_health: -30, resource_stability: -10, community_well_being: -12 },
        feedback: "Heavy dredge chains pulverize centuries-old coral colonies and destroy the nursery grounds of all fish!"
      }
    ],
    mini_game_prompt: "Steer the solar skimmer boat to collect plastic debris and rescue trapped sea turtles!",
    mini_game_type: "ocean"
  },

  15: {
    sdg_goal: "SDG 15: Life on Land",
    sdg_number: 15,
    character_dialogue: "Look at the mountainside! Illegal clear-cutting left scarred brown mud. Winter rains threaten to cause massive landslides. What is the plan?",
    location_background: "Misty Mountain Forest: Cloud-draped ridges providing headwaters to Verdia's rivers.",
    question: "How do we heal the scarred mountain and re-establish ancient forest biodiversity?",
    question_visual: "🌲🦌",
    options: [
      {
        text: "Plant mixed native alder, oak, and pine seedlings inoculated with mycorrhizal fungi to anchor the mountain soil!",
        is_correct: true,
        visual_icon: "🌱🍄",
        visual_tag: "Living Mycelium Web",
        visual_color: "emerald",
        metric_impact: { ecological_health: 24, resource_stability: 12, community_well_being: 10 },
        feedback: "Magnificent! Mycorrhizal networks weave the hillside into an indestructible root net, stopping landslides and bringing back deer and owls!"
      },
      {
        text: "Pave the entire mountain in industrial grey concrete to keep dirt from sliding.",
        is_correct: false,
        visual_icon: "🧱🪨",
        visual_tag: "Dead Mountain",
        visual_color: "rose",
        metric_impact: { ecological_health: -28, resource_stability: -15, community_well_being: -8 },
        feedback: "Concrete seals the soil, boiling subterranean creatures, and channels flash floods straight into downstream towns!"
      },
      {
        text: "Plant a single fast-growing timber monoculture for rapid commercial logging.",
        is_correct: false,
        visual_icon: "🪵📉",
        visual_tag: "Fragile Monoculture",
        visual_color: "amber",
        metric_impact: { resource_stability: -5, ecological_health: -18, community_well_being: -10 },
        feedback: "Monoculture timber provides no berries for wildlife, depletes minerals, and catches fire with terrifying speed."
      }
    ],
    mini_game_prompt: "Tap bare patches to plant native saplings and mycorrhizal root inoculants!",
    mini_game_type: "trees"
  },

  16: {
    sdg_goal: "SDG 16: Peace, Justice & Strong Institutions",
    sdg_number: 16,
    character_dialogue: "Welcome to the Friendship Peace Pavilion. Two farming cooperatives are disputing river irrigation rights. How should Verdia settle this disagreement?",
    location_background: "Friendship Peace Pavilion: Open-air marble rotunda framed by reflecting lotus pools.",
    question: "How should our justice council resolve resource disputes peacefully and fairly?",
    question_visual: "🕊️🏛️",
    options: [
      {
        text: "Host a transparent mediation council where both groups analyze stream flow data and agree on shared rotational water quotas!",
        is_correct: true,
        visual_icon: "🤝📜",
        visual_tag: "Restorative Justice",
        visual_color: "emerald",
        metric_impact: { community_well_being: 22, resource_stability: 14, ecological_health: 8 },
        feedback: "Wonderful statesmanship! Transparent mediation builds lasting trust, eliminates corruption, and ensures water for every harvest!"
      },
      {
        text: "Send armed guards to seize all the water and lock up anyone who speaks out.",
        is_correct: false,
        visual_icon: "🛡️⛓️",
        visual_tag: "Tyranny & Fear",
        visual_color: "rose",
        metric_impact: { community_well_being: -26, resource_stability: -12, ecological_health: -8 },
        feedback: "Violent force sparks rebellion, destroys public confidence, and ruins civic harmony."
      },
      {
        text: "Let the richest land baron take all the water while the neighboring community starves.",
        is_correct: false,
        visual_icon: "💰🚫",
        visual_tag: "Corrupt Favoritism",
        visual_color: "rose",
        metric_impact: { community_well_being: -24, resource_stability: -14, ecological_health: -10 },
        feedback: "Corrupt favoritism undermines the rule of law and poisons social trust."
      }
    ],
    mini_game_prompt: "Synchronize transparent peace accords and civic data relays across the council network!",
    mini_game_type: "network"
  },

  17: {
    sdg_goal: "SDG 17: Partnerships for the Goals",
    sdg_number: 17,
    character_dialogue: "Commander Pip, radio contact established with eco-cities across the globe! They want to exchange drought-resistant seeds and solar technology blueprints.",
    location_background: "World Radio & Seed Library: High radio observatory transmitting open planetary knowledge.",
    question: "How do we build deep global cooperation to heal planet Earth as one united family?",
    question_visual: "🌍🛰️",
    options: [
      {
        text: "Broadcast open-source renewable patents, share heirloom seed reserves, and coordinate international planetary climate teams!",
        is_correct: true,
        visual_icon: "🌐📡",
        visual_tag: "Global Solidarity",
        visual_color: "emerald",
        metric_impact: { community_well_being: 24, resource_stability: 16, ecological_health: 16 },
        feedback: "Triumphant! Sharing technology and seeds across continents unites humanity and accelerates regeneration worldwide!"
      },
      {
        text: "Hoard all clean technology patents and demand exorbitant royalties from struggling neighboring cities.",
        is_correct: false,
        visual_icon: "🔒💰",
        visual_tag: "Greedy Isolation",
        visual_color: "rose",
        metric_impact: { resource_stability: -12, community_well_being: -20, ecological_health: -14 },
        feedback: "Hoarding knowledge leaves neighboring lands to collapse, creating refugee crises and ecological failure that reaches our borders."
      },
      {
        text: "Smash the global radio transmitters and pretend the rest of the planet does not exist.",
        is_correct: false,
        visual_icon: "📻💥",
        visual_tag: "Blind Isolation",
        visual_color: "rose",
        metric_impact: { community_well_being: -22, resource_stability: -16, ecological_health: -16 },
        feedback: "Isolationism guarantees extinction. No single sanctuary can survive if the rest of the biosphere collapses!"
      }
    ],
    mini_game_prompt: "Align global satellite dishes and broadcast open seed blueprints worldwide!",
    mini_game_type: "network"
  }
};
