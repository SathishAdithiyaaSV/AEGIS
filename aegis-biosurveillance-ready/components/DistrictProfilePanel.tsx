import React from 'react';
import { UsersIcon, GlobeAsiaAustraliaIcon, CloudIcon, BuildingOfficeIcon, ShieldCheckIcon, BugAntIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { DistrictProfile } from '../types';

interface DistrictProfilePanelProps {
  profile: DistrictProfile;
}

const DistrictProfilePanel: React.FC<DistrictProfilePanelProps> = ({ profile }) => {
    
  const getEffectivenessPill = (status: 'High' | 'Moderate' | 'Low') => {
    switch (status) {
      case 'High':
        return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">High</span>;
      case 'Moderate':
        return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Moderate</span>;
      case 'Low':
        return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Low</span>;
    }
  };

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
      <h3 className="text-md font-semibold text-white mb-4">District Profile</h3>
      <div className="space-y-4 text-sm">
        <div className="flex items-center">
          <UsersIcon className="w-5 h-5 mr-3 text-gray-400" />
          <div>
            <p className="font-semibold text-white">{profile.population}</p>
            <p className="text-xs text-gray-500">Population</p>
          </div>
        </div>
        <div className="flex items-start">
          <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
          <div>
            <p className="font-semibold text-white">{profile.geography}</p>
            <p className="text-xs text-gray-500">Geography</p>
          </div>
        </div>

        <div className="border-t border-brand-light-blue/50 my-2"></div>

        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
                <BuildingOfficeIcon className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                    <p className="font-semibold text-white">{profile.hospitals}</p>
                    <p className="text-xs text-gray-500">Hospitals</p>
                </div>
            </div>
             <div className="flex items-center">
                <ShieldCheckIcon className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                    {getEffectivenessPill(profile.healthcareEffectiveness)}
                    <p className="text-xs text-gray-500">System Effectiveness</p>
                </div>
            </div>
             <div className="flex items-center">
                <CloudIcon className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                    <p className="font-semibold text-white">{profile.climaticZones}</p>
                    <p className="text-xs text-gray-500">Climatic Zones</p>
                </div>
            </div>
        </div>
        
        <div className="border-t border-brand-light-blue/50 my-2"></div>

        <div className="flex items-start">
          <BugAntIcon className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
          <div>
            <p className="font-semibold text-white">{profile.prevalentDiseases.join(', ')}</p>
            <p className="text-xs text-gray-500">Prevalent Human Diseases</p>
          </div>
        </div>
         <div className="flex items-start">
          <BeakerIcon className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
          <div>
            <p className="font-semibold text-white">{profile.ecologicalFactors.join(', ')}</p>
            <p className="text-xs text-gray-500">Key Ecological Factors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictProfilePanel;
