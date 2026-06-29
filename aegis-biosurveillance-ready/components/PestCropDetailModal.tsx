import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { PestInfestationAlert, CropDiseaseAlert } from '../types';
import { getPestCropActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

const LocustIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM21.75 12c0 .934-.146 1.842-.423 2.693l-1.458-1.458A5.985 5.985 0 0018 12c0-3.314-2.686-6-6-6-1.52 0-2.903.568-3.958 1.502L6.307 5.543A9.01 9.01 0 0112 3c4.97 0 9 4.03 9 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.053 13.042C2.396 14.015 2 15.19 2 16.5c0 1.933.784 3.682 2.05 4.95.285.285.626.527.986.738l.849-3.396a14.377 14.377 0 01-1.826-1.905" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);


interface PestCropDetailModalProps {
  alert: PestInfestationAlert | CropDiseaseAlert;
  onClose: () => void;
}

const PestCropDetailModal: React.FC<PestCropDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const isPest = 'pest' in alert;
    const name = isPest ? alert.pest : alert.disease;
    const type = isPest ? 'Pest Infestation' : 'Crop Disease';

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getPestCropActionPlan(alert);
            setPlan(result);
        } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unknown error occurred.');
            }
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
            <LocustIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Agricultural Threat: {name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Threat Overview</h3>
                    <p className="text-sm text-gray-300">
                        This alert for **{name}** on **{alert.cropType}** represents a significant threat to agricultural output and food security. Early detection and rapid response are crucial to mitigate economic damage and prevent wider spread.
                    </p>
                     {isPest && <p className="text-sm text-gray-300 mt-2">{alert.summary}</p>}
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Surveillance Methodology</h3>
                     <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Satellite Imagery**: Monitoring crop health and biomass changes.</li>
                        <li>**Farmer Reporting Network**: Data from Krishi Vigyan Kendras (KVKs) and local agricultural extension officers.</li>
                        <li>**Field Surveys**: Physical sample collection and lab analysis to confirm pathogen/pest identity.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Affected Region</h3>
                     <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapPinIcon className="w-10 h-10 mx-auto text-green-500 animate-pulse" />
                                <p className="font-bold mt-2">{type} Hotspot</p>
                                <p className="text-xs">Control measures are focused on this agricultural zone.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

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
                    {isLoading ? 'Generating...' : `Generate Action Plan`}
                </button>
                 <div className="prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[200px] flex-grow">
                    {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating plan..." /></div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <div className="text-sm">{renderFormattedText(plan)}</div>
                    ) : (
                        !isLoading && <p className="text-gray-400 text-sm">Generate a plan for containment, economic mitigation, and farmer communication.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default PestCropDetailModal;
