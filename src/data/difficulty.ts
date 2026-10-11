import { DifficultyConfig, DifficultyLevel } from '../types/game';

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'Gentle Breeze',
    subtitle: 'Easiest pace: bars drain 1% every 1.2 seconds.',
    drainIntervalMs: 1200,
    drainLabel: '-1% every 1.2s',
    color: 'emerald',
    badge: 'Easy',
    initialStability: 80,
  },
  normal: {
    id: 'normal',
    name: 'Active Scout',
    subtitle: 'Brisk pressure: bars drain 1% every 0.8 seconds.',
    drainIntervalMs: 800,
    drainLabel: '-1% every 0.8s',
    color: 'amber',
    badge: 'Normal',
    initialStability: 75,
  },
  hard: {
    id: 'hard',
    name: 'Climate Crisis',
    subtitle: 'High stakes: bars drain 1% every 0.5 seconds.',
    drainIntervalMs: 500,
    drainLabel: '-1% every 0.5s',
    color: 'orange',
    badge: 'Hard',
    initialStability: 70,
  },
  expert: {
    id: 'expert',
    name: 'Planetary Collapse',
    subtitle: 'Extreme speed: bars drain 1% every 0.3 seconds!',
    drainIntervalMs: 300,
    drainLabel: '-1% every 0.3s',
    color: 'rose',
    badge: 'Expert',
    initialStability: 65,
  },
};
