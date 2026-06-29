

import React, { useState, useMemo } from 'react';
import { BugAntIcon, CircleStackIcon, MagnifyingGlassIcon, BuildingStorefrontIcon } from '@heroicons/react/24/solid';
import { ZoonoticAlert, RiskLevel, SlaughterhouseData } from '../types';
import { InfoTooltip } from './shared/common';

interface ZoonoticSurveillancePanelProps {
  alerts: ZoonoticAlert[];
  slaughterhouseAlerts?: SlaughterhouseData[];
  onAlertClick: (alert: ZoonoticAlert) => void;
  onSlaughterhouseAlertClick?: (alert: SlaughterhouseData) => void;
  dataSource: string;
  dataSourceTooltip?: string;
  slaughterhouseDataSource?: string;
  slaughterhouseDataSourceTooltip?: string;
  onViewLayer?: () => void;
}

const ZoonoticSurveillancePanel: React.FC<ZoonoticSurveillancePanelProps> = ({ alerts, slaughterhouseAlerts, onAlertClick, onSlaughterhouseAlertClick, dataSource, dataSourceTooltip, slaughterhouseDataSource, slaughterhouseDataSourceTooltip, onViewLayer }) => {
  const [locationFilter, setLocationFilter] = useState('');

  const getRiskColor = (risk: RiskLevel | SlaughterhouseData['riskLevel']) => {
    switch (risk) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Moderate': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  }

  const filteredZoonoticAlerts = useMemo(() => {
    let filtered = alerts;
    if (locationFilter.trim()) {
        filtered = filtered.filter(alert =>
            alert.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
    }
    return filtered;
  }, [alerts, locationFilter]);
  
  const filteredSlaughterhouseAlerts = useMemo(() => {
    if (!slaughterhouseAlerts) return [];
    let filtered = slaughterhouseAlerts;
    if (locationFilter.trim()) {
        filtered = filtered.filter(alert =>
            alert.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
    }
    return filtered;
  }, [slaughterhouseAlerts, locationFilter]);


  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg flex flex-col">
      <div className="mb-4">
        <h3 className="text-md font-semibold text-white flex items-center">
          <BugAntIcon className="w-5 h-5 mr-2 text-yellow-400" />
          Zoonotic Surveillance
        </h3>
        <div className="flex items-center text-xs text-gray-500 ml-7">
            <CircleStackIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <span>{dataSource}</span>
            {dataSourceTooltip && <div className="ml-1.5"><InfoTooltip text={dataSourceTooltip} /></div>}
        </div>
      </div>
      
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full bg-brand-dark border border-brand-light-blue rounded-md py-1.5 pl-8 pr-3 text-sm placeholder-gray-500 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
          aria-label="Filter zoonotic and slaughterhouse alerts by location"
        />
      </div>

      <div className="flex-grow overflow-y-auto max-h-60 pr-1">
        {/* Zoonotic Spillover Alerts */}
        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
            <BugAntIcon className="w-4 h-4 mr-2 text-yellow-400" />
            Spillover Alerts
        </h4>
        {filteredZoonoticAlerts.length > 0 ? (
          <div className="space-y-3 text-sm text-gray-400">
            {filteredZoonoticAlerts.map((alert, index) => (
              <div 
                key={`zoo-${index}`}
                className="p-3 bg-brand-dark rounded-md border border-brand-light-blue transition-all duration-200 hover:border-brand-accent hover:shadow-md cursor-pointer"
                onClick={() => onAlertClick(alert)}
                aria-label={`View details for ${alert.name} alert`}
                role="button"
              >
                <p className="font-semibold text-white">{alert.name}</p>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span>Hotspot: {alert.location}</span>
                  <span className={`${getRiskColor(alert.risk)} font-bold`}>Risk: {alert.risk}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xs py-2">
              No spillover alerts match criteria.
            </div>
        )}

        {/* Slaughterhouse Monitoring */}
        {slaughterhouseAlerts && onSlaughterhouseAlertClick && (
          <>
            <div className="border-t border-brand-light-blue/30 my-4"></div>
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                <BuildingStorefrontIcon className="w-4 h-4 mr-2 text-red-400" />
                Slaughterhouse Monitoring
            </h4>
            {slaughterhouseDataSource && (
              <div className="flex items-center text-xs text-gray-500 mb-2 ml-1">
                  <CircleStackIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  <span>{slaughterhouseDataSource}</span>
                  {slaughterhouseDataSourceTooltip && <div className="ml-1.5"><InfoTooltip text={slaughterhouseDataSourceTooltip} /></div>}
              </div>
            )}
            {filteredSlaughterhouseAlerts.length > 0 ? (
                <div className="space-y-3 text-sm text-gray-400">
                    {filteredSlaughterhouseAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="p-3 bg-brand-dark rounded-md border border-brand-light-blue transition-all duration-200 hover:border-brand-accent hover:shadow-md cursor-pointer"
                            onClick={() => onSlaughterhouseAlertClick(alert)}
                            aria-label={`View details for ${alert.location}`}
                            role="button"
                        >
                            <p className="font-semibold text-white">{alert.location}</p>
                            <div className="flex justify-between items-center text-xs mt-1">
                                <span>Hygiene: {alert.hygieneScore}/100</span>
                                <span className={`${getRiskColor(alert.riskLevel)} font-bold`}>Risk: {alert.riskLevel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center text-gray-500 text-xs py-2">
                    No slaughterhouse alerts match criteria.
                </div>
            )}
          </>
        )}
        <p className="text-xs text-center pt-4 text-gray-500">Click an alert for a detailed analysis.</p>
      </div>
      
      {onViewLayer && (
        <div className="mt-4 pt-4 border-t border-brand-light-blue/30">
          <button
            onClick={onViewLayer}
            className="w-full bg-brand-light-blue/50 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors text-sm"
          >
            View National Grid &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default ZoonoticSurveillancePanel;