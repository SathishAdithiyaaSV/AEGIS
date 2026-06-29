import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DashboardIndia from './components/DashboardIndia';
import ApiKeyModal from './components/ApiKeyModal';
import { EscalatedAlert, AIStudio } from './types';

export type DashboardType = 'US' | 'India';

function App() {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>('US');
  const [activeAlert, setActiveAlert] = useState<EscalatedAlert | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = async () => {
      // Type casting to avoid global namespace conflict while preserving type safety locally
      const win = window as unknown as { aistudio?: AIStudio };
      if (win.aistudio) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } else {
        // Fallback for development if window.aistudio isn't available
        // In a real deployed environment, we might handle this differently
        setHasApiKey(true); 
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    const win = window as unknown as { aistudio?: AIStudio };
    if (win.aistudio) {
      await win.aistudio.openSelectKey();
      // Assume success after dialog closes (handling race condition as per instructions)
      setHasApiKey(true);
      // Force a reload to ensure the new key is picked up by the client initialization
      window.location.reload();
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

  if (!hasApiKey) {
    return (
        <div className="min-h-screen bg-brand-dark font-sans flex items-center justify-center">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#0a3b7855,transparent)]"></div>
            <ApiKeyModal onSelectKey={handleSelectKey} />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark font-sans">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#0a3b7855,transparent)]"></div>
      <div className="relative z-10">
        <Header 
          activeDashboard={activeDashboard} 
          setActiveDashboard={setActiveDashboard}
          activeAlert={activeAlert}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {activeDashboard === 'US' ? (
            <Dashboard /> 
          ) : (
            <DashboardIndia 
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