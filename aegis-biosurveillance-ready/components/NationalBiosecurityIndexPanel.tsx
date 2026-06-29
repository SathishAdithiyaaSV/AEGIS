import React, { useState, useCallback, useEffect } from 'react';
import { ShieldCheckIcon, InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { NationalBiosecurityIndexData, RiskLevel, BiosecurityComponent } from '../types';
import { getBulkBiosecurityAnalysisAndPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface NationalBiosecurityIndexPanelProps {
  indexData: NationalBiosecurityIndexData;
}

const componentNames: Record<keyof NationalBiosecurityIndexData['breakdown'], string> = {
    intel: "Intelligence & Threat Matrix",
    labReadiness: "Lab Network Readiness",
    countermeasures: "Medical Countermeasures",
    populationVulnerability: "Population Vulnerability"
};

const BreakdownItem: React.FC<{
    itemKey: keyof NationalBiosecurityIndexData['breakdown'];
    data: BiosecurityComponent;
    analysis?: { summary?: string; plan?: string };
    isLoading: boolean;
    error?: string;
}> = ({ itemKey, data, analysis, isLoading, error }) => {
    
    const getScoreColor = (score: number) => {
        if (score > 85) return 'bg-red-500';
        if (score > 70) return 'bg-orange-500';
        if (score > 50) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue/50">
            <h4 className="font-semibold text-white text-sm mb-2">{componentNames[itemKey]}</h4>
            <div className="flex items-center space-x-2 mb-3">
                <div className="w-full bg-brand-light-blue/30 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${getScoreColor(data.score)}`}
                        style={{ width: `${data.score}%` }}
                    />
                </div>
                <span className="font-mono text-xs text-gray-300 w-12 text-right">{data.score}/100</span>
            </div>

            <div className="bg-brand-dark-blue p-3 rounded-md min-h-[150px]">
                {(() => {
                    if (isLoading) {
                        return <div className="flex justify-center items-center h-full pt-8"><AiLoadingSpinner text="Analyzing..." /></div>;
                    }
                    if (error) {
                        return <p className="text-red-500 text-sm">{error}</p>;
                    }
                    if (analysis?.summary) {
                        return (
                            <div className="text-xs text-gray-300 prose prose-invert max-w-none">
                               <p>{analysis.summary}</p>
                               {analysis.plan && <div>{renderFormattedText(analysis.plan)}</div>}
                            </div>
                        );
                    }
                    return <p className="text-gray-500 text-sm text-center pt-8">Analysis not available.</p>;
                })()}
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-brand-dark-blue/80 backdrop-blur-sm border border-brand-light-blue rounded-md shadow-lg p-3 text-sm text-gray-300 max-w-sm">
        <p className="font-bold text-white whitespace-nowrap mb-2 border-b border-brand-light-blue pb-2">{data.subject.replace(/\n/g, ' ')}</p>
        <p className="mb-2"><span className="font-semibold">Score:</span> <span className="font-bold text-brand-accent">{data.A}</span>/100</p>
        {data.analysis?.summary && (
            <div>
                 <p className="font-semibold mb-1 text-white">AI Summary:</p>
                 <p className="text-xs">{data.analysis.summary}</p>
                 {data.analysis.plan && (
                     <div className="mt-2 text-xs">
                         {renderFormattedText(data.analysis.plan)}
                     </div>
                 )}
            </div>
        )}
        {data.isLoading && <AiLoadingSpinner text="Analyzing..." />}
      </div>
    );
  }

  return null;
};


const NationalBiosecurityIndexPanel: React.FC<NationalBiosecurityIndexPanelProps> = ({ indexData }) => {
  const { score, level, breakdown } = indexData;
  const [isBreakdownVisible, setIsBreakdownVisible] = useState(false);
  
  const [allAnalysis, setAllAnalysis] = useState<Partial<Record<keyof typeof breakdown, { summary?: string; plan?: string }>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllAnalysis = useCallback(async () => {
      setIsLoading(true);
      setError('');
      try {
          const result = await getBulkBiosecurityAnalysisAndPlan(breakdown);
          setAllAnalysis(result);
      } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to load AI analysis.');
      } finally {
          setIsLoading(false);
      }
  }, [breakdown]);

  useEffect(() => {
    fetchAllAnalysis();
  }, [fetchAllAnalysis]);


  const getLevelAppearance = (level: RiskLevel): {
    textColor: string,
    progressColor: string
  } => {
    switch (level) {
      case 'Critical': return { textColor: 'text-red-400', progressColor: '#F85149' };
      case 'High': return { textColor: 'text-orange-400', progressColor: '#D29922' };
      case 'Moderate': return { textColor: 'text-yellow-400', progressColor: '#e5c07b' };
      default: return { textColor: 'text-blue-400', progressColor: '#58A6FF' };
    }
  };
  
  const appearance = getLevelAppearance(level);

  const chartData = (Object.keys(breakdown) as Array<keyof typeof breakdown>).map(key => ({
    subject: componentNames[key].replace(' & ', ' &\n').replace(' ', '\n'),
    A: (breakdown[key] as BiosecurityComponent).score,
    fullMark: 100,
    analysis: allAnalysis[key],
    isLoading: isLoading && !allAnalysis[key],
    key: key
  }));
  
  const handleRadarHover = (data: any) => {
    if (data && data.activePayload) {
      const key = data.activePayload[0].payload.key;
      // If data is not loaded yet for this slice, trigger it.
      // This is a fallback in case the initial bulk load fails.
      if (!allAnalysis[key] && !isLoading) {
        // Since we moved to bulk loading, this part is less critical
        // but can be kept for robustness if individual re-fetching is desired.
      }
    }
  };


  return (
    <div className={`bg-brand-dark-blue border rounded-lg p-5 shadow-lg transition-all duration-300 ${isBreakdownVisible ? 'border-brand-accent shadow-glow' : 'border-brand-light-blue'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-white">National Biosecurity Index</h2>
          <p className="text-sm text-gray-400">Strategic Threat Level</p>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-bold ${appearance.textColor}`}>{score}</p>
          <p className={`text-sm font-semibold ${appearance.textColor}`}>{level}</p>
        </div>
      </div>

      <div className="h-64 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData} onMouseMove={handleRadarHover}>
            <PolarGrid stroke="#30363D" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Biosecurity Score" dataKey="A" stroke={appearance.progressColor} fill={appearance.progressColor} fillOpacity={0.6} />
            <RechartsTooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        <button
          onClick={() => setIsBreakdownVisible(!isBreakdownVisible)}
          className="text-sm text-gray-400 hover:text-white flex items-center justify-center mx-auto"
        >
          <InformationCircleIcon className="w-4 h-4 mr-1" />
          {isBreakdownVisible ? 'Hide Scorecard Details' : 'View Detailed Scorecard'}
        </button>
      </div>
      
       {isBreakdownVisible && (
        <div className="mt-4 p-4 bg-brand-dark rounded-md border border-brand-light-blue/50 space-y-4 animate-fadeIn">
            {(Object.keys(breakdown) as Array<keyof typeof breakdown>).map((key) => (
                <BreakdownItem
                    key={key}
                    itemKey={key}
                    data={breakdown[key]}
                    analysis={allAnalysis[key]}
                    isLoading={isLoading && !allAnalysis[key]}
                    error={!isLoading && !allAnalysis[key] ? error : undefined}
                />
            ))}
        </div>
      )}
    </div>
  );
};

export default NationalBiosecurityIndexPanel;