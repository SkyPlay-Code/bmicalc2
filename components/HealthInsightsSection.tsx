
import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline'; // Placeholder, replace with actual icon component if needed

// Placeholder for SparklesIcon if not using Heroicons directly
const SparklesIconPlaceholder: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.5 13.5h.008v.008H16.5V13.5z" />
  </svg>
);


interface HealthInsightsSectionProps {
  insights: string | null;
  isLoading: boolean;
  onFetchInsights: () => void;
  bmiCalculated: boolean;
}

const HealthInsightsSection: React.FC<HealthInsightsSectionProps> = ({
  insights,
  isLoading,
  onFetchInsights,
  bmiCalculated,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Personalized Health Insights</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Fill in your height and weight, then click below to get personalized health insights powered by AI.
      </p>
      
      {!insights && !isLoading && (
         <button
            onClick={onFetchInsights}
            disabled={!bmiCalculated || isLoading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary dark:text-textdark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 transform active:scale-95"
          >
           <SparklesIconPlaceholder className="w-5 h-5 mr-2" />
           Get Insights
         </button>
      )}

      {isLoading && (
        <div className="flex items-center justify-center p-6 bg-gray-100 dark:bg-slate-700 rounded-md min-h-[100px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary dark:border-primary-light"></div>
          <p className="ml-3 text-gray-700 dark:text-gray-300">Fetching your insights...</p>
        </div>
      )}

      {!isLoading && insights && (
        <div className="p-4 bg-primary/10 dark:bg-primary-light/10 rounded-lg shadow animate-fadeIn">
          <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {insights}
          </p>
           <button
            onClick={onFetchInsights}
            disabled={!bmiCalculated || isLoading}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary dark:text-textdark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 transform active:scale-95"
          >
           <SparklesIconPlaceholder className="w-5 h-5 mr-2" />
           Refresh Insights
         </button>
        </div>
      )}
    </div>
  );
};

export default HealthInsightsSection;
    