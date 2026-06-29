import React, { useState } from 'react';
import { StateData } from '../types';

interface MapPath {
  id: string;
  name: string;
  d: string;
}

interface MapChartProps {
  title: string;
  data: StateData[];
  paths: MapPath[];
  onStateClick?: (stateId: string, stateName: string) => void;
}

interface TooltipData {
  x: number;
  y: number;
  content: React.ReactNode;
}

const MapChart: React.FC<MapChartProps> = ({ title, data, paths, onStateClick }) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const dataMap = new Map<string, StateData>(data.map(d => [d.id, d]));
  const maxValue = Math.max(...data.map(d => d.value), 1);

  const getColor = (value: number | undefined) => {
    if (value === undefined) return '#30363D'; // Default color for states with no data
    const intensity = Math.min(value / maxValue, 1.0);
    if (intensity > 0.8) return '#F85149'; // Severe
    if (intensity > 0.6) return '#e06c75'; // High
    if (intensity > 0.4) return '#D29922'; // Elevated
    if (intensity > 0.2) return '#e5c07b'; // Guarded
    return '#58A6FF'; // Low
  };

  const handleMouseOver = (e: React.MouseEvent<SVGPathElement>, state: MapPath) => {
    const stateData = dataMap.get(state.id);
    const content = (
      <>
        <p className="font-bold text-white whitespace-nowrap">{state.name}</p>
        <div className="mt-1 border-t border-brand-light-blue pt-1">
          <p>Cases: <span className="font-semibold text-white">{stateData?.value?.toLocaleString() ?? 'N/A'}</span></p>
          <p>Pathogen: <span className="font-semibold text-white">{stateData?.dominantPathogen ?? 'N/A'}</span></p>
        </div>
      </>
    );
    
    setTooltip({
      // Position tooltip with an offset from the cursor
      x: e.clientX + 15,
      y: e.clientY + 15,
      content: content,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    if (tooltip) {
      setTooltip(t => t ? { ...t, x: e.clientX + 15, y: e.clientY + 15 } : null);
    }
  };
  
  const handleMouseLeave = () => {
    setTooltip(null);
  };
  
  const handleClick = (state: MapPath) => {
    if (onStateClick) {
        onStateClick(state.id, state.name);
    }
  };

  return (
    <>
      <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg">
          <h3 className="text-md font-semibold text-white mb-2">{title}</h3>
          <svg viewBox="0 0 960 600" className="w-full h-auto">
              <g>
                  {paths.map(state => {
                      const stateData = dataMap.get(state.id);
                      const isClickable = !!onStateClick;
                      return (
                          <path
                              key={state.id}
                              d={state.d}
                              fill={getColor(stateData?.value)}
                              stroke="#0D1117"
                              strokeWidth="1"
                              className={`transition-all duration-200 hover:opacity-80 ${isClickable ? 'cursor-pointer hover:stroke-brand-accent' : ''}`}
                              style={{strokeWidth: isClickable ? 2 : 1}}
                              onMouseOver={(e) => handleMouseOver(e, state)}
                              onMouseMove={handleMouseMove}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleClick(state)}
                          />
                      )
                  })}
              </g>
          </svg>
          <div className="flex justify-center space-x-2 mt-2 text-xs">
            <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-[#58A6FF] mr-1"></div>Low</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-[#e5c07b] mr-1"></div>Guarded</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-[#D29922] mr-1"></div>Elevated</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-[#e06c75] mr-1"></div>High</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-[#F85149] mr-1"></div>Severe</span>
          </div>
      </div>
      
      {tooltip && (
          <div 
              className="fixed bg-brand-dark-blue/80 backdrop-blur-sm border border-brand-light-blue rounded-md shadow-lg p-2 text-sm text-gray-300 pointer-events-none z-50"
              style={{ 
                left: tooltip.x,
                top: tooltip.y
              }}
          >
              {tooltip.content}
          </div>
      )}
    </>
  );
};

export default MapChart;
