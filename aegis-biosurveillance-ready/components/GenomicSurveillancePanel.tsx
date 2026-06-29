import React from 'react';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { GenomicSignal } from '../types';
import { InfoTooltip } from './shared/common';

const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

interface GenomicSurveillancePanelProps {
  alerts: GenomicSignal[];
  onAlertClick: (alert: GenomicSignal) => void;
  dataSource: string;
  dataSourceTooltip?: string;
  onViewLayer?: () => void;
}

const GenomicSurveillancePanel: React.FC<GenomicSurveillancePanelProps> = ({ alerts, onAlertClick, dataSource, dataSourceTooltip, onViewLayer }) => {

  const getSignificanceColor = (significance: GenomicSignal['significance']) => {
    switch (significance) {
      case 'Vaccine Escape':
      case 'Increased Severity':
        return 'text-red-400';
      case 'Increased Transmissibility':
        return 'text-orange-400';
      case 'Novel Reassortment':
        return 'text-purple-400';
      default:
        return 'text-yellow-400';
    }
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <DnaIcon className="w-5 h-5 mr-2 text-purple-400" />
        Genomic Surveillance
      </h3>
      <div className="flex-grow">
        {alerts && alerts.length > 0 ? (
          <div className="space-y-3 text-sm text-gray-400">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="p-3 bg-brand-dark rounded-md border border-brand-light-blue transition-all duration-200 hover:border-brand-accent hover:shadow-md cursor-pointer"
                onClick={() => onAlertClick(alert)}
                aria-label={`View details for ${alert.strainName} signal`}
                role="button"
              >
                <p className="font-semibold text-white">{alert.strainName}</p>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span>Hotspot: {alert.location}</span>
                  <span className={`${getSignificanceColor(alert.significance)} font-bold`}>{alert.significance}</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-center pt-2 text-gray-500">Click a signal for a detailed analysis.</p>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm py-8">
              No significant genomic signals detected.
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

export default GenomicSurveillancePanel;