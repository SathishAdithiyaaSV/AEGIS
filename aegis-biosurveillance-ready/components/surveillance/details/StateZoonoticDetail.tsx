import React from 'react';
import { ZoonoticStateData } from '../../../types';

const StateZoonoticDetail: React.FC<{ data: ZoonoticStateData }> = ({ data }) => {
    
    const getPrevalenceColor = (prevalence: 'High' | 'Moderate' | 'Low') => {
        if (prevalence === 'High') return 'text-red-400';
        if (prevalence === 'Moderate') return 'text-yellow-400';
        return 'text-green-400';
    };

    const getStatusColor = (status: 'Alert' | 'Nominal') => {
        return status === 'Alert' ? 'text-red-400' : 'text-green-400';
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">High-Risk Vectors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.highRiskVectors.map(vector => (
                        <div key={vector.vector} className="bg-brand-dark p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-white">{vector.vector}</h4>
                                <p className={`text-sm font-bold ${getPrevalenceColor(vector.prevalence)}`}>{vector.prevalence}</p>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Known to carry: {vector.diseases.join(', ')}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Sentinel Species Status</h3>
                <div className="space-y-3">
                     {data.sentinelSpecies.map(species => (
                        <div key={species.species} className="bg-brand-dark p-3 rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-white">{species.species}</h4>
                                <p className="text-xs text-gray-400">{species.location}</p>
                            </div>
                             <div className="text-right">
                                <p className={`font-bold ${getStatusColor(species.status)}`}>{species.status}</p>
                                <p className="text-xs text-gray-500">Checked: {species.lastChecked}</p>
                            </div>
                        </div>
                     ))}
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">AI Summary</h3>
                <div className="text-sm text-gray-300 bg-brand-dark p-3 rounded-lg">
                    <p>{data.aiSummary}</p>
                </div>
            </div>
        </div>
    );
};

export default StateZoonoticDetail;
