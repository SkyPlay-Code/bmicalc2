import React, { useCallback } from 'react';
import { UnitSystem } from '../types';
import UnitSwitcher from './UnitSwitcher';
import InputField from './InputField'; // Import the new standalone InputField

interface BMICalculatorFormProps {
  unitSystem: UnitSystem;
  heightCm: string;
  setHeightCm: (value: string) => void;
  weightKg: string;
  setWeightKg: (value: string) => void;
  heightFt: string;
  setHeightFt: (value: string) => void;
  heightIn: string;
  setHeightIn: (value: string) => void;
  weightLbs: string;
  setWeightLbs: (value: string) => void;
  onUnitSwitch: () => void;
}

const BMICalculatorForm: React.FC<BMICalculatorFormProps> = ({
  unitSystem,
  heightCm, setHeightCm,
  weightKg, setWeightKg,
  heightFt, setHeightFt,
  heightIn, setHeightIn,
  weightLbs, setWeightLbs,
  onUnitSwitch,
}) => {
  // Memoized factory for creating numeric input handlers
  // This function itself is stable as it has no dependencies.
  const makeNumericInputHandler = useCallback((setter: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Allow empty string for clearing input, or valid numeric patterns
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
         setter(value);
      }
    };
  }, []); // Empty dependency array means this function is created once

  // Create memoized handlers for each input field
  // These handlers will be stable as long as `makeNumericInputHandler` and the respective `setter` are stable.
  // `useState` setters are stable.
  const handleChangeHeightCm = useCallback(makeNumericInputHandler(setHeightCm), [makeNumericInputHandler, setHeightCm]);
  const handleChangeWeightKg = useCallback(makeNumericInputHandler(setWeightKg), [makeNumericInputHandler, setWeightKg]);
  const handleChangeHeightFt = useCallback(makeNumericInputHandler(setHeightFt), [makeNumericInputHandler, setHeightFt]);
  const handleChangeHeightIn = useCallback(makeNumericInputHandler(setHeightIn), [makeNumericInputHandler, setHeightIn]);
  const handleChangeWeightLbs = useCallback(makeNumericInputHandler(setWeightLbs), [makeNumericInputHandler, setWeightLbs]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Enter Your Details</h3>
        <UnitSwitcher currentUnitSystem={unitSystem} onSwitch={onUnitSwitch} />
      </div>
      {unitSystem === UnitSystem.Metric ? (
        <>
          <InputField 
            label="Height"
            unit="cm"
            id="heightCm"
            value={heightCm}
            onChange={handleChangeHeightCm} // Use memoized handler
            placeholder="Enter height in cm"
            type="number" 
          />
          <InputField
            label="Weight"
            unit="kg"
            id="weightKg"
            value={weightKg}
            onChange={handleChangeWeightKg} // Use memoized handler
            placeholder="Enter weight in kg"
            type="number"
          />
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Height"
              unit="ft"
              id="heightFt"
              value={heightFt}
              onChange={handleChangeHeightFt} // Use memoized handler
              placeholder="Feet"
              type="number"
            />
            <InputField
              label=" " // Empty label for alignment
              unit="in"
              id="heightIn"
              value={heightIn}
              onChange={handleChangeHeightIn} // Use memoized handler
              placeholder="Inches"
              type="number"
            />
          </div>
          <InputField
            label="Weight"
            unit="lbs"
            id="weightLbs"
            value={weightLbs}
            onChange={handleChangeWeightLbs} // Use memoized handler
            placeholder="Enter weight in lbs"
            type="number"
          />
        </>
      )}
    </div>
  );
};

export default BMICalculatorForm;
