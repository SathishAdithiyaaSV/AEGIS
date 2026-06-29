import React from 'react';

export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

export interface PopulationRiskItem {
  location: string;
  population: string;
  riskLevel: 'Critical' | 'High' | 'Moderate';
}

export interface HotspotItem {
  location:string;
  details: string;
  localBody: string;
}

export type KpiDetails = 
  | { type: 'trend_prediction'; data: TimeSeriesData[]; prediction: TimeSeriesData; summary: string; }
  | { type: 'population_risk'; data: PopulationRiskItem[]; }
  | { type: 'hotspots'; data: HotspotItem[]; };

export interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  details?: KpiDetails;
}

export interface TimeSeriesData {
  name: string;
  value: number;
}

export interface MapPath {
  id: string;
  name: string;
  d: string;
}

export interface StateData {
  id: string; // e.g., 'AL'
  name: string; // e.g., 'Alabama'
  value: number; // e.g., number of cases
  dominantPathogen?: string;
}

export interface Alert {
    id: number;
    title: string;
    location: string;
    timestamp: string;
    severity: 'Critical' | 'High' | 'Moderate';
    date: string; // ISO date string for sorting
}

export interface EscalatedAlert {
  level: 'District' | 'State' | 'National';
  from: string; // Name of the originating entity, e.g., 'Ernakulam', 'Kerala'
  alert: Alert;
  status: 'escalated' | 'monitoring';
}

export interface ReadinessStatus {
  organization: string;
  status: 'Ready' | 'Standby' | 'Mobilizing' | 'Engaged';
  personnel: string;
  equipment: string;
  updateTime: string;
}

export interface Threat {
  name: string;
  threatLevel: number; // 0-100
  trend: 'increasing' | 'decreasing' | 'stable';
  summaryPrompt: string;
}

// --- ONE HEALTH INDEX TYPES ---
export type RiskLevel = 'Critical' | 'High' | 'Moderate' | 'Low' | 'None';

export interface MetricBreakdown {
    metric: string;
    value: string;
    score: number;
    maxScore: number;
    reasoning: string;
}

export interface HumanHealthData {
  newCases: number;
  newCasesChange: number; // percentage
  activeHotspots: number;
  hospitalizationRate: number; // percentage
  icuRate: number; // percentage
}

export interface ZoonoticAlert {
  name: string;
  location: string;
  risk: RiskLevel;
  interfaceProximity: 'Direct' | 'High' | 'Moderate' | 'Low'; // Proximity to human populations
  primaryVector?: string;
}

export interface EnvironmentalAlert {
  name: string;
  location: string;
  status: 'Confirmed' | 'Trending';
  signalStrength?: number; // e.g., 150 for +150%
  sourceType?: 'Wastewater' | 'Floodwater' | 'Zoonotic Wastewater';
}

export interface SlaughterhouseData {
  id: string;
  location: string;
  hygieneScore: number; // 0-100, lower is worse
  pathogensDetected: string[];
  riskLevel: 'High' | 'Moderate' | 'Low';
}

export interface OneHealthIndexBreakdown {
  human: {
    score: number;
    breakdown: MetricBreakdown[];
  };
  zoonotic: {
    score: number;
    breakdown: MetricBreakdown[];
  };
  environmental: {
    score: number;
    breakdown: MetricBreakdown[];
  };
}

export interface OneHealthIndexData {
  score: number;
  level: RiskLevel;
  breakdown: OneHealthIndexBreakdown;
}


// --- STATE-SPECIFIC TYPES ---

export interface ViralGenomicsData {
    dominantStrain: string;
    viralLoad: number; // A normalized score 0-100
    viralLoadChange: number; // percentage change
    strainSummaryPrompt: string;
    dataSource: string;
}

export interface DataSource {
    name: string;
    credibility: number; // A score out of 100
    bias: 'Low' | 'Moderate' | 'High';
}

export type HealthcareWorkerStatus = 'Strained' | 'Adequate' | 'Overwhelmed';

export interface StateProfile {
    population: string;
    populationDensity: string;
    climate: string;
    geography: string;
    hygieneIndex: number; // A score out of 100
    dataSources: DataSource[];
    healthcareCapacity?: {
        icuBedsAvailable: string;
        ventilatorsAvailable: string;
        healthcareWorkerStatus: HealthcareWorkerStatus;
    };
    publicHealthResponse?: {
        testingRatePer1000: number;
        contactTracingEfficiency: number; // percentage
    };
    socioeconomicFactors?: {
        urbanizationLevel: number; // percentage
        literacyRate: number; // percentage
    }
}

