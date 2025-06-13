
export enum UnitSystem {
  Metric = 'metric',
  Imperial = 'imperial',
}

export interface BMIEntry {
  id: string;
  date: string;
  weight: number; // Stored in kg, but displayed according to unitSystem
  bmi: number;
}

export enum BMICategory {
  Underweight = 'Underweight',
  Normal = 'Normal',
  Overweight = 'Overweight',
  Obese = 'Obese',
}

export interface BMICategoryDetails {
  name: BMICategory;
  min: number;
  max: number;
  color: string; // Tailwind color class
  description: string;
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
    