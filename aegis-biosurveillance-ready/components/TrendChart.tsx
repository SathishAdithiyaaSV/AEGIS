
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeSeriesData } from '../types';

interface TrendChartProps {
  title: string;
  data: TimeSeriesData[];
  color: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ title, data, color }) => {
  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 h-80 shadow-lg">
      <h3 className="text-md font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
          <XAxis dataKey="name" stroke="#8B949E" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#8B949E" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#161B22',
              borderColor: '#30363D',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#c9d1d9' }}
            itemStyle={{ color: color }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
