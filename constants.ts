
import { BMICategory, type BMICategoryDetails } from './types';

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const BMI_CATEGORIES: BMICategoryDetails[] = [
  { name: BMICategory.Underweight, min: 0, max: 18.49, color: 'bg-blue-500', description: 'Below 18.5' },
  { name: BMICategory.Normal, min: 18.5, max: 24.99, color: 'bg-green-500', description: '18.5 - 24.9' },
  { name: BMICategory.Overweight, min: 25, max: 29.99, color: 'bg-yellow-500', description: '25 - 29.9' },
  { name: BMICategory.Obese, min: 30, max: Infinity, color: 'bg-red-500', description: '30 and above' },
];

export const APP_VERSION = "1.0.0";
export const CURRENT_YEAR = new Date().getFullYear();

// Conversion factors
export const KG_TO_LBS = 2.20462;
export const LBS_TO_KG = 1 / KG_TO_LBS;
export const CM_TO_INCHES = 0.393701;
export const INCHES_TO_CM = 1 / CM_TO_INCHES;
export const FT_TO_INCHES = 12;
    