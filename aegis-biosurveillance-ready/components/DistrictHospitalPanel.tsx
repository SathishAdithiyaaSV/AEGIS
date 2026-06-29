import React from 'react';
import { BuildingLibraryIcon } from '@heroicons/react/24/solid';
import { DistrictHospitalData, HealthcareWorkerStatus } from '../types';

const ProgressBar: React.FC<{ value: number; label: string }> = ({ value, label }) => {
    const getColor = (val: number) => {
        if (val > 90) return 'bg-red-500';
        if (val > 75) return 'bg-orange-500';
        if (val > 60) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <p className="text-sm font-medium text-gray-300">{label}</p>
                <p className={`text-sm font-bold ${getColor(value).replace('bg-', 'text-')}`}>{value}%</p>
            </div>
            <div className="w-full bg-brand-dark rounded-full h-2.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${getColor(value)}`}
                  style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};

const getWorkerStatusPill = (status: HealthcareWorkerStatus) => {
    switch (status) {
      case 'Adequate':
        return <div className="text-sm font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-center">Adequate</div>;
      case 'Strained':
        return <div className="text-sm font-medium text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full text-center">Strained</div>;
      case 'Overwhelmed':
        return <div className="text-sm font-medium text-red-400 bg-red-500/10 px-3 py-1 rounded-full text-center">Overwhelmed</div>;
    }
};

const DistrictHospitalPanel: React.FC<{ hospitalData: DistrictHospitalData }> = ({ hospitalData }) => {
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <BuildingLibraryIcon className="w-5 h-5 mr-2 text-gray-400" />
        Healthcare System Status
      </h3>
      <div className="space-y-4">
        <ProgressBar value={hospitalData.bedOccupancy} label="General Bed Occupancy" />
        <ProgressBar value={hospitalData.icuOccupancy} label="ICU Bed Occupancy" />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
                <p className="text-xs text-gray-400 mb-1">Ventilators Available</p>
                <p className="text-2xl font-bold text-white">{hospitalData.ventilatorAvailability}%</p>
            </div>
             <div>
                <p className="text-xs text-gray-400 mb-1">Staff Status</p>
                {getWorkerStatusPill(hospitalData.staffStatus)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictHospitalPanel;
