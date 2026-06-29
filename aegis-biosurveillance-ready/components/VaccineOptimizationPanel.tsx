import React, { useState, useCallback } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { VaccineInventoryItem } from '../types';
import { getVaccineOptimizationPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

const SyringeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 15.25m5.75-12.146a2.25 2.25 0 011.591.659l5.714 5.714a2.25 2.25 0 010 3.182l-5.714 5.714a2.25 2.25 0 01-3.182 0l-5.714-5.714a2.25 2.25 0 010-3.182l5.714-5.714a2.25 2.25 0 011.591-.659z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197M15 15l-6.75-6.75" />
  </svg>
);

interface VaccineOptimizationPanelProps {
  contextName: string;
  inventory: VaccineInventoryItem[];
  aiSummary: string;
  population: string;
}

const VaccineOptimizationPanel: React.FC<VaccineOptimizationPanelProps> = ({ contextName, inventory, aiSummary, population }) => {
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGeneration = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setPlan('');

    try {
      const result = await getVaccineOptimizationPlan(contextName, population, inventory, aiSummary);
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
  }, [contextName, population, inventory, aiSummary]);
  
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white flex items-center mb-4">
        <SyringeIcon className="w-6 h-6 mr-2 text-brand-accent" />
        Vaccine Optimization
      </h2>

      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2">
        {inventory.map(item => (
          <div key={item.name} className="bg-brand-dark p-3 rounded-md border border-brand-light-blue/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-white text-sm">{item.name}</p>
              <p className="text-sm font-bold text-green-400">
                {item.efficacy}%
                <span className="text-xs font-normal text-gray-400 ml-1">eff.</span>
              </p>
            </div>
            <div className="text-xs text-gray-400 grid grid-cols-2 gap-x-2 mt-1">
              <span>Doses: <span className="font-medium text-gray-300">{item.dosesAvailable.toLocaleString()}</span></span>
              <span>Capacity: <span className="font-medium text-gray-300">{item.monthlyProductionCapacity.toLocaleString()}/mo</span></span>
            </div>
          </div>
        ))}
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
            Optimizing...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Generate Strategic Plan
          </>
        )}
      </button>

      <div className="prose prose-invert max-w-none bg-brand-dark p-4 rounded-md mt-4 min-h-[200px]">
        {isLoading && <div className="flex justify-center items-center h-full pt-16"><AiLoadingSpinner text="Aegis AI is creating vaccine strategy..." /></div>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {plan ? (
            <div className="text-sm">{renderFormattedText(plan)}</div>
        ) : (
            !isLoading && <p className="text-gray-400 text-sm">Generate an AI-powered plan to optimize vaccine production, stockpiling, and distribution based on current and emerging threats.</p>
        )}
      </div>
    </div>
  );
};

export default VaccineOptimizationPanel;
