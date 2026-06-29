import React from 'react';
import { PestAndCropStateData, RiskLevel } from '../../../types';

const PrevalentThreat: React.FC<{
    threat: { name: string; risk: RiskLevel; affectedCrops: string[] };
    type: 'Pest' | 'Disease';
}> = ({ threat, type }) => {
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
                <h4 className="font-semibold text-white">{threat.name}</h4>
                {getRiskPill(threat.risk)}
            </div>
            <p className="text-xs text-gray-400 mt-2">
                <strong>Type:</strong> {type} | <strong>Affected Crops:</strong> {threat.affectedCrops.join(', ')}
            </p>
        </div>
    );
};

const StatePestCropDetail: React.FC<{ data: PestAndCropStateData }> = ({ data }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Prevalent Pests</h3>
                <div className="space-y-3">
                    {data.prevalentPests.map(pest => <PrevalentThreat key={pest.pest} threat={{ name: pest.pest, ...pest }} type="Pest" />)}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Prevalent Crop Diseases</h3>
                <div className="space-y-3">
                    {data.prevalentDiseases.map(disease => <PrevalentThreat key={disease.disease} threat={{ name: disease.disease, ...disease }} type="Disease" />)}
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

export default StatePestCropDetail;
