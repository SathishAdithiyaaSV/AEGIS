import React, { useState, useCallback } from 'react';
import { SparklesIcon, CubeIcon } from '@heroicons/react/24/solid';
import { DrugInventoryItem } from '../types';
import { getDrugInventoryRecommendations } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface DrugInventoryPanelProps {
  contextName: string;
  inventory: DrugInventoryItem[];
  aiSummary: string; // Pass the overall state/district summary for context
}

const DrugInventoryPanel: React.FC<DrugInventoryPanelProps> = ({ contextName, inventory, aiSummary }) => {
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGeneration = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setPlan('');

    const inventorySummary = inventory.map(item => {
        const daysOfSupply = item.burnRate > 0 ? (item.stock / item.burnRate).toFixed(1) : 'inf';
        return `- ${item.name}: Stock=${item.stock}, Burn Rate=${item.burnRate}/day, Days of Supply=${daysOfSupply}`;
    }).join('\n');
    
    const fullSummary = `
Context Threat Summary for ${contextName}:
${aiSummary}

Current Inventory Status:
${inventorySummary}
    `;

    try {
      const result = await getDrugInventoryRecommendations(contextName, fullSummary);
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
  }, [contextName, inventory, aiSummary]);
  
  const getDosColor = (days: number) => {
      if (days < 7) return 'text-red-400';
      if (days < 14) return 'text-yellow-400';
      return 'text-green-400';
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white flex items-center mb-4">
        <CubeIcon className="w-6 h-6 mr-2 text-brand-accent" />
        Drug Inventory Optimization
      </h2>

      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2">
        {inventory.map(item => {
            const daysOfSupply = item.burnRate > 0 ? item.stock / item.burnRate : Infinity;
            return (
                <div key={item.name} className="bg-brand-dark p-3 rounded-md border border-brand-light-blue/50">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-white text-sm">{item.name}</p>
                        <p className={`text-lg font-bold ${getDosColor(daysOfSupply)}`}>
                            {daysOfSupply !== Infinity ? `${daysOfSupply.toFixed(1)}` : '∞'}
                            <span className="text-xs font-normal text-gray-400 ml-1">DoS</span>
                        </p>
                    </div>
                    <div className="text-xs text-gray-400 flex justify-between mt-1">
                        <span>Stock: {item.stock.toLocaleString()} units</span>
                        <span>Burn Rate: {item.burnRate.toLocaleString()}/day</span>
                    </div>
                </div>
            )
        })}
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
            Generate Optimization Plan
          </>
        )}
      </button>

      <div className="prose prose-invert max-w-none bg-brand-dark p-4 rounded-md mt-4 min-h-[200px]">
        {isLoading && <div className="flex justify-center items-center h-full pt-16"><AiLoadingSpinner text="Aegis AI is optimizing inventory..." /></div>}
        {error && <p className="text-red-500">{error}</p>}
        {plan ? (
            <div className="text-sm">{renderFormattedText(plan)}</div>
        ) : (
            !isLoading && <p className="text-gray-400 text-sm">Generate an AI-powered plan to optimize drug procurement, redistribution, and reduce costs based on real-time consumption data.</p>
        )}
      </div>
    </div>
  );
};

export default DrugInventoryPanel;
