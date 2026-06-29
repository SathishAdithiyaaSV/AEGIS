import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, MapIcon } from '@heroicons/react/24/solid';
import { ChemicalWeaponSignal } from '../types';
import { getChemicalWeaponActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

const FlaskIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 2.25h3.5m-3.5 0a.75.75 0 00-1.06 0l-1.72 1.72a.75.75 0 000 1.06l1.72 1.72a.75.75 0 001.06 0m3.5 0a.75.75 0 011.06 0l1.72 1.72a.75.75 0 010 1.06l-1.72 1.72a.75.75 0 01-1.06 0m-3.5 0h3.5m-3.5 0a1.125 1.125 0 01-1.125-1.125V3.375c0-.621.504-1.125 1.125-1.125h3.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125m-3.5 0h3.5m-3.5 0a1.125 1.125 0 01-1.125-1.125V3.375c0-.621.504-1.125 1.125-1.125h3.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125m-3.5 0h3.5m-3.5 0a.75.75 0 00-.75.75v11.25c0 .414.336.75.75.75h3.5a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-3.5z" />
    </svg>
);

interface ChemicalWeaponDetailModalProps {
  alert: ChemicalWeaponSignal;
  onClose: () => void;
}

const ChemicalWeaponDetailModal: React.FC<ChemicalWeaponDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getChemicalWeaponActionPlan(alert);
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
            <FlaskIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Chemical Threat Deep Dive: {alert.agent}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Analysis & Methodology */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Principle of Chemical Surveillance</h3>
                    <p className="text-sm text-gray-300">
                        A network of chemical sensors in high-risk public and industrial areas provides real-time detection of hazardous materials. This system is designed to identify chemical warfare agents like **{alert.agent}** at minute concentrations (parts per billion), providing critical seconds for evacuation and response before lethal levels are reached.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Signal Analysis Explained</h3>
                    <p className="text-sm text-gray-300">
                        The alert was triggered based on the following data points:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Detection Method**: A **{alert.signatureType}** analysis confirmed the agent's chemical signature.</li>
                        <li>**Concentration**: **{alert.concentration} ppb** was detected, exceeding the safety threshold and indicating a deliberate release.</li>
                         <li>**Source Triangulation**: The alert originated from a **{alert.sourceType}** in the network, allowing for rapid localization of the event.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Detection Hotspot: {alert.location}</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapIcon className="w-10 h-10 mx-auto text-yellow-400 animate-pulse" />
                                <p className="font-bold mt-2">Chemical Release Hotspot</p>
                                <p className="text-xs">Emergency services are focused on this area.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: AI Action Plan */}
            <div className="bg-brand-dark p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center mb-3">
                    <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                    AI-Powered Response Protocol
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
                    {error && <p className="text-red-500">{error}</p>}
                    {plan ? (
                        <>{renderFormattedText(plan)}</>
                    ) : (
                        !isLoading && <p className="text-gray-400">Generate a strategic action plan for emergency services, medical teams, and environmental agencies to manage this chemical release.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default ChemicalWeaponDetailModal;
