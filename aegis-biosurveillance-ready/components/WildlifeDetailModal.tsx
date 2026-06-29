import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, FingerPrintIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { WildlifeAlert } from '../types';
import { getWildlifeActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface WildlifeDetailModalProps {
  alert: WildlifeAlert;
  onClose: () => void;
}

const WildlifeDetailModal: React.FC<WildlifeDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getWildlifeActionPlan(alert);
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
    }, [alert]);

    return (
    <div 
      className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-40 flex justify-center items-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-brand-dark-blue border border-brand-accent shadow-glow rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-brand-light-blue">
          <div className="flex items-center">
            <FingerPrintIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Wildlife Threat Deep Dive: {alert.disease}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Analysis & Methodology */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Threat Overview & Principle</h3>
                    <p className="text-sm text-gray-300">
                        Monitoring wildlife populations for diseases like **{alert.disease}** in **{alert.species}** is a cornerstone of the One Health approach. It serves as an early warning for potential zoonotic spillover, threats to biodiversity, and risks to agricultural industries.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Surveillance Methodology & Credibility</h3>
                    <p className="text-sm text-gray-300">
                        Data is aggregated from state wildlife agencies, USDA APHIS, and academic research partners, ensuring comprehensive and credible coverage.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Sentinel Species Monitoring**: Active surveillance of key species known to be reservoirs for high-risk pathogens.</li>
                        <li>**Necropsy and Lab Analysis**: Pathogen identification is confirmed through accredited veterinary diagnostic labs.</li>
                        <li>**Impact Assessment**: The potential impact, **"{alert.potentialImpact}"**, is evaluated by our AI based on pathogen characteristics and proximity to human or livestock populations.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Hotspot Analysis: {alert.location}</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapPinIcon className="w-10 h-10 mx-auto text-lime-500 animate-pulse" />
                                <p className="font-bold mt-2">Wildlife Disease Hotspot</p>
                                <p className="text-xs">{alert.location}</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: AI Action Plan */}
            <div className="bg-brand-dark p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center mb-3">
                    <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                    AI-Powered Strategic Response
                </h3>
                <button
                    onClick={handleGeneration}
                    disabled={isLoading}
                    className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? 'Generating...' : `Generate Plan for ${alert.disease}`}
                </button>
                 <div className="prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[200px] flex-grow">
                    {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating action plan..." /></div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <div className="text-sm">{renderFormattedText(plan)}</div>
                    ) : (
                        !isLoading && <p className="text-gray-400 text-sm">Generate a sector-specific action plan for wildlife management, public health, and agricultural teams to contain this threat.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default WildlifeDetailModal;
