import React from 'react';
import { DisasterStateData, RiskLevel } from '../../../types';

const StateDisasterDetail: React.FC<{ data: DisasterStateData }> = ({ data }) => {
    
    const getRiskPill = (risk: RiskLevel) => {
        switch (risk) {
            case 'Critical': return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Critical</span>;
            case 'High': return <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">High</span>;
            case 'Moderate': return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Moderate</span>;
            default: return <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{risk}</span>;
        }
    };
    
    const getPreparednessPill = (status: 'Ready' | 'Partial' | 'Lacking') => {
        switch (status) {
            case 'Ready': return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Ready</span>;
            case 'Partial': return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Partial</span>;
            case 'Lacking': return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Lacking</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Current Disaster Risks</h3>
                <div className="space-y-3">
                    {data.currentRisks.map(risk => (
                        <div key={risk.disasterType} className="bg-brand-dark p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold text-white">{risk.disasterType}</h4>
                                {getRiskPill(risk.riskLevel)}
                            </div>
                            <p className="text-xs text-gray-400">Forecast: <span className="font-medium text-gray-300">{risk.forecast}</span></p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Public Health Preparedness</h3>
                <div className="space-y-3">
                     {data.preparedness.map(item => (
                        <div key={item.metric} className="bg-brand-dark p-3 rounded-lg">
                             <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold text-white">{item.metric}</h4>
                                {getPreparednessPill(item.status)}
                            </div>
                            <p className="text-xs text-gray-400">{item.details}</p>
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

export default StateDisasterDetail;
