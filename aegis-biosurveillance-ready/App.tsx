import React, { useEffect, useState } from 'react';
import AuthScreen, { SignupFormState } from './components/AuthScreen';
import AdminUsersModal from './components/AdminUsersModal';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DashboardIndia from './components/DashboardIndia';
import DashboardSingapore from './components/DashboardSingapore';
import BioshieldWorkspace from './components/BioshieldWorkspace';
import BioshieldFullscreen from './components/BioshieldFullscreen';
import { AppUser, EscalatedAlert } from './types';
import { getAdminUsers, getCurrentUser, login, signup } from './services/authService';

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

const AUTH_TOKEN_STORAGE_KEY = 'aegis_auth_token';

function App() {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>(() => getDashboardFromHash());
  const [activeAlert, setActiveAlert] = useState<EscalatedAlert | null>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(() => window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveDashboard(getDashboardFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const hydrateSession = async () => {
      if (!authToken) {
        setCurrentUser(null);
        setIsAuthLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser(authToken);
        setCurrentUser(user);
      } catch (_error) {
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        setAuthToken(null);
        setCurrentUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    hydrateSession();
  }, [authToken]);

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

  const handleAuthSuccess = (token: string, user: AppUser) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    setAuthToken(token);
    setCurrentUser(user);
    setAuthErrorMessage(null);
  };

  const handleLogin = async (payload: { email: string; password: string }) => {
    setIsSubmittingAuth(true);
    setAuthErrorMessage(null);
    try {
      const response = await login(payload);
      handleAuthSuccess(response.token, response.user);
    } catch (error) {
      setAuthErrorMessage(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleSignup = async (payload: SignupFormState) => {
    setIsSubmittingAuth(true);
    setAuthErrorMessage(null);
    try {
      const response = await signup(payload);
      handleAuthSuccess(response.token, response.user);
    } catch (error) {
      setAuthErrorMessage(error instanceof Error ? error.message : 'Signup failed.');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setAuthToken(null);
    setCurrentUser(null);
    setAdminUsers([]);
    setIsAdminModalOpen(false);
  };

  const handleOpenAdminUsers = async () => {
    if (!authToken || !currentUser?.isAdmin) {
      return;
    }
    try {
      const users = await getAdminUsers(authToken);
      setAdminUsers(users);
      setIsAdminModalOpen(true);
    } catch (error) {
      setAuthErrorMessage(error instanceof Error ? error.message : 'Failed to load user list.');
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        Loading secure access...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <AuthScreen
        onLogin={handleLogin}
        onSignup={handleSignup}
        isSubmitting={isSubmittingAuth}
        errorMessage={authErrorMessage}
      />
    );
  }

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
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenAdminUsers={handleOpenAdminUsers}
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
        {isAdminModalOpen && (
          <AdminUsersModal users={adminUsers} onClose={() => setIsAdminModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
