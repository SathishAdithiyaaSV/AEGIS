

import React, { useState, useMemo } from 'react';
import ExpandableKpiCard from './ExpandableKpiCard';
import TrendChart from './TrendChart';
import MapChart from './MapChart';
import AlertsPanel from './AlertsPanel';
import AiAnalysisPanel from './AiAnalysisPanel';
import ThreatSpectrum from './ThreatSpectrum';
import ZoonoticSurveillancePanel from './ZoonoticSurveillancePanel';
import EnvironmentalPanel from './EnvironmentalPanel';
import StateDashboard from './StateDashboard';
import ZoonoticDetailModal from './ZoonoticDetailModal';
import WastewaterDetailModal from './WastewaterDetailModal';
import WildlifeSurveillancePanel from './WildlifeSurveillancePanel';
import DisasterResponsePanel from './DisasterResponsePanel';
import GenomicSurveillancePanel from './GenomicSurveillancePanel';
import WildlifeDetailModal from './WildlifeDetailModal';
import DisasterDetailModal from './DisasterDetailModal';
import GenomicDetailModal from './GenomicDetailModal';
import SlaughterhouseDetailModal from './SlaughterhouseDetailModal';
import OneHealthIndexPanel from './OneHealthIndexPanel';
import ModuleCard from './ModuleCard';
import BiosecurityDashboard from './BiosecurityDashboard';
import PestCropSurveillancePanel from './PestCropSurveillancePanel';
import PestCropDetailModal from './PestCropDetailModal';
import SurveillanceMapView from './surveillance/SurveillanceMapView';

import { EscalatedAlert, ZoonoticAlert, EnvironmentalAlert, WildlifeAlert, DisasterAlert, GenomicSignal, SlaughterhouseData, PestInfestationAlert, CropDiseaseAlert, SurveillanceType } from '../types';
import { 
    kpiDataIndia, 
    dengueTrendData, 
    choleraTrendData, 
    mapDataIndia, 
    mockAlertsIndia, 
    MOCK_DATA_SUMMARY_INDIA, 
    threatSpectrumDataIndia, 
    INDIA_STATE_PATHS,
    oneHealthIndexDataIndia,
    pestInfestationAlertsIndia,
    cropDiseaseAlertsIndia,
} from './constants';
import { calculateOneHealthIndex } from '../services/oneHealthService';

interface DashboardIndiaProps {
  activeAlert: EscalatedAlert | null;
  onEscalate: (alert: EscalatedAlert) => void;
  onAcknowledge: (alert: EscalatedAlert) => void;
  onResolve: () => void;
}

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

