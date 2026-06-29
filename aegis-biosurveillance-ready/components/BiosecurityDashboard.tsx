import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import {
  biowarfareThreatsUS,
  nationalLabNetworkStatusUS,
  odinSignalsUS,
  supplyChainDataUS,
  biowarfareThreatsIndia,
  nationalLabNetworkStatusIndia,
  odinSignalsIndia,
  supplyChainDataIndia,
} from '../data/constants';
import BiowarfareThreatMatrix from './BiowarfareThreatMatrix';
import NationalLabNetwork from './NationalLabNetwork';
import ThreatSentinelPanel from './odin/ThreatSentinelPanel';
import GenomicAttributionModal from './odin/GenomicAttributionModal';
import { OdinSignal } from '../types';
import DynamicPlumeModel from './odin/DynamicPlumeModel';
import SupplyChainPanel from './odin/SupplyChainPanel';

interface BiosecurityDashboardProps {
  country: 'US' | 'India';
  onBack: () => void;
}

const BiosecurityDashboard: React.FC<BiosecurityDashboardProps> = ({ country, onBack }) => {
  const [selectedSignal, setSelectedSignal] = useState<OdinSignal | null>(null);
  const [simulatingSignal, setSimulatingSignal] = useState<OdinSignal | null>(null);


  const data = country === 'US' ? {
    biowarfareThreats: biowarfareThreatsUS,
    labNetwork: nationalLabNetworkStatusUS,
    odinSignals: odinSignalsUS,
    supplyChain: supplyChainDataUS,
  } : {
    biowarfareThreats: biowarfareThreatsIndia,
    labNetwork: nationalLabNetworkStatusIndia,
    odinSignals: odinSignalsIndia,
    supplyChain: supplyChainDataIndia,
  };

  if (simulatingSignal) {
    return (
      <DynamicPlumeModel 
        signal={simulatingSignal}
        onClose={() => setSimulatingSignal(null)}
      />
    );
  }

  return (
    <>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Project ODIN Command Center ({country})
          </h1>
          <button
            onClick={onBack}
            className="bg-brand-light-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-accent transition-colors flex items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Main Dashboard
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Intelligence & Readiness */}
          <div className="space-y-6">
            <ThreatSentinelPanel 
              signals={data.odinSignals}
              onSignalSelect={setSelectedSignal}
              onInitiateSimulation={setSimulatingSignal}
            />
            <NationalLabNetwork labs={data.labNetwork} />
          </div>

          {/* Right Column: Strategic Vulnerabilities */}
          <div className="space-y-6">
            <BiowarfareThreatMatrix threats={data.biowarfareThreats} />
            <SupplyChainPanel analysisData={data.supplyChain} />
          </div>
        </div>

      </div>
      
      {selectedSignal && (
        <GenomicAttributionModal
          signal={selectedSignal}
          onClose={() => setSelectedSignal(null)}
        />
      )}
    </>
  );
};

export default BiosecurityDashboard;
