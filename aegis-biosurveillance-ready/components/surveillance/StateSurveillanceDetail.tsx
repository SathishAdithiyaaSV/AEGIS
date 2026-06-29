import React from 'react';
import { SurveillanceType, StateData } from '../../types';
import { allSurveillanceData } from '../../data/surveillanceData';
import { allSurveillanceDataSingapore } from '../../data/surveillanceDataSingapore';
import { detailedStateData } from '../../data/stateData';
import StateLivestockDetail from './details/StateLivestockDetail';
import StateZoonoticDetail from './details/StateZoonoticDetail';
import StateEnvironmentalDetail from './details/StateEnvironmentalDetail';
import StateGenomicDetail from './details/StateGenomicDetail';
import StateWildlifeDetail from './details/StateWildlifeDetail';
import StateDisasterDetail from './details/StateDisasterDetail';
import StatePestCropDetail from './details/StatePestCropDetail';

interface StateSurveillanceDetailProps {
  type: SurveillanceType;
  stateId: string;
  country?: string;
}

const REGION_NAMES: Record<string, string> = {
    'CEN': 'Central Region',
    'EAS': 'East Region',
    'NOR': 'North Region',
    'NE': 'North-East Region',
    'WES': 'West Region'
};

const StateSurveillanceDetail: React.FC<StateSurveillanceDetailProps> = ({ type, stateId, country = 'India' }) => {
    const isSingapore = country === 'Singapore';
    const stateName = isSingapore ? (REGION_NAMES[stateId] || stateId) : (detailedStateData[stateId]?.name || stateId);
    const dataStore = isSingapore ? allSurveillanceDataSingapore : allSurveillanceData;

    const renderDetail = () => {
        switch (type) {
            case 'livestock':
                const livestockData = dataStore.livestock[stateId];
                return livestockData ? <StateLivestockDetail data={livestockData} /> : null;
            case 'zoonotic':
                const zoonoticData = dataStore.zoonotic[stateId];
                return zoonoticData ? <StateZoonoticDetail data={zoonoticData} /> : null;
            case 'environmental':
                 const environmentalData = dataStore.environmental[stateId];
                return environmentalData ? <StateEnvironmentalDetail data={environmentalData} /> : null;
            case 'genomic':
                const genomicData = dataStore.genomic[stateId];
                return genomicData ? <StateGenomicDetail data={genomicData} /> : null;
            case 'wildlife':
                const wildlifeData = dataStore.wildlife[stateId];
                return wildlifeData ? <StateWildlifeDetail data={wildlifeData} /> : null;
            case 'disaster':
                const disasterData = dataStore.disaster[stateId];
                return disasterData ? <StateDisasterDetail data={disasterData} /> : null;
            case 'pest_crop':
                if (isSingapore) return null; // Eliminated for Singapore
                const pestCropData = dataStore.pest_crop?.[stateId];
                return pestCropData ? <StatePestCropDetail data={pestCropData} /> : null;
            default:
                return <p>No data available for this surveillance type.</p>;
        }
    };
    
    const detailContent = renderDetail();

    return (
        <div className="animate-fadeIn h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-1">
                {stateName}
            </h2>
             <p className="text-sm text-gray-400 mb-4 capitalize">{type.replace('_', ' & ')} Surveillance Details</p>
             <div className="overflow-y-auto flex-grow pr-2">
                {detailContent ? detailContent : (
                    <div className="h-full flex justify-center items-center">
                        <p className="text-gray-500">No detailed data available for {stateName}.</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default StateSurveillanceDetail;