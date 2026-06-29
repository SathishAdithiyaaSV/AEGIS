import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { SurveillanceType, StateData } from '../../types';
import MapChart from '../MapChart';
import { INDIA_STATE_PATHS } from '../../data/constants';
import { SINGAPORE_REGION_PATHS } from '../constants';
import { surveillanceMapData } from '../../data/surveillanceData';
import { surveillanceMapDataSingapore } from '../../data/surveillanceDataSingapore';
import StateSurveillanceDetail from './StateSurveillanceDetail';

interface SurveillanceMapViewProps {
  type: SurveillanceType;
  onBack: () => void;
  country?: string;
}

// FIX: Added 'pest_crop' to the record to satisfy the SurveillanceType.
const surveillanceTitles: Record<SurveillanceType, string> = {
    livestock: "National Livestock Surveillance Grid",
    zoonotic: "National Zoonotic Surveillance Grid",
    environmental: "National Environmental Surveillance Grid",
    wildlife: "National Wildlife Surveillance Grid",
    disaster: "National Disaster Preparedness Grid",
    genomic: "National Genomic Surveillance Grid",
    pest_crop: "National Pest & Crop Surveillance Grid",
};


const SurveillanceMapView: React.FC<SurveillanceMapViewProps> = ({ type, onBack, country = 'India' }) => {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  const isSingapore = country === 'Singapore';
  const title = (isSingapore ? "Singapore " : "National ") + surveillanceTitles[type].replace("National ", "");
  
  const mapData = useMemo(() => {
      if (isSingapore) {
          return surveillanceMapDataSingapore[type] || [];
      }
      return surveillanceMapData[type] || [];
  }, [type, isSingapore]);

  const mapPaths = isSingapore ? SINGAPORE_REGION_PATHS : INDIA_STATE_PATHS;

  const handleStateSelect = (stateId: string) => {
    setSelectedStateId(stateId);
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
       {/* Header */}
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
                {title}
            </h1>
            <button
                onClick={onBack}
                className="bg-brand-light-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors flex items-center"
            >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Main Dashboard
            </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MapChart
                title={isSingapore ? "Region-wise Risk Index (Click for Details)" : "State-wise Risk Index (Click for Details)"}
                data={mapData}
                paths={mapPaths}
                onStateClick={handleStateSelect}
            />
            
            <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
                {selectedStateId ? (
                    <StateSurveillanceDetail type={type} stateId={selectedStateId} country={country} />
                ) : (
                    <div className="h-full flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-brand-light-blue/20 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">{isSingapore ? "Select a Region" : "Select a State"}</h3>
                        <p className="text-gray-400 mt-1">Click on a {isSingapore ? "region" : "state"} in the map to view detailed, grassroots-level surveillance data.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default SurveillanceMapView;
