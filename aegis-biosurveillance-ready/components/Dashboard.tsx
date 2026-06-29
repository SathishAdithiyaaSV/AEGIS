import React, { useState, useMemo } from 'react';
import KpiCard from './KpiCard';
import TrendChart from './TrendChart';
import MapChart from './MapChart';
import AlertsPanel from './AlertsPanel';
import ZoonoticSurveillancePanel from './ZoonoticSurveillancePanel';
import EnvironmentalPanel from './EnvironmentalPanel';
import ZoonoticDetailModal from './ZoonoticDetailModal';
import WastewaterDetailModal from './WastewaterDetailModal';
import WildlifeSurveillancePanel from './WildlifeSurveillancePanel';
import DisasterResponsePanel from './DisasterResponsePanel';
import WildlifeDetailModal from './WildlifeDetailModal';
import DisasterDetailModal from './DisasterDetailModal';
import VaccineOptimizationPanel from './VaccineOptimizationPanel';
import GenomicSurveillancePanel from './GenomicSurveillancePanel';
import GenomicDetailModal from './GenomicDetailModal';
import SlaughterhouseDetailModal from './SlaughterhouseDetailModal';
import PestCropSurveillancePanel from './PestCropSurveillancePanel';
import PestCropDetailModal from './PestCropDetailModal';
import { kpiData, respiratoryTrendData, gastrointestinalTrendData, mapData, mockAlerts, MOCK_DATA_SUMMARY, US_STATE_PATHS, oneHealthIndexDataUS, pestInfestationAlertsUS, cropDiseaseAlertsUS } from './constants';
import { ZoonoticAlert, EnvironmentalAlert, WildlifeAlert, DisasterAlert, GenomicSignal, SlaughterhouseData, PestInfestationAlert, CropDiseaseAlert } from '../types';
import OneHealthIndexPanel from './OneHealthIndexPanel';
import { calculateOneHealthIndex } from '../services/oneHealthService';
import BiosecurityDashboard from './BiosecurityDashboard';
import ModuleCard from './ModuleCard';

const BiohazardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.33,14.25a.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,3,3,0,0,1-3,3Z"/>
      <path d="M8.67,14.25a3,3,0,0,1-3-3,.75.75,0,0,1,1.5,0,1.5,1.5,0,0,0,1.5,1.5.75.75,0,0,1,0,1.5Z"/>
      <path d="M12,12.75a.75.75,0,0,1-.75-.75V8.25a.75.75,0,0,1,1.5,0v3.75A.75.75,0,0,1,12,12.75Z"/>
      <path d="M12,21.75a4.5,4.5,0,0,1-4.32-3.2.75.75,0,0,1,1.45-.4,3,3,0,0,0,5.74,0,.75.75,0,0,1,1.45.4A4.5,4.5,0,0,1,12,21.75Z"/>
      <path d="M19.32,18.15a.75.75,0,0,1-.66-.94,3,3,0,0,0-1.2-2.36.75.75,0,1,1,.9-1.2,4.5,4.5,0,0,1,1.8,3.56A.75.75,0,0,1,19.32,18.15Z"/>
      <path d="M4.68,18.15a.75.75,0,0,1-.84-1,4.5,4.5,0,0,1,1.8-3.56.75.75,0,1,1,.9,1.2,3,3,0,0,0-1.2,2.36A.75.75,0,0,1,4.68,18.15Z"/>
      <path d="M12,6.75A4.5,4.5,0,0,1,7.5,2.25a.75.75,0,0,1,0,1.5,3,3,0,0,0,0,6A.75.75,0,0,1,7.5,8.25,4.5,4.5,0,0,1,12,6.75Z"/>
      <path d="M12,6.75A4.5,4.5,0,0,0,16.5,2.25a.75.75,0,0,1,0-1.5,3,3,0,0,1,0,6,.75.75,0,0,1,0-1.5A4.5,4.5,0,0,0,12,6.75Z"/>
      <path d="M12,12.75a4.5,4.5,0,0,1-4.27-2.92.75.75,0,0,1,1.4-.56,3,3,0,0,0,5.74,0,.75.75,0,0,1,1.4.56A4.5,4.5,0,0,1,12,12.75Z"/>
    </svg>
);


