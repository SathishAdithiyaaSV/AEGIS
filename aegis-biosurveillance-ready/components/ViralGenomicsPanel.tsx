import React, { useState, useCallback } from 'react';
import { BeakerIcon, SparklesIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { ViralGenomicsData } from '../types';
import { getViralStrainAnalysis } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface ViralGenomicsPanelProps {
  genomicsData: ViralGenomicsData;
}

const ViralGenomicsPanel: React.FC<ViralGenomicsPanelProps> = ({ genomicsData }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const handleGeneration = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');
    try {
      const result = await getViralStrainAnalysis(genomicsData.dominantStrain, genomicsData.strainSummaryPrompt);
      setAnalysis(result);
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
  }, [genomicsData]);

  const isLoadIncreasing = genomicsData.viralLoadChange > 0;
  const loadChangeColor = isLoadIncreasing ? 'text-red-400' : 'text-green-400';

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-3 flex items-center">
        <BeakerIcon className="w-5 h-5 mr-2 text-brand-accent" />
        Viral Genomics & Strain Analysis
      </h3>
      
      {/* Viral Load Visual */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-1">
            <p className="text-sm text-gray-400">Average Viral Load</p>
            <div className={`flex items-center text-sm font-bold ${loadChangeColor}`}>
                {isLoadIncreasing ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
                {genomicsData.viralLoadChange.toFixed(1)}%
            </div>
        </div>
        <div className="w-full bg-brand-dark rounded-full h-4 border border-brand-light-blue/50">
          <div className="bg-brand-accent h-full rounded-full flex items-center" style={{ width: `${genomicsData.viralLoad}%` }}>
            <span className="text-xs font-bold text-white pl-2">{genomicsData.viralLoad}</span>
          </div>
        </div>
      </div>

      <div className="bg-brand-dark p-3 rounded-md">
        <button
            onClick={handleGeneration}
            disabled={isLoading}
            className="w-full bg-brand-accent/20 border border-brand-accent/50 text-brand-accent font-semibold py-2 px-4 rounded-md hover:bg-brand-accent/40 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center text-sm"
        >
            <SparklesIcon className="w-4 h-4 mr-2" />
            {isLoading ? 'Analyzing...' : `Analyze ${genomicsData.dominantStrain}`}
        </button>

        <div className="mt-3 text-xs min-h-[100px]">
            {isLoading && <div className="flex justify-center items-center h-full pt-8"><AiLoadingSpinner text="AI is analyzing strain data..." /></div>}
            {error && <p className="text-red-500">{error}</p>}
            {analysis ? (
                <div>{renderFormattedText(analysis)}</div>
            ) : (
                !isLoading && <p className="text-gray-500 text-center pt-4">Generate AI analysis for detailed strain characteristics.</p>
            )}
        </div>
      </div>
       <p className="text-center text-xs text-gray-600 mt-3">
        Genomic Data Source: {genomicsData.dataSource}
      </p>
    </div>
  );
};

export default ViralGenomicsPanel;
