import React, { useState, useCallback } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { getDistrictActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface DistrictActionPlanPanelProps {
  districtName: string;
  stateName: string;
  summary: string;
}

const DistrictActionPlanPanel: React.FC<DistrictActionPlanPanelProps> = ({ districtName, stateName, summary }) => {
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGeneration = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setPlan('');
    try {
      const result = await getDistrictActionPlan(districtName, stateName, summary);
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
  }, [districtName, stateName, summary]);

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full flex flex-col">
      <h3 className="text-md font-semibold text-white mb-3 flex items-center">
        <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
        AI Grassroots Action Plan
      </h3>
      <button
          onClick={handleGeneration}
          disabled={isLoading}
          className="w-full bg-brand-accent/90 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center text-sm"
      >
          {isLoading ? 'Generating...' : `Generate Plan for ${districtName}`}
      </button>

      <div className="prose prose-invert max-w-none bg-brand-dark p-3 rounded-md mt-3 flex-grow">
        {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating plan..." /></div>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {plan ? (
            <div className="text-sm">{renderFormattedText(plan)}</div>
        ) : (
            !isLoading && <p className="text-gray-400 text-xs text-center pt-8">Generate a hyper-local action plan for community health workers, sanitation teams, and public announcements.</p>
        )}
      </div>
    </div>
  );
};

export default DistrictActionPlanPanel;
