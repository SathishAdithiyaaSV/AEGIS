import React, { useState } from 'react';
import { MegaphoneIcon, CheckCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { EscalatedAlert } from '../types';

interface EmergencyResponsePanelProps {
  currentLevel: 'District' | 'State' | 'National';
  activeAlert: EscalatedAlert;
  onAcknowledge: (alertToMonitor: EscalatedAlert) => void;
  onEscalate: (newAlert: EscalatedAlert) => void;
}

const EmergencyResponsePanel: React.FC<EmergencyResponsePanelProps> = ({ currentLevel, activeAlert, onAcknowledge, onEscalate }) => {
  const { alert, level: alertOriginLevel, from } = activeAlert;
  const [isSendingNationalAlert, setIsSendingNationalAlert] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

  const nextLevelMap = {
      District: 'State',
      State: 'National'
  };
  const nextLevel = currentLevel !== 'National' ? nextLevelMap[currentLevel] : null;

  const canEscalate = currentLevel !== 'National';
  
  const handleEscalateClick = async () => {
    if (!canEscalate || !nextLevel) return;
    
    let fromText = '';
    if (currentLevel === 'District') {
        fromText = `${from} District`;
    } else if (currentLevel === 'State') {
        fromText = from; // 'from' is already the state name
    }

    const nextAlert: EscalatedAlert = {
      level: nextLevel as 'State' | 'National',
      from: fromText,
      alert: alert,
      status: 'escalated',
    };

    if (nextLevel === 'National') {
      setIsSendingNationalAlert(true);
      setNotificationMessage(null);

      try {
        const response = await fetch(`${apiBaseUrl}/api/alerts/escalate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: alert.title,
            location: alert.location,
            severity: alert.severity,
            from: fromText,
            currentLevel,
            nextLevel,
            timestamp: alert.timestamp,
          }),
        });

        const result = await response.json();
        if (!response.ok || !result.ok) {
          throw new Error(result.error || 'Failed to send Twilio escalation.');
        }

        setNotificationMessage('National escalation sent by call and SMS.');
      } catch (error) {
        console.error('National escalation notification failed:', error);
        setNotificationMessage(
          error instanceof Error ? `Call/SMS failed: ${error.message}` : 'Call/SMS failed.'
        );
      } finally {
        setIsSendingNationalAlert(false);
      }
    }

    onEscalate(nextAlert);
  };

  const getSeverityClass = (severity: 'Critical' | 'High' | 'Moderate') => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500';
      case 'High':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'Moderate':
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };

  const escalationPath = ['District', 'State', 'National'].map(pathLevel => (
      <span key={pathLevel} className={`font-bold ${currentLevel === pathLevel ? 'text-white underline decoration-brand-danger decoration-2 underline-offset-4' : 'text-gray-500'}`}>
          {pathLevel}
          {pathLevel !== 'National' && <span className="text-gray-500 font-normal mx-1">{'>'}</span>}
      </span>
  ));

  return (
    <div className="bg-red-900/50 border-2 border-brand-danger rounded-lg p-4 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
      <h3 className="text-md font-bold text-red-300 mb-2 flex items-center">
        <MegaphoneIcon className="w-5 h-5 mr-2" />
        Emergency Alert Protocol Active
      </h3>
      
      <div className="text-center text-sm my-3">{escalationPath}</div>

      <div className={`p-3 rounded-md border-l-4 ${getSeverityClass(alert.severity)} bg-brand-dark/50`}>
          <p className="font-semibold text-sm text-white">{alert.title}</p>
          <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
              <span>{alert.location}</span>
              <span>{alert.timestamp}</span>
          </div>
          {alertOriginLevel !== currentLevel && activeAlert.level !== currentLevel && (
            <p className="text-xs text-yellow-300 mt-2 font-semibold">Escalated from: {from}</p>
          )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <button
          onClick={() => onAcknowledge(activeAlert)}
          className="bg-green-600/20 text-green-300 font-semibold py-2 px-3 rounded-md hover:bg-green-600/40 transition-colors flex items-center justify-center"
        >
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Acknowledge & Monitor
        </button>
        <button
          onClick={handleEscalateClick}
          disabled={!canEscalate || isSendingNationalAlert}
          className="bg-brand-danger/80 text-white font-semibold py-2 px-3 rounded-md hover:bg-brand-danger transition-colors flex items-center justify-center disabled:bg-gray-500/50 disabled:cursor-not-allowed"
        >
          <ArrowUpCircleIcon className="w-5 h-5 mr-2" />
          {isSendingNationalAlert
            ? 'Sending National Call/SMS...'
            : canEscalate && nextLevel
              ? `Escalate to ${nextLevel}`
              : 'Top Level Reached'}
        </button>
      </div>
      {notificationMessage && (
        <p className="mt-3 text-xs text-red-100/90">{notificationMessage}</p>
      )}
    </div>
  );
};

export default EmergencyResponsePanel;
