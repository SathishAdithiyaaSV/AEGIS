import React, { useState, useCallback, useMemo } from 'react';
import { InformationCircleIcon, SparklesIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import { TimeSeriesData, PredictionDetails, Intervention, SimulationResult } from '../types';
import { getSimulationAnalysis, getChartInterpretation } from '../services/geminiService';
import { AiLoadingSpinner, renderFormattedText } from './shared/common';

interface PredictiveModelingPanelProps {
    stateName: string;
    historicalData: TimeSeriesData[];
    predictionDetails: PredictionDetails;
    contextSummary: string;
}

interface ChartPoint {
    name: string;
    historical?: number;
    baseline?: number;
    simulated?: number;
}

const TooltipControl: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-2 bg-brand-dark border border-brand-light-blue text-xs text-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {text}
        </div>
    </div>
);

const PredictiveModelingPanel: React.FC<PredictiveModelingPanelProps> = ({ stateName, historicalData, predictionDetails, contextSummary }) => {
    const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [interpretation, setInterpretation] = useState<string>('');
    const [isInterpreting, setIsInterpreting] = useState<boolean>(false);
    const [interpretationError, setInterpretationError] = useState<string>('');

    const chartData = useMemo(() => {
        const combinedData: ChartPoint[] = historicalData.map(d => ({ name: d.name, historical: d.value }));
        const lastHistoricalPoint = combinedData.length > 0 ? combinedData[combinedData.length - 1] : null;

        if (lastHistoricalPoint) {
            // Anchor the forecast lines to the last historical point to ensure they connect on the chart.
            lastHistoricalPoint.baseline = lastHistoricalPoint.historical;
            if (simulationResult) {
                lastHistoricalPoint.simulated = lastHistoricalPoint.historical;
            }
        }

        predictionDetails.baselineForecast.forEach((d, i) => {
            const point: any = {
                name: d.name,
                baseline: d.value,
            };
            if (simulationResult) {
                point.simulated = simulationResult.projectedCases[i];
            }
            combinedData.push(point);
        });

        return combinedData;
    }, [historicalData, predictionDetails.baselineForecast, simulationResult]);
    
    const handleRunSimulation = useCallback(async () => {
        if (!selectedInterventionId) {
            setError("Please select an intervention to simulate.");
            return;
        }
        const intervention = predictionDetails.interventions.find(i => i.id === selectedInterventionId);
        if (!intervention) return;

        setIsLoading(true);
        setError('');
        setSimulationResult(null);
        setInterpretation('');
        setInterpretationError('');
        setIsInterpreting(false);

        try {
            const baselineValues = predictionDetails.baselineForecast.map(p => p.value);
            const result = await getSimulationAnalysis(stateName, contextSummary, intervention, baselineValues);
            setSimulationResult(result);
            
            // After successful simulation, trigger chart interpretation
            setIsInterpreting(true);
            const lastHistoricalPoints = historicalData.slice(-3);
            const baselinePoints = predictionDetails.baselineForecast;
            const simulatedPoints = result.projectedCases.map((value, i) => ({ name: `Week +${i+1}`, value }));
            
            const interpretationResult = await getChartInterpretation(
                stateName,
                predictionDetails.targetDisease,
                lastHistoricalPoints,
                baselinePoints,
                simulatedPoints,
                intervention.name
            );
            setInterpretation(interpretationResult);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                setInterpretationError("Could not generate chart interpretation due to a simulation error.");
            } else {
                setError('An unknown error occurred during simulation.');
                setInterpretationError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
            setIsInterpreting(false);
        }
    }, [selectedInterventionId, predictionDetails, stateName, contextSummary, historicalData]);

    return (
        <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                <BeakerIcon className="w-5 h-5 mr-2 text-brand-accent" />
                Predictive Modeling & Simulation: {predictionDetails.targetDisease}
            </h3>

            <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                         <defs>
                            <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#58A6FF" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                        <XAxis dataKey="name" stroke="#8B949E" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#8B949E" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', borderRadius: '0.5rem' }}
                            labelStyle={{ color: '#c9d1d9' }}
                        />
                        <Legend wrapperStyle={{fontSize: "12px"}} />
                        <Area type="monotone" dataKey="historical" fill="url(#colorHistorical)" stroke="none" />
                        <Line type="monotone" dataKey="historical" name="Historical" stroke="#58A6FF" strokeWidth={2} dot={{r: 4}} />
                        <Line type="monotone" dataKey="baseline" name="Baseline Forecast" stroke="#D29922" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                        {simulationResult && (
                             <Line type="monotone" dataKey="simulated" name="Simulated Outcome" stroke="#238636" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            
            <div className="bg-brand-dark p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Policy Simulation Sandbox</h4>
                <div className="space-y-2 mb-3">
                    {predictionDetails.interventions.map(intervention => (
                        <label key={intervention.id} className={`flex items-center space-x-3 p-2 bg-brand-dark-blue rounded-md cursor-pointer transition-colors duration-200 ${selectedInterventionId === intervention.id ? 'bg-brand-light-blue' : 'hover:bg-brand-light-blue/50'}`}>
                           <input 
                             type="radio" 
                             name="intervention" 
                             value={intervention.id}
                             checked={selectedInterventionId === intervention.id}
                             onChange={() => setSelectedInterventionId(intervention.id)}
                             className="form-radio h-4 w-4 text-brand-accent bg-brand-dark border-brand-light-blue focus:ring-brand-accent"
                           />
                           <span className="text-sm text-gray-300">{intervention.name}</span>
                           <TooltipControl text={intervention.description}>
                                <InformationCircleIcon className="w-4 h-4 text-gray-500" />
                           </TooltipControl>
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleRunSimulation}
                    disabled={isLoading || !selectedInterventionId}
                    className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Simulating...' : 'Run Simulation'}
                </button>
                
                 {(isLoading || error || simulationResult) && (
                    <div className="mt-3 prose prose-invert max-w-none bg-brand-dark-blue p-3 rounded-md min-h-[100px]">
                        {isLoading && <div className="flex justify-center items-center h-full pt-8"><AiLoadingSpinner text="Aegis AI is running simulation..." /></div>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {simulationResult && <div>{renderFormattedText(simulationResult.narrativeSummary)}</div>}
                    </div>
                )}

                {(isInterpreting || interpretationError || interpretation) && (
                    <div className="mt-4 bg-brand-dark-blue p-3 rounded-md">
                        <div className="prose prose-invert max-w-none">
                            {isInterpreting && <div className="flex justify-center items-center h-full pt-8"><AiLoadingSpinner text="Aegis AI is interpreting the chart..." /></div>}
                            {interpretationError && <p className="text-red-500 text-sm">{interpretationError}</p>}
                            {interpretation && <div>{renderFormattedText(interpretation)}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictiveModelingPanel;