import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { LivestockAlert } from '../types';
import { getLivestockActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

const LivestockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.75 0h.008v.015H9v-.015zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.75 0h.008v.015h-.008v-.015z" />
    </svg>
);

interface LivestockDetailModalProps {
  alert: LivestockAlert;
  onClose: () => void;
}

const LivestockDetailModal: React.FC<LivestockDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getLivestockActionPlan(alert);
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
            <LivestockIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Livestock Threat Deep Dive: {alert.disease}</h2>
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
                        Monitoring for agricultural threats like **{alert.disease}** in **{alert.species}** is vital for national food security and economic stability. Early detection prevents widespread outbreaks, minimizes economic loss (currently assessed as **{alert.economicImpact}**), and mitigates potential zoonotic risks to public health.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Surveillance Methodology & Credibility</h3>
                    <p className="text-sm text-gray-300">
                        Data is aggregated from State Departments of Animal Husbandry and the National Animal Disease Reporting System (NADRS).
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Syndromic Surveillance**: Monitoring for clinical signs reported by veterinarians and farmers.</li>
                        <li>**Lab Confirmation**: Samples are processed by state veterinary labs to confirm the pathogen.</li>
                        <li>**Economic Modeling**: The economic impact is calculated based on the affected species, disease mortality rate, and potential trade restrictions.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Outbreak Epicenter</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapPinIcon className="w-10 h-10 mx-auto text-red-500 animate-pulse" />
                                <p className="font-bold mt-2">Containment Zone Established</p>
                                <p className="text-xs">Surveillance and control measures are focused on the affected area.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: AI Action Plan */}
            <div className="bg-brand-dark p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center mb-3">
                    <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                    AI-Powered Agricultural Response
                </h3>
                <button
                    onClick={handleGeneration}
                    disabled={isLoading}
                    className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? 'Generating...' : `Generate Response Plan`}
                </button>
                 <div className="prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[200px] flex-grow">
                    {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating action plan..." /></div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <div className="text-sm">{renderFormattedText(plan)}</div>
                    ) : (
                        !isLoading && <p className="text-gray-400 text-sm">Generate a strategic plan for veterinary services, agricultural trade, and public health officials to contain this livestock disease outbreak.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default LivestockDetailModal;
