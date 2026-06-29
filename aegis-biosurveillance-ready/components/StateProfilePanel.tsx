import React from 'react';
import { UsersIcon, SunIcon, ShieldCheckIcon, BeakerIcon, BuildingOfficeIcon, UserGroupIcon, AcademicCapIcon, ClipboardDocumentCheckIcon, HeartIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import { StateProfile, HealthcareWorkerStatus } from '../types';

interface StateProfilePanelProps {
  profile: StateProfile;
  dominantStrain: string;
}

const StateProfilePanel: React.FC<StateProfilePanelProps> = ({ profile, dominantStrain }) => {
  const getHygieneColor = (level: number) => {
    if (level > 80) return 'text-green-400';
    if (level > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getWorkerStatusPill = (status: HealthcareWorkerStatus) => {
    switch (status) {
      case 'Adequate':
        return <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Adequate</span>;
      case 'Strained':
        return <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Strained</span>;
      case 'Overwhelmed':
        return <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Overwhelmed</span>;
    }
  };

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
      <h3 className="text-md font-semibold text-white mb-4">State Profile</h3>
      <div className="space-y-4 text-sm">
        
        {/* Core Demographics */}
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
        <div className="flex items-center">
          <SunIcon className="w-5 h-5 mr-3 text-gray-400" />
          <div>
            <p className="font-semibold text-white">{profile.climate}</p>
            <p className="text-xs text-gray-500">Climate</p>
          </div>
        </div>
        <div className="flex items-start">
          <BeakerIcon className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
          <div>
            <p className="font-semibold text-white">{dominantStrain}</p>
            <p className="text-xs text-gray-500">Key Pathogen Strains</p>
          </div>
        </div>

        {/* Healthcare Capacity */}
        {profile.healthcareCapacity && (
            <>
                <div className="border-t border-brand-light-blue/50 my-3"></div>
                <div className="flex items-center">
                    <HeartIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <div className="flex justify-between w-full items-center">
                        <div>
                            <p className="font-semibold text-white">{profile.healthcareCapacity.icuBedsAvailable} ICU Beds / {profile.healthcareCapacity.ventilatorsAvailable} Ventilators</p>
                            <p className="text-xs text-gray-500">Healthcare Capacity</p>
                        </div>
                        {getWorkerStatusPill(profile.healthcareCapacity.healthcareWorkerStatus)}
                    </div>
                </div>
            </>
        )}

        {/* Public Health Response */}
        {profile.publicHealthResponse && (
            <>
                <div className="border-t border-brand-light-blue/50 my-3"></div>
                <div className="flex items-center">
                    <ClipboardDocumentCheckIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                        <p className="font-semibold text-white">{profile.publicHealthResponse.testingRatePer1000}/1k Testing Rate, {profile.publicHealthResponse.contactTracingEfficiency}% Tracing Efficiency</p>
                        <p className="text-xs text-gray-500">Public Health Response</p>
                    </div>
                </div>
            </>
        )}
        
        {/* Socioeconomic Factors */}
        {profile.socioeconomicFactors && (
            <>
                <div className="border-t border-brand-light-blue/50 my-3"></div>
                <div className="flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                        <p className="font-semibold text-white">{profile.socioeconomicFactors.urbanizationLevel}% Urbanization</p>
                        <p className="text-xs text-gray-500">Urbanization Level</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                        <p className="font-semibold text-white">{profile.socioeconomicFactors.literacyRate}% Literacy Rate</p>
                        <p className="text-xs text-gray-500">Literacy & Health Awareness Index</p>
                    </div>
                </div>
            </>
        )}
        
        {/* Hygiene Index */}
        <div className="border-t border-brand-light-blue/50 my-3"></div>
        <div className="flex items-center">
          <ShieldCheckIcon className="w-5 h-5 mr-3 text-gray-400" />
          <div>
            <p className={`font-semibold ${getHygieneColor(profile.hygieneIndex)}`}>{profile.hygieneIndex} / 100</p>
            <p className="text-xs text-gray-500">Community Hygiene Index</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StateProfilePanel;
