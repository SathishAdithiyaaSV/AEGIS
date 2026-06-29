import React from 'react';
import { ShieldExclamationIcon, CodeBracketSquareIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { OdinSignal } from '../../types';

interface ThreatSentinelPanelProps {
  signals: OdinSignal[];
  onSignalSelect: (signal: OdinSignal) => void;
  onInitiateSimulation: (signal: OdinSignal) => void;
}

const getSignalAppearance = (signal: OdinSignal) => {
    switch (signal.threatLevel) {
        case 'Critical':
            return {
                icon: <ShieldExclamationIcon className="w-5 h-5 text-red-400" />,
                borderColor: 'border-red-500/80',
                bgColor: 'bg-red-900/40',
                hoverBgColor: 'hover:bg-red-900/60',
            };
        case 'High':
            return {
                icon: <ShieldExclamationIcon className="w-5 h-5 text-orange-400" />,
                borderColor: 'border-orange-500/80',
                bgColor: 'bg-orange-900/40',
                hoverBgColor: 'hover:bg-orange-900/60',
            };
        default:
            return {
                icon: <ShieldExclamationIcon className="w-5 h-5 text-yellow-400" />,
                borderColor: 'border-yellow-500/80',
                bgColor: 'bg-yellow-900/40',
                hoverBgColor: 'hover:bg-yellow-900/60',
            };
    }
};

const getSourceIcon = (source: OdinSignal['source']) => {
    switch(source) {
        case 'Dark Web Intel':
            return <CodeBracketSquareIcon className="w-4 h-4 mr-1.5 text-gray-400" />;
        case 'Anomalous DNA Synthesis Order':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 text-gray-400"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z" /><path fillRule="evenodd" d="M16.667 3.422a.75.75 0 01.666.852l-1.334 6.667a.75.75 0 01-1.49-.068l1.333-6.667a.75.75 0 01.825-.784zM3.422 16.667a.75.75 0 01-.852-.666l1.334-6.667a.75.75 0 011.49.068L4.088 16.18a.75.75 0 01-.666.487z" clipRule="evenodd" /></svg>;
        case 'Preprint Server Anomaly':
            return <DocumentTextIcon className="w-4 h-4 mr-1.5 text-gray-400" />;
    }
}


const ThreatSentinelPanel: React.FC<ThreatSentinelPanelProps> = ({ signals, onSignalSelect, onInitiateSimulation }) => {
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
      <h3 className="text-md font-semibold text-white mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-brand-accent">
            <path d="M12 1.5a.75.75 0 01.75.75V3a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM18.75 6a.75.75 0 00-1.06-1.06L16.6 6.04a.75.75 0 001.06 1.06L18.75 6zM21.75 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM16.6 17.96a.75.75 0 00-1.06 1.06L18.75 18a.75.75 0 001.06-1.06L16.6 17.96zM12 18.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM5.32 17.96a.75.75 0 001.06 1.06L7.44 18a.75.75 0 00-1.06-1.06L5.32 17.96zM3 12a.75.75 0 01.75-.75h1.5A.75.75 0 016 12a.75.75 0 01-.75.75h-1.5A.75.75 0 013 12zM7.44 6.04a.75.75 0 00-1.06-1.06L5.32 6a.75.75 0 001.06 1.06L7.44 6.04z" />
            <path fillRule="evenodd" d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clipRule="evenodd" />
        </svg>
        Synthetic Biology Threat Sentinel
      </h3>
      <div className="space-y-3">
        {signals.map(signal => {
            const { icon, borderColor, bgColor, hoverBgColor } = getSignalAppearance(signal);
            return (
                <div 
                    key={signal.id} 
                    className={`p-3 rounded-lg border-l-4 transition-all duration-200 ${borderColor} ${bgColor}`}
                >
                    <div className={`cursor-pointer ${hoverBgColor} p-2 -m-2 rounded-md`} onClick={() => onSignalSelect(signal)}>
                        <div className="flex justify-between items-start">
                            <p className="font-semibold text-white text-sm">{signal.title}</p>
                            <div className="flex-shrink-0 ml-2">{icon}</div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                            <span className="flex items-center">{getSourceIcon(signal.source)}{signal.source}</span>
                            <span>{signal.timestamp}</span>
                        </div>
                    </div>
                    {signal.canSimulatePlume && (
                        <div className="mt-3 pt-3 border-t border-brand-light-blue/50">
                            <button 
                                onClick={() => onInitiateSimulation(signal)}
                                className="w-full bg-brand-accent/20 text-brand-accent font-semibold py-2 px-3 rounded-md hover:bg-brand-accent/40 transition-colors flex items-center justify-center text-sm"
                            >
                                <BeakerIcon className="w-4 h-4 mr-2" />
                                Initiate Plume Simulation
                            </button>
                        </div>
                    )}
                </div>
            )
        })}
      </div>
       <p className="text-center text-xs text-gray-500 mt-4">
        Click a signal to initiate Chimera genomic attribution protocol.
      </p>
    </div>
  );
};

export default ThreatSentinelPanel;