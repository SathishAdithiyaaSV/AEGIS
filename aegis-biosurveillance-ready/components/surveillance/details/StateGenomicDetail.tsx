import React from 'react';
import { StateGenomicData, GenomicSignal } from '../../../types';

const StateGenomicDetail: React.FC<{ data: StateGenomicData }> = ({ data }) => {
    const getSignificanceColor = (significance: GenomicSignal['significance']) => {
        switch (significance) {
            case 'Vaccine Escape':
            case 'Increased Severity':
                return 'border-red-500';
            case 'Increased Transmissibility':
                return 'border-orange-500';
            default:
                return 'border-yellow-500';
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">State Sequencing Capacity</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-brand-dark p-3 rounded-lg">
                        <p className="text-2xl font-bold text-white">{data.sequencingCapacity.labs}</p>
                        <p className="text-xs text-gray-400">Sequencing Labs</p>
                    </div>
                    <div className="bg-brand-dark p-3 rounded-lg">
                        <p className="text-2xl font-bold text-white">{data.sequencingCapacity.throughput.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Sequences / Week</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Dominant Circulating Strains</h3>
                <div className="space-y-3">
                    {data.circulatingStrains.map(strain => (
                        <div key={strain.strain} className={`bg-brand-dark p-3 rounded-lg border-l-4 ${getSignificanceColor(strain.significance)}`}>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold text-white">{strain.strain}</h4>
                                <p className="text-lg font-bold text-brand-accent">{strain.prevalence}%</p>
                            </div>
                            <p className="text-xs text-gray-400">Pathogen: {strain.pathogen} | Significance: {strain.significance}</p>
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

export default StateGenomicDetail;
