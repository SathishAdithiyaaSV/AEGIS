import { ReadinessStatus } from '../types';

const nationalReadiness: ReadinessStatus[] = [
  {
    organization: 'National Disaster Response Force (NDRF)',
    status: 'Standby',
    personnel: '2 battalions (approx. 2,200 personnel) on high alert.',
    equipment: 'Hazmat units, mobile hospitals, and communication gear ready for deployment.',
    updateTime: '15 mins ago',
  },
  {
    organization: 'Indian Council of Medical Research (ICMR)',
    status: 'Mobilizing',
    personnel: 'Epidemiological investigation teams are being formed.',
    equipment: 'Mobile BSL-3 labs are being prepared for transport to the affected region.',
    updateTime: '5 mins ago',
  },
  {
    organization: 'National Centre for Disease Control (NCDC)',
    status: 'Engaged',
    personnel: 'Central Surveillance Unit actively coordinating with state-level counterparts.',
    equipment: 'Genomic sequencing labs are processing samples from the alert region.',
    updateTime: '2 mins ago',
  },
];

const stateReadiness: Record<string, ReadinessStatus[]> = {
  Kerala: [
    {
      organization: 'State Disaster Management Authority (SDMA)',
      status: 'Engaged',
      personnel: 'State Emergency Operations Center is fully activated.',
      equipment: 'Coordinating with district collectors for resource allocation.',
      updateTime: '3 mins ago',
    },
    {
      organization: 'Kerala Public Health Department',
      status: 'Mobilizing',
      personnel: 'Rapid Response Teams (RRTs) deployed to all affected districts.',
      equipment: 'Distributing emergency medical supplies and PPE from state stockpile.',
      updateTime: '8 mins ago',
    },
     {
      organization: 'Kerala Medical Services Corporation',
      status: 'Standby',
      personnel: 'Logistics teams are on standby for drug and vaccine distribution.',
      equipment: 'Cold chain transport fleet is fueled and ready.',
      updateTime: '25 mins ago',
    },
  ],
  // Add other states here if needed
};

const districtReadiness: Record<string, ReadinessStatus[]> = {
  Ernakulam: [
    {
      organization: 'District Medical Office (DMO)',
      status: 'Engaged',
      personnel: 'Field surveillance teams are conducting contact tracing and house-to-house surveys.',
      equipment: 'All Primary Health Centers (PHCs) are on high alert; fever clinics are operational 24/7.',
      updateTime: '2 mins ago',
    },
    {
      organization: "District Collector's Office",
      status: 'Mobilizing',
      personnel: 'Coordinating inter-departmental response (Police, Fire, Revenue).',
      equipment: 'Setting up control rooms and public information helplines.',
      updateTime: '10 mins ago',
    },
    {
      organization: 'Local Police & Fire Services',
      status: 'Ready',
      personnel: 'All units briefed. Ready to assist with transport and crowd control if needed.',
      equipment: 'Ambulances and emergency vehicles are on standby.',
      updateTime: '30 mins ago',
    }
  ],
  // Add other districts here if needed
};

export const getReadinessData = (level: 'National' | 'State' | 'District', location: string): ReadinessStatus[] => {
    switch(level) {
        case 'National':
            return nationalReadiness;
        case 'State':
            return stateReadiness[location] || stateReadiness['Kerala']; // Default to Kerala for demo
        case 'District':
            return districtReadiness[location] || districtReadiness['Ernakulam']; // Default to Ernakulam for demo
        default:
            return [];
    }
};
