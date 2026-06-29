import React from 'react';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { PestInfestationAlert, CropDiseaseAlert } from '../types';
import { InfoTooltip } from './shared/common';

const LocustIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM21.75 12c0 .934-.146 1.842-.423 2.693l-1.458-1.458A5.985 5.985 0 0018 12c0-3.314-2.686-6-6-6-1.52 0-2.903.568-3.958 1.502L6.307 5.543A9.01 9.01 0 0112 3c4.97 0 9 4.03 9 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.053 13.042C2.396 14.015 2 15.19 2 16.5c0 1.933.784 3.682 2.05 4.95.285.285.626.527.986.738l.849-3.396a14.377 14.377 0 01-1.826-1.905" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

interface PestCropSurveillancePanelProps {
  pestAlerts: PestInfestationAlert[];
  cropAlerts: CropDiseaseAlert[];
  onAlertClick: (alert: PestInfestationAlert | CropDiseaseAlert) => void;
  onViewLayer?: () => void;
}

const PestCropSurveillancePanel: React.FC<PestCropSurveillancePanelProps> = ({ pestAlerts, cropAlerts, onAlertClick, onViewLayer }) => {

  const getSeverityColor = (severity: 'High' | 'Moderate' | 'Low') => {
    switch (severity) {
      case 'High': return 'text-red-400 border-red-500';
      case 'Moderate': return 'text-yellow-400 border-yellow-500';
      default: return 'text-blue-400 border-blue-500';
    }
  }

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <LocustIcon className="w-5 h-5 mr-2 text-green-400" />
        Pest & Crop Disease Surveillance
      </h3>
      <div className="flex-grow overflow-y-auto max-h-60 pr-1 space-y-4">
        <div>
            <h4 className="text-sm font-semibold text-white mb-2">Pest Infestations</h4>
            <div className="space-y-2">
            {pestAlerts.map((alert, index) => (
              <div 
                key={`pest-${index}`} 
                className={`p-3 bg-brand-dark rounded-md border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${getSeverityColor(alert.severity).split(' ')[1]}`}
                onClick={() => onAlertClick(alert)}
              >
                <p className="font-semibold text-white">{alert.pest} <span className="text-gray-400 font-normal">on {alert.cropType}</span></p>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className={`${getSeverityColor(alert.severity).split(' ')[0]} font-bold`}>Severity: {alert.severity}</span>
                  <span>Impact: {alert.economicImpact}</span>
                </div>
              </div>
            ))}
            </div>
        </div>
         <div>
            <h4 className="text-sm font-semibold text-white mb-2">Crop Diseases</h4>
            <div className="space-y-2">
            {cropAlerts.map((alert, index) => (
              <div 
                key={`crop-${index}`} 
                className={`p-3 bg-brand-dark rounded-md border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${getSeverityColor(alert.threatLevel).split(' ')[1]}`}
                onClick={() => onAlertClick(alert)}
              >
                <p className="font-semibold text-white">{alert.disease} <span className="text-gray-400 font-normal">on {alert.cropType}</span></p>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className={`${getSeverityColor(alert.threatLevel).split(' ')[0]} font-bold`}>Threat: {alert.threatLevel}</span>
                  <span>Yield Loss: ~{alert.potentialYieldLoss}%</span>
                </div>
              </div>
            ))}
            </div>
        </div>
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
            <span>Source: Dept. of Agriculture, ICAR</span>
            <div className="ml-1.5"><InfoTooltip text="Data from the Indian Council of Agricultural Research and state agricultural departments." /></div>
        </div>
      </div>
    </div>
  );
};

export default PestCropSurveillancePanel;
