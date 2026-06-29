import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, ExclamationTriangleIcon, MapIcon } from '@heroicons/react/24/solid';
import { DisasterAlert } from '../types';
import { getDisasterDiseaseActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface DisasterDetailModalProps {
  alert: DisasterAlert;
  onClose: () => void;
}

const DisasterDetailModal: React.FC<DisasterDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getDisasterDiseaseActionPlan(alert);
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
            <ExclamationTriangleIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Disaster Health Response: {alert.disasterType}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Analysis & Methodology */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Principle of Disaster Health Surveillance</h3>
                    <p className="text-sm text-gray-300">
                       Natural disasters like a **{alert.disasterType}** disrupt infrastructure, displace populations, and contaminate water and food supplies. This creates a high-risk environment for outbreaks of infectious diseases. Our system proactively identifies these risks to enable a rapid, targeted public health response.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Risk Assessment Methodology</h3>
                    <p className="text-sm text-gray-300">
                       Disease risks are identified using a predictive model based on:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Disaster Type & Severity**: Different disasters carry unique risk profiles (e.g., floods and water-borne illness).</li>
                        <li>**Geographic & Environmental Factors**: The endemic diseases and environmental conditions of **{alert.location}** are considered.</li>
                        <li>**Historical Precedent**: Data from past, similar events is used to forecast likely health challenges.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Affected Area: {alert.location}</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapIcon className="w-10 h-10 mx-auto text-red-500" />
                                <p className="font-bold mt-2">Disaster Impact Zone</p>
                                <p className="text-xs">Public health resources are focused on this area.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: AI Action Plan */}
            <div className="bg-brand-dark p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center mb-3">
                    <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                    AI-Powered Public Health Response
                </h3>
                <button
                    onClick={handleGeneration}
                    disabled={isLoading}
                    className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? 'Generating...' : `Generate Health Plan`}
                </button>
                 <div className="prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[200px] flex-grow">
                    {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating health plan..." /></div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <div className="text-sm">{renderFormattedText(plan)}</div>
                    ) : (
                        !isLoading && <p className="text-gray-400 text-sm">Generate a strategic plan to mitigate disease risks associated with this disaster, focusing on sanitation, surveillance, and public communication.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default DisasterDetailModal;
