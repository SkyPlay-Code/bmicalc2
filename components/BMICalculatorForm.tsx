
import React from 'react';
import { UnitSystem } from '../types';
import UnitSwitcher from './UnitSwitcher';

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

const InputField: React.FC<{label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, type?: string, unit?: string}> = 
  ({label, id, value, onChange, placeholder, type = "number", unit}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {unit && `(${unit})`}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors"
    />
  </div>
);


const BMICalculatorForm: React.FC<BMICalculatorFormProps> = ({
  unitSystem,
  heightCm, setHeightCm,
  weightKg, setWeightKg,
  heightFt, setHeightFt,
  heightIn, setHeightIn,
  weightLbs, setWeightLbs,
  onUnitSwitch,
}) => {
  const handleNumericInput = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
       setter(value);
    }
  };

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
            onChange={handleNumericInput(setHeightCm)}
            placeholder="Enter height in cm"
          />
          <InputField
            label="Weight"
            unit="kg"
            id="weightKg"
            value={weightKg}
            onChange={handleNumericInput(setWeightKg)}
            placeholder="Enter weight in kg"
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
              onChange={handleNumericInput(setHeightFt)}
              placeholder="Feet"
            />
            <InputField
              label=" " // Empty label for alignment
              unit="in"
              id="heightIn"
              value={heightIn}
              onChange={handleNumericInput(setHeightIn)}
              placeholder="Inches"
            />
          </div>
          <InputField
            label="Weight"
            unit="lbs"
            id="weightLbs"
            value={weightLbs}
            onChange={handleNumericInput(setWeightLbs)}
            placeholder="Enter weight in lbs"
          />
        </>
      )}
    </div>
  );
};

export default BMICalculatorForm;
    