const DashboardIndia: React.FC<DashboardIndiaProps> = ({ activeAlert, onEscalate, onAcknowledge, onResolve }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeSurveillanceLayer, setActiveSurveillanceLayer] = useState<SurveillanceType | null>(null);
  const [zoonoticDetail, setZoonoticDetail] = useState<ZoonoticAlert | null>(null);
  const [wastewaterDetail, setWastewaterDetail] = useState<EnvironmentalAlert | null>(null);
  const [wildlifeDetail, setWildlifeDetail] = useState<WildlifeAlert | null>(null);
  const [disasterDetail, setDisasterDetail] = useState<DisasterAlert | null>(null);
  const [genomicDetail, setGenomicDetail] = useState<GenomicSignal | null>(null);
  const [slaughterhouseDetail, setSlaughterhouseDetail] = useState<SlaughterhouseData | null>(null);
  const [pestCropDetail, setPestCropDetail] = useState<PestInfestationAlert | CropDiseaseAlert | null>(null);
  const [showBiosecurityModule, setShowBiosecurityModule] = useState(false);

  const handleStateSelect = (stateId: string) => {
    setSelectedState(stateId);
  };

  const handleBackToNationalView = () => {
    setSelectedState(null);
    setActiveSurveillanceLayer(null);
  };
  
  const oneHealthIndex = useMemo(() => 
    calculateOneHealthIndex(
      oneHealthIndexDataIndia.human,
      oneHealthIndexDataIndia.zoonotic,
      oneHealthIndexDataIndia.environmental
    ), []);

  if (activeSurveillanceLayer) {
      return <SurveillanceMapView type={activeSurveillanceLayer} onBack={handleBackToNationalView} />;
  }
  
  if (selectedState) {
    return <StateDashboard 
              stateId={selectedState} 
              onBack={handleBackToNationalView}
              activeAlert={activeAlert}
              onEscalate={onEscalate}
              onAcknowledge={onAcknowledge}
              onResolve={onResolve}
           />;
  }
  
  if (showBiosecurityModule) {
    return <BiosecurityDashboard country="India" onBack={() => setShowBiosecurityModule(false)} />;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Top Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OneHealthIndexPanel indexData={oneHealthIndex} country="India" />
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
          {kpiDataIndia.map((kpi) => (
            <ExpandableKpiCard key={kpi.title} kpi={kpi} />
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left and middle columns */}
          <div className="lg:col-span-2 space-y-6">
            <MapChart title="National Case Distribution (Click to drill down)" data={mapDataIndia} paths={INDIA_STATE_PATHS} onStateClick={handleStateSelect} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrendChart title="Dengue Trends" data={dengueTrendData} color="#F85149" />
              <TrendChart title="Cholera Trends" data={choleraTrendData} color="#58A6FF" />
            </div>
             <AiAnalysisPanel dataSummary={MOCK_DATA_SUMMARY_INDIA} />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <AlertsPanel alerts={mockAlertsIndia} />
            <ThreatSpectrum threats={threatSpectrumDataIndia} />
          </div>
        </div>

        {/* One Health Modules */}
        <h2 className="text-xl font-bold text-white pt-6 border-t border-brand-light-blue">One Health & Advanced Surveillance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <ZoonoticSurveillancePanel
              alerts={oneHealthIndexDataIndia.zoonotic}
              slaughterhouseAlerts={oneHealthIndexDataIndia.slaughterhouses}
              onAlertClick={setZoonoticDetail}
              onSlaughterhouseAlertClick={setSlaughterhouseDetail}
              dataSource="Source: NCDC, ICMR"
              dataSourceTooltip="Credibility: High. Data from NCDC and ICMR."
              slaughterhouseDataSource="Source: FSSAI, State Health Depts."
              slaughterhouseDataSourceTooltip="Credibility: Moderate. Data from FSSAI."
              onViewLayer={() => setActiveSurveillanceLayer('zoonotic')}
            />
            <EnvironmentalPanel
              alerts={oneHealthIndexDataIndia.environmental}
              onAlertClick={setWastewaterDetail}
              dataSource="Source: INSACOG, CPCB"
              dataSourceTooltip="Credibility: High. Data from INSACOG and CPCB."
              onViewLayer={() => setActiveSurveillanceLayer('environmental')}
            />
             <WildlifeSurveillancePanel
              alerts={oneHealthIndexDataIndia.wildlife}
              onAlertClick={setWildlifeDetail}
              dataSource="Source: WII, State Forest Depts."
              dataSourceTooltip="Credibility: Moderate. Data from WII."
              onViewLayer={() => setActiveSurveillanceLayer('wildlife')}
            />
            <DisasterResponsePanel
              alerts={oneHealthIndexDataIndia.disasters}
              onAlertClick={setDisasterDetail}
              dataSource="Source: NDMA, IMD"
              dataSourceTooltip="Credibility: High. Data from NDMA and IMD."
               onViewLayer={() => setActiveSurveillanceLayer('disaster')}
            />
             <PestCropSurveillancePanel
              pestAlerts={pestInfestationAlertsIndia}
              cropAlerts={cropDiseaseAlertsIndia}
              onAlertClick={setPestCropDetail}
              onViewLayer={() => setActiveSurveillanceLayer('pest_crop')}
            />
            <GenomicSurveillancePanel
              alerts={oneHealthIndexDataIndia.genomic}
              onAlertClick={setGenomicDetail}
              dataSource="Source: INSACOG, NIV Pune"
              dataSourceTooltip="Credibility: Very High. Data from INSACOG and NIV Pune."
              onViewLayer={() => setActiveSurveillanceLayer('genomic')}
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

export default DashboardIndia;
