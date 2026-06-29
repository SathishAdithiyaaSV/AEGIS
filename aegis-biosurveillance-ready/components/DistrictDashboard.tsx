import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { DistrictData, EscalatedAlert, LivestockAlert } from '../types';
import AlertsPanel from './AlertsPanel';
import DistrictHospitalPanel from './DistrictHospitalPanel';
import DistrictSurveillancePanel from './DistrictSurveillancePanel';
import DistrictProfilePanel from './DistrictProfilePanel';
import DrugInventoryPanel from './DrugInventoryPanel';
import DistrictActionPlanPanel from './DistrictActionPlanPanel';
import DistrictOneHealthScorePanel from './DistrictOneHealthScorePanel';
import SocioeconomicVulnerabilityPanel from './SocioeconomicVulnerabilityPanel';
import EmergencyResponsePanel from './EmergencyResponsePanel';
import MonitoringPanel from './MonitoringPanel';
import LivestockSurveillancePanel from './LivestockSurveillancePanel';
import LivestockDetailModal from './LivestockDetailModal';

interface DistrictDashboardProps {
  district: DistrictData;
  stateName: string;
  onBack: () => void;
  activeAlert: EscalatedAlert | null;
  onEscalate: (alert: EscalatedAlert) => void;
  onAcknowledge: (alert: EscalatedAlert) => void;
  onResolve: () => void;
}

const DistrictDashboard: React.FC<DistrictDashboardProps> = ({ district, stateName, onBack, activeAlert, onEscalate, onAcknowledge, onResolve }) => {
  const [livestockDetail, setLivestockDetail] = useState<LivestockAlert | null>(null);

  // Adapt district alerts to the format expected by AlertsPanel
  const formattedAlerts = district.alerts.map(alert => ({
    ...alert,
    location: `${district.name}, ${stateName.slice(0, 2).toUpperCase()}`, // e.g., Ernakulam, KL
    district: district.name,
  }));

  const districtCriticalAlert = useMemo(() => {
    return district.alerts.find(a => a.severity === 'Critical');
  }, [district.alerts]);

  const isAlertForThisDistrict = useMemo(() => {
    return activeAlert && activeAlert.alert.location.includes(district.name);
  }, [activeAlert, district.name]);

  const emergencyAlertToShow = useMemo(() => {
    if (activeAlert?.status === 'escalated' && isAlertForThisDistrict) {
      return activeAlert;
    }
    if (!activeAlert && districtCriticalAlert) {
      return {
        level: 'District' as 'District',
        from: district.name,
        alert: { 
            ...districtCriticalAlert, 
            location: `${district.name}, ${stateName}`
        },
        status: 'escalated' as 'escalated'
      };
    }
    return null;
  }, [activeAlert, districtCriticalAlert, district, stateName, isAlertForThisDistrict]);

  const monitoringAlertToShow = useMemo(() => {
    if (activeAlert?.status === 'monitoring' && activeAlert.level === 'District' && isAlertForThisDistrict) {
      return activeAlert;
    }
    return null;
  }, [activeAlert, isAlertForThisDistrict]);

  return (
    <>
      <div className="space-y-6 animate-fadeIn">
        {/* MONITORING / EMERGENCY PANELS */}
        {monitoringAlertToShow && (
          <MonitoringPanel
            currentLevel="District"
            activeAlert={monitoringAlertToShow}
            onResolve={onResolve}
          />
        )}
        {emergencyAlertToShow && (
          <EmergencyResponsePanel
            currentLevel="District"
            activeAlert={emergencyAlertToShow}
            onAcknowledge={onAcknowledge}
            onEscalate={onEscalate}
          />
        )}

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold text-white">
              {district.name} District Command Center
              </h1>
              <p className="text-lg text-gray-400">{stateName}</p>
          </div>
          <button
            onClick={onBack}
            className="bg-brand-light-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors flex items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to State View
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Context & Local Intel */}
          <div className="lg:col-span-1 space-y-6">
              <DistrictOneHealthScorePanel scoreData={district.oneHealthScore} />
              <DistrictProfilePanel profile={district.profile} />
              <SocioeconomicVulnerabilityPanel socioeconomicData={district.socioeconomicData} />
          </div>

          {/* Middle Column: Surveillance & Healthcare */}
          <div className="lg:col-span-1 space-y-6">
              <DistrictHospitalPanel hospitalData={district.hospitalData} />
              <LivestockSurveillancePanel
                alerts={district.surveillanceData.livestockAlerts}
                onAlertClick={setLivestockDetail}
                dataSource="Source: State Animal Husbandry Dept."
              />
              <DistrictSurveillancePanel surveillanceData={district.surveillanceData} />
          </div>

          {/* Right Column: Alerts, Pharma & AI Actions */}
          <div className="lg:col-span-1 space-y-6">
              <AlertsPanel alerts={formattedAlerts} />
              <DrugInventoryPanel 
                  contextName={`${district.name} District`}
                  inventory={district.drugInventory}
                  aiSummary={district.aiSummary}
              />
              <DistrictActionPlanPanel 
                  districtName={district.name}
                  stateName={stateName}
                  summary={district.aiSummary}
              />
          </div>
        </div>
      </div>
      
      {livestockDetail && (
        <LivestockDetailModal 
          alert={livestockDetail} 
          onClose={() => setLivestockDetail(null)} 
        />
      )}
    </>
  );
};

export default DistrictDashboard;