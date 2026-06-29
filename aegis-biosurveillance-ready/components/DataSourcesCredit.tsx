import React from 'react';
import { CircleStackIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { DataSource } from '../types';

interface DataSourcesCreditProps {
  sources: DataSource[];
}

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-brand-dark border border-brand-light-blue text-xs text-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            {text}
        </div>
    </div>
);


const DataSourcesCredit: React.FC<DataSourcesCreditProps> = ({ sources }) => {
  // Use brand colors for better theme consistency and adjust thresholds
  const getCredibilityColor = (score: number) => {
    if (score > 85) return 'bg-brand-success'; // High credibility
    if (score > 60) return 'bg-brand-warning'; // Medium credibility
    return 'bg-brand-danger';   // Low credibility
  };

  const getBiasPill = (bias: 'Low' | 'Moderate' | 'High') => {
    switch (bias) {
      case 'Low':
        return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Low Bias</span>;
      case 'Moderate':
        return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Moderate Bias</span>;
      case 'High':
        return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">High Bias</span>;
    }
  };

  const tooltipText = "Credibility is scored on historical accuracy, peer review, and transparency. Bias assesses systemic leanings in data collection, with 'Low' indicating robust, representative sampling.";

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-3 flex items-center">
        <CircleStackIcon className="w-5 h-5 mr-2 text-gray-400" />
        Data Source Credibility
      </h3>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center space-x-1.5">
                <p className="font-semibold text-white text-sm truncate">{source.name}</p>
                <Tooltip text={tooltipText}>
                    <InformationCircleIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                </Tooltip>
              </div>
              {getBiasPill(source.bias)}
            </div>
            <div className="flex items-center space-x-2">
              {/* Make the bar slightly thicker and the background darker for better contrast */}
              <div className="w-full bg-brand-dark rounded-full h-2.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${getCredibilityColor(source.credibility)}`}
                  style={{ width: `${source.credibility}%` }}
                ></div>
              </div>
              <span className="font-bold text-white text-sm w-10 text-right">{source.credibility}%</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">
        Credibility score based on historical accuracy and peer review.
      </p>
    </div>
  );
};

export default DataSourcesCredit;
