import React, { useState, useCallback } from 'react';
import { InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { OneHealthIndexData, RiskLevel, MetricBreakdown } from '../types';
import { getOneHealthRecommendations } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface OneHealthIndexPanelProps {
  indexData: OneHealthIndexData;
  country: 'USA' | 'India';
}

// New Tooltip component
const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-brand-dark border border-brand-light-blue text-xs text-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {text}
        </div>
    </div>
);

// New BreakdownMetric component
const BreakdownMetric: React.FC<{ item: MetricBreakdown }> = ({ item }) => {
    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage > 75) return 'bg-red-500';
        if (percentage > 40) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
                <div className="flex items-center">
                    <span className="text-gray-300">{item.metric}</span>
                    <Tooltip text={item.reasoning}>
                        <InformationCircleIcon className="w-3.5 h-3.5 ml-1.5 text-gray-500 cursor-pointer" />
                    </Tooltip>
                </div>
                <span className="font-semibold text-white">{item.value}</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-full bg-brand-light-blue/30 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${getScoreColor(item.score, item.maxScore)}`}
                        style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                </div>
                <span className="font-mono text-xs text-gray-300 w-16 text-right">{item.score}/{item.maxScore} pts</span>
            </div>
        </div>
    );
};

// New BreakdownCategory component
const BreakdownCategory: React.FC<{ title: string; weight: number; data: { score: number; breakdown: MetricBreakdown[] } }> = ({ title, weight, data }) => (
    <div>
        <div className="flex justify-between items-baseline mb-2">
            <h4 className="font-semibold text-white">{title} <span className="text-sm font-normal text-gray-400">({weight}% weight)</span></h4>
            <span className="font-bold text-lg text-brand-accent">{data.score} pts</span>
        </div>
        <div className="space-y-3">
            {data.breakdown.map(item => <BreakdownMetric key={item.metric} item={item} />)}
        </div>
    </div>
);

const OneHealthIndexPanel: React.FC<OneHealthIndexPanelProps> = ({ indexData, country }) => {
  const [isBreakdownVisible, setIsBreakdownVisible] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { score, level, breakdown } = indexData;

  const getLevelAppearance = (level: RiskLevel): {
    textColor: string,
    bgColor: string,
    borderColor: string,
    progressColor: string
  } => {
    switch (level) {
      case 'Critical': return { textColor: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/50', progressColor: 'bg-red-500' };
      case 'High': return { textColor: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/50', progressColor: 'bg-orange-500' };
      case 'Moderate': return { textColor: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/50', progressColor: 'bg-yellow-500' };
      default: return { textColor: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/50', progressColor: 'bg-blue-500' };
    }
  };
  
  const appearance = getLevelAppearance(level);

  const handleGenerateRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setRecommendations('');

    const formatBreakdown = (category: { breakdown: MetricBreakdown[] }) => {
        return category.breakdown.map(b => `${b.metric} at ${b.value} (scored ${b.score}/${b.maxScore})`).join(', ');
    }

    const summary = `
      The One Health Index for ${country} is ${score} (${level}).
      - Human Health Contribution: ${breakdown.human.score} points. Key factors: ${formatBreakdown(breakdown.human)}
      - Zoonotic Risk Contribution: ${breakdown.zoonotic.score} points. Key factors: ${formatBreakdown(breakdown.zoonotic)}
      - Environmental Signal Contribution: ${breakdown.environmental.score} points. Key factors: ${formatBreakdown(breakdown.environmental)}
    `;

    try {
      const result = await getOneHealthRecommendations(summary);
      setRecommendations(result);
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
  }, [indexData, country]);

  return (
    <div className={`bg-brand-dark-blue border rounded-lg p-5 shadow-lg transition-all duration-300 ${isBreakdownVisible ? 'border-brand-accent shadow-glow' : 'border-brand-light-blue'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-white">One Health Index</h2>
          <p className="text-sm text-gray-400">Integrated National Threat Score</p>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-bold ${appearance.textColor}`}>{score}</p>
          <p className={`text-sm font-semibold ${appearance.textColor}`}>{level}</p>
        </div>
      </div>

      <div className="w-full bg-brand-light-blue rounded-full h-2.5 my-4">
        <div className={`${appearance.progressColor} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
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
            <BreakdownCategory title="Human Health Signals" weight={50} data={breakdown.human} />
            <div className="border-t border-brand-light-blue/30"></div>
            <BreakdownCategory title="Zoonotic Spillover Risk" weight={30} data={breakdown.zoonotic} />
            <div className="border-t border-brand-light-blue/30"></div>
            <BreakdownCategory title="Environmental Surveillance" weight={20} data={breakdown.environmental} />
        </div>
      )}

      <div className="mt-4 border-t border-brand-light-blue pt-4">
         <button
          onClick={handleGenerateRecommendations}
          disabled={isLoading}
          className="w-full bg-brand-accent/90 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Generating...' : 'Generate AI Recommendations'}
        </button>
        {(isLoading || error || recommendations) && (
            <div className="mt-4 p-4 bg-brand-dark rounded-md min-h-[100px]">
                {isLoading && <div className="flex justify-center items-center h-full pt-8"><AiLoadingSpinner text="Aegis AI is generating recommendations..." /></div>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {recommendations && <div>{renderFormattedText(recommendations)}</div>}
            </div>
        )}
      </div>
    </div>
  );
};

export default OneHealthIndexPanel;
