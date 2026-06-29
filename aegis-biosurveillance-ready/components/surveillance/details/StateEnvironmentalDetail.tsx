import React from 'react';
import { EnvironmentalStateData } from '../../../types';

const StateEnvironmentalDetail: React.FC<{ data: EnvironmentalStateData }> = ({ data }) => {
    const getQualityPill = (quality: 'Good' | 'Fair' | 'Poor') => {
        switch (quality) {
            case 'Good': return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Good</span>;
            case 'Fair': return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Fair</span>;
            case 'Poor': return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Poor</span>;
        }
    };
    
    const getAqiColor = (aqi: number) => {
        if (aqi > 300) return 'text-purple-400';
        if (aqi > 200) return 'text-red-400';
        if (aqi > 150) return 'text-orange-400';
        if (aqi > 100) return 'text-yellow-400';
        return 'text-green-400';
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Water Source Monitoring</h3>
                <div className="space-y-3">
                    {data.waterSources.map(source => (
                        <div key={source.location} className="bg-brand-dark p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold text-white">{source.location} <span className="text-sm font-normal text-gray-400">({source.sourceType})</span></h4>
                                {getQualityPill(source.quality)}
                            </div>
                            <p className="text-xs text-gray-400">Contaminants: <span className="font-medium text-gray-300">{source.contaminants.join(', ') || 'None Detected'}</span></p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Air Quality Hotspots</h3>
                <div className="space-y-3">
                     {data.airQualityHotspots.map(hotspot => (
                        <div key={hotspot.location} className="bg-brand-dark p-3 rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-white">{hotspot.location}</h4>
                                <p className="text-xs text-gray-400">Primary Pollutant: {hotspot.primaryPollutant}</p>
                            </div>
                            <p className={`text-xl font-bold ${getAqiColor(hotspot.aqi)}`}>{hotspot.aqi} <span className="text-xs font-normal">AQI</span></p>
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

export default StateEnvironmentalDetail;
