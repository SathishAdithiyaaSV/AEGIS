import React, { useState, useEffect } from 'react';
import { BioThreat } from '../types';
import { getBiothreatAnalysis } from '../services/geminiService';

const BiohazardIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" {...props}><path d="M413.4,271.6c-4-8.8-10.8-15.6-19.1-20.4c-8.4-4.8-18.4-7.2-28.7-7.2h-32.2c-5.1,0-9.2,4.1-9.2,9.2v0.1 c0,5.1,4.1,9.2,9.2,9.2h32.2c5.3,0,10.5,1,15.2,3.1c4.7,2.1,8.7,5.4,11.8,9.6c3.1,4.2,4.9,9.4,4.9,15.2c0,11-6.1,20.5-15.4,26.1 c-9.3,5.6-21.3,8.4-34.5,8.4h-32.2c-5.1,0-9.2,4.1-9.2,9.2v0.1c0,5.1,4.1,9.2,9.2,9.2h32.2c18.5,0,35.2-4.8,48.2-14.5 c13-9.7,20.4-23.5,20.4-38.9C422.5,286.3,418.6,278.4,413.4,271.6z M275.1,244.1h-38.2c-5.1,0-9.2,4.1-9.2,9.2v0.1 c0,5.1,4.1,9.2,9.2,9.2h38.2c5.1,0,9.2-4.1,9.2-9.2v-0.1C284.3,248.2,280.2,244.1,275.1,244.1z M256,512c141.4,0,256-114.6,256-256 S397.4,0,256,0S0,114.6,0,256S114.6,512,256,512z M371.3,138.6c-4-8.8-10.8-15.6-19.1-20.4c-8.4-4.8-18.4-7.2-28.7-7.2h-32.2 c-5.1,0-9.2,4.1-9.2,9.2v0.1c0,5.1,4.1,9.2,9.2,9.2h32.2c5.3,0,10.5,1,15.2,3.1c4.7,2.1,8.7,5.4,11.8,9.6c3.1,4.2,4.9,9.4,4.9,15.2 c0,11-6.1,20.5-15.4,26.1c-9.3,5.6-21.3,8.4-34.5,8.4h-32.2c-5.1,0-9.2,4.1-9.2,9.2v0.1c0,5.1,4.1,9.2,9.2,9.2h32.2 c18.5,0,35.2-4.8,48.2-14.5c13-9.7,20.4-23.5,20.4-38.9C380.4,153.3,376.5,145.4,371.3,138.6z M275.1,357.9h-38.2 c-5.1,0-9.2,4.1-9.2,9.2v0.1c0,5.1,4.1,9.2,9.2,9.2h38.2c5.1,0,9.2-4.1,9.2-9.2v-0.1C284.3,362,280.2,357.9,275.1,357.9z M178.6,183.8c-9.3,5.6-21.3,8.4-34.5,8.4h-32.2c-5.1,0-9.2,4.1-9.2,9.2v0.1c0,5.1,4.1,9.2,9.2,9.2h32.2c18.5,0,35.2-4.8,48.2-14.5 c13-9.7,20.4-23.5,20.4-38.9c0-7.8-3.9-15.7-9.1-22.5c-4-8.8-10.8-15.6-19.1-20.4c-8.4-4.8-18.4-7.2-28.7-7.2h-32.2 c-5.1,0-9.2,4.1-9.2,9.2v0.1c0,5.1,4.1,9.2,9.2,9.2h32.2c5.3,0,10.5,1,15.2,3.1c4.7,2.1,8.7,5.4,11.8,9.6 c3.1,4.2,4.9,9.4,4.9,15.2C184.7,163.3,178.6,183.8,178.6,183.8z M98.6,244.1h32.2c5.1,0,9.2,4.1,9.2,9.2v0.1 c0,5.1-4.1,9.2-9.2,9.2h-32.2c-5.3,0-10.5,1-15.2,3.1c-4.7,2.1-8.7,5.4-11.8,9.6c-3.1,4.2-4.9,9.4-4.9,15.2 c0,11,6.1,20.5,15.4,26.1c9.3,5.6,21.3,8.4,34.5,8.4h32.2c5.1,0,9.2,4.1,9.2,9.2v0.1c0,5.1-4.1,9.2-9.2,9.2H123 c-18.5,0-35.2-4.8-48.2-14.5c-13-9.7-20.4-23.5-20.4-38.9c0-7.8,3.9-15.7,9.1-22.5c4-8.8-10.8-15.6-19.1-20.4 C91.1,245.9,98.6,244.1,98.6,244.1z"/></svg>
);


interface BiowarfareThreatMatrixProps {
  threats: BioThreat[];
}

const BiowarfareThreatMatrix: React.FC<BiowarfareThreatMatrixProps> = ({ threats }) => {
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      setIsLoading(true);
      try {
        const results = await getBiothreatAnalysis(threats);
        setSummaries(results);
      } catch (error) {
        console.error("Failed to fetch biothreat summaries", error);
        const errorSummaries = threats.reduce((acc, threat) => {
            acc[threat.agent] = "Error fetching summary.";
            return acc;
        }, {} as Record<string, string>);
        setSummaries(errorSummaries);
      } finally {
        setIsLoading(false);
      }
    };
    if (threats.length > 0) fetchSummaries();
  }, [threats]);
  
  const getStatusColor = (status: BioThreat['status']) => {
      if (status === 'Confirmed Release') return 'text-red-400';
      if (status === 'Credible Intel') return 'text-orange-400';
      return 'text-yellow-400';
  }
  
  const getStatusDotColor = (status: BioThreat['status']) => {
      if (status === 'Confirmed Release') return 'bg-red-500 animate-pulse';
      if (status === 'Credible Intel') return 'bg-orange-400';
      return 'bg-yellow-400';
  }

  const getLethalityColor = (level: number) => {
    if (level > 8) return 'bg-red-600 text-red-100';
    if (level > 6) return 'bg-orange-600 text-orange-100';
    return 'bg-yellow-600 text-yellow-100';
  };

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-4 shadow-lg h-full">
      <h3 className="text-md font-semibold text-white mb-3 flex items-center">
        <BiohazardIconSolid className="w-5 h-5 mr-2 text-red-500" />
        Biowarfare Threat Matrix
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-brand-dark">
            <tr>
              <th scope="col" className="px-4 py-2">Threat Agent</th>
              <th scope="col" className="px-4 py-2">Lethality</th>
              <th scope="col" className="px-4 py-2">Status</th>
              <th scope="col" className="px-4 py-2">Countermeasure</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((threat) => (
              <tr key={threat.id} className="border-b border-brand-light-blue transition-all duration-200 hover:bg-brand-light-blue/20">
                <td className="px-4 py-3">
                  <div className="font-semibold text-white">{threat.agent}</div>
                  <div className="text-xs text-gray-500">{threat.agentType} / {threat.origin}</div>
                  <div className="mt-2 text-xs text-gray-300 min-h-[16px]">
                    {isLoading ? <div className="w-full h-3 bg-brand-light-blue rounded-full animate-pulse"></div> : summaries[threat.agent]}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${getLethalityColor(threat.lethality)}`}>
                    {threat.lethality}/10
                  </span>
                </td>
                <td className={`px-4 py-3 font-semibold align-top ${getStatusColor(threat.status)}`}>
                    <div className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${getStatusDotColor(threat.status)}`}></span>
                        {threat.status}
                    </div>
                </td>
                <td className="px-4 py-3 align-top">{threat.countermeasures}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiowarfareThreatMatrix;