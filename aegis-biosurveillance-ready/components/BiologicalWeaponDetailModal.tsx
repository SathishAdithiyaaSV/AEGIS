import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, MapIcon } from '@heroicons/react/24/solid';
import { BiologicalWeaponSignal } from '../types';
import { getBiologicalWeaponActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

const BiohazardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

interface BiologicalWeaponDetailModalProps {
  alert: BiologicalWeaponSignal;
  onClose: () => void;
}

const BiologicalWeaponDetailModal: React.FC<BiologicalWeaponDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getBiologicalWeaponActionPlan(alert);
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
            <BiohazardIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Biological Threat Deep Dive: {alert.agent}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Analysis & Methodology */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Principle of Biological Surveillance</h3>
                    <p className="text-sm text-gray-300">
                        Our national biosurveillance grid continuously monitors the environment for non-natural biological signatures. By analyzing aerosol, water, and wastewater samples for specific genomic or protein markers of weaponized agents like **{alert.agent}**, we can detect a covert release before it causes mass casualties, enabling a preemptive response.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Signal Analysis Explained</h3>
                    <p className="text-sm text-gray-300">
                        This signal was flagged based on the following methodology:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Signature Type**: A **{alert.signatureType}** signature matching **{alert.agent}** was detected.</li>
                        <li>**Signal Strength**: The signal is trending at **+{alert.signalStrength}%** above the established environmental baseline, indicating a potential ongoing release.</li>
                         <li>**Cross-Validation**: The signal was independently confirmed by multiple sensors in the {alert.location} grid to rule out a false positive.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Detection Hotspot: {alert.location}</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapIcon className="w-10 h-10 mx-auto text-red-500 animate-pulse" />
                                <p className="font-bold mt-2">Release Point Triangulated</p>
                                <p className="text-xs">The signal originates from the {alert.sourceType} at the specified location.</p>
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
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <>{renderFormattedText(plan)}</>
                    ) : (
                        !isLoading && <p className="text-gray-400">Generate a strategic action plan for first responders, public health officials, and intelligence agencies to contain and counter this threat.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default BiologicalWeaponDetailModal;