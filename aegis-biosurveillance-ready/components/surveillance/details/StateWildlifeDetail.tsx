import React from 'react';
import { WildlifeStateData } from '../../../types';

const StateWildlifeDetail: React.FC<{ data: WildlifeStateData }> = ({ data }) => {
    
    const getHealthStatusPill = (status: 'Healthy' | 'Monitoring' | 'Diseased') => {
        switch (status) {
            case 'Healthy': return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Healthy</span>;
            case 'Monitoring': return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Monitoring</span>;
            case 'Diseased': return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Diseased</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Sentinel Wildlife Populations</h3>
                <div className="space-y-3">
                    {data.populationStatus.map(pop => (
                        <div key={pop.species} className="bg-brand-dark p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold text-white">{pop.species}</h4>
                                {getHealthStatusPill(pop.healthStatus)}
                            </div>
                            <p className="text-xs text-gray-400">Population Trend: <span className="font-medium text-gray-300">{pop.populationTrend}</span></p>
                            <p className="text-xs text-gray-400">Key Pathogens: <span className="font-medium text-gray-300">{pop.keyPathogens.join(', ')}</span></p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Human-Wildlife Interface Hotspots</h3>
                <div className="space-y-3">
                     {data.interfaceHotspots.map(spot => (
                        <div key={spot.location} className="bg-brand-dark p-3 rounded-lg">
                            <h4 className="font-semibold text-white">{spot.location}</h4>
                            <p className="text-xs text-gray-400 mt-1">{spot.description}</p>
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

export default StateWildlifeDetail;