const Dashboard: React.FC = () => {
  const [zoonoticDetail, setZoonoticDetail] = useState<ZoonoticAlert | null>(null);
  const [wastewaterDetail, setWastewaterDetail] = useState<EnvironmentalAlert | null>(null);
  const [wildlifeDetail, setWildlifeDetail] = useState<WildlifeAlert | null>(null);
  const [disasterDetail, setDisasterDetail] = useState<DisasterAlert | null>(null);
  const [genomicDetail, setGenomicDetail] = useState<GenomicSignal | null>(null);
  const [slaughterhouseDetail, setSlaughterhouseDetail] = useState<SlaughterhouseData | null>(null);
  const [pestCropDetail, setPestCropDetail] = useState<PestInfestationAlert | CropDiseaseAlert | null>(null);

  const [showBiosecurityModule, setShowBiosecurityModule] = useState(false);

  const oneHealthIndex = useMemo(() => 
    calculateOneHealthIndex(
      oneHealthIndexDataUS.human,
      oneHealthIndexDataUS.zoonotic,
      oneHealthIndexDataUS.environmental
    ), []);

  if (showBiosecurityModule) {
    return <BiosecurityDashboard country="US" onBack={() => setShowBiosecurityModule(false)} />;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Top Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OneHealthIndexPanel indexData={oneHealthIndex} country="USA" />
            <ModuleCard
              title="Bio-Terrorism Threat Module"
              description="Access the biowarfare threat matrix, lab network status, and strategic counter-terrorism analysis."
              icon={<BiohazardIcon className="w-6 h-6 text-red-400" />}
              onClick={() => setShowBiosecurityModule(true)}
            />
        </div>

        {/* KPIs */}
        <h2 className="text-2xl font-bold text-white pt-4">Syndromic Surveillance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left and middle columns */}
          <div className="lg:col-span-2 space-y-6">
            <MapChart title="National Case Distribution" data={mapData} paths={US_STATE_PATHS} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrendChart title="Respiratory Illness Trends" data={respiratoryTrendData} color="#58A6FF" />
              <TrendChart title="Gastrointestinal Illness Trends" data={gastrointestinalTrendData} color="#D29922" />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <AlertsPanel alerts={mockAlerts} />
            <VaccineOptimizationPanel 
                contextName="USA National Vaccine Stockpile"
                inventory={oneHealthIndexDataUS.vaccineInventory}
                aiSummary={MOCK_DATA_SUMMARY}
                population="330 Million"
            />
          </div>

        </div>
        
        {/* One Health Modules */}
        <h2 className="text-xl font-bold text-white pt-6 border-t border-brand-light-blue">One Health & Environmental Surveillance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <ZoonoticSurveillancePanel
              alerts={oneHealthIndexDataUS.zoonotic}
              slaughterhouseAlerts={oneHealthIndexDataUS.slaughterhouses}
              onAlertClick={setZoonoticDetail}
              onSlaughterhouseAlertClick={setSlaughterhouseDetail}
              dataSource="Source: USDA, CDC"
              dataSourceTooltip="Credibility: High. Data aggregated from the US Department of Agriculture and the Centers for Disease Control and Prevention. Includes real-time inputs from state veterinary networks and food safety inspections."
              slaughterhouseDataSource="Source: USDA FSIS"
              slaughterhouseDataSourceTooltip="Credibility: High. Data from the USDA's Food Safety and Inspection Service's routine testing and inspection reports."
            />
            <EnvironmentalPanel
              alerts={oneHealthIndexDataUS.environmental}
              onAlertClick={setWastewaterDetail}
              dataSource="Source: CDC NWSS, EPA"
              dataSourceTooltip="Credibility: High. Data from the CDC's National Wastewater Surveillance System (NWSS) and the Environmental Protection Agency (EPA). Signals are lab-confirmed."
            />
            <WildlifeSurveillancePanel
              alerts={oneHealthIndexDataUS.wildlife}
              onAlertClick={setWildlifeDetail}
              dataSource="Source: USGS, State Wildlife Agencies"
              dataSourceTooltip="Credibility: Moderate to High. Data sourced from the U.S. Geological Survey's National Wildlife Health Center and state-level Departments of Fish and Wildlife. Data is often event-driven (e.g., mortality events)."
            />
            <DisasterResponsePanel
              alerts={oneHealthIndexDataUS.disasters}
              onAlertClick={setDisasterDetail}
              dataSource="Source: FEMA, NOAA"
              dataSourceTooltip="Credibility: High. Data from the Federal Emergency Management Agency (FEMA) and the National Oceanic and Atmospheric Administration (NOAA). Disease risk projections are AI-generated based on historical disaster-outbreak correlations."
            />
             <PestCropSurveillancePanel
              pestAlerts={pestInfestationAlertsUS}
              cropAlerts={cropDiseaseAlertsUS}
              onAlertClick={setPestCropDetail}
            />
            <GenomicSurveillancePanel
              alerts={oneHealthIndexDataUS.genomic}
              onAlertClick={setGenomicDetail}
              dataSource="Source: CDC NS3, GISAID"
              dataSourceTooltip="Credibility: Very High. Data from the CDC's National SARS-CoV-2 Strain Surveillance (NS3) system and the Global Initiative on Sharing All Influenza Data (GISAID)."
            />
        </div>

      </div>

      {zoonoticDetail && (
        <ZoonoticDetailModal 
          alert={zoonoticDetail} 
          onClose={() => setZoonoticDetail(null)} 
        />
      )}
      {wastewaterDetail && (
        <WastewaterDetailModal 
          alert={wastewaterDetail} 
          onClose={() => setWastewaterDetail(null)} 
        />
      )}
      {wildlifeDetail && (
        <WildlifeDetailModal
          alert={wildlifeDetail}
          onClose={() => setWildlifeDetail(null)}
        />
      )}
      {disasterDetail && (
        <DisasterDetailModal
          alert={disasterDetail}
          onClose={() => setDisasterDetail(null)}
        />
      )}
      {genomicDetail && (
        <GenomicDetailModal
          alert={genomicDetail}
          onClose={() => setGenomicDetail(null)}
        />
      )}
      {slaughterhouseDetail && (
        <SlaughterhouseDetailModal
          alert={slaughterhouseDetail}
          onClose={() => setSlaughterhouseDetail(null)}
        />
      )}
      {pestCropDetail && (
        <PestCropDetailModal
          alert={pestCropDetail}
          onClose={() => setPestCropDetail(null)}
        />
      )}
    </>
  );
};

export default Dashboard;