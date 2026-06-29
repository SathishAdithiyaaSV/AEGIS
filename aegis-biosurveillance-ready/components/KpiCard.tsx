
import React from 'react';
import { Kpi } from '../types';

const KpiCard: React.FC<Kpi> = ({ title, value, change, changeType, icon: Icon }) => {
  const changeColor = changeType === 'increase' ? 'text-red-400' : 'text-green-400';
  
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-5 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-brand-accent hover:shadow-glow">
        <div className="absolute -top-4 -right-4">
            <Icon className="h-24 w-24 text-white/5" />
        </div>
        <div className="relative z-10">
            <p className="text-sm font-medium text-gray-400 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
            <p className={`mt-2 text-sm ${changeColor}`}>
                {change}
            </p>
        </div>
    </div>
  );
};

export default KpiCard;
