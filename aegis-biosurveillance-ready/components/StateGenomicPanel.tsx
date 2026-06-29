import React from 'react';
import { GenomicSignal } from '../types';

const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

interface StateGenomicPanelProps {
  alerts: GenomicSignal[];
}

const StateGenomicPanel: React.FC<StateGenomicPanelProps> = ({ alerts }) => {

  const getSignificanceAppearance = (significance: GenomicSignal['significance']) => {
    switch (significance) {
      case 'Vaccine Escape':
      case 'Increased Severity':
        return { pill: 'bg-red-500/10 text-red-400', border: 'border-red-500' };
      case 'Increased Transmissibility':
        return { pill: 'bg-orange-500/10 text-orange-400', border: 'border-orange-500' };
      case 'Novel Reassortment':
        return { pill: 'bg-purple-500/10 text-purple-400', border: 'border-purple-500' };
      default:
        return { pill: 'bg-yellow-500/10 text-yellow-400', border: 'border-yellow-500' };
    }
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <DnaIcon className="w-5 h-5 mr-2 text-purple-400" />
        Genomic Signals of Concern
      </h3>
      {alerts.length > 0 ? (
        <div className="space-y-3 text-sm text-gray-400">
          {alerts.map((alert) => {
            const appearance = getSignificanceAppearance(alert.significance);
            return (
                <div 
                  key={alert.id} 
                  className={`p-3 bg-brand-dark rounded-md border-l-4 ${appearance.border}`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-white">{alert.strainName}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${appearance.pill}`}>{alert.significance}</span>
                  </div>
                  <div className="text-xs mt-2 space-y-1 text-gray-400">
                    <p><strong>Hotspot:</strong> {alert.location}</p>
                    <p><strong>Summary:</strong> {alert.summary}</p>
                  </div>
                </div>
            )
          })}
        </div>
      ) : (
         <div className="text-center text-gray-500 text-sm py-8">
            No active state-level genomic signals.
          </div>
      )}
    </div>
  );
};

export default StateGenomicPanel;
