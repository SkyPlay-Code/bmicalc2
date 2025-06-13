
import React from 'react';
import { UnitSystem } from '../types';

interface UnitSwitcherProps {
  currentUnitSystem: UnitSystem;
  onSwitch: () => void;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = ({ currentUnitSystem, onSwitch }) => {
  return (
    <button
      onClick={onSwitch}
      className="text-sm text-primary dark:text-primary-light hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
    >
      Switch to {currentUnitSystem === UnitSystem.Metric ? UnitSystem.Imperial : UnitSystem.Metric}
    </button>
  );
};

export default UnitSwitcher;
    