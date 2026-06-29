import React from 'react';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { LivestockVaccinationStats } from '../types';
import { InfoTooltip } from './shared/common';

const LivestockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.75 0h.008v.015H9v-.015zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.75 0h.008v.015h-.008v-.015z" />
    </svg>
);

const VaccinationStat: React.FC<{ stat: LivestockVaccinationStats }> = ({ stat }) => {
    const percentage = stat.total > 0 ? (stat.vaccinated / stat.total) * 100 : 0;
    
    const getColor = (p: number) => {
        if (p > 80) return 'bg-green-500';
        if (p > 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-brand-dark p-3 rounded-lg">
            <h4 className="font-semibold text-white">{stat.species}</h4>
            <div className="text-xs text-gray-400 mb-2 truncate">Targets: {stat.targetDiseases.join(', ')}</div>
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

interface LivestockVaccinationPanelProps {
  stats: LivestockVaccinationStats[];
  dataSource: string;
  dataSourceTooltip?: string;
}

const LivestockVaccinationPanel: React.FC<LivestockVaccinationPanelProps> = ({ stats, dataSource, dataSourceTooltip }) => {
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
      <div className="mb-4">
        <h3 className="text-md font-semibold text-white flex items-center">
          <LivestockIcon className="w-5 h-5 mr-2 text-lime-400" />
          National Livestock Vaccination
        </h3>
      </div>
      
      <div className="flex-grow space-y-3 max-h-60 overflow-y-auto pr-1">
        {stats.length > 0 ? stats.map(stat => (
            <VaccinationStat key={stat.species} stat={stat} />
        )) : (
            <div className="text-center text-gray-500 text-sm py-8">
              No vaccination data available.
            </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-brand-light-blue/30">
        <div className="flex items-center text-xs text-gray-500">
            <CircleStackIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{dataSource}</span>
            {dataSourceTooltip && <div className="ml-1.5"><InfoTooltip text={dataSourceTooltip} /></div>}
        </div>
      </div>
    </div>
  );
};

export default LivestockVaccinationPanel;