

import React from 'react';
import { ExclamationTriangleIcon, CircleStackIcon } from '@heroicons/react/24/solid';
import { DisasterAlert } from '../types';
import { InfoTooltip } from './shared/common';

interface DisasterResponsePanelProps {
  alerts: DisasterAlert[];
  onAlertClick: (alert: DisasterAlert) => void;
  dataSource: string;
  dataSourceTooltip?: string;
  onViewLayer?: () => void;
}

const DisasterResponsePanel: React.FC<DisasterResponsePanelProps> = ({ alerts, onAlertClick, dataSource, dataSourceTooltip, onViewLayer }) => {

  const getSeverityColor = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'Catastrophic': return 'text-red-400';
      case 'Major': return 'text-orange-400';
      case 'Moderate': return 'text-yellow-400';
    }
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-orange-400" />
        Natural Disasters & Health Risks
      </h3>
      <div className="flex-grow">
        {alerts && alerts.length > 0 ? (
          <div className="space-y-3 text-sm text-gray-400">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className="p-3 bg-brand-dark rounded-md border border-brand-light-blue transition-all duration-200 hover:border-brand-accent hover:shadow-md cursor-pointer"
                onClick={() => onAlertClick(alert)}
                aria-label={`View details for ${alert.disasterType} alert`}
                role="button"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-white">{alert.disasterType} Event</p>
                  <span className={`${getSeverityColor(alert.severity)} font-bold text-xs`}>{alert.severity}</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">Location: {alert.location}</p>
                <p className="text-xs text-gray-400 mt-2">
                  <span className="font-semibold">Associated Disease Risks:</span> {alert.associatedDiseaseRisks.join(', ')}
                </p>
              </div>
            ))}
            <p className="text-xs text-center pt-2 text-gray-500">Click an event for a detailed response plan.</p>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm py-8">
              No active disaster-related health alerts.
            </div>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-brand-light-blue/30">
        {onViewLayer && (
            <button
                onClick={onViewLayer}
                className="w-full bg-brand-light-blue/50 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors text-sm mb-3"
            >
                View National Grid &rarr;
            </button>
        )}
        <div className="flex items-center text-xs text-gray-500">
            <CircleStackIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{dataSource}</span>
            {dataSourceTooltip && <div className="ml-1.5"><InfoTooltip text={dataSourceTooltip} /></div>}
        </div>
      </div>
    </div>
  );
};

export default DisasterResponsePanel;