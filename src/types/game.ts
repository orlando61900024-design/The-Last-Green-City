export type DifficultyLevel = 'easy' | 'normal' | 'hard' | 'expert';

export interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  subtitle: string;
  drainIntervalMs: number;
  drainLabel: string;
  color: string;
  badge: string;
  initialStability: number;
}

export interface CityMetrics {
  resource_stability: number;  // 0 - 100% (Clean Water, Clean Energy, Responsible Consumption)
  ecological_health: number;   // 0 - 100% (Life on Land, Life Below Water, Climate Action)
  community_well_being: number; // 0 - 100% (No Poverty, Quality Education, Good Health)
}

export interface MetricImpact {
  resource_stability?: number;
  ecological_health?: number;
  community_well_being?: number;
}

export interface ScenarioOption {
  text: string;
  is_correct: boolean;
  metric_impact: MetricImpact;
  feedback: string;
  visual_icon?: string;
  visual_tag?: string;
  visual_color?: string;
}

export type MiniGameType = 'water' | 'energy' | 'waste' | 'trees' | 'ocean' | 'clinic' | 'network';

export interface TurnScenarioJSON {
  sdg_goal: string;
  character_dialogue: string;
  location_background: string;
  question: string;
  question_visual?: string; // visual icon/emoji or scene type
  options: ScenarioOption[];
  mini_game_prompt: string;
  mini_game_type?: MiniGameType;
  sdg_number?: number;
}

export interface SDGInfo {
  id: number;
  title: string;
  shortTitle: string;
  unColor: string;
  icon: string;
  category: 'Resource Stability' | 'Ecological Health' | 'Community Well-Being';
  sectorName: string;
  coordinates: { x: number; y: number }; // percentage position on world eco-map
  initialPollution: number; // 0-100%
  completed: boolean;
  score?: number;
  summary: string;
  realWorldTarget: string;
}

export interface Landmark {
  id: string;
  name: string;
  category: string;
  cost: number;
  unlocked: boolean;
  description: string;
  impactLabel: string;
  metricBonus: MetricImpact;
  icon: string;
  lore: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  tagline: string;
  pricePoints: number;
  unlocked: boolean;
  type: 'standee' | 'keychain' | 'hat' | 'book';
  description: string;
  realWorldEcoPledge: string;
  imageAlt: string;
}

export interface CrisisEvent {
  title: string;
  description: string;
  dilemma: string;
  choices: {
    label: string;
    cost: number;
    impact: MetricImpact;
  }[];
}
