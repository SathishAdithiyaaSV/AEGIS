import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DashboardIndia from './components/DashboardIndia';
import DashboardSingapore from './components/DashboardSingapore';
import BioshieldWorkspace from './components/BioshieldWorkspace';
import BioshieldFullscreen from './components/BioshieldFullscreen';
import { EscalatedAlert } from './types';

export type DashboardType = 'US' | 'India' | 'Singapore' | 'Bioshield' | 'BioshieldFullscreen';

const HASH_TO_DASHBOARD: Record<string, DashboardType> = {
  '#/us': 'US',
  '#/india': 'India',
  '#/singapore': 'Singapore',
  '#/bioshield': 'Bioshield',
  '#/bioshield/fullscreen': 'BioshieldFullscreen',
};

const DASHBOARD_TO_HASH: Record<DashboardType, string> = {
  US: '#/us',
  India: '#/india',
  Singapore: '#/singapore',
  Bioshield: '#/bioshield',
  BioshieldFullscreen: '#/bioshield/fullscreen',
};

const getDashboardFromHash = (): DashboardType => {
  const normalizedHash = window.location.hash.toLowerCase();
  return HASH_TO_DASHBOARD[normalizedHash] ?? 'Singapore';
};

function App() {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>(() => getDashboardFromHash());
  const [activeAlert, setActiveAlert] = useState<EscalatedAlert | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveDashboard(getDashboardFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetActiveDashboard = (dashboard: DashboardType) => {
    setActiveDashboard(dashboard);
    const nextHash = DASHBOARD_TO_HASH[dashboard];
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  };

  const handleEscalate = (newAlert: EscalatedAlert) => {
    console.log(`ALERT ESCALATED to ${newAlert.level} from ${newAlert.from}`);
    setActiveAlert(newAlert);
  };

  const handleAcknowledge = (alertToMonitor: EscalatedAlert) => {
    console.log(`Alert acknowledged at ${alertToMonitor.level}, now monitoring.`);
    setActiveAlert({ ...alertToMonitor, status: 'monitoring' });
  };

  const handleResolve = () => {
    console.log('Monitored alert resolved and cleared.');
    setActiveAlert(null);
  };

  if (activeDashboard === 'BioshieldFullscreen') {
    return <BioshieldFullscreen onBack={() => handleSetActiveDashboard('Singapore')} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark font-sans">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#0a3b7855,transparent)]"></div>
      <div className="relative z-10">
        <Header 
          activeDashboard={activeDashboard} 
          setActiveDashboard={handleSetActiveDashboard}
          activeAlert={activeAlert}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {activeDashboard === 'US' ? (
            <Dashboard /> 
          ) : activeDashboard === 'India' ? (
            <DashboardIndia 
              activeAlert={activeAlert}
              onEscalate={handleEscalate}
              onAcknowledge={handleAcknowledge}
              onResolve={handleResolve}
            />
          ) : activeDashboard === 'BioshieldFullscreen' ? (
            <BioshieldFullscreen onBack={() => handleSetActiveDashboard('Singapore')} />
          ) : activeDashboard === 'Bioshield' ? (
            <BioshieldWorkspace />
          ) : (
            <DashboardSingapore 
              activeAlert={activeAlert}
              onEscalate={handleEscalate}
              onAcknowledge={handleAcknowledge}
              onResolve={handleResolve}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
