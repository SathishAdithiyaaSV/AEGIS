import React from 'react';
import { BugAntIcon } from '@heroicons/react/24/solid';
import { ZoonoticAlert, RiskLevel } from '../types';

interface StateZoonoticPanelProps {
  alerts: ZoonoticAlert[];
}

const RISK_SCORE_MAP: Record<RiskLevel, number> = {
  'Critical': 100,
  'High': 80,
  'Moderate': 50,
  'Low': 20,
  'None': 0,
};

const StateZoonoticPanel: React.FC<StateZoonoticPanelProps> = ({ alerts }) => {

  const getRiskAppearance = (risk: RiskLevel) => {
    switch (risk) {
      case 'Critical': return { pill: 'bg-red-500/10 text-red-400', border: 'border-red-500' };
      case 'High': return { pill: 'bg-orange-500/10 text-orange-400', border: 'border-orange-500' };
      case 'Moderate': return { pill: 'bg-yellow-500/10 text-yellow-400', border: 'border-yellow-500' };
      default: return { pill: 'bg-blue-500/10 text-blue-400', border: 'border-blue-500' };
    }
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <BugAntIcon className="w-5 h-5 mr-2 text-yellow-400" />
        Zoonotic Surveillance
      </h3>
      {alerts.length > 0 ? (
        <div className="space-y-3 text-sm text-gray-400">
          {alerts.map((alert, index) => {
            const appearance = getRiskAppearance(alert.risk);
            const score = RISK_SCORE_MAP[alert.risk];
            return (
                <div 
                  key={index} 
                  className={`p-3 bg-brand-dark rounded-md border-l-4 ${appearance.border}`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-white">{alert.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${appearance.pill}`}>{alert.risk}</span>
                  </div>
                  <div className="text-xs mt-2 space-y-1 text-gray-400">
                    <p><strong>Hotspot:</strong> {alert.location}</p>
                    <p><strong>Primary Vector/Source:</strong> {alert.primaryVector}</p>
                    <p><strong>Risk Score:</strong> <span className={`font-bold ${appearance.pill.split(' ')[1]}`}>{score} / 100</span></p>
                  </div>
                </div>
            )
          })}
        </div>
      ) : (
         <div className="text-center text-gray-500 text-sm py-8">
            No active state-level zoonotic alerts.
          </div>
      )}
    </div>
  );
};

export default StateZoonoticPanel;