export interface StateKpi extends Omit<Kpi, 'icon' | 'details'> {
    // State KPIs are simpler and don't need icons in the new design
}

export interface StateAlert extends Omit<Alert, 'location'> {
    // Location is implicit in the state dashboard
    district: string;
}

export interface DrugInventoryItem {
    name: string;
    stock: number; // units
    burnRate: number; // units per day
    category: 'Antiviral' | 'Analgesic' | 'IV Fluid' | 'Medical Supply' | 'Antibiotic';
}

export interface VaccineInventoryItem {
    name: string;
    targetPathogen: string;
    type: 'mRNA' | 'Viral Vector' | 'Inactivated' | 'Subunit' | 'Oral';
    dosesAvailable: number;
    monthlyProductionCapacity: number;
    efficacy: number; // percentage
    wastageRate: number; // percentage
}


// --- DISTRICT-SPECIFIC TYPES (ENHANCED) ---
export interface DistrictProfile {
    population: string;
    geography: string;
    hospitals: number;
    healthcareEffectiveness: 'High' | 'Moderate' | 'Low';
    climaticZones: number;
    prevalentDiseases: string[];
    ecologicalFactors: string[];
}

export interface DistrictKpi extends Omit<Kpi, 'icon' | 'details'> {}

export interface DistrictAlert extends Omit<Alert, 'location' | 'district'> {
    // Location and district are implicit in the district dashboard
}

export interface LocalEnvironmentalSignal {
    id: number;
    description: string;
    sourceType: 'Water Source' | 'Market' | 'Event' | 'Community Report' | 'Zoonotic Wastewater' | 'Water Management' | 'Soil Contamination';
    imageUrl?: string;
    highlight?: boolean;
}

export interface DistrictHospitalData {
    bedOccupancy: number; // percentage
    icuOccupancy: number; // percentage
    ventilatorAvailability: number; // percentage
    staffStatus: HealthcareWorkerStatus;
}

export interface LivestockAlert {
    disease: string;
    species: 'Poultry' | 'Cattle' | 'Swine' | 'Goat/Sheep';
    riskLevel: 'High' | 'Moderate';
    economicImpact: 'High' | 'Moderate' | 'Low';
}

export interface CropDiseaseAlert {
    disease: string;
    cropType: string;
    threatLevel: 'High' | 'Moderate' | 'Low';
    potentialYieldLoss: number; // percentage
}

export interface PestInfestationAlert {
    pest: string;
    cropType: string;
    severity: 'High' | 'Moderate' | 'Low';
    economicImpact: 'High' | 'Moderate' | 'Low';
    summary: string;
}

export interface DistrictSurveillanceData {
    vectorDensityIndex: 'High' | 'Moderate' | 'Low';
    feverSurveyReports: number;
    localEnvironmentalSignals: LocalEnvironmentalSignal[];
    livestockAlerts: LivestockAlert[];
    cropDiseaseAlerts: CropDiseaseAlert[];
    pestInfestationAlerts?: PestInfestationAlert[];
    genomicSignals?: GenomicSignal[];
}

export interface SocioeconomicData {
    povertyRate: number; // percentage
    literacyRate: number; // percentage
    sanitationAccess: number; // percentage
}

export interface DistrictOneHealthScore {
    overall: number; // 0-100
    human: number; // 0-100
    animal: number; // 0-100
    environment: number; // 0-100
}

export interface DistrictData {
    id: string;
    name: string;
    value: number; // Case count for map coloring
    profile: DistrictProfile;
    kpis: DistrictKpi[];
    alerts: DistrictAlert[];
    hospitalData: DistrictHospitalData;
    surveillanceData: DistrictSurveillanceData;
    drugInventory: DrugInventoryItem[];
    aiSummary: string;
    socioeconomicData: SocioeconomicData;
    oneHealthScore: DistrictOneHealthScore;
}

// --- PREDICTIVE MODELING & SIMULATION TYPES ---
export interface Intervention {
  id: string;
  name: string;
  description: string;
}

export interface SimulationResult {
  projectedCases: number[]; // Array of 4 numbers for next 4 weeks
  narrativeSummary: string;
}

export interface PredictiveDataPoint {
    name: string; // e.g., "Week +1"
    value: number;
}

