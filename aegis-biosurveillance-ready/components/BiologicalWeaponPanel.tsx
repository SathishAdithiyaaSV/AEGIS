import React from 'react';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { BiologicalWeaponSignal } from '../types';

const BiohazardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);


interface BiologicalWeaponPanelProps {
  alerts: BiologicalWeaponSignal[];
  onAlertClick: (alert: BiologicalWeaponSignal) => void;
  dataSource: string;
}

const BiologicalWeaponPanel: React.FC<BiologicalWeaponPanelProps> = ({ alerts, onAlertClick, dataSource }) => {
  
  const getStatusColor = (status: 'Confirmed' | 'Trending') => {
    return status === 'Confirmed' ? 'text-red-400' : 'text-orange-400';
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <BiohazardIcon className="w-5 h-5 mr-2 text-red-500" />
        Biological Agent Surveillance
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
                      {alert.status === 'Trending' ? `Signal: +${alert.signalStrength}%` : `Status: ${alert.status}`}
                    </span>
                  </div>
                </div>
              )
            })}
            <p className="text-xs text-center pt-2 text-gray-500">Click a signal for detailed analysis.</p>
          </div>
        ) : (
           <div className="text-center text-gray-500 text-sm py-8">
            No biological signals detected.
          </div>
        )}
      <div className="mt-4 pt-3 border-t border-brand-light-blue/30 flex items-center text-xs text-gray-500">
          <CircleStackIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{dataSource}</span>
      </div>
    </div>
  );
};

export default BiologicalWeaponPanel;