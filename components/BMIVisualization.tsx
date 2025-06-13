
import React from 'react';
import { BMICategory, type BMICategoryDetails } from '../types';
import { BMI_CATEGORIES } from '../constants';

interface BMIVisualizationProps {
  bmi: number | null;
}

const BMIVisualization: React.FC<BMIVisualizationProps> = ({ bmi }) => {
  let currentCategory: BMICategoryDetails | undefined;
  if (bmi !== null) {
    currentCategory = BMI_CATEGORIES.find(cat => bmi >= cat.min && bmi <= cat.max);
  }

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">BMI Visualization</h3>
      <div className="flex w-full h-8 rounded-md overflow-hidden shadow-inner bg-gray-200 dark:bg-slate-700 mb-2">
        {BMI_CATEGORIES.map((category) => (
          <div
            key={category.name}
            className={`flex-1 ${category.color} transition-all duration-300 ease-in-out ${
              currentCategory && currentCategory.name === category.name ? 'opacity-100 scale-105' : 'opacity-70'
            }`}
            style={{ 
              boxShadow: currentCategory && currentCategory.name === category.name ? 'inset 0 0 5px rgba(0,0,0,0.2)' : 'none'
            }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 px-1">
        {BMI_CATEGORIES.map((category) => (
          <span key={category.name} className={`flex-1 text-center ${currentCategory && currentCategory.name === category.name ? 'font-bold text-primary dark:text-primary-light' : ''}`}>
            {category.name}
          </span>
        ))}
      </div>
      
      <div className="mt-6">
        {bmi !== null ? (
          <>
            <p className="text-5xl font-bold text-primary dark:text-primary-light animate-fadeIn">
              {bmi.toFixed(1)}
            </p>
            {currentCategory && (
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-1 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                {currentCategory.name}
              </p>
            )}
          </>
        ) : (
          <p className="text-2xl text-gray-500 dark:text-gray-400 animate-fadeIn">
            0.0
            <span className="block text-sm mt-1">Enter your details above</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BMIVisualization;
    