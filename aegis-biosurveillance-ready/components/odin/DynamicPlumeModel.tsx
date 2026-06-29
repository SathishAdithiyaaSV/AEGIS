import React, { useState, useEffect, useCallback, useRef } from 'react';
import { OdinSignal, PlumeSimulationResult } from '../../types';
import { getPlumeSimulationAnalysis } from '../../services/geminiService';
import { ArrowLeftIcon, PlayIcon, PauseIcon, ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { AiLoadingSpinner, renderFormattedText } from '../shared/common';

interface DynamicPlumeModelProps {
  signal: OdinSignal;
  onClose: () => void;
}

const SIMULATION_DURATION = 12000; // 12 seconds for the full simulation

const DynamicPlumeModel: React.FC<DynamicPlumeModelProps> = ({ signal, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<PlumeSimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | undefined>(undefined);

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }
    const elapsed = time - startTimeRef.current;
    const newProgress = Math.min((elapsed / SIMULATION_DURATION) * 100, 100);
    setProgress(newProgress);

    if (newProgress < 100) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = performance.now() - (progress / 100) * SIMULATION_DURATION;
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, progress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    startTimeRef.current = undefined;
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
  };
  
  const fetchAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
        const weather = "Wind: 15 mph from West-Northwest (WNW), Humidity: 65%, Temp: 72°F";
        const result = await getPlumeSimulationAnalysis(signal.agent!, signal.location!, weather);
        setAnalysis(result);
    } catch(err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis.');
    } finally {
        setIsLoading(false);
    }
  }, [signal]);
  
  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  const plumeScale = progress / 100;
  const hoursElapsed = (progress / 100 * 8).toFixed(1);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Dynamic Plume Model: {signal.agent}
        </h1>
        <button
          onClick={onClose}
          className="bg-brand-light-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors flex items-center"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to ODIN Command
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Simulation Map */}
        <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
            <h3 className="text-md font-semibold text-white mb-2">Dispersal Simulation: {signal.location}</h3>
            <div 
                className="relative w-full aspect-square bg-brand-dark overflow-hidden rounded-md"
                style={{
                    backgroundImage: 'linear-gradient(rgba(88, 166, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(88, 166, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '2rem 2rem'
                }}
            >
                {/* Release Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse z-10" />
                <div className="absolute top-1/2 left-1/2 w-1 h-1 z-0">
                    <div 
                        className="absolute w-[800px] h-[400px] -translate-x-1/4 -translate-y-1/2 rounded-[50%] origin-left transition-transform duration-100 ease-linear"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(248, 81, 73, 0.6), rgba(248, 81, 73, 0))',
                            transform: `scaleX(${plumeScale}) rotate(22.5deg)`,
                            opacity: plumeScale * 0.8,
                            transformOrigin: '25% 50%',
                        }}
                    />
                </div>
            </div>
            
            {/* Controls */}
            <div className="mt-4">
                 <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>T+ 0 Hours</span>
                    <span className="font-bold text-white">T+ {hoursElapsed} Hours</span>
                    <span>T+ 8 Hours</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-2.5">
                    <div className="bg-brand-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-center items-center space-x-4 mt-4">
                    <button onClick={handlePlayPause} className="bg-brand-accent text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                        {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                    </button>
                    <button onClick={handleReset} className="bg-brand-light-blue text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
                        <ArrowPathIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        {/* Right: AI Analysis */}
        <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
            <h3 className="text-md font-semibold text-white mb-3 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent"/>
                AI Tactical Analysis
            </h3>
            <div className="flex-grow overflow-y-auto pr-2">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <AiLoadingSpinner text="Generating tactical plan..."/>
                    </div>
                ) : error ? (
                    <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>
                ) : analysis ? (
                    <div className="space-y-4 text-sm prose prose-invert max-w-none">
                        <div>{renderFormattedText(analysis.evacuationOrders)}</div>
                        <div className="border-t border-brand-light-blue/50 my-4" />
                        <div>{renderFormattedText(analysis.projectedImpact)}</div>
                        <div className="border-t border-brand-light-blue/50 my-4" />
                        <div>{renderFormattedText(analysis.responderGuidance)}</div>
                    </div>
                ) : null}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPlumeModel;
