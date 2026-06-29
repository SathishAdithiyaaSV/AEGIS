import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { OdinSignal, GenomicAttributionResult } from '../../types';
import { getGenomicAttribution } from '../../services/geminiService';
import { AiLoadingSpinner } from '../shared/common';

const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

interface GenomicAttributionModalProps {
  signal: OdinSignal;
  onClose: () => void;
}

const STEPS = [
    "Receiving Signal...",
    "Parsing Genetic Context...",
    "Scanning Pathogen Database...",
    "Identifying Anomalous Markers...",
    "Running Forensic Heuristics...",
    "Generating Attribution Report...",
];

const GenomicAttributionModal: React.FC<GenomicAttributionModalProps> = ({ signal, onClose }) => {
    const [result, setResult] = useState<GenomicAttributionResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [currentStep, setCurrentStep] = useState(0);

    const runAttribution = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setResult(null);
        setCurrentStep(0);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 800);

        try {
            const analysisResult = await getGenomicAttribution(signal);
            clearInterval(stepInterval);
            setCurrentStep(STEPS.length - 1);
            setResult(analysisResult);
        } catch (err) {
            clearInterval(stepInterval);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [signal]);

    useEffect(() => {
        runAttribution();
    }, [runAttribution]);

    const getAttributionAppearance = (attribution?: GenomicAttributionResult['attribution']) => {
        switch (attribution) {
            case 'Deliberate Weaponization': return 'text-red-400';
            case 'Accidental Lab Release': return 'text-orange-400';
            case 'Natural Origin': return 'text-green-400';
            default: return 'text-gray-400';
        }
    };
    
    return (
    <div 
      className="fixed inset-0 bg-brand-dark/90 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-brand-dark-blue border border-brand-accent shadow-glow rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-brand-light-blue">
          <div className="flex items-center">
            <DnaIcon className="w-6 h-6 mr-3 text-brand-accent animate-pulse" />
            <h2 className="text-xl font-bold text-white">Project Chimera: Genomic Attribution Protocol</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left Column: Signal Info & Loading Steps */}
            <div className="md:col-span-2 space-y-4">
                <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Analyzing Signal: {signal.id}</h3>
                    <div className="bg-brand-dark p-3 rounded-md text-sm">
                        <p><strong className="text-white">Source:</strong> {signal.source}</p>
                        <p><strong className="text-white">Title:</strong> {signal.title}</p>
                        <p className="mt-2 text-gray-400">{signal.context}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold text-brand-accent mb-2">Analysis Log</h3>
                    <div className="bg-brand-dark p-3 rounded-md text-sm space-y-2 font-mono">
                        {STEPS.map((step, index) => (
                             <div key={step} className={`flex items-center transition-opacity duration-300 ${index <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                                {index < currentStep ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-green-400"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-brand-accent animate-spin"><path d="M10 3.5A6.5 6.5 0 1016.5 10a.75.75 0 01-1.5 0A5 5 0 1110 5a.75.75 0 010-1.5z" /></svg>
                                )}
                               <span>{step}</span>
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: AI Attribution Report */}
            <div className="md:col-span-3 bg-brand-dark p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center mb-3">
                    <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                    Attribution Report
                </h3>
                <div className="bg-brand-dark-blue p-4 rounded-md flex-grow">
                    {(isLoading && !result) || !result ? (
                        <div className="flex justify-center items-center h-full">
                            {error ? <p className="text-red-500 text-sm text-center">{error}</p> : <AiLoadingSpinner text="Awaiting AI analysis..." />}
                        </div>
                    ) : (
                        <div className="space-y-4 text-sm animate-fadeIn">
                            <div>
                                <p className="text-gray-400 text-xs uppercase font-semibold">Origin Classification</p>
                                <p className={`text-2xl font-bold ${getAttributionAppearance(result.attribution)}`}>{result.attribution}</p>
                            </div>
                             <div>
                                <p className="text-gray-400 text-xs uppercase font-semibold">Confidence Level</p>
                                <p className="text-2xl font-bold text-white">{result.confidence}%</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs uppercase font-semibold">Key Forensic Markers</p>
                                <ul className="list-disc pl-5 text-gray-300 mt-1">
                                    {result.geneticMarkers.map((marker, i) => <li key={i}>{marker}</li>)}
                                </ul>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs uppercase font-semibold">Origin Analysis</p>
                                <p className="text-gray-300 mt-1">{result.originAnalysis}</p>
                            </div>
                             <div className="bg-brand-dark p-3 rounded-md">
                                <p className="text-gray-400 text-xs uppercase font-semibold">Strategic Summary</p>
                                <p className="text-brand-accent font-semibold mt-1">{result.strategicSummary}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default GenomicAttributionModal;
