import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, BeakerIcon, MapIcon } from '@heroicons/react/24/solid';
import { EnvironmentalAlert } from '../types';
import { getWastewaterActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface WastewaterDetailModalProps {
  alert: EnvironmentalAlert;
  onClose: () => void;
}

const WastewaterDetailModal: React.FC<WastewaterDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getWastewaterActionPlan(alert);
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
            <BeakerIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Wastewater Signal Deep Dive: {alert.name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Analysis & Methodology */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Principle of Wastewater Surveillance</h3>
                    <p className="text-sm text-gray-300">
                        Wastewater-Based Epidemiology (WBE) acts as a powerful early-warning system. By testing sewage, we can detect the presence of pathogens like **{alert.name}** across an entire community, often before individuals show symptoms or seek medical care. This provides a non-invasive, comprehensive snapshot of public health.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Metric Calculation Explained</h3>
                    <p className="text-sm text-gray-300">
                        Our data is derived from a network of sentinel sites and credible nodal labs:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Quantitative Analysis**: Viral/bacterial RNA is quantified from samples using RT-qPCR, providing precise concentration data.</li>
                        <li>**Signal Strength**: The {alert.signalStrength ? `+${alert.signalStrength}%` : ''} signal is a normalized value, comparing current RNA levels against a 30-day rolling baseline for this site. This highlights true anomalies, correcting for variables like rainfall and population shifts.</li>
                         <li>**Standardized Protocols**: Data consistency and credibility are maintained through standardized testing protocols across our network of nodal labs.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Hotspot Identified: {alert.location}</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapIcon className="w-10 h-10 mx-auto text-red-500" />
                                <p className="font-bold mt-2">Upstream Catchment Area Identified</p>
                                <p className="text-xs">The signal originates from the neighborhoods feeding into the {alert.location}.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: AI Action Plan */}
            <div className="bg-brand-dark p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center mb-3">
                    <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                    AI-Powered Optimization Plan
                </h3>
                <button
                    onClick={handleGeneration}
                    disabled={isLoading}
                    className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? 'Generating...' : `Generate Plan for ${alert.name}`}
                </button>
                 <div className="prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[200px] flex-grow">
                    {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating action plan..." /></div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <div className="text-sm">{renderFormattedText(plan)}</div>
                    ) : (
                        !isLoading && <p className="text-gray-400 text-sm">Generate a strategic plan for public health officials and water authorities to investigate and mitigate the source of this environmental signal.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default WastewaterDetailModal;
