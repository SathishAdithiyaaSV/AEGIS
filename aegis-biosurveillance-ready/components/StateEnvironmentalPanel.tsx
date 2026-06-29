import React from 'react';
import { BeakerIcon, CloudIcon, EyeDropperIcon } from '@heroicons/react/24/solid';
import { EnvironmentalAlert } from '../types';

// Placeholder for a Water icon if not available from a library
const WaterDropIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 2.456 1.03 4.81 2.93 6.645a.75.75 0 101.04-1.08A8.25 8.25 0 013.75 12c0-4.557 3.693-8.25 8.25-8.25s8.25 3.693 8.25 8.25a8.25 8.25 0 01-2.43 5.565.75.75 0 101.04 1.08A9.753 9.753 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75z" />
    <path d="M12 21a8.217 8.217 0 01-4.133-1.09.75.75 0 10-.734 1.28A9.717 9.717 0 0012 22.5a9.717 9.717 0 004.867-1.31.75.75 0 10-.734-1.28A8.217 8.217 0 0112 21z" />
  </svg>
);


interface StateEnvironmentalPanelProps {
  alerts: EnvironmentalAlert[];
}

const StateEnvironmentalPanel: React.FC<StateEnvironmentalPanelProps> = ({ alerts }) => {
  
  const getStatusAppearance = (status: 'Confirmed' | 'Trending') => {
    return status === 'Confirmed' 
      ? { pill: 'bg-red-500/10 text-red-400', border: 'border-red-500' }
      : { pill: 'bg-orange-500/10 text-orange-400', border: 'border-orange-500' };
  }

  const getSourceIcon = (sourceType: EnvironmentalAlert['sourceType']) => {
      if (sourceType === 'Wastewater') {
          return <BeakerIcon className="w-4 h-4 mr-2 text-gray-400" />
      }
      if (sourceType === 'Floodwater') {
          return <WaterDropIcon className="w-4 h-4 mr-2 text-gray-400" />
      }
      if (sourceType === 'Zoonotic Wastewater') {
        return <EyeDropperIcon className="w-4 h-4 mr-2 text-purple-400" />
      }
      return <CloudIcon className="w-4 h-4 mr-2 text-gray-400" />
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <BeakerIcon className="w-5 h-5 mr-2 text-green-400" />
        Environmental & Water Surveillance
      </h3>
       {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const appearance = getStatusAppearance(alert.status);
              const signalStrength = alert.signalStrength ?? 0;
              return (
              <div 
                key={index} 
                className={`p-3 bg-brand-dark rounded-md border-l-4 ${appearance.border}`}
              >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-white flex items-center">{getSourceIcon(alert.sourceType)} {alert.name}</p>
                        <p className="text-xs text-gray-400 mt-1 ml-6">{alert.location}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${appearance.pill} flex-shrink-0`}>
                        {alert.status}
                    </span>
                </div>
                {alert.status === 'Trending' && (
                    <div className="mt-2 ml-6">
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="text-xs text-gray-400">Signal Strength</p>
                            <p className="text-sm font-bold text-orange-400">+{signalStrength}%</p>
                        </div>
                        <div className="w-full bg-brand-light-blue/30 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.min(signalStrength / 2, 100)}%` }}></div>
                        </div>
                    </div>
                )}
              </div>
            )})}
          </div>
        ) : (
           <div className="text-center text-gray-500 text-sm py-8">
            No environmental signals detected at state level.
          </div>
        )}
    </div>
  );
};

export default StateEnvironmentalPanel;
