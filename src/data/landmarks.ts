import { Landmark } from '../types/game';

export const LANDMARK_UPGRADES: Landmark[] = [
  {
    id: 'hydraulic_door_crank',
    name: 'Hydraulic Airlock Fast-Crank',
    category: 'City Infrastructure',
    cost: 80,
    unlocked: false,
    description: 'High-torque pneumatic servo-pistons installed on Verdia’s heavy blast doors. Breaks the toxic airlock vacuum seal with only 10 pumps instead of 25!',
    impactLabel: '⚡ SPECIAL ABILITY: Reduces door unseal requirement to only 10 clicks!',
    metricBonus: {},
    icon: 'Zap',
    lore: 'Forged from recycled maglev hydraulics, this rapid-action valve dumps airlock pressure fast so expedition teams venture outside with minimal effort.'
  },
  {
    id: 'solar_panel_arrays',
    name: 'Solar Panel Arrays',
    category: 'Clean Energy',
    cost: 110,
    unlocked: false,
    description: 'Extensive crystalline bifacial photovoltaic arrays deployed along outer sun-facing ridges. Increases Eco-Points earned per correct quiz answer by +10%!',
    impactLabel: '☀️ SPECIAL BONUS: +10% Eco-Points earned on every correct quiz answer',
    metricBonus: {},
    icon: 'Sun',
    lore: 'Captures clean photons from the sky, rewarding insightful ecological choices with bonus regenerative eco-points.'
  },
  {
    id: 'wind_turbines',
    name: 'Wind Turbines',
    category: 'Clean Energy',
    cost: 130,
    unlocked: false,
    description: 'High-altitude aerodynamic wind generators capturing thermal canyon air currents. Increases Eco-Points earned per correct answer by +10% (stacks with Solar Arrays for +20% total)!',
    impactLabel: '🌬️ SPECIAL BONUS: +10% Eco-Points on correct answers (stacks with Solar Panels)',
    metricBonus: {},
    icon: 'Wind',
    lore: 'Reaching high into the jet stream, these silent composite blades harvest kinetic wind energy day and night.'
  },
  {
    id: 'advanced_recycling_centers',
    name: 'Advanced Recycling Centers',
    category: 'Circular Economy',
    cost: 175,
    unlocked: false,
    description: 'Closed-loop molecular reclamation complexes providing a "Second Chance". When all city bars reach 0%, the city automatically avoids defeat and instantly restores all bars to 25%!',
    impactLabel: '♻️ SPECIAL ABILITY: Second Chance! Prevents defeat and restores all bars to 25%',
    metricBonus: {},
    icon: 'Recycle',
    lore: 'If a catastrophic breach occurs, automated recycling vats instantly dissolve reserves to reboot the sanctuary’s life-support systems.'
  },
  {
    id: 'vertical_farming_domes',
    name: 'Vertical Farming Domes',
    category: 'City Resilience & Shield',
    cost: 160,
    unlocked: false,
    description: 'Pressurized multi-tiered food and botanical biospheres providing 3 "City Health" shields: wrong answers in quizzes deduct 0 bars (protects against up to 3 wrong answers)!',
    impactLabel: '🛡️ SPECIAL ABILITY: 3 City Health Shields (blocks 3 wrong answer bar deductions)',
    metricBonus: {},
    icon: 'ShieldCheck',
    lore: 'Deep pressurized hydroponic vaults cushion the city against food and supply shortages when tough dilemmas occur.'
  },
  {
    id: 'beacon_of_hope',
    name: 'Beacon of Hope Generator',
    category: 'Planetary Resonance',
    cost: 250,
    unlocked: false,
    description: 'Monumental quantum crystal spire transmitting inspiration worldwide. Multiplies all rewards earned by 1.5x (Multiplier: 1.5x on all Eco-Points across quizzes and mini-games)!',
    impactLabel: '🌟 SPECIAL MULTIPLIER: 1.5x Multiplier on all Eco-Points earned',
    metricBonus: {},
    icon: 'Sparkles',
    lore: 'A towering pillar of golden solar resonance visible across continents, multiplying human willpower and global restoration momentum.'
  }
];
