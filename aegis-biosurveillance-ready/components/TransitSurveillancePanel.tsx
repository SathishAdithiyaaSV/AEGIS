import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { TransitAlert } from '../types';

interface TransitSurveillancePanelProps {
  alerts: TransitAlert[];
  onAlertClick: (alert: TransitAlert) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
    case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'Moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Resolved': return 'bg-green-500/20 text-green-400 border-green-500/50';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const TransitSurveillancePanel: React.FC<TransitSurveillancePanelProps> = ({ alerts, onAlertClick }) => {
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg flex flex-col h-full animate-fadeIn group hover:border-brand-accent transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-brand-light-blue/20 flex items-center justify-center mr-3 group-hover:bg-brand-accent/20 transition-colors">
            <PaperAirplaneIcon className="w-6 h-6 text-brand-accent transform -rotate-45" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">Transit & Border</h3>
            <p className="text-xs text-gray-400 mt-1">Source: ICA, MOH (Changi, Checkpoints, Seaports)</p>
          </div>
        </div>
      </div>

      <div className="flex-grow space-y-4 mt-2">
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No active transit alerts.</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id}
              onClick={() => onAlertClick(alert)}
              className="bg-brand-darkest-blue rounded-md p-4 cursor-pointer hover:bg-brand-light-blue/10 transition-colors border border-transparent hover:border-brand-accent/30 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-white">{alert.node}</p>
                <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs text-gray-400">{alert.flightOrVessel}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{alert.anomalyType}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full border text-xs font-semibold ${getStatusColor(alert.status)}`}>
                {alert.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransitSurveillancePanel;
