import React, { useState, useMemo, useEffect } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Alert } from '../types';

interface AlertsPanelProps {
    alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts: mockAlerts }) => {
  const [severityFilter, setSeverityFilter] = useState<'All' | Alert['severity']>('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'severity'>('newest');
  
  // Reset filters when the underlying data changes
  useEffect(() => {
    setSeverityFilter('All');
    setLocationFilter('');
    setSortBy('newest');
  }, [mockAlerts]);

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

  const filteredAndSortedAlerts = useMemo(() => {
    let alerts = [...mockAlerts]; // Create a mutable copy

    // Filtering
    if (severityFilter !== 'All') {
        alerts = alerts.filter(alert => alert.severity === severityFilter);
    }
    if (locationFilter.trim() !== '') {
        alerts = alerts.filter(alert =>
            alert.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
    }

    // Sorting
    alerts.sort((a, b) => {
        if (sortBy === 'severity') {
            const severityOrder = { 'Critical': 3, 'High': 2, 'Moderate': 1 };
            // Primary sort by severity, secondary by date
            if (severityOrder[b.severity] !== severityOrder[a.severity]) {
               return severityOrder[b.severity] - severityOrder[a.severity];
            }
        }
        // Default to newest or as secondary sort for severity
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return alerts;
  }, [mockAlerts, severityFilter, locationFilter, sortBy]);

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center">
        <BellIcon className="w-5 h-5 mr-2 text-gray-400" />
        Active Alerts
      </h3>

      {/* Filter and Sort Controls */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-brand-dark border border-brand-light-blue rounded-md py-1.5 pl-8 pr-3 text-sm placeholder-gray-500 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
            aria-label="Filter alerts by location"
          />
        </div>
        <div className="flex space-x-2 text-sm">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="flex-1 bg-brand-dark border border-brand-light-blue rounded-md py-1.5 px-2 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
            aria-label="Filter alerts by severity"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="flex-1 bg-brand-dark border border-brand-light-blue rounded-md py-1.5 px-2 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
            aria-label="Sort alerts"
          >
            <option value="newest">Sort: Newest</option>
            <option value="severity">Sort: Severity</option>
          </select>
        </div>
      </div>

      <ul className="space-y-3 flex-grow overflow-y-auto max-h-60 pr-1">
        {filteredAndSortedAlerts.length > 0 ? (
          filteredAndSortedAlerts.map(alert => (
            <li key={alert.id} className={`p-3 rounded-md border-l-4 ${getSeverityClass(alert.severity)}`}>
              <p className="font-semibold text-sm">{alert.title}</p>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                <span>{alert.location}</span>
                <span>{alert.timestamp}</span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 text-sm py-8">
            No alerts match your criteria.
          </li>
        )}
      </ul>
    </div>
  );
};

export default AlertsPanel;
