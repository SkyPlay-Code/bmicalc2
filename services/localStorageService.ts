
import { Theme, UnitSystem, type BMIEntry } from '../types';

const THEME_KEY = 'bmiCalculatorTheme';
const UNIT_SYSTEM_KEY = 'bmiCalculatorUnitSystem';
const WEIGHT_HISTORY_KEY = 'bmiCalculatorWeightHistory';

export const saveTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const loadTheme = (): Theme | null => {
  const theme = localStorage.getItem(THEME_KEY);
  return theme ? (theme as Theme) : null;
};

export const saveUnitSystem = (unitSystem: UnitSystem): void => {
  localStorage.setItem(UNIT_SYSTEM_KEY, unitSystem);
};

export const loadUnitSystem = (): UnitSystem | null => {
  const unitSystem = localStorage.getItem(UNIT_SYSTEM_KEY);
  return unitSystem ? (unitSystem as UnitSystem) : null;
};

export const saveWeightHistory = (history: BMIEntry[]): void => {
  localStorage.setItem(WEIGHT_HISTORY_KEY, JSON.stringify(history));
};

export const loadWeightHistory = (): BMIEntry[] => {
  const history = localStorage.getItem(WEIGHT_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};
    