export interface PredictionDetails {
    targetDisease: string;
    baselineForecast: PredictiveDataPoint[];
    interventions: Intervention[];
}


export interface DetailedStateData {
    id: string;
    name: string;
    profile: StateProfile;
    kpis: StateKpi[];
    alerts: StateAlert[];
    trendData: TimeSeriesData[];
    viralGenomics: ViralGenomicsData;
    aiSummary: string;
    districts: DistrictData[];
    districtPaths: MapPath[];
    drugInventory: DrugInventoryItem[];
    vaccineInventory: VaccineInventoryItem[];
    zoonoticAlerts?: ZoonoticAlert[];
    environmentalAlerts?: EnvironmentalAlert[];
    predictionDetails?: PredictionDetails;
    genomicSignals?: GenomicSignal[];
}

// --- NEW ONE HEALTH MODULES ---

export interface WildlifeAlert {
  species: string;
  disease: string;
  location: string;
  riskToHumans: 'High' | 'Moderate' | 'Low' | 'Unknown';
  potentialImpact: string;
}

export interface DisasterAlert {
  // FIX: Added 'Landslide' to the union type for disasterType to support landslide alerts.
  disasterType: 'Flood' | 'Hurricane' | 'Wildfire' | 'Earthquake' | 'Drought' | 'Landslide';
  location: string;
  severity: 'Catastrophic' | 'Major' | 'Moderate';
  associatedDiseaseRisks: string[];
}

export interface GenomicSignal {
  id: string;
  strainName: string;
  location: string;
  significance: 'Vaccine Escape' | 'Increased Transmissibility' | 'Increased Severity' | 'Novel Reassortment' | 'Under Monitoring';
  summary: string;
  dataSource: string;
}

// --- BIO-WARFARE & NATIONAL SECURITY TYPES ---

export interface BioThreat {
  id: string;
  agent: string;
  agentType: 'Bacterial' | 'Viral' | 'Toxin';
  origin: 'State-Sponsored' | 'Non-State Actor' | 'Unknown';
  lethality: number; // 1-10 scale
  status: 'Credible Intel' | 'Confirmed Release' | 'Pre-emptive Warning';
  countermeasures: 'Vaccine Available' | 'Antitoxin Available' | 'Treatment Available' | 'Limited' | 'None';
  summaryPrompt: string;
}

export interface LabStatus {
  id: string;
  name: string;
  location: string;
  bsl: 3 | 4;
  status: 'Nominal' | 'High-Alert' | 'Surge Capacity' | 'Compromised';
}

export interface BiosecurityComponent {
    score: number;
    contextPrompt: string;
}

export interface NationalBiosecurityIndexData {
  score: number;
  level: RiskLevel;
  breakdown: {
    intel: BiosecurityComponent;
    labReadiness: BiosecurityComponent;
    countermeasures: BiosecurityComponent;
    populationVulnerability: BiosecurityComponent;
  }
}

export interface BiologicalWeaponSignal {
  agent: string;
  signatureType: 'Genomic' | 'Protein';
  location: string;
  status: 'Confirmed' | 'Trending';
  signalStrength: number; //
  sourceType: 'Aerosol Sampler' | 'Water Reservoir' | 'Wastewater';
}

// FIX: Added missing ChemicalWeaponSignal type definition.
export interface ChemicalWeaponSignal {
  agent: string;
  signatureType: 'Mass Spec' | 'Sensor Network';
  location: string;
  status: 'Confirmed' | 'Trending';
  concentration: number; // in ppb
  sourceType: 'Air Quality Sensor';
}


// --- NEW DETAILED SURVEILLANCE LAYER TYPES ---

export type SurveillanceType = 'livestock' | 'zoonotic' | 'environmental' | 'wildlife' | 'disaster' | 'genomic' | 'pest_crop';

export interface SurveillanceMapData {
    [key: string]: StateData[];
}

// Livestock
export interface LivestockVaccinationStats {
    species: 'Cattle' | 'Poultry' | 'Goat/Sheep' | 'Dogs' | 'Swine';
    vaccinated: number;
    total: number;
    targetDiseases: string[];
}
export interface PrevalentLivestockDisease {
    disease: string;
    species: string;
    risk: RiskLevel;
    summary: string;
}
export interface LivestockStateData {
    vaccinationStats: LivestockVaccinationStats[];
    prevalentDiseases: PrevalentLivestockDisease[];
    aiSummary: string;
}

