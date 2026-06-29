import React from 'react';
import { LivestockStateData, RiskLevel } from '../../../types';

const VaccinationStat: React.FC<{ stat: LivestockStateData['vaccinationStats'][0] }> = ({ stat }) => {
    const percentage = stat.total > 0 ? (stat.vaccinated / stat.total) * 100 : 0;
    
    const getColor = (p: number) => {
        if (p > 80) return 'bg-green-500';
        if (p > 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-brand-dark p-3 rounded-lg">
            <h4 className="font-semibold text-white">{stat.species}</h4>
            <div className="text-xs text-gray-400 mb-2">Targets: {stat.targetDiseases.join(', ')}</div>
            <div className="w-full bg-brand-light-blue rounded-full h-2.5">
                <div 
                  className={`h-full rounded-full ${getColor(percentage)}`}
                  style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="text-xs text-gray-300 mt-1 flex justify-between">
                <span>{percentage.toFixed(1)}% Coverage</span>
                <span>{stat.vaccinated.toLocaleString()} / {stat.total.toLocaleString()}</span>
            </div>
        </div>
    );
};

const PrevalentDisease: React.FC<{ disease: LivestockStateData['prevalentDiseases'][0] }> = ({ disease }) => {
    const getRiskPill = (risk: RiskLevel) => {
        switch (risk) {
            case 'Critical': return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Critical</span>;
            case 'High': return <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">High</span>;
            case 'Moderate': return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Moderate</span>;
            default: return <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{risk}</span>;
        }
    };
    return (
        <div className="bg-brand-dark p-3 rounded-lg border-l-4 border-brand-light-blue">
            <div className="flex justify-between items-start">
                <h4 className="font-semibold text-white">{disease.disease} <span className="text-sm font-normal text-gray-400">in {disease.species}</span></h4>
                {getRiskPill(disease.risk)}
            </div>
            <p className="text-xs text-gray-400 mt-2">{disease.summary}</p>
        </div>
    );
};


const StateLivestockDetail: React.FC<{ data: LivestockStateData }> = ({ data }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Vaccination Coverage</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.vaccinationStats.map(stat => <VaccinationStat key={stat.species} stat={stat} />)}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Prevalent Diseases</h3>
                <div className="space-y-3">
                    {data.prevalentDiseases.map(disease => <PrevalentDisease key={disease.disease} disease={disease} />)}
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

export default StateLivestockDetail;
