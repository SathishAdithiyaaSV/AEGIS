import { AllSurveillanceData, SurveillanceMapData } from "../types";

export const surveillanceMapDataSingapore: SurveillanceMapData = {
    livestock: [
        { id: 'NOR', name: 'North', value: 85 },
        { id: 'WES', name: 'West', value: 70 },
        { id: 'NE', name: 'North-East', value: 90 },
    ],
    zoonotic: [
        { id: 'EAS', name: 'East', value: 95 },
        { id: 'CEN', name: 'Central', value: 80 },
        { id: 'WES', name: 'West', value: 75 },
    ],
    environmental: [
        { id: 'CEN', name: 'Central', value: 92 },
        { id: 'EAS', name: 'East', value: 78 },
        { id: 'WES', name: 'West', value: 85 },
    ],
    genomic: [
        { id: 'CEN', name: 'Central', value: 90 },
        { id: 'NOR', name: 'North', value: 80 },
        { id: 'NE', name: 'North-East', value: 85 },
    ],
    wildlife: [
        { id: 'NOR', name: 'North', value: 88 },
        { id: 'NE', name: 'North-East', value: 92 },
        { id: 'CEN', name: 'Central', value: 70 },
    ],
    disaster: [
        { id: 'EAS', name: 'East', value: 95 },
        { id: 'WES', name: 'West', value: 80 },
        { id: 'CEN', name: 'Central', value: 85 },
    ],
    pest_crop: [], // Eliminated for Singapore
};

export const allSurveillanceDataSingapore: AllSurveillanceData = {
    livestock: {
        'NOR': {
            vaccinationStats: [
                { species: 'Poultry', vaccinated: 2500000, total: 2800000, targetDiseases: ['Avian Influenza'] },
            ],
            prevalentDiseases: [
                { disease: 'Avian Influenza', species: 'Poultry', risk: 'Moderate', summary: 'Regular monitoring at northern farms.' },
            ],
            aiSummary: 'Poultry vaccination is closely monitored in the North region to prevent avian disease outbreaks.'
        }
    },
    zoonotic: {
        'EAS': {
            highRiskVectors: [
                { vector: 'Mosquitoes', diseases: ['Dengue'], prevalence: 'High' },
            ],
            sentinelSpecies: [
                { species: 'Macaques', status: 'Nominal', lastChecked: '24h ago', location: 'Changi Coastal Areas' },
            ],
            aiSummary: 'East region remains highly monitored for Dengue clusters due to active vector presence near residential and transit hubs.'
        }
    },
    environmental: {
        'CEN': {
            waterSources: [
                { location: 'Marina Reservoir', sourceType: 'Lake', quality: 'Good', contaminants: ['None'] },
            ],
            airQualityHotspots: [
                { location: 'CBD Area', aqi: 45, primaryPollutant: 'PM2.5' },
            ],
            aiSummary: 'Central environmental metrics remain well within normal limits. Reservoir quality is strictly maintained.'
        }
    },
    genomic: {
        'CEN': {
            sequencingCapacity: { labs: 2, throughput: 5000 },
            variantsTracked: [
                { pathogen: 'SARS-CoV-2', variant: 'JN.1', frequency: '45%', clinicalImpact: 'Moderate' },
            ],
            aiSummary: 'NPHL sequencing indicates a rise in respiratory pathogens but no novel high-consequence variants detected.'
        }
    },
    wildlife: {
        'NE': {
            highRiskZones: [
                { location: 'Punggol', riskLevel: 'High', primaryThreat: 'Macaques' }
            ],
            aiSummary: 'Wildlife conflict in the North-East is stable. Vector monitoring among wild boars continues to track zoonotic spillover potential.'
        }
    },
    disaster: {
        'EAS': {
            activeIncidents: [
                { type: 'Flood', severity: 'Moderate', status: 'Active', location: 'Changi' }
            ],
            hospitalCapacity: { totalBeds: 2000, occupied: 1500, icuTotal: 200, icuOccupied: 140 },
            aiSummary: 'Moderate weather warnings in the East. Healthcare facilities remain well within surge capacities.'
        }
    },
    pest_crop: {} // Eliminated
};