// Zoonotic
export interface ZoonoticVector {
    vector: 'Mosquitoes' | 'Ticks' | 'Rodents' | 'Bats';
    diseases: string[];
    prevalence: 'High' | 'Moderate' | 'Low';
}
export interface SentinelSpecies {
    species: string;
    status: 'Nominal' | 'Alert';
    lastChecked: string;
    location: string;
}
export interface ZoonoticStateData {
    highRiskVectors: ZoonoticVector[];
    sentinelSpecies: SentinelSpecies[];
    aiSummary: string;
}

// Environmental
export interface WaterSourceStatus {
    location: string; // e.g., 'Kochi Backwaters'
    sourceType: 'River' | 'Lake' | 'Groundwater' | 'Urban Supply';
    quality: 'Good' | 'Fair' | 'Poor';
    contaminants: string[];
}
export interface EnvironmentalStateData {
    waterSources: WaterSourceStatus[];
    airQualityHotspots: { location: string; aqi: number; primaryPollutant: string }[];
    aiSummary: string;
}

// Genomic
export interface StateGenomicData {
    circulatingStrains: {
        strain: string;
        pathogen: string;
        prevalence: number; // percentage
        significance: GenomicSignal['significance'];
    }[];
    sequencingCapacity: {
        labs: number;
        throughput: number; // sequences per week
    };
    aiSummary: string;
}

// Wildlife
export interface WildlifePopulationStatus {
    species: string;
    healthStatus: 'Healthy' | 'Monitoring' | 'Diseased';
    populationTrend: 'Increasing' | 'Stable' | 'Decreasing';
    keyPathogens: string[];
}
export interface WildlifeStateData {
    populationStatus: WildlifePopulationStatus[];
    interfaceHotspots: { location: string; description: string }[]; // Human-wildlife interface points
    aiSummary: string;
}

// Disaster
export interface DisasterPreparedness {
    metric: 'Hospital Surge Capacity' | 'Emergency Shelters' | 'Medical Stockpiles';
    status: 'Ready' | 'Partial' | 'Lacking';
    details: string;
}
export interface DisasterStateData {
    currentRisks: {
        disasterType: DisasterAlert['disasterType'];
        riskLevel: RiskLevel;
        forecast: string;
    }[];
    preparedness: DisasterPreparedness[];
    aiSummary: string;
}

// Pest & Crop
export interface PestAndCropStateData {
    prevalentPests: {
        pest: string;
        risk: RiskLevel;
        affectedCrops: string[];
    }[];
    prevalentDiseases: {
        disease: string;
        risk: RiskLevel;
        affectedCrops: string[];
    }[];
    aiSummary: string;
}

// All surveillance data
export interface AllSurveillanceData {
    livestock: Record<string, LivestockStateData>;
    zoonotic: Record<string, ZoonoticStateData>;
    environmental: Record<string, EnvironmentalStateData>;
    genomic: Record<string, StateGenomicData>;
    wildlife: Record<string, WildlifeStateData>;
    disaster: Record<string, DisasterStateData>;
    pest_crop: Record<string, PestAndCropStateData>;
}

// --- PROJECT ODIN TYPES ---
export interface OdinSignal {
  id: string;
  threatLevel: 'Critical' | 'High' | 'Moderate';
  source: 'Dark Web Intel' | 'Anomalous DNA Synthesis Order' | 'Preprint Server Anomaly';
  timestamp: string;
  title: string;
  context: string; // The data/context to be sent to Gemini
  location?: string; // Location of the threat, if applicable
  agent?: string; // The specific agent, if known
  canSimulatePlume?: boolean; // Flag to enable plume modeling
}

export interface GenomicAttributionResult {
  attribution: 'Natural Origin' | 'Accidental Lab Release' | 'Deliberate Weaponization';
  confidence: number; // 0-100
  geneticMarkers: string[];
  originAnalysis: string;
  strategicSummary: string;
}

export interface PlumeSimulationResult {
    evacuationOrders: string;
    projectedImpact: string;
    responderGuidance: string;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  type: 'Supplier' | 'Manufacturer' | 'Distributor' | 'Infrastructure';
  location: string;
  product: string;
  riskScore: number; // 0-100, higher is more vulnerable
  vulnerabilities: string[];
}

export interface SupplyChainAnalysis {
  category: 'Pharmaceuticals' | 'Food Supply' | 'Water Supply';
  nodes: SupplyChainNode[];
  aiPromptContext: string; // Context to send to Gemini
}
