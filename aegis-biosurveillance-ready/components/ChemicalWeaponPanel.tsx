import React from 'react';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { ChemicalWeaponSignal } from '../types';

const FlaskIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 2.25h3.5m-3.5 0a.75.75 0 00-1.06 0l-1.72 1.72a.75.75 0 000 1.06l1.72 1.72a.75.75 0 001.06 0m3.5 0a.75.75 0 011.06 0l1.72 1.72a.75.75 0 010 1.06l-1.72 1.72a.75.75 0 01-1.06 0m-3.5 0h3.5m-3.5 0a1.125 1.125 0 01-1.125-1.125V3.375c0-.621.504-1.125 1.125-1.125h3.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125m-3.5 0h3.5m-3.5 0a1.125 1.125 0 01-1.125-1.125V3.375c0-.621.504-1.125 1.125-1.125h3.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125m-3.5 0h3.5m-3.5 0a.75.75 0 00-.75.75v11.25c0 .414.336.75.75.75h3.5a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-3.5z" />
    </svg>
);


interface ChemicalWeaponPanelProps {
  alerts: ChemicalWeaponSignal[];
  onAlertClick: (alert: ChemicalWeaponSignal) => void;
  dataSource: string;
}

const ChemicalWeaponPanel: React.FC<ChemicalWeaponPanelProps> = ({ alerts, onAlertClick, dataSource }) => {
  
  const getStatusColor = (status: 'Confirmed' | 'Trending') => {
    return status === 'Confirmed' ? 'text-red-400' : 'text-orange-400';
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <FlaskIcon className="w-5 h-5 mr-2 text-yellow-300" />
        Chemical Agent Surveillance
      </h3>
       {alerts && alerts.length > 0 ? (
          <div className="space-y-3 text-sm text-gray-400">
            {alerts.map((alert, index) => {
              const isConfirmed = alert.status === 'Confirmed';
              return (
                <div 
                  key={index} 
                  className={`p-3 bg-brand-dark rounded-md border transition-all duration-200 hover:border-brand-accent hover:shadow-md cursor-pointer ${isConfirmed ? 'border-red-500/70 animate-pulse' : 'border-brand-light-blue'}`}
                  style={isConfirmed ? {animationDuration: '2s'} : {}}
                  onClick={() => onAlertClick(alert)}
                  aria-label={`View details for ${alert.agent} signal`}
                  role="button"
                >
                  <p className="font-semibold text-white">{alert.agent}</p>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span>Location: {alert.location}</span>
                    <span className={`${getStatusColor(alert.status)} font-bold`}>
                      {alert.concentration} ppb ({alert.status})
                    </span>
                  </div>
                </div>
              )
            })}
            <p className="text-xs text-center pt-2 text-gray-500">Click a signal for detailed analysis.</p>
          </div>
        ) : (
           <div className="text-center text-gray-500 text-sm py-8">
            No chemical signals detected.
          </div>
        )}
      <div className="mt-4 pt-3 border-t border-brand-light-blue/30 flex items-center text-xs text-gray-500">
          <CircleStackIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{dataSource}</span>
      </div>
    </div>
  );
};

export default ChemicalWeaponPanel;
