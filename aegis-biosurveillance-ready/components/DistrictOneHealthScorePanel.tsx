import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { DistrictOneHealthScore } from '../types';

const ScoreBar: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
    <div>
        <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-gray-300">{label}</span>
            <span className={`font-bold ${color}`}>{value}</span>
        </div>
        <div className="w-full bg-brand-dark rounded-full h-2">
            <div className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

const DistrictOneHealthScorePanel: React.FC<{ scoreData: DistrictOneHealthScore }> = ({ scoreData }) => {
    const getOverallColor = (score: number) => {
        if (score > 85) return 'text-red-400';
        if (score > 70) return 'text-orange-400';
        if (score > 50) return 'text-yellow-400';
        return 'text-green-400';
    };

    const overallColor = getOverallColor(scoreData.overall);

    return (
        <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                <ShieldCheckIcon className="w-5 h-5 mr-2 text-gray-400" />
                District One Health Score
            </h3>
            <div className="text-center mb-4">
                <p className={`text-6xl font-bold ${overallColor}`}>{scoreData.overall}</p>
                <p className={`text-lg font-semibold ${overallColor}`}>High Risk</p>
            </div>
            <div className="space-y-3">
                <ScoreBar value={scoreData.human} label="Human Health Risk" color="text-brand-accent" />
                <ScoreBar value={scoreData.animal} label="Animal & Zoonotic Risk" color="text-yellow-400" />
                <ScoreBar value={scoreData.environment} label="Environmental Risk" color="text-green-400" />
            </div>
        </div>
    );
};

export default DistrictOneHealthScorePanel;
