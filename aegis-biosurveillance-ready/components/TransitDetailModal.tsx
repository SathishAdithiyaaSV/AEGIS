import React from 'react';
import { XMarkIcon, ExclamationTriangleIcon, AcademicCapIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { TransitAlert } from '../types';

interface TransitDetailModalProps {
  alert: TransitAlert;
  onClose: () => void;
}

const TransitDetailModal: React.FC<TransitDetailModalProps> = ({ alert, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-brand-darkest-blue border border-brand-light-blue rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-brand-light-blue/30 bg-gradient-to-r from-brand-dark-blue to-brand-darkest-blue">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/50">
                <ExclamationTriangleIcon className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">{alert.node} Incident</h2>
              <div className="flex items-center mt-1 space-x-3">
                 <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider
                    ${alert.status === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 
                      alert.status === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'} border`}
                  >
                    {alert.status}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {alert.node}
                  </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-brand-dark-blue p-2 rounded-full hover:bg-brand-light-blue/20"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow space-y-6">
            
            {/* Key Info Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-dark-blue rounded-lg p-4 border border-brand-light-blue/20">
                    <p className="text-sm text-gray-400">Carrier / Node Identifier</p>
                    <p className="text-lg font-semibold text-white mt-1">{alert.flightOrVessel}</p>
                </div>
                 <div className="bg-brand-dark-blue rounded-lg p-4 border border-brand-light-blue/20">
                    <p className="text-sm text-gray-400">Anomaly Type</p>
                    <p className="text-lg font-semibold text-brand-accent mt-1">{alert.anomalyType}</p>
                </div>
            </div>

          {/* Details Section */}
          <div className="space-y-4">
              <div className="bg-brand-dark-blue/50 rounded-lg p-5 border border-brand-light-blue/10">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Detection Details</h3>
                  <p className="text-gray-200 leading-relaxed text-sm">
                    {alert.details}
                  </p>
              </div>

               <div className="bg-brand-dark-blue/50 rounded-lg p-5 border border-brand-light-blue/10">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Immediate Action Taken</h3>
                  <p className="text-gray-200 leading-relaxed text-sm">
                    {alert.actionTaken}
                  </p>
              </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-gradient-to-br from-brand-accent/10 to-brand-light-blue/5 rounded-lg p-5 border border-brand-accent/20 flex items-start">
              <AcademicCapIcon className="w-6 h-6 text-brand-accent mt-1 mr-3 flex-shrink-0" />
              <div>
                  <h4 className="font-bold text-white mb-2">AI Agent Assessment</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                      Given Singapore's status as a high-density transit hub, anomalies at {alert.node} require immediate multi-agency response. 
                      Cross-referencing {alert.anomalyType} patterns with global outbreak databases suggests a high probability of localized introduction. 
                      Recommend tightening border health declarations and deploying targeted sequencing for positive samples.
                  </p>
              </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-brand-dark-blue p-4 border-t border-brand-light-blue/30 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-brand-light-blue text-white font-semibold rounded-md hover:bg-brand-accent transition-colors"
            >
                Acknowledge & Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default TransitDetailModal;
