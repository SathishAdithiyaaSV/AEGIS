import { ArrowTrendingUpIcon, UsersIcon, GlobeAltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// FIX: Import missing PestInfestationAlert and CropDiseaseAlert types
import { Kpi, TimeSeriesData, StateData, Alert, Threat, HumanHealthData, ZoonoticAlert, EnvironmentalAlert, WildlifeAlert, DisasterAlert, VaccineInventoryItem, GenomicSignal, BioThreat, LabStatus, NationalBiosecurityIndexData, RiskLevel, BiologicalWeaponSignal, ChemicalWeaponSignal, LivestockAlert, SlaughterhouseData, PestInfestationAlert, CropDiseaseAlert, TransitAlert } from '../types';

// --- USA DATA ---

export const kpiData: Kpi[] = [
  {
    title: 'New Cases (24h)',
    value: '14,289',
    change: '+5.2% vs yesterday',
    changeType: 'increase',
    icon: ArrowTrendingUpIcon,
  },
  {
    title: 'Population at Risk',
    value: '12.5M',
    change: '-1.8% vs last week',
    changeType: 'decrease',
    icon: UsersIcon,
  },
  {
    title: 'Active Hotspots',
    value: '42',
    change: '+3 since last report',
    changeType: 'increase',
    icon: GlobeAltIcon,
  },
];

const humanHealthDataUS: HumanHealthData = {
  newCases: 14289,
  newCasesChange: 5.2,
  activeHotspots: 42,
  hospitalizationRate: 8.2,
  icuRate: 2.1,
};

const zoonoticAlertsUS: ZoonoticAlert[] = [
  { name: 'Avian Influenza (H5N1)', location: 'Poultry farms, IA', risk: 'High', interfaceProximity: 'Direct' },
  { name: 'Canine Distemper Virus', location: 'Stray population, AZ', risk: 'Moderate', interfaceProximity: 'High' },
];

const environmentalAlertsUS: EnvironmentalAlert[] = [
  { name: 'Influenza A RNA Spike', location: 'Chicago Sentinel Site #2', status: 'Trending', signalStrength: 150 },
  { name: 'Poliovirus Traces', location: 'NYC Sentinel Site #4', status: 'Confirmed' },
];

const wildlifeAlertsUS: WildlifeAlert[] = [
  { species: 'White-tailed Deer', disease: 'Chronic Wasting Disease (CWD)', location: 'Wisconsin, USA', riskToHumans: 'Unknown', potentialImpact: 'Ecosystem disruption, potential long-term risk.' },
  { species: 'Wild Boar', disease: 'African Swine Fever (ASF)', location: 'Feral populations, Southern US', riskToHumans: 'Low', potentialImpact: 'Major threat to domestic swine industry.' },
];

const disasterAlertsUS: DisasterAlert[] = [
  { disasterType: 'Hurricane', location: 'Gulf Coast, USA', severity: 'Major', associatedDiseaseRisks: ['Vibrio infections', 'Leptospirosis', 'Mosquito-borne diseases'] },
  { disasterType: 'Wildfire', location: 'California, USA', severity: 'Major', associatedDiseaseRisks: ['Respiratory illnesses from smoke', 'Contaminated water sources'] },
];

const vaccineInventoryUS: VaccineInventoryItem[] = [
  { name: 'Aegis-FluVax (mRNA)', targetPathogen: 'Influenza A (H3N2)', type: 'mRNA', dosesAvailable: 15_000_000, monthlyProductionCapacity: 5_000_000, efficacy: 92, wastageRate: 5 },
  { name: 'CovaShield (Viral Vector)', targetPathogen: 'SARS-CoV-2', type: 'Viral Vector', dosesAvailable: 40_000_000, monthlyProductionCapacity: 10_000_000, efficacy: 88, wastageRate: 8 },
  { name: 'NoroVax (Subunit)', targetPathogen: 'Norovirus', type: 'Subunit', dosesAvailable: 5_000_000, monthlyProductionCapacity: 1_000_000, efficacy: 75, wastageRate: 12 },
];

const genomicSignalsUS: GenomicSignal[] = [
  { id: 'us1', strainName: 'Influenza A (H3N2) - 2b.1a', location: 'Midwest Region', significance: 'Vaccine Escape', summary: 'A new clade showing reduced neutralization from current vaccine antibodies.', dataSource: 'CDC NS3' },
  { id: 'us2', strainName: 'SARS-CoV-2 (KP.3)', location: 'National', significance: 'Increased Transmissibility', summary: 'A FLiRT variant rapidly becoming dominant, though severity appears unchanged.', dataSource: 'GISAID' },
];

const biologicalWeaponSignalsUS: BiologicalWeaponSignal[] = [
    { agent: 'B. anthracis Spores', signatureType: 'Genomic', location: 'Washington D.C. Metro', status: 'Trending', signalStrength: 350, sourceType: 'Aerosol Sampler' },
    { agent: 'Botulinum Toxin', signatureType: 'Protein', location: 'Denver Water Reservoir', status: 'Confirmed', signalStrength: 980, sourceType: 'Water Reservoir' },
];

const chemicalWeaponSignalsUS: ChemicalWeaponSignal[] = [
    { agent: 'Sarin (GB)', signatureType: 'Mass Spec', location: 'New York City Subway', status: 'Confirmed', concentration: 25, sourceType: 'Air Quality Sensor' },
    { agent: 'Chlorine Gas', signatureType: 'Sensor Network', location: 'Port of Los Angeles', status: 'Trending', concentration: 8, sourceType: 'Air Quality Sensor' },
];

const slaughterhouseDataUS: SlaughterhouseData[] = [
  { id: 'us_sh_1', location: 'Omaha, NE Processing Plant', hygieneScore: 65, pathogensDetected: ['Listeria monocytogenes'], riskLevel: 'Moderate' },
  { id: 'us_sh_2', location: 'Greeley, CO Facility', hygieneScore: 52, pathogensDetected: ['E. coli O157:H7', 'Salmonella'], riskLevel: 'High' },
];

export const pestInfestationAlertsUS: PestInfestationAlert[] = [
  { pest: 'Spotted Lanternfly', cropType: 'Vineyards/Orchards', severity: 'High', economicImpact: 'High', summary: 'Severe infestations spreading across Mid-Atlantic states, threatening grape and apple harvests.' },
  { pest: 'Corn Rootworm', cropType: 'Corn', severity: 'Moderate', economicImpact: 'Moderate', summary: 'Increased resistance to Bt corn noted in Midwest fields.' },
];

export const cropDiseaseAlertsUS: CropDiseaseAlert[] = [
  { disease: 'Citrus Greening', cropType: 'Citrus', threatLevel: 'Critical', potentialYieldLoss: 60 },
  { disease: 'Soybean Rust', cropType: 'Soybeans', threatLevel: 'Moderate', potentialYieldLoss: 15 },
];

export const oneHealthIndexDataUS = {
  human: humanHealthDataUS,
  zoonotic: zoonoticAlertsUS,
  environmental: environmentalAlertsUS,
  wildlife: wildlifeAlertsUS,
  disasters: disasterAlertsUS,
  vaccineInventory: vaccineInventoryUS,
  genomic: genomicSignalsUS,
  biological: biologicalWeaponSignalsUS,
  // FIX: Added missing chemical property.
  chemical: chemicalWeaponSignalsUS,
  slaughterhouses: slaughterhouseDataUS,
};

// --- NEW BIO-WARFARE & NATIONAL SECURITY DATA (USA) ---

export const biowarfareThreatsUS: BioThreat[] = [
  {
    id: 'bw1',
    agent: 'Weaponized Anthrax (B. anthracis)',
    agentType: 'Bacterial',
    origin: 'State-Sponsored',
    lethality: 9,
    status: 'Credible Intel',
    countermeasures: 'Vaccine Available',
    summaryPrompt: 'Analyze the strategic threat of an aerosolized release of weaponized Anthrax in a major US metropolitan area. Focus on initial casualty estimates and the critical window for antibiotic distribution.'
  },
  {
    id: 'bw2',
    agent: 'Engineered H5N1 (Avian Flu)',
    agentType: 'Viral',
    origin: 'Non-State Actor',
    lethality: 8,
    status: 'Pre-emptive Warning',
    countermeasures: 'Limited',
    summaryPrompt: 'Analyze the strategic threat of an engineered H5N1 strain with enhanced human-to-human transmissibility. Focus on its pandemic potential and the strain on global vaccine production.'
  },
  {
    id: 'bw3',
    agent: 'Ricin Toxin',
    agentType: 'Toxin',
    origin: 'Unknown',
    lethality: 7,
    status: 'Credible Intel',
    countermeasures: 'None',
    summaryPrompt: 'Analyze the strategic threat of Ricin toxin dissemination through a contaminated food supply chain. Focus on the difficulty of early detection and the potential for mass casualties before a source is identified.'
  },
];

export const nationalLabNetworkStatusUS: LabStatus[] = [
    { id: 'lab1', name: 'USAMRIID', location: 'Fort Detrick, MD', bsl: 4, status: 'High-Alert' },
    { id: 'lab2', name: 'CDC IRF', location: 'Atlanta, GA', bsl: 4, status: 'Nominal' },
    { id: 'lab3', name: 'Galveston National Lab', location: 'Galveston, TX', bsl: 4, status: 'Surge Capacity' },
    { id: 'lab4', name: 'NEIDL, Boston University', location: 'Boston, MA', bsl: 4, status: 'Nominal' },
    { id: 'lab5', name: 'RML, NIAID', location: 'Hamilton, MT', bsl: 3, status: 'Nominal' },
];

export const nationalBiosecurityIndexDataUS: NationalBiosecurityIndexData = {
    score: 82,
    level: 'High',
    breakdown: {
        intel: { score: 85, contextPrompt: 'Analyze the current intelligence landscape for bio-threats against the US. The current score is 85/100, indicating high risk. Focus on the implications of high-volume chatter from non-state actors regarding B. anthracis.' },
        labReadiness: { score: 75, contextPrompt: 'Assess the US BSL-4 lab network readiness. The score is 75/100. While key labs are on high-alert, network-wide surge capacity activation is lagging. What are the primary vulnerabilities?' },
        countermeasures: { score: 60, contextPrompt: 'Evaluate the US Strategic National Stockpile\'s readiness. The score is 60/100, indicating a significant gap. Focus on the risk posed by limited novel antiviral and antitoxin supplies versus the adequate antibiotic reserves.' },
        populationVulnerability: { score: 90, contextPrompt: 'Analyze the US population\'s vulnerability to an aerosolized bio-threat. The score is 90/100, indicating extreme vulnerability. Focus on high population density in coastal megacities as the primary risk factor.' },
    }
};

export const respiratoryTrendData: TimeSeriesData[] = [
    { name: '8w ago', value: 1200 },
    { name: '7w ago', value: 1500 },
    { name: '6w ago', value: 1400 },
    { name: '5w ago', value: 1800 },
    { name: '4w ago', value: 2200 },
    { name: '3w ago', value: 2500 },
    { name: '2w ago', value: 3100 },
    { name: 'Last week', value: 3500 },
    { name: 'This week', value: 4200 },
];

export const gastrointestinalTrendData: TimeSeriesData[] = [
    { name: '8w ago', value: 800 },
    { name: '7w ago', value: 900 },
    { name: '6w ago', value: 850 },
    { name: '5w ago', value: 1100 },
    { name: '4w ago', value: 1000 },
    { name: '3w ago', value: 1200 },
    { name: '2w ago', value: 1300 },
    { name: 'Last week', value: 1150 },
    { name: 'This week', value: 1250 },
];

export const mapData: StateData[] = [
    { id: 'CA', name: 'California', value: 2500, dominantPathogen: 'Influenza A (H3N2)' },
    { id: 'TX', name: 'Texas', value: 1800, dominantPathogen: 'Norovirus' },
    { id: 'FL', name: 'Florida', value: 2100, dominantPathogen: 'Influenza A (H3N2)' },
    { id: 'NY', name: 'New York', value: 1500, dominantPathogen: 'RSV' },
    { id: 'IL', name: 'Illinois', value: 900, dominantPathogen: 'RSV' },
    { id: 'PA', name: 'Pennsylvania', value: 850, dominantPathogen: 'Influenza B' },
    { id: 'OH', name: 'Ohio', value: 700, dominantPathogen: 'Norovirus' },
    { id: 'GA', name: 'Georgia', value: 1100, dominantPathogen: 'Influenza A (H3N2)' },
    { id: 'NC', name: 'North Carolina', value: 950, dominantPathogen: 'Influenza A (H3N2)' },
    { id: 'MI', name: 'Michigan', value: 600, dominantPathogen: 'RSV' },
    { id: 'WA', name: 'Washington', value: 1300, dominantPathogen: 'Influenza A (H3N2)' },
    { id: 'AZ', name: 'Arizona', value: 1400, dominantPathogen: 'Norovirus' },
];

const now = new Date();
export const mockAlerts: Alert[] = [
  {
    id: 1,
    title: 'Unseasonal Influenza A Spike',
    location: 'Miami-Dade County, FL',
    timestamp: '2 hours ago',
    severity: 'Critical',
    date: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: 'Multi-facility Norovirus Outbreak',
    location: 'Houston, TX',
    timestamp: '8 hours ago',
    severity: 'High',
    date: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: 'Increased RSV cases in Pediatrics',
    location: 'New York City, NY',
    timestamp: '1 day ago',
    severity: 'Moderate',
    date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
  },
   {
    id: 4,
    title: 'Possible Measles Exposure Event',
    location: 'Los Angeles Int\'l Airport',
    timestamp: '2 days ago',
    severity: 'High',
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_DATA_SUMMARY = `
- **Overall Trend:** National cases up 5.2% (24h), driven by respiratory illnesses.
- **Influenza A (H3N2):** Major spike in FL, CA, WA (+25% week-over-week).
- **Norovirus:** Significant outbreak in TX (+40% vs baseline).
- **RSV:** Rising pediatric cases in NY & IL.
- **Hotspots:** 42 active national hotspots, with 3 new in major cities.
`;

export const threatSpectrumDataUS: Threat[] = [
  {
    name: 'Influenza A (H3N2)',
    threatLevel: 85,
    trend: 'increasing',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Influenza A (H3N2) in the USA, focusing on its high prevalence in the Southeast.'
  },
  {
    name: 'Norovirus',
    threatLevel: 70,
    trend: 'increasing',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Norovirus GII.4 in the USA, noting its rapid spread in Texas.'
  },
  {
    name: 'RSV',
    threatLevel: 60,
    trend: 'stable',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Respiratory Syncytial Virus (RSV) in the USA, highlighting its impact on pediatric populations in the Northeast.'
  },
  {
    name: 'Influenza B',
    threatLevel: 45,
    trend: 'decreasing',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Influenza B in the USA, mentioning its waning case numbers post-peak season.'
  }
];

export const US_STATE_PATHS = [
    { id: 'AL', name: 'Alabama', d: 'M334 312 L338 312 L339 303 L349 303 L358 320 L358 324 L352 336 L348 336 L335 309 Z' },
    { id: 'AZ', name: 'Arizona', d: 'M145 231 L145 301 L197 301 L197 289 L211 289 L211 220 L180 220 Z' },
    { id: 'AR', name: 'Arkansas', d: 'M302 268 L302 291 L352 291 L352 284 L358 284 L358 268 Z' },
    { id: 'CA', name: 'California', d: 'M57 151 L57 289 L104 289 L130 258 L145 264 L145 231 L112 151 Z' },
    { id: 'CO', name: 'Colorado', d: 'M197 220 L197 268 L265 268 L265 220 Z' },
    { id: 'FL', name: 'Florida', d: 'M385 303 L385 352 L411 352 L411 332 L399 315 L392 315 L388 303 Z' },
    { id: 'GA', name: 'Georgia', d: 'M358 303 L358 336 L385 336 L385 303 Z' },
    { id: 'ID', name: 'Idaho', d: 'M145 151 L145 220 L197 220 L197 180 L180 151 Z' },
    { id: 'IL', name: 'Illinois', d: 'M322 206 L322 268 L352 268 L352 238 L345 220 Z' },
    { id: 'IN', name: 'Indiana', d: 'M352 220 L352 268 L375 268 L375 220 Z' },
    { id: 'IA', name: 'Iowa', d: 'M281 206 L281 245 L345 245 L345 206 Z' },
    { id: 'KS', name: 'Kansas', d: 'M247 268 L247 301 L324 301 L324 268 Z' },
    { id: 'KY', name: 'Kentucky', d: 'M352 245 L352 268 L405 268 L405 250 L375 245 Z' },
    { id: 'LA', name: 'Louisiana', d: 'M302 291 L302 324 L358 324 L358 291 Z' },
    { id: 'ME', name: 'Maine', d: 'M462 121 L462 166 L488 166 L488 141 Z' },
    { id: 'MD', name: 'Maryland', d: 'M428 220 L428 238 L446 238 L446 220 Z' },
    { id: 'MA', name: 'Massachusetts', d: 'M456 166 L456 186 L482 186 L482 166 Z' },
    { id: 'MI', name: 'Michigan', d: 'M345 158 L345 206 L382 206 L382 180 Z' },
    { id: 'MN', name: 'Minnesota', d: 'M265 158 L265 220 L322 220 L322 158 Z' },
    { id: 'MS', name: 'Mississippi', d: 'M324 291 L324 336 L352 336 L352 291 Z' },
    { id: 'MO', name: 'Missouri', d: 'M302 245 L302 291 L352 291 L352 245 Z' },
    { id: 'MT', name: 'Montana', d: 'M167 151 L167 206 L265 206 L265 151 Z' },
    { id: 'NE', name: 'Nebraska', d: 'M247 231 L247 268 L324 268 L324 231 Z' },
    { id: 'NV', name: 'Nevada', d: 'M112 180 L112 264 L145 264 L145 180 Z' },
    { id: 'NH', name: 'New Hampshire', d: 'M456 141 L456 166 L472 166 L472 141 Z' },
    { id: 'NJ', name: 'New Jersey', d: 'M446 206 L446 231 L456 231 L456 206 Z' },
    { id: 'NM', name: 'New Mexico', d: 'M197 268 L197 324 L265 324 L265 268 Z' },
    { id: 'NY', name: 'New York', d: 'M411 166 L411 206 L456 206 L456 166 Z' },
    { id: 'NC', name: 'North Carolina', d: 'M385 268 L385 284 L434 284 L434 268 Z' },
    { id: 'ND', name: 'North Dakota', d: 'M234 180 L234 206 L281 206 L281 180 Z' },
    { id: 'OH', name: 'Ohio', d: 'M375 220 L375 250 L405 250 L405 220 Z' },
    { id: 'OK', name: 'Oklahoma', d: 'M247 301 L247 324 L352 324 L352 301 Z' },
    { id: 'OR', name: 'Oregon', d: 'M87 151 L87 206 L145 206 L145 151 Z' },
    { id: 'PA', name: 'Pennsylvania', d: 'M405 206 L405 245 L446 245 L446 206 Z' },
    { id: 'RI', name: 'Rhode Island', d: 'M472 186 L472 196 L482 196 L482 186 Z' },
    { id: 'SC', name: 'South Carolina', d: 'M374 284 L374 303 L399 303 L399 284 Z' },
    { id: 'SD', name: 'South Dakota', d: 'M234 206 L234 231 L281 231 L281 206 Z' },
    { id: 'TN', name: 'Tennessee', d: 'M339 268 L339 284 L399 284 L399 268 Z' },
    { id: 'TX', name: 'Texas', d: 'M211 289 L211 352 L302 352 L302 291 L265 291 L265 289 Z' },
    { id: 'UT', name: 'Utah', d: 'M145 220 L145 268 L197 268 L197 220 Z' },
    { id: 'VT', name: 'Vermont', d: 'M446 141 L446 166 L456 166 L456 141 Z' },
    { id: 'VA', name: 'Virginia', d: 'M399 238 L399 268 L428 268 L428 238 Z' },
    { id: 'WA', name: 'Washington', d: 'M104 121 L104 151 L145 151 L145 121 Z' },
    { id: 'WV', name: 'West Virginia', d: 'M399 238 L399 250 L418 250 L418 238 Z' },
    { id: 'WI', name: 'Wisconsin', d: 'M302 180 L302 220 L345 220 L345 180 Z' },
    { id: 'WY', name: 'Wyoming', d: 'M180 206 L180 245 L247 245 L247 206 Z' },
];

// --- INDIA DATA ---

export const kpiDataIndia: Kpi[] = [
  {
    title: 'New Dengue Cases (24h)',
    value: '8,124',
    change: '+8.1% vs yesterday',
    changeType: 'increase',
    icon: ArrowTrendingUpIcon,
    details: {
      type: 'trend_prediction',
      summary: 'Recent case data indicates a surge in DENV-2 serotype. However, genomic sequencing confirms the current strain is associated with milder symptoms, and mutations linked to Dengue Hemorrhagic Fever are absent.',
      data: [
        { name: 'Day -6', value: 7500 },
        { name: 'Day -5', value: 7650 },
        { name: 'Day -4', value: 7800 },
        { name: 'Day -3', value: 7950 },
        { name: 'Day -2', value: 8000 },
        { name: 'Day -1', value: 8050 },
        { name: 'Today', value: 8124 },
      ],
      prediction: { name: 'Tomorrow', value: 8200 },
    }
  },
  {
    title: 'Population at Risk',
    value: '45.2M',
    change: '+3.5% vs last week',
    changeType: 'increase',
    icon: UsersIcon,
    details: {
      type: 'population_risk',
      data: [
        { location: 'Kerala', population: '8.2M', riskLevel: 'Critical' },
        { location: 'Maharashtra', population: '12.5M', riskLevel: 'High' },
        { location: 'West Bengal', population: '9.8M', riskLevel: 'High' },
        { location: 'Tamil Nadu', population: '7.1M', riskLevel: 'Moderate' },
        { location: 'Delhi (NCT)', population: '5.5M', riskLevel: 'Moderate' },
      ]
    }
  },
  {
    title: 'Active Hotspots',
    value: '112',
    change: '+12 since last report',
    changeType: 'increase',
    icon: GlobeAltIcon,
    details: {
      type: 'hotspots',
      data: [
        { location: 'Kochi, Kerala', details: 'Severe DENV-2 outbreak in urban areas.', localBody: 'Kochi Municipal Corporation Health Dept.' },
        { location: 'Kolkata, West Bengal', details: 'Cholera cluster linked to water sources.', localBody: 'Kolkata Municipal Corporation, Water Supply Dept.' },
        { location: 'Mumbai, Maharashtra', details: 'High vector density reported in suburbs.', localBody: 'Brihanmumbai Municipal Corporation, Pest Control Office' },
        { location: 'Chennai, Tamil Nadu', details: 'Wastewater shows high Dengue RNA signal.', localBody: 'Greater Chennai Corporation, Public Health Dept.' }
      ]
    }
  },
];

const humanHealthDataIndia: HumanHealthData = {
  newCases: 8124,
  newCasesChange: 8.1,
  activeHotspots: 112,
  hospitalizationRate: 15.5,
  icuRate: 4.2,
};

const zoonoticAlertsIndia: ZoonoticAlert[] = [
  { name: 'Nipah Virus (NiV)', location: 'Bat colonies, Kerala', risk: 'Critical', interfaceProximity: 'Direct' },
  { name: 'Avian Influenza (H5N1)', location: 'Poultry farms, West Bengal', risk: 'High', interfaceProximity: 'Direct' },
];

const environmentalAlertsIndia: EnvironmentalAlert[] = [
  { name: 'Vibrio cholerae', location: 'Kolkata Waterways', status: 'Confirmed' },
  { name: 'Dengue RNA', location: 'Chennai Sentinel Site', status: 'Trending', signalStrength: 210 },
];

// FIX: Added missing livestockAlertsIndia constant.
const livestockAlertsIndia: LivestockAlert[] = [
  { disease: 'Avian Influenza (HPAI)', species: 'Poultry', riskLevel: 'High', economicImpact: 'High' },
  { disease: 'Foot and Mouth Disease (FMD)', species: 'Cattle', riskLevel: 'High', economicImpact: 'High' },
  { disease: 'Peste des Petits Ruminants (PPR)', species: 'Goat/Sheep', riskLevel: 'Moderate', economicImpact: 'Moderate' },
];

const wildlifeAlertsIndia: WildlifeAlert[] = [
  { species: 'Asiatic Lions', disease: 'Canine Distemper Virus (CDV)', location: 'Gir Forest, Gujarat', riskToHumans: 'Low', potentialImpact: 'Threat to endangered species conservation.' },
  { species: 'Indian Flying Fox', disease: 'Kyasanur Forest Disease (KFD)', location: 'Western Ghats, Karnataka', riskToHumans: 'High', potentialImpact: 'Known zoonotic pathogen with severe human symptoms.' },
];

const disasterAlertsIndia: DisasterAlert[] = [
  { disasterType: 'Flood', location: 'Brahmaputra Basin, Assam', severity: 'Major', associatedDiseaseRisks: ['Cholera', 'Typhoid', 'Leptospirosis', 'Japanese Encephalitis'] },
  { disasterType: 'Drought', location: 'Marathwada, Maharashtra', severity: 'Major', associatedDiseaseRisks: ['Malnutrition', 'Water-borne diseases from contaminated sources'] },
];

const vaccineInventoryIndia: VaccineInventoryItem[] = [
    { name: 'DengueShield (Inactivated)', targetPathogen: 'Dengue (All Serotypes)', type: 'Inactivated', dosesAvailable: 25_000_000, monthlyProductionCapacity: 8_000_000, efficacy: 85, wastageRate: 10 },
    { name: 'BharatChol (Oral)', targetPathogen: 'Vibrio cholerae', type: 'Oral', dosesAvailable: 50_000_000, monthlyProductionCapacity: 20_000_000, efficacy: 90, wastageRate: 7 },
    { name: 'NipahGuard (mRNA)', targetPathogen: 'Nipah Virus (NiV)', type: 'mRNA', dosesAvailable: 500_000, monthlyProductionCapacity: 100_000, efficacy: 95, wastageRate: 15 },
];

const genomicSignalsIndia: GenomicSignal[] = [
  { id: 'in1', strainName: 'DENV-2 - Cosmopolitan Genotype', location: 'Kerala, Tamil Nadu', significance: 'Increased Severity', summary: 'Specific mutations linked to higher incidence of Dengue Hemorrhagic Fever (DHF).', dataSource: 'INSACOG' },
  { id: 'in2', strainName: 'Nipah Virus (NiV) - Bangladesh Genotype', location: 'Kozhikode, Kerala', significance: 'Under Monitoring', summary: 'Genotype confirmed from bat surveillance; matches previous human outbreak strains.', dataSource: 'NIV Pune' },
];

const biologicalWeaponSignalsIndia: BiologicalWeaponSignal[] = [
    { agent: 'Weaponized Nipah DNA', signatureType: 'Genomic', location: 'Kochi Port Aerosol Sampler', status: 'Trending', signalStrength: 420, sourceType: 'Aerosol Sampler' },
    { agent: 'Brucella suis', signatureType: 'Genomic', location: 'Punjab Water Reservoir', status: 'Confirmed', signalStrength: 850, sourceType: 'Water Reservoir' },
];

const chemicalWeaponSignalsIndia: ChemicalWeaponSignal[] = [
    { agent: 'VX Nerve Agent', signatureType: 'Mass Spec', location: 'Delhi Lutyens Zone Air Sensor', status: 'Confirmed', concentration: 15, sourceType: 'Air Quality Sensor' },
    { agent: 'Phosgene Gas', signatureType: 'Sensor Network', location: 'Mumbai Port Authority', status: 'Trending', concentration: 12, sourceType: 'Air Quality Sensor' },
];

const slaughterhouseDataIndia: SlaughterhouseData[] = [
  { id: 'in_sh_1', location: 'Ghazipur Murga Mandi, Delhi', hygieneScore: 45, pathogensDetected: ['Avian Influenza RNA', 'Campylobacter'], riskLevel: 'High' },
  { id: 'in_sh_2', location: 'Deonar Abattoir, Mumbai', hygieneScore: 58, pathogensDetected: ['Brucella antibodies', 'Q fever'], riskLevel: 'High' },
];

// FIX: Added missing pest and crop disease alert data for India
export const cropDiseaseAlertsIndia: CropDiseaseAlert[] = [
    { disease: 'Wheat Blast', cropType: 'Wheat', threatLevel: 'High', potentialYieldLoss: 40 },
    { disease: 'Rice Tungro Virus', cropType: 'Rice', threatLevel: 'Moderate', potentialYieldLoss: 25 },
];

export const pestInfestationAlertsIndia: PestInfestationAlert[] = [
    { pest: 'Desert Locust', cropType: 'Multiple', severity: 'High', economicImpact: 'High', summary: 'Swarms reported near Rajasthan border, posing a severe threat to standing crops.' },
    { pest: 'Fall Armyworm', cropType: 'Maize', severity: 'Moderate', economicImpact: 'High', summary: 'Infestations reported in Karnataka and Maharashtra, threatening maize harvest.' },
];

export const oneHealthIndexDataIndia = {
  human: humanHealthDataIndia,
  zoonotic: zoonoticAlertsIndia,
  environmental: environmentalAlertsIndia,
  // FIX: Added missing livestock property to the exported object.
  livestock: livestockAlertsIndia,
  wildlife: wildlifeAlertsIndia,
  disasters: disasterAlertsIndia,
  vaccineInventory: vaccineInventoryIndia,
  genomic: genomicSignalsIndia,
  biological: biologicalWeaponSignalsIndia,
  slaughterhouses: slaughterhouseDataIndia,
  // FIX: Added missing chemical property.
  chemical: chemicalWeaponSignalsIndia,
};

// --- NEW BIO-WARFARE & NATIONAL SECURITY DATA (INDIA) ---
export const biowarfareThreatsIndia: BioThreat[] = [
  {
    id: 'bw-in-1',
    agent: 'Weaponized Nipah Virus (NiV)',
    agentType: 'Viral',
    origin: 'Non-State Actor',
    lethality: 9,
    status: 'Credible Intel',
    countermeasures: 'Limited',
    summaryPrompt: 'Analyze the strategic threat of an aerosolized release of a weaponized Nipah Virus strain in a high-density Indian city. Focus on the high mortality rate, lack of specific treatment, and potential for rapid spread.'
  },
  {
    id: 'bw-in-2',
    agent: 'Contaminated Water Supply (V. cholerae)',
    agentType: 'Bacterial',
    origin: 'Unknown',
    lethality: 6,
    status: 'Pre-emptive Warning',
    countermeasures: 'Treatment Available',
    summaryPrompt: 'Analyze the strategic threat of deliberate contamination of a major river system with a multi-drug resistant Cholera strain. Focus on the speed of outbreak and the strain on public health infrastructure.'
  },
  {
    id: 'bw-in-3',
    agent: 'Agricultural Bioterrorism (Wheat Blast)',
    agentType: 'Toxin',
    origin: 'State-Sponsored',
    lethality: 1,
    status: 'Credible Intel',
    countermeasures: 'Limited',
    summaryPrompt: 'Analyze the strategic threat of an intentional introduction of Wheat Blast fungus (Magnaporthe oryzae) to impact food security in the Indo-Gangetic Plain. Focus on economic impact and civil unrest potential.'
  },
];

export const nationalLabNetworkStatusIndia: LabStatus[] = [
    { id: 'lab-in-1', name: 'NIV, Pune', location: 'Pune, MH', bsl: 4, status: 'High-Alert' },
    { id: 'lab-in-2', name: 'DRDE, Gwalior', location: 'Gwalior, MP', bsl: 4, status: 'Nominal' },
    { id: 'lab-in-3', name: 'NIHSAD, Bhopal', location: 'Bhopal, MP', bsl: 4, status: 'Nominal' },
    { id: 'lab-in-4', name: 'CCMB, Hyderabad', location: 'Hyderabad, TS', bsl: 3, status: 'Surge Capacity' },
    // FIX: Changed status 'Engaged' to 'High-Alert' to match the LabStatus type definition.
    { id: 'lab-in-5', name: 'NICED, Kolkata', location: 'Kolkata, WB', bsl: 3, status: 'High-Alert' },
];

export const nationalBiosecurityIndexDataIndia: NationalBiosecurityIndexData = {
    score: 74,
    level: 'High',
    breakdown: {
        intel: { score: 80, contextPrompt: 'Analyze the current intelligence landscape for bio-threats against India. The score is 80/100. Focus on the implications of elevated chatter from regional non-state actors showing interest in zoonotic agents like Nipah virus.' },
        labReadiness: { score: 70, contextPrompt: 'Assess India\'s BSL-4 lab network readiness. The score is 70/100. The primary labs are operational, but what are the key risks associated with national surge capacity limitations and sample transport logistics?' },
        countermeasures: { score: 65, contextPrompt: 'Evaluate India\'s national countermeasure readiness. The score is 65/100. The country has strong vaccine production infrastructure for known diseases, but what is the strategic risk of having limited stockpiles of broad-spectrum antivirals for novel threats?' },
        populationVulnerability: { score: 85, contextPrompt: 'Analyze India\'s population vulnerability to a contagious biological agent. The score is 85/100, indicating very high vulnerability. Focus on extreme population density in megacities as the critical risk multiplier.' },
    }
};


export const dengueTrendData: TimeSeriesData[] = [
    { name: '8w ago', value: 2100 },
    { name: '7w ago', value: 2500 },
    { name: '6w ago', value: 3400 },
    { name: '5w ago', value: 3800 },
    { name: '4w ago', value: 4200 },
    { name: '3w ago', value: 5500 },
    { name: '2w ago', value: 6100 },
    { name: 'Last week', value: 7500 },
    { name: 'This week', value: 8124 },
];

export const choleraTrendData: TimeSeriesData[] = [
    { name: '8w ago', value: 500 },
    { name: '7w ago', value: 650 },
    { name: '6w ago', value: 700 },
    { name: '5w ago', value: 900 },
    { name: '4w ago', value: 1100 },
    { name: '3w ago', value: 1050 },
    { name: '2w ago', value: 1300 },
    { name: 'Last week', value: 1450 },
    { name: 'This week', value: 1550 },
];

export const mapDataIndia: StateData[] = [
    { id: 'KL', name: 'Kerala', value: 3200, dominantPathogen: 'DENV-2 Serotype' },
    { id: 'MH', name: 'Maharashtra', value: 2800, dominantPathogen: 'DENV-1 Serotype' },
    { id: 'WB', name: 'West Bengal', value: 2900, dominantPathogen: 'Vibrio cholerae' },
    { id: 'TN', name: 'Tamil Nadu', value: 2200, dominantPathogen: 'DENV-3 Serotype' },
    { id: 'DL', name: 'Delhi', value: 1800, dominantPathogen: 'DENV-2 Serotype' },
    { id: 'KA', name: 'Karnataka', value: 1900, dominantPathogen: 'DENV-1 Serotype' },
    { id: 'UP', name: 'Uttar Pradesh', value: 1500, dominantPathogen: 'Vibrio cholerae' },
    { id: 'GJ', name: 'Gujarat', value: 1200, dominantPathogen: 'DENV-4 Serotype' },
    { id: 'MP', name: 'Madhya Pradesh', value: 1700, dominantPathogen: 'P. falciparum Malaria' },
];

export const mockAlertsIndia: Alert[] = [
  {
    id: 1,
    title: 'Severe Dengue Outbreak',
    location: 'Kochi, Kerala',
    timestamp: '4 hours ago',
    severity: 'Critical',
    date: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: 'Cholera Cluster Detected',
    location: 'Kolkata, West Bengal',
    timestamp: '12 hours ago',
    severity: 'High',
    date: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: 'Suspected Malaria Spike',
    location: 'Mumbai, Maharashtra',
    timestamp: '2 days ago',
    severity: 'High',
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: 'Increase in Acute Diarrheal Disease',
    location: 'Patna, Bihar',
    timestamp: '3 days ago',
    severity: 'Moderate',
    date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_DATA_SUMMARY_INDIA = `
- **Overall Trend:** National Dengue cases up 8.1% (24h) during peak monsoon.
- **Dengue (DENV-2):** Critical outbreak in Kerala; serotype linked to severe disease. High case counts also in MH & KA.
- **Cholera:** Significant cluster in West Bengal linked to contaminated water post-flooding.
- **Hotspots:** 112 active national hotspots (+12 in 24h), mostly in dense urban areas.
`;

export const threatSpectrumDataIndia: Threat[] = [
  {
    name: 'Dengue (DENV-2)',
    threatLevel: 92,
    trend: 'increasing',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Dengue serotype DENV-2 in India, focusing on the severe outbreak in Kerala.'
  },
  {
    name: 'Vibrio cholerae',
    threatLevel: 80,
    trend: 'increasing',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Vibrio cholerae in India, highlighting the cluster in West Bengal linked to contaminated water.'
  },
  {
    name: 'Malaria (P. falciparum)',
    threatLevel: 65,
    trend: 'stable',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Plasmodium falciparum malaria in India, noting its endemic presence in eastern states.'
  },
  {
    name: 'Chikungunya',
    threatLevel: 50,
    trend: 'stable',
    summaryPrompt: 'Provide a one-sentence summary of the current threat from Chikungunya virus in India, mentioning sporadic cases reported nationwide.'
  }
];

export const INDIA_STATE_PATHS = [
    { id: "AP", name: "Andhra Pradesh", d: "M252 284L284 284L284 316L272 316L252 292Z" },
    { id: "AR", name: "Arunachal Pradesh", d: "M432 148L460 148L460 168L448 168Z" },
    { id: "AS", name: "Assam", d: "M404 168L448 168L448 188L412 188Z" },
    { id: "BR", name: "Bihar", d: "M324 188L364 188L364 216L332 216Z" },
    { id: "CG", name: "Chhattisgarh", d: "M284 228L324 228L324 272L292 272Z" },
    { id: "DL", name: "Delhi", d: "M228 152L236 152L236 160L228 160Z" },
    { id: "GA", name: "Goa", d: "M188 300L196 300L196 308L188 308Z" },
    { id: "GJ", name: "Gujarat", d: "M124 204L168 204L168 252L148 252Z" },
    { id: "HR", name: "Haryana", d: "M204 148L228 148L228 168L204 168Z" },
    { id: "HP", name: "Himachal Pradesh", d: "M228 116L252 116L252 148L228 148Z" },
    { id: "JK", name: "Jammu and Kashmir", d: "M188 84L228 84L228 116L204 116Z" },
    { id: "JH", name: "Jharkhand", d: "M324 216L364 216L364 244L332 244Z" },
    { id: "KA", name: "Karnataka", d: "M204 284L252 284L252 324L212 324Z" },
    { id: "KL", name: "Kerala", d: "M212 324L244 324L244 348L220 348Z" },
    { id: "MP", name: "Madhya Pradesh", d: "M220 204L284 204L284 260L220 260Z" },
    { id: "MH", name: "Maharashtra", d: "M188 244L220 244L220 284L188 284Z" },
    { id: "MN", name: "Manipur", d: "M428 188L448 188L448 208L432 208Z" },
    { id: "ML", name: "Meghalaya", d: "M404 188L412 188L412 196L404 196Z" },
    { id: "MZ", name: "Mizoram", d: "M412 208L428 208L428 228L416 228Z" },
    { id: "NL", name: "Nagaland", d: "M448 168L460 168L460 188L448 188Z" },
    { id: "OR", name: "Odisha", d: "M308 260L364 260L364 292L316 292Z" },
    { id: "PB", name: "Punjab", d: "M188 116L228 116L228 148L188 148Z" },
    { id: "RJ", name: "Rajasthan", d: "M168 148L220 148L220 228L168 228Z" },
    { id: "SK", name: "Sikkim", d: "M372 164L384 164L384 180L372 180Z" },
    { id: "TN", name: "Tamil Nadu", d: "M244 316L272 316L272 348L244 348Z" },
    { id: "TS", name: "Telangana", d: "M220 260L284 260L284 284L220 284Z" },
    { id: "TR", name: "Tripura", d: "M404 208L412 208L412 224L404 224Z" },
    { id: "UP", name: "Uttar Pradesh", d: "M252 168L324 168L324 228L252 228Z" },
    { id: "UK", name: "Uttarakhand", d: "M252 140L272 140L272 168L252 168Z" },
    { id: "WB", name: "West Bengal", d: "M364 188L388 188L388 260L364 260Z" }
];

// --- SINGAPORE DATA ---

export const kpiDataSingapore: Kpi[] = [
  {
    title: 'New Cases (24h)',
    value: '423',
    change: '+1.2% vs yesterday',
    changeType: 'increase',
    icon: ArrowTrendingUpIcon,
    details: {
      type: 'trend_prediction',
      summary: 'Dengue cases show a slight upward trend driven by the DENV-2 serotype. Vector control operations have been intensified in high-risk areas to curb the spread.',
      data: [
        { name: 'Day -6', value: 380 },
        { name: 'Day -5', value: 395 },
        { name: 'Day -4', value: 410 },
        { name: 'Day -3', value: 405 },
        { name: 'Day -2', value: 415 },
        { name: 'Day -1', value: 418 },
        { name: 'Today', value: 423 },
      ],
      prediction: { name: 'Tomorrow', value: 430 },
    }
  },
  {
    title: 'Population at Risk',
    value: '5.9M',
    change: 'Stable',
    changeType: 'increase',
    icon: UsersIcon,
    details: {
      type: 'population_risk',
      data: [
        { location: 'Central Region', population: '920K', riskLevel: 'Critical' },
        { location: 'North-East Region', population: '930K', riskLevel: 'High' },
        { location: 'East Region', population: '680K', riskLevel: 'High' },
        { location: 'West Region', population: '920K', riskLevel: 'Moderate' },
        { location: 'North Region', population: '580K', riskLevel: 'Moderate' },
      ]
    }
  },
  {
    title: 'Active Clusters',
    value: '18',
    change: '-2 since last report',
    changeType: 'decrease',
    icon: GlobeAltIcon,
    details: {
      type: 'hotspots',
      data: [
        { location: 'Tampines Ave 7', details: 'High-risk Dengue cluster with multiple cases.', localBody: 'NEA Vector Control' },
        { location: 'Punggol Field', details: 'HFMD localized outbreak in preschools.', localBody: 'MOH & ECDA' },
        { location: 'Clementi West St 2', details: 'Persistent Dengue transmission detected.', localBody: 'NEA Vector Control' },
        { location: 'Toa Payoh Lor 1', details: 'Dengue breeding habitats discovered.', localBody: 'NEA Vector Control' }
      ]
    }
  },
];

const humanHealthDataSingapore: HumanHealthData = {
  newCases: 423,
  newCasesChange: 1.2,
  activeHotspots: 18,
  hospitalizationRate: 2.1,
  icuRate: 0.5,
};

const zoonoticAlertsSingapore: ZoonoticAlert[] = [
  { name: 'Bat-borne Paramyxovirus', location: 'Nature Reserves, North', risk: 'Low', interfaceProximity: 'Moderate' },
];

const environmentalAlertsSingapore: EnvironmentalAlert[] = [
  { name: 'Dengue Virus (DENV-2)', location: 'Central Catchment', status: 'Trending', signalStrength: 120 },
  { name: 'COVID-19 RNA', location: 'Water Reclamation Plant (East)', status: 'Confirmed' },
];

const wildlifeAlertsSingapore: WildlifeAlert[] = [
  { species: 'Long-tailed Macaque', disease: 'Simian Foamy Virus', location: 'Bukit Timah', riskToHumans: 'Low', potentialImpact: 'Monitoring interface risk.' },
];

const disasterAlertsSingapore: DisasterAlert[] = [
  { disasterType: 'Flood', location: 'Orchard Area', severity: 'Moderate', associatedDiseaseRisks: ['Dengue', 'Leptospirosis'] },
];

const genomicSignalsSingapore: GenomicSignal[] = [
  { id: 'sg1', strainName: 'SARS-CoV-2 (KP.3)', location: 'Island-wide', significance: 'Under Monitoring', summary: 'Continues to be the dominant circulating strain.', dataSource: 'National Public Health Lab' },
];

const biologicalWeaponSignalsSingapore: BiologicalWeaponSignal[] = [
    { agent: 'Unknown Toxin', signatureType: 'Protein', location: 'Port of Singapore', status: 'Trending', signalStrength: 85, sourceType: 'Aerosol Sampler' },
];

const chemicalWeaponSignalsSingapore: ChemicalWeaponSignal[] = [
    { agent: 'Ammonia', signatureType: 'Sensor Network', location: 'Jurong Island', status: 'Trending', concentration: 12, sourceType: 'Air Quality Sensor' },
];

const slaughterhouseDataSingapore: SlaughterhouseData[] = [
  { id: 'sg_sh_1', location: 'Jurong Abattoir', hygieneScore: 92, pathogensDetected: [], riskLevel: 'Low' },
];

export const pestInfestationAlertsSingapore: PestInfestationAlert[] = [
  { pest: 'Aedes aegypti', cropType: 'Urban Residential', severity: 'High', economicImpact: 'Moderate', summary: 'High breeding counts in central residential areas.' }
];

export const cropDiseaseAlertsSingapore: CropDiseaseAlert[] = [];

export const oneHealthIndexDataSingapore = {
  human: humanHealthDataSingapore,
  zoonotic: zoonoticAlertsSingapore,
  environmental: environmentalAlertsSingapore,
  wildlife: wildlifeAlertsSingapore,
  disasters: disasterAlertsSingapore,
  genomic: genomicSignalsSingapore,
  biological: biologicalWeaponSignalsSingapore,
  chemical: chemicalWeaponSignalsSingapore,
  slaughterhouses: slaughterhouseDataSingapore,
};

export const dengueTrendDataSingapore: TimeSeriesData[] = [
    { name: '8w ago', value: 120 },
    { name: '7w ago', value: 135 },
    { name: '6w ago', value: 180 },
    { name: '5w ago', value: 210 },
    { name: '4w ago', value: 280 },
    { name: '3w ago', value: 310 },
    { name: '2w ago', value: 390 },
    { name: 'Last week', value: 410 },
    { name: 'This week', value: 450 },
];

export const hfmdTrendDataSingapore: TimeSeriesData[] = [
    { name: '8w ago', value: 50 },
    { name: '7w ago', value: 55 },
    { name: '6w ago', value: 70 },
    { name: '5w ago', value: 95 },
    { name: '4w ago', value: 120 },
    { name: '3w ago', value: 110 },
    { name: '2w ago', value: 90 },
    { name: 'Last week', value: 85 },
    { name: 'This week', value: 80 },
];

export const mapDataSingapore: StateData[] = [
    { id: 'CEN', name: 'Central Region', value: 1500, dominantPathogen: 'Dengue' },
    { id: 'EAS', name: 'East Region', value: 800, dominantPathogen: 'HFMD' },
    { id: 'NOR', name: 'North Region', value: 1200, dominantPathogen: 'Dengue' },
    { id: 'NE', name: 'North-East Region', value: 900, dominantPathogen: 'COVID-19' },
    { id: 'WES', name: 'West Region', value: 1100, dominantPathogen: 'Dengue' },
];

export const mockAlertsSingapore: Alert[] = [
  {
    id: 1,
    title: 'Dengue Cluster Escalation',
    location: 'Tampines, East Region',
    timestamp: '1 hour ago',
    severity: 'High',
    date: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'HFMD Outbreak in Preschool',
    location: 'Punggol, North-East Region',
    timestamp: '5 hours ago',
    severity: 'Moderate',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_DATA_SUMMARY_SINGAPORE = `
- **Overall Trend:** Dengue cases rising sharply, approaching epidemic threshold.
- **Dengue:** Major active clusters in Central and East regions (+15% week-over-week).
- **HFMD:** Localized outbreaks in preschools in North-East.
- **COVID-19:** KP.3 variant dominates, hospitalization remains stable and low.
- **Hotspots:** 18 active clusters nationwide, mostly high-density residential blocks.
`;

export const threatSpectrumDataSingapore: Threat[] = [
  {
    name: 'Dengue Virus (DENV)',
    threatLevel: 80,
    trend: 'increasing',
    summaryPrompt: 'Provide a concise summary of the current Dengue situation in Singapore, focusing on vector control efforts and the dominant serotype.'
  },
  {
    name: 'HFMD',
    threatLevel: 55,
    trend: 'stable',
    summaryPrompt: 'Summarize the HFMD situation in Singapore, noting its impact on childcare centers.'
  },
];

export const transitAlertsSingapore: TransitAlert[] = [
  {
    id: 'TR-1',
    node: 'Changi Airport T3',
    flightOrVessel: 'SQ322',
    anomalyType: 'Wastewater Viral Load',
    status: 'Critical',
    timestamp: '2 hours ago',
    details: 'Novel respiratory pathogen RNA fragments detected at 10x baseline in incoming flight wastewater.',
    actionTaken: 'Contact tracing initiated for all passengers on SQ322. Enhanced screening activated at T3.'
  },
  {
    id: 'TR-2',
    node: 'Woodlands Checkpoint',
    flightOrVessel: 'Land Transport',
    anomalyType: 'Thermal Surge',
    status: 'High',
    timestamp: '5 hours ago',
    details: 'Sustained 15% increase in febrile passengers crossing via bus lanes.',
    actionTaken: 'Secondary medical screening deployed. Rapid antigen testing mandatory for flagged individuals.'
  },
  {
    id: 'TR-3',
    node: 'Pasir Panjang Terminal',
    flightOrVessel: 'MV Maersk',
    anomalyType: 'Syndromic Declaration',
    status: 'Moderate',
    timestamp: '1 day ago',
    details: 'Captain declared 4 crew members exhibiting acute gastrointestinal symptoms.',
    actionTaken: 'Vessel quarantined at anchorage. MPA medical team dispatched.'
  }
];

export const SINGAPORE_REGION_PATHS: MapPath[] = [
    { id: "CEN", name: "Central", d: "M200 200 L300 200 L300 300 L200 300 Z" },
    { id: "EAS", name: "East", d: "M300 150 L450 150 L450 300 L300 300 Z" },
    { id: "NOR", name: "North", d: "M150 50 L350 50 L350 150 L150 150 Z" },
    { id: "NE", name: "North-East", d: "M300 50 L450 50 L450 150 L300 150 Z" },
    { id: "WES", name: "West", d: "M50 100 L200 100 L200 300 L50 300 Z" }
];

// ==========================================
// UNITED KINGDOM DATA
// ==========================================

export const kpiDataUK = [
  { title: 'National Alerts (24h)', value: '34', change: '+5%', changeType: 'increase' },
  { title: 'A&E Syndromic Presentations', value: '12,450', change: '+2.1%', changeType: 'increase' },
  { title: 'Active Outbreaks (Care Homes)', value: '18', change: '+3', changeType: 'increase' },
];

export const mapDataUK = [
    { id: 'ENG', name: 'England', value: 3400, dominantPathogen: 'Influenza A' },
    { id: 'SCT', name: 'Scotland', value: 850, dominantPathogen: 'Norovirus' },
    { id: 'WAL', name: 'Wales', value: 420, dominantPathogen: 'RSV' },
    { id: 'NIR', name: 'Northern Ireland', value: 310, dominantPathogen: 'Influenza B' },
];

export const UK_REGION_PATHS = [
  { id: 'ENG', name: 'England', d: 'M150 200 L200 200 L200 300 L150 300 Z' },
  { id: 'SCT', name: 'Scotland', d: 'M130 50 L200 50 L200 150 L130 150 Z' },
  { id: 'WAL', name: 'Wales', d: 'M100 200 L150 200 L150 250 L100 250 Z' },
  { id: 'NIR', name: 'Northern Ireland', d: 'M50 150 L100 150 L100 200 L50 200 Z' }
];

export const influenzaTrendDataUK = [
    { name: 'Week -4', value: 1200 },
    { name: 'Week -3', value: 1500 },
    { name: 'Week -2', value: 2100 },
    { name: 'Week -1', value: 2800 },
    { name: 'This Week', value: 3400 },
];

export const oneHealthIndexDataUK = {
    human: 85,
    zoonotic: 92,
    environmental: 88
};

export const mockAlertsUK = [
  {
    id: 3001,
    title: 'Norovirus cluster in Oxfordshire care homes',
    location: 'Oxford, England',
    timestamp: '3 hours ago',
    severity: 'High',
    date: new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3002,
    title: 'Avian Influenza H5N1 detected in poultry',
    location: 'Lothian, Scotland',
    timestamp: '1 day ago',
    severity: 'Critical',
    date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const threatSpectrumDataUK = [
  {
    name: 'Influenza A',
    threatLevel: 80,
    trend: 'increasing',
    summaryPrompt: 'Analyze the rise of Influenza A in the UK, especially focusing on NHS strain.'
  },
  {
    name: 'Norovirus',
    threatLevel: 75,
    trend: 'increasing',
    summaryPrompt: 'Analyze the recent spike in Norovirus outbreaks in care homes.'
  }
];

export const MOCK_DATA_SUMMARY_UK = `- **Overall Trend:** NHS reports 2.1% increase in syndromic presentations.\n- **Norovirus:** Outbreak escalating in Oxfordshire care homes.\n- **Influenza A:** Stable but dominant in England.\n- **Zoonotic:** H5N1 detected in poultry farms in Lothian.\n- **Healthcare Strain:** Moderate pressure on A&E departments.\n`;
