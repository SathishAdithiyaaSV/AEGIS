import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShieldExclamationIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { LabStatus } from '../types';
import { getLabNetworkAnalysis } from '../services/geminiService';
import { AiLoadingSpinner } from './shared/common';

interface NationalLabNetworkProps {
  labs: LabStatus[];
}

const NationalLabNetwork: React.FC<NationalLabNetworkProps> = ({ labs }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalysis = useCallback(async () => {
        setIsLoading(true);
        setError('');
        const labSummary = labs.map(lab => `${lab.name} (BSL-${lab.bsl}): ${lab.status}`).join('\n');
        try {
            const result = await getLabNetworkAnalysis(labSummary);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [labs]);
    
    useEffect(() => {
        handleAnalysis();
    }, [handleAnalysis]);

    const getStatusPill = (status: LabStatus['status']) => {
        switch (status) {
            case 'High-Alert': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
            case 'Surge Capacity': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'Compromised': return 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse';
            default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
        }
    };
    
    const statusCounts = useMemo(() => labs.reduce((acc, lab) => {
        acc[lab.status] = (acc[lab.status] || 0) + 1;
        return acc;
    }, {} as Record<LabStatus['status'], number>), [labs]);

    const statusOrder: LabStatus['status'][] = ['Compromised', 'High-Alert', 'Surge Capacity', 'Nominal'];


    return (
        <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
            <h3 className="text-md font-semibold text-white mb-3 flex items-center">
                <ShieldExclamationIcon className="w-5 h-5 mr-2 text-blue-400" />
                National Lab Network Status
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
                {statusOrder.map(status => {
                    if (statusCounts[status]) {
                        return (
                            <div key={status} className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${getStatusPill(status)}`}>
                                <span className="font-bold text-sm mr-1.5">{statusCounts[status]}</span>
                                {status}
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="space-y-2 mb-4">
                {labs.map(lab => (
                    <div key={lab.id} className={`flex justify-between items-center p-2 rounded-md border-l-4 ${getStatusPill(lab.status)}`}>
                        <div>
                           <p className="font-semibold text-white text-sm">{lab.name}</p>
                           <p className="text-xs text-gray-400">BSL-{lab.bsl} | {lab.location}</p>
                        </div>
                        <span className="text-xs font-bold">{lab.status}</span>
                    </div>
                ))}
            </div>
            <div className="bg-brand-dark p-3 rounded-lg">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-white flex items-center">
                        <SparklesIcon className="w-4 h-4 mr-2 text-brand-accent"/>
                        AI Readiness Assessment
                    </h4>
                    <button onClick={handleAnalysis} disabled={isLoading} className="text-xs text-gray-400 hover:text-white disabled:text-gray-600">Refresh</button>
                 </div>
                 <div className="text-xs text-gray-300 min-h-[60px]">
                    {isLoading && <AiLoadingSpinner text="Analyzing..." />}
                    {error && <p className="text-red-400">{error}</p>}
                    {!isLoading && !error && analysis && <p>{analysis}</p>}
                 </div>
            </div>
        </div>
    );
};

export default NationalLabNetwork;