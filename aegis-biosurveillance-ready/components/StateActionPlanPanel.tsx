import React, { useState, useCallback } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { getStateSpecificRecommendations } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface StateActionPlanPanelProps {
    stateName: string;
    summary: string;
}

const StateActionPlanPanel: React.FC<StateActionPlanPanelProps> = ({ stateName, summary }) => {
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGeneration = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setPlan('');
    try {
      const result = await getStateSpecificRecommendations(stateName, summary);
      setPlan(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [stateName, summary]);

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <SparklesIcon className="w-6 h-6 mr-2 text-brand-accent" />
          AI Strategic Action Plan
        </h2>
      </div>
       <button
          onClick={handleGeneration}
          disabled={isLoading}
          className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Plan...
             </>
          ) : (
            `Generate Plan for ${stateName}`
          )}
        </button>

      <div className="prose prose-invert max-w-none bg-brand-dark p-4 rounded-md mt-4 min-h-[300px]">
        {isLoading && <div className="flex justify-center items-center h-full pt-16"><AiLoadingSpinner text="Aegis AI is generating action plan..." /></div>}
        {error && <p className="text-red-500">{error}</p>}
        {plan ? (
            <div className="text-sm">{renderFormattedText(plan)}</div>
        ) : (
            !isLoading && <p className="text-gray-400 text-sm">Click the button to generate a tailored, AI-powered strategic action plan for {stateName} based on the latest data.</p>
        )}
      </div>
    </div>
  );
};

export default StateActionPlanPanel;
