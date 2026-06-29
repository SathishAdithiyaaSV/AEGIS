import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { GenomicSignal } from '../types';
import { getGenomicActionPlan } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

interface GenomicDetailModalProps {
  alert: GenomicSignal;
  onClose: () => void;
}

const GenomicDetailModal: React.FC<GenomicDetailModalProps> = ({ alert, onClose }) => {
    const [plan, setPlan] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGeneration = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setPlan('');
        try {
            const result = await getGenomicActionPlan(alert);
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
            <DnaIcon className="w-6 h-6 mr-3 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Genomic Signal Deep Dive: {alert.strainName}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Analysis & Methodology */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Principle of Genomic Surveillance</h3>
                    <p className="text-sm text-gray-300">
                       Genomic surveillance involves the continuous monitoring of pathogen genomes to track their evolution. By sequencing viruses like **{alert.strainName}**, we can rapidly identify mutations that may alter transmissibility, severity, or effectiveness of vaccines and treatments. This provides critical, predictive intelligence for public health.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Signal Analysis & Credibility</h3>
                     <p className="text-sm text-gray-300">This signal was flagged by our AI due to its classification as **'{alert.significance}'**. The analysis is based on:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                        <li>**Phylogenetic Analysis**: Comparing the new sequence to a global database of known variants to identify novel mutations.</li>
                        <li>**In Silico Modeling**: Using computational models to predict how mutations might affect protein structure and function (e.g., binding to human cells).</li>
                        <li>**Data Source Validation**: Sequences are sourced from credible national and international genomic databases like {alert.dataSource}.</li>
                    </ul>
                     <p className="text-sm text-gray-300 mt-2">{alert.summary}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Detection Hotspot: {alert.location}</h3>
                    <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue">
                        <div className="w-full h-40 bg-brand-light-blue/20 flex items-center justify-center rounded">
                           <div className="text-center text-gray-400">
                                <MapPinIcon className="w-10 h-10 mx-auto text-purple-500 animate-pulse" />
                                <p className="font-bold mt-2">Genomic Signal Hotspot</p>
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
                    {isLoading ? 'Generating...' : `Generate Response Plan`}
                </button>
                 <div className="prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md mt-3 min-h-[200px] flex-grow">
                    {isLoading && <div className="flex justify-center items-center h-full"><AiLoadingSpinner text="Aegis AI is generating action plan..." /></div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {plan ? (
                        <div className="text-sm">{renderFormattedText(plan)}</div>
                    ) : (
                        !isLoading && <p className="text-gray-400 text-sm">Generate a strategic plan for surveillance teams, clinicians, and public health authorities to respond to this emerging genomic signal.</p>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default GenomicDetailModal;
