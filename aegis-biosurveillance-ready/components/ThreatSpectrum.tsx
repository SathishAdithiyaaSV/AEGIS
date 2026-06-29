import React, { useState, useEffect } from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Threat } from '../types';
import { getThreatsAnalysis } from '../services/geminiService';

interface ThreatSpectrumProps {
  threats: Threat[];
}

// ThreatItem is now a purely presentational component
interface ThreatItemProps {
  threat: Threat;
  summary: string;
  isLoading: boolean;
}

const ThreatItem: React.FC<ThreatItemProps> = ({ threat, summary, isLoading }) => {
  const getTrendIcon = () => {
    switch (threat.trend) {
      case 'increasing':
        return <ArrowUpIcon className="w-4 h-4 text-red-400" />;
      case 'decreasing':
        return <ArrowDownIcon className="w-4 h-4 text-green-400" />;
      case 'stable':
        return <MinusIcon className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getThreatColor = (level: number) => {
    if (level > 80) return 'bg-red-500';
    if (level > 60) return 'bg-orange-500';
    if (level > 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white text-sm">{threat.name}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-white">{threat.threatLevel}%</span>
          {getTrendIcon()}
        </div>
      </div>
      <div className="mt-2">
        <div className="w-full bg-brand-light-blue rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${getThreatColor(threat.threatLevel)}`}
            style={{ width: `${threat.threatLevel}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400 min-h-[16px]">
        {isLoading ? (
          <div className="w-3/4 h-3 bg-brand-light-blue rounded-full animate-pulse"></div>
        ) : (
          summary
        )}
      </div>
    </li>
  );
};

const ThreatSpectrum: React.FC<ThreatSpectrumProps> = ({ threats }) => {
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [isPanelLoading, setIsPanelLoading] = useState<boolean>(true);
  const sortedThreats = [...threats].sort((a, b) => b.threatLevel - a.threatLevel);

  useEffect(() => {
    const fetchSummaries = async () => {
      setIsPanelLoading(true);
      setSummaries({}); // Clear old summaries

      try {
        const results = await getThreatsAnalysis(threats);
        setSummaries(results);
      } catch (error) {
        console.error("Failed to fetch threat summaries", error);
        // Create an error state for all summaries
        const errorSummaries = threats.reduce((acc, threat) => {
            acc[threat.name] = "Error fetching summary.";
            return acc;
        }, {} as Record<string, string>);
        setSummaries(errorSummaries);
      } finally {
        setIsPanelLoading(false);
      }
    };

    if (threats && threats.length > 0) {
        fetchSummaries();
    } else {
        setIsPanelLoading(false);
    }
  }, [threats]);

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-2">Threat Spectrum</h3>
      <ul className="divide-y divide-brand-light-blue">
        {sortedThreats.map((threat) => (
          <ThreatItem 
            key={threat.name} 
            threat={threat}
            summary={summaries[threat.name] || ''}
            isLoading={isPanelLoading}
          />
        ))}
      </ul>
    </div>
  );
};

export default ThreatSpectrum;