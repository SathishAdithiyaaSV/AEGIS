import React, { useState, useCallback } from 'react';
import { SparklesIcon, CubeIcon } from '@heroicons/react/24/solid';
import { SupplyChainAnalysis } from '../../types';
import { getSupplyChainRecommendations } from '../../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from '../shared/common';

interface SupplyChainPanelProps {
  analysisData: SupplyChainAnalysis[];
}

const SupplyChainPanel: React.FC<SupplyChainPanelProps> = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState<SupplyChainAnalysis['category']>('Pharmaceuticals');
  const [recommendations, setRecommendations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});

  const handleGenerate = useCallback(async (category: SupplyChainAnalysis['category']) => {
    setLoading(prev => ({ ...prev, [category]: true }));
    setError(prev => ({ ...prev, [category]: '' }));
    setRecommendations(prev => ({ ...prev, [category]: '' }));

    const data = analysisData.find(a => a.category === category);
    if (!data) {
      setError(prev => ({ ...prev, [category]: 'Data not found.' }));
      setLoading(prev => ({ ...prev, [category]: false }));
      return;
    }

    try {
      const result = await getSupplyChainRecommendations(data);
      setRecommendations(prev => ({ ...prev, [category]: result }));
    } catch (e) {
      setError(prev => ({ ...prev, [category]: e instanceof Error ? e.message : 'An error occurred.' }));
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }));
    }
  }, [analysisData]);

  const activeData = analysisData.find(a => a.category === activeTab);

  const getRiskColor = (score: number) => {
    if (score > 85) return 'text-red-400';
    if (score > 70) return 'text-orange-400';
    if (score > 50) return 'text-yellow-400';
    return 'text-green-400';
  };
  
  const getRiskBorder = (score: number) => {
    if (score > 85) return 'border-red-500';
    if (score > 70) return 'border-orange-500';
    if (score > 50) return 'border-yellow-500';
    return 'border-green-500';
  };

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full flex flex-col">
      <h3 className="text-md font-semibold text-white mb-3 flex items-center">
        <CubeIcon className="w-5 h-5 mr-2 text-blue-400" />
        Supply Chain Vulnerability
      </h3>
      
      <div className="flex border-b border-brand-light-blue mb-4">
        {analysisData.map(data => (
          <button 
            key={data.category}
            onClick={() => setActiveTab(data.category)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === data.category ? 'text-white border-b-2 border-brand-accent' : 'text-gray-400 hover:text-white'}`}
          >
            {data.category}
          </button>
        ))}
      </div>
      
      {activeData && (
        <div className="flex-grow flex flex-col overflow-hidden">
            <div className="space-y-3 mb-4 overflow-y-auto pr-2">
            {activeData.nodes.map(node => (
              <div key={node.id} className={`p-3 bg-brand-dark rounded-lg border-l-4 ${getRiskBorder(node.riskScore)}`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-white text-sm">{node.name}</h4>
                  <p className={`font-bold text-lg ${getRiskColor(node.riskScore)}`}>{node.riskScore}<span className="text-xs">/100</span></p>
                </div>
                <p className="text-xs text-gray-400">{node.type} | {node.location}</p>
                <p className="text-xs text-gray-400 mt-1">Product: <span className="text-gray-300">{node.product}</span></p>
                <ul className="list-disc pl-5 mt-2 text-xs text-gray-300 space-y-1">
                  {node.vulnerabilities.map((vuln, i) => <li key={i}>{vuln}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-brand-dark p-3 rounded-lg mt-auto">
            <button
              onClick={() => handleGenerate(activeTab)}
              disabled={loading[activeTab]}
              className="w-full bg-brand-accent/90 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center text-sm"
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              {loading[activeTab] ? 'Analyzing...' : 'Generate Mitigation Strategies'}
            </button>

            <div className="prose prose-invert max-w-none text-xs bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[150px]">
              {loading[activeTab] && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Analyzing vulnerabilities..." /></div>}
              {error[activeTab] && <p className="text-red-500">{error[activeTab]}</p>}
              {recommendations[activeTab] && <div>{renderFormattedText(recommendations[activeTab])}</div>}
              {!loading[activeTab] && !error[activeTab] && !recommendations[activeTab] && (
                <p className="text-gray-400 text-center pt-8">Generate an AI-powered plan to diversify, harden, and secure this supply chain.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyChainPanel;
