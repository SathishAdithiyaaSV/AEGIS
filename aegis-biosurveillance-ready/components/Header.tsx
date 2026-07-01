import React from 'react';
import { DashboardType } from '../App';
import { AppUser, EscalatedAlert } from '../types';
import { BellAlertIcon } from '@heroicons/react/24/solid';

const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);
  
interface HeaderProps {
    activeDashboard: DashboardType;
    setActiveDashboard: (dashboard: DashboardType) => void;
    activeAlert: EscalatedAlert | null;
    currentUser: AppUser;
    onLogout: () => void;
    onOpenAdminUsers: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeDashboard, setActiveDashboard, activeAlert, currentUser, onLogout, onOpenAdminUsers }) => {
  return (
    <header className="bg-brand-dark-blue/70 backdrop-blur-lg border-b border-brand-light-blue sticky top-0 z-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:p-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {activeAlert && activeAlert.status === 'escalated' && (
              <div className="mr-3 animate-pulse">
                <BellAlertIcon className="h-7 w-7 text-brand-danger" />
              </div>
            )}
            <ShieldCheckIcon className="h-8 w-8 text-brand-accent" />
            <h1 className="ml-3 text-2xl font-bold text-white tracking-tight">
              Aegis Biosurveillance
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm text-gray-400">
              Real-time AI-Powered Threat Monitoring
            </div>
            
            <div className="bg-brand-dark p-1 rounded-lg flex space-x-1">
                <button 
                    onClick={() => setActiveDashboard('US')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeDashboard === 'US' 
                        ? 'bg-brand-accent text-white' 
                        : 'text-gray-400 hover:bg-brand-light-blue'
                    }`}
                >
                    USA
                </button>
                <button 
                    onClick={() => setActiveDashboard('India')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeDashboard === 'India' 
                        ? 'bg-brand-accent text-white' 
                        : 'text-gray-400 hover:bg-brand-light-blue'
                    }`}
                >
                    India
                </button>
                <button 
                    onClick={() => setActiveDashboard('Singapore')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeDashboard === 'Singapore' 
                        ? 'bg-brand-accent text-white' 
                        : 'text-gray-400 hover:bg-brand-light-blue'
                    }`}
                >
                    Singapore
                </button>
            </div>
            <button 
                onClick={() => setActiveDashboard('Bioshield')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    activeDashboard === 'Bioshield' 
                    ? 'bg-brand-danger text-white shadow-lg shadow-red-500/20' 
                    : 'border border-brand-light-blue bg-brand-dark text-red-200 hover:border-red-400 hover:text-white'
                }`}
            >
                Bioshield
            </button>
            {currentUser.isAdmin && (
              <button
                onClick={onOpenAdminUsers}
                className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/20"
              >
                Registrants
              </button>
            )}
            <div className="hidden text-right lg:block">
              <p className="text-sm font-semibold text-white">{currentUser.name}</p>
              <p className="text-xs text-slate-400">
                {currentUser.organization} · {currentUser.isAdmin ? 'Admin' : 'Operator'}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
