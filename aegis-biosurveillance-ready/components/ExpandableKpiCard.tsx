import React, { useState } from 'react';
import { Kpi } from '../types';
import { ChevronDownIcon, ChevronUpIcon, MapPinIcon, BuildingOffice2Icon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

interface ExpandableKpiCardProps {
  kpi: Kpi;
}

const renderDetails = (kpi: Kpi) => {
  if (!kpi.details) return null;

  switch (kpi.details.type) {
    case 'trend_prediction': {
      const details = kpi.details;
      const lastHistoricalPoint = details.data[details.data.length - 1];
      const chartData = [
          ...details.data,
          { name: details.prediction.name, prediction: details.prediction.value }
      ];
      // Add a 'prediction' value to the last historical point to connect the lines
      const lastHistPointIndex = chartData.findIndex(p => p.name === lastHistoricalPoint.name);
      if(lastHistPointIndex !== -1) {
          chartData[lastHistPointIndex] = {...chartData[lastHistPointIndex], prediction: lastHistoricalPoint.value};
      }
      
      return (
        <div className="space-y-4">
          <p className="text-xs text-gray-400">{details.summary}</p>
          <div className="h-48">
             <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#58A6FF" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                    <XAxis dataKey="name" stroke="#8B949E" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8B949E" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: '#161B22',
                        borderColor: '#30363D',
                        borderRadius: '0.5rem',
                        }}
                        labelStyle={{ color: '#c9d1d9' }}
                    />
                    <Area type="monotone" dataKey="value" strokeWidth={0} fillOpacity={1} fill="url(#colorValue)" />
                    <Line type="monotone" dataKey="value" stroke="#58A6FF" strokeWidth={2} dot={false} name="Cases" />
                    <Line type="monotone" dataKey="prediction" stroke="#238636" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} name="Prediction" />
                </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    case 'population_risk': {
      const getRiskColor = (level: 'Critical' | 'High' | 'Moderate') => {
        switch (level) {
          case 'Critical': return 'bg-red-500';
          case 'High': return 'bg-orange-500';
          case 'Moderate': return 'bg-yellow-500';
        }
      };
      return (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Risk Breakdown by Region</h4>
          <ul className="space-y-2 text-sm">
            {kpi.details.data.map(item => (
              <li key={item.location} className="flex items-center justify-between p-2 bg-brand-dark rounded-md">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${getRiskColor(item.riskLevel)}`}></span>
                  <span className="text-gray-300">{item.location}</span>
                </div>
                <span className="font-bold text-white">{item.population}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case 'hotspots': {
      return (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Priority Hotspot Locations</h4>
            <ul className="space-y-3">
                {kpi.details.data.map(item => (
                    <li key={item.location} className="p-3 bg-brand-dark rounded-md border-l-4 border-brand-accent">
                        <p className="font-semibold text-white flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />{item.location}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-start"><ExclamationTriangleIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />{item.details}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-start"><BuildingOffice2Icon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />{item.localBody}</p>
                    </li>
                ))}
            </ul>
        </div>
      );
    }
    default:
      return <p className="text-sm text-gray-500">No detailed view available.</p>;
  }
};

const ExpandableKpiCard: React.FC<ExpandableKpiCardProps> = ({ kpi }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, value, change, changeType, icon: Icon } = kpi;
  const changeColor = changeType === 'increase' ? 'text-red-400' : 'text-green-400';

  return (
    <div 
        className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-5 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-brand-accent hover:shadow-glow cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
    >
        <div className="absolute -top-4 -right-4">
            <Icon className="h-24 w-24 text-white/5" />
        </div>
        <div className="relative z-10">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-400 truncate">{title}</p>
                    <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
                </div>
                 {isExpanded ? 
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" /> : 
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" /> 
                }
            </div>
            <p className={`mt-2 text-sm ${changeColor}`}>
                {change}
            </p>
        </div>
        {isExpanded && (
            <div className="relative z-10 mt-4 pt-4 border-t border-brand-light-blue/50 animate-fadeIn">
                {renderDetails(kpi)}
            </div>
        )}
    </div>
  );
};

export default ExpandableKpiCard;