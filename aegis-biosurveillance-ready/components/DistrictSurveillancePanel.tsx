import React from 'react';
import { MagnifyingGlassIcon, BugAntIcon, FireIcon, BeakerIcon, BuildingStorefrontIcon, UserGroupIcon, EyeDropperIcon } from '@heroicons/react/24/solid';
import { DistrictSurveillanceData, LocalEnvironmentalSignal, CropDiseaseAlert, GenomicSignal } from '../types';

const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const SurveillanceMetric: React.FC<{
    icon: React.ReactNode;
    value: string;
    label: string;
    colorClass: string;
}> = ({ icon, value, label, colorClass }) => (
    <div className="bg-brand-dark p-3 rounded-lg flex items-center">
        <div className={`mr-3 p-2 rounded-full bg-brand-light-blue/50 ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className={`text-lg font-bold ${colorClass}`}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    </div>
);

const getSignalIcon = (sourceType: LocalEnvironmentalSignal['sourceType']) => {
    switch(sourceType) {
        case 'Water Source': return <BeakerIcon className="w-4 h-4 mr-3 mt-0.5 text-blue-400 flex-shrink-0" />;
        case 'Market': return <BuildingStorefrontIcon className="w-4 h-4 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" />;
        case 'Community Report': return <UserGroupIcon className="w-4 h-4 mr-3 mt-0.5 text-green-400 flex-shrink-0" />;
        case 'Zoonotic Wastewater': return <EyeDropperIcon className="w-4 h-4 mr-3 mt-0.5 text-purple-400 flex-shrink-0" />;
        case 'Water Management': return null;
        case 'Soil Contamination': return <BeakerIcon className="w-4 h-4 mr-3 mt-0.5 text-orange-400 flex-shrink-0" />;
        case 'Event': return <UserGroupIcon className="w-4 h-4 mr-3 mt-0.5 text-indigo-400 flex-shrink-0" />;
        default: return <BeakerIcon className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />;
    }
}

const CropDiseaseAlertCard: React.FC<{ alert: CropDiseaseAlert }> = ({ alert }) => {
    const threatColor = alert.threatLevel === 'High' ? 'text-red-400' : alert.threatLevel === 'Moderate' ? 'text-yellow-400' : 'text-green-400';
    return (
        <div className={`p-2 bg-brand-dark rounded-md border-l-4 ${alert.threatLevel === 'High' ? 'border-red-500' : 'border-yellow-500'}`}>
            <p className="font-semibold text-white text-sm">{alert.disease} <span className="font-normal text-gray-400">({alert.cropType})</span></p>
            <div className="text-xs text-gray-400 flex justify-between mt-1">
                <span className={threatColor}>Threat: {alert.threatLevel}</span>
                <span>Yield Loss: ~{alert.potentialYieldLoss}%</span>
            </div>
        </div>
    );
};

const GenomicSignalCard: React.FC<{ signal: GenomicSignal }> = ({ signal }) => {
    const significanceColor = signal.significance === 'Increased Severity' ? 'border-red-500' : 'border-yellow-500';
    return (
      <div className={`p-2 bg-brand-dark rounded-md border-l-4 ${significanceColor}`}>
        <p className="font-semibold text-white text-sm">{signal.strainName}</p>
        <p className="text-xs text-gray-400 mt-1">{signal.summary}</p>
        <p className="text-xs text-gray-500 text-right mt-1">Source: {signal.dataSource}</p>
      </div>
    );
};


const DistrictSurveillancePanel: React.FC<{ surveillanceData: DistrictSurveillanceData }> = ({ surveillanceData }) => {
    
    const getVectorDensityColor = (density: 'High' | 'Moderate' | 'Low') => {
        switch (density) {
            case 'High': return 'text-red-400';
            case 'Moderate': return 'text-yellow-400';
            case 'Low': return 'text-green-400';
        }
    };
    
    return (
        <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-gray-400" />
                Multi-Sector Surveillance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <SurveillanceMetric 
                    icon={<BugAntIcon className="w-5 h-5" />}
                    value={surveillanceData.vectorDensityIndex}
                    label="Vector Density (Human)"
                    colorClass={getVectorDensityColor(surveillanceData.vectorDensityIndex)}
                />
                 <SurveillanceMetric 
                    icon={<FireIcon className="w-5 h-5" />}
                    value={surveillanceData.feverSurveyReports.toLocaleString()}
                    label="Syndromic Fever Reports"
                    colorClass="text-brand-accent"
                />
            </div>
            
            <div className="space-y-4">
                {surveillanceData.cropDiseaseAlerts.length > 0 && (
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Crop Disease Alerts</h4>
                        <div className="space-y-2">
                            {surveillanceData.cropDiseaseAlerts.map((alert, i) => <CropDiseaseAlertCard key={i} alert={alert} />)}
                        </div>
                    </div>
                )}

                {surveillanceData.localEnvironmentalSignals.length > 0 && (
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Grassroots Environmental Signals</h4>
                        <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {surveillanceData.localEnvironmentalSignals.map(signal => (
                                <li key={signal.id} className={`bg-brand-dark p-3 rounded-md transition-all duration-300 ${signal.highlight ? 'border border-brand-accent shadow-glow' : 'border border-transparent'}`}>
                                    <div className="flex items-start">
                                        {getSignalIcon(signal.sourceType)}
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-300">{signal.description}</p>
                                            <p className="text-xs text-gray-500">{signal.sourceType}</p>
                                        </div>
                                    </div>
                                    {signal.imageUrl && (
                                        <div className="mt-2 pl-7">
                                            <img src={signal.imageUrl} alt={signal.description} className="rounded-md h-24 w-full object-cover border border-brand-light-blue" />
                                            <p className="text-center text-xs text-gray-500 mt-1">Sample Image</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {surveillanceData.genomicSignals && surveillanceData.genomicSignals.length > 0 && (
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                           <DnaIcon className="w-4 h-4 mr-2 text-purple-400" />
                           Grassroots Genomic Signals
                        </h4>
                        <div className="space-y-2">
                            {surveillanceData.genomicSignals.map((signal) => <GenomicSignalCard key={signal.id} signal={signal} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistrictSurveillancePanel;