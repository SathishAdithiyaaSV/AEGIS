import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon, CheckCircleIcon, UserGroupIcon, CubeIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { EscalatedAlert, ReadinessStatus } from '../types';
import { getReadinessData } from '../data/readinessData';

interface MonitoringPanelProps {
  currentLevel: 'District' | 'State' | 'National';
  activeAlert: EscalatedAlert;
  onResolve: () => void;
}

const ReadinessCard: React.FC<{ item: ReadinessStatus }> = ({ item }) => {
    const getStatusPill = (status: ReadinessStatus['status']) => {
        switch (status) {
        case 'Ready':
            return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Ready</span>;
        case 'Standby':
            return <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Standby</span>;
        case 'Mobilizing':
            return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Mobilizing</span>;
        case 'Engaged':
            return <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">Engaged</span>;
        }
    }
    
    return (
        <div className="bg-brand-dark p-3 rounded-lg border border-brand-light-blue/50">
            <div className="flex justify-between items-start">
                <h4 className="font-semibold text-white text-sm">{item.organization}</h4>
                {getStatusPill(item.status)}
            </div>
            <div className="mt-2 space-y-2 text-xs text-gray-400">
                <div className="flex items-start">
                    <UserGroupIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item.personnel}</span>
                </div>
                <div className="flex items-start">
                    <CubeIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item.equipment}</span>
                </div>
            </div>
             <p className="text-right text-xs text-gray-500 mt-2">Updated: {item.updateTime}</p>
        </div>
    );
};


const MonitoringPanel: React.FC<MonitoringPanelProps> = ({ currentLevel, activeAlert, onResolve }) => {
  const [readiness, setReadiness] = useState<ReadinessStatus[]>([]);
  
  useEffect(() => {
    let locationKey = '';
    if (currentLevel === 'State') {
        locationKey = activeAlert.from.split(' ')[0];
    } else if (currentLevel === 'District') {
        locationKey = activeAlert.from;
    }
    const data = getReadinessData(currentLevel, locationKey);
    setReadiness(data);
  }, [currentLevel, activeAlert]);

  return (
    <div className="bg-brand-light-blue/20 border-2 border-brand-accent rounded-lg p-4 shadow-lg animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-bold text-brand-accent mb-2 flex items-center">
            <InformationCircleIcon className="w-5 h-5 mr-2" />
            Monitoring Acknowledged Alert
        </h3>
        <button
          onClick={onResolve}
          className="bg-brand-accent/80 text-white font-semibold py-1.5 px-3 rounded-md hover:bg-brand-accent transition-colors flex items-center justify-center text-sm"
        >
          <CheckCircleIcon className="w-4 h-4 mr-2" />
          Resolve Alert
        </button>
      </div>

      <div className="bg-brand-dark/50 p-3 my-3 rounded-md">
        <p className="font-semibold text-sm text-white">{activeAlert.alert.title}</p>
        <p className="text-xs text-gray-300">{activeAlert.alert.location}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {readiness.map(item => <ReadinessCard key={item.organization} item={item} />)}
      </div>
    </div>
  );
};

export default MonitoringPanel;