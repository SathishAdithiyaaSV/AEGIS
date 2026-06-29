const fs = require('fs'); 
const path = 'c:/IIPS SINGAPORE/AEGIS BIOSURVEILLANCE/copy-of-aegis-biosurveillance/data/stateData.ts'; 
let content = fs.readFileSync(path, 'utf8'); 

let wbIndex = content.indexOf('  WB: {');
if (wbIndex === -1) {
  console.log("Could not find WB state.");
  process.exit(1);
}

let afterWb = content.indexOf('};', wbIndex);
if (afterWb === -1) {
  console.log("Could not find closing }; after WB.");
  process.exit(1);
}

const newData = `
  ,CEN: {
    id: 'CEN',
    name: 'Central Region',
    profile: {
      population: '0.9 Million',
      populationDensity: '7,100/km²',
      climate: 'Tropical Rainforest',
      geography: 'Urban city center, commercial hubs, high-rise residential',
      hygieneIndex: 95,
      dataSources: [
        { name: 'MOH Singapore', credibility: 99, bias: 'Low' },
        { name: 'NEA', credibility: 98, bias: 'Low' }
      ],
      healthcareCapacity: {
        icuBedsAvailable: '500',
        ventilatorsAvailable: '300',
        healthcareWorkerStatus: 'Adequate'
      },
      publicHealthResponse: {
        testingRatePer1000: 45.2,
        contactTracingEfficiency: 95
      },
      socioeconomicFactors: {
        urbanizationLevel: 100,
        literacyRate: 98.5
      }
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '150', change: '+5%', changeType: 'increase' },
      { title: 'Active Clusters', value: '7', change: '+1', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '70%', change: 'Stable', changeType: 'decrease' }
    ],
    alerts: [
      { id: 1001, title: 'Dengue Red Zone Declared', district: 'Bukit Merah', timestamp: '2 hours ago', severity: 'High', date: new Date().toISOString() }
    ],
    trendData: [
        { name: 'Week -4', value: 80 },
        { name: 'Week -3', value: 95 },
        { name: 'Week -2', value: 110 },
        { name: 'Week -1', value: 130 },
        { name: 'This Week', value: 150 },
    ],
    viralGenomics: {
        dominantStrain: 'DENV-2 Serotype',
        viralLoad: 60,
        viralLoadChange: 5,
        strainSummaryPrompt: 'Focus on DENV-2 transmission in high-density urban settings.',
        dataSource: 'National Public Health Lab'
    },
    aiSummary: '- Region: Central\\n- Primary Threat: Dengue outbreak in Bukit Merah.\\n- Healthcare Strain: Moderate, beds available.\\n- Local Intel: Vector control operations intensified.',
    drugInventory: [
        { name: 'Paracetamol 500mg', stock: 50000, burnRate: 2000, category: 'Analgesic' },
        { name: 'IV Fluids (Saline)', stock: 15000, burnRate: 800, category: 'IV Fluid' }
    ],
    vaccineInventory: [],
    districtPaths: [
        { id: 'BM', name: 'Bukit Merah', d: 'M150 200 L170 190 L180 210 L160 220 Z' },
        { id: 'DC', name: 'Downtown Core', d: 'M170 190 L190 180 L200 200 L180 210 Z' }
    ],
    districts: [
        { 
            id: 'BM', 
            name: 'Bukit Merah', 
            value: 80, 
            profile: { 
                population: '150,000', 
                geography: 'Mature residential estate', 
                hospitals: 2,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Dengue'],
                ecologicalFactors: ['High residential density']
            },
            kpis: [{ title: 'New Cases (24h)', value: '45', change: '+10%', changeType: 'increase' }],
            alerts: [{ id: 1101, title: 'Multiple active breeding sites found', timestamp: '1 hour ago', severity: 'High', date: new Date().toISOString() }],
            hospitalData: { bedOccupancy: 80, icuOccupancy: 75, ventilatorAvailability: 20, staffStatus: 'Strained' },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 120,
                localEnvironmentalSignals: [{ id: 1, description: 'High Aedes count in residential blocks', sourceType: 'Vector Surveillance' }],
                livestockAlerts: [], cropDiseaseAlerts: []
            },
            drugInventory: [],
            aiSummary: '- District: Bukit Merah\\n- Primary Threat: Dengue Red Zone with multiple active clusters.',
            socioeconomicData: { povertyRate: 2.1, literacyRate: 98, sanitationAccess: 100 },
            oneHealthScore: { overall: 85, human: 82, animal: 95, environment: 78 }
        },
        { 
            id: 'DC', 
            name: 'Downtown Core', 
            value: 20, 
            profile: { 
                population: '5,000 (Resident), 500,000 (Transit)', 
                geography: 'CBD', 
                hospitals: 1,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Respiratory Illnesses'],
                ecologicalFactors: ['High Transit']
            },
            kpis: [{ title: 'New Cases (24h)', value: '5', change: 'Stable', changeType: 'decrease' }],
            alerts: [],
            hospitalData: { bedOccupancy: 60, icuOccupancy: 50, ventilatorAvailability: 50, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 10, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable situation.',
            socioeconomicData: { povertyRate: 1, literacyRate: 99, sanitationAccess: 100 },
            oneHealthScore: { overall: 92, human: 95, animal: 95, environment: 88 }
        }
    ]
  },
  EAS: {
    id: 'EAS',
    name: 'East Region',
    profile: {
      population: '0.7 Million',
      populationDensity: '6,800/km²',
      climate: 'Tropical Rainforest',
      geography: 'Coastal, Airport, Residential Towns',
      hygieneIndex: 94,
      dataSources: [
        { name: 'MOH Singapore', credibility: 99, bias: 'Low' },
        { name: 'NEA', credibility: 98, bias: 'Low' }
      ],
      healthcareCapacity: { icuBedsAvailable: '350', ventilatorsAvailable: '200', healthcareWorkerStatus: 'Adequate' },
      publicHealthResponse: { testingRatePer1000: 42.1, contactTracingEfficiency: 92 },
      socioeconomicFactors: { urbanizationLevel: 100, literacyRate: 97.8 }
    },
    kpis: [
      { title: 'New HFMD Cases (24h)', value: '85', change: '+2%', changeType: 'increase' },
      { title: 'Active Clusters', value: '4', change: 'Stable', changeType: 'decrease' },
      { title: 'Hospital Bed Occupancy', value: '68%', change: 'Stable', changeType: 'decrease' }
    ],
    alerts: [
      { id: 2001, title: 'HFMD Outbreak in Preschool', district: 'Tampines', timestamp: '5 hours ago', severity: 'Moderate', date: new Date().toISOString() }
    ],
    trendData: [
        { name: 'Week -4', value: 45 },
        { name: 'Week -3', value: 50 },
        { name: 'Week -2', value: 65 },
        { name: 'Week -1', value: 75 },
        { name: 'This Week', value: 85 },
    ],
    viralGenomics: {
        dominantStrain: 'Coxsackievirus A16',
        viralLoad: 45,
        viralLoadChange: 2,
        strainSummaryPrompt: 'Focus on pediatric transmission in preschools.',
        dataSource: 'National Public Health Lab'
    },
    aiSummary: '- Region: East\\n- Primary Threat: HFMD outbreaks in preschools.',
    drugInventory: [],
    vaccineInventory: [],
    districtPaths: [
        { id: 'TAM', name: 'Tampines', d: 'M200 200 L250 200 L250 250 L200 250 Z' },
        { id: 'PAS', name: 'Pasir Ris', d: 'M250 150 L300 150 L300 200 L250 200 Z' }
    ],
    districts: [
        { 
            id: 'TAM', 
            name: 'Tampines', 
            value: 60, 
            profile: { 
                population: '260,000', geography: 'Regional Centre', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['HFMD', 'Dengue'], ecologicalFactors: []
            },
            kpis: [{ title: 'New Cases (24h)', value: '35', change: '+5%', changeType: 'increase' }],
            alerts: [{ id: 2101, title: 'Preschool cluster escalates', timestamp: '2 hours ago', severity: 'Moderate', date: new Date().toISOString() }],
            hospitalData: { bedOccupancy: 75, icuOccupancy: 60, ventilatorAvailability: 30, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Moderate', feverSurveyReports: 50, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'HFMD cluster in Tampines Central.',
            socioeconomicData: { povertyRate: 2.5, literacyRate: 98, sanitationAccess: 100 },
            oneHealthScore: { overall: 88, human: 85, animal: 95, environment: 85 }
        },
        { 
            id: 'PAS', 
            name: 'Pasir Ris', 
            value: 25, 
            profile: { 
                population: '150,000', geography: 'Coastal Residential', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Dengue'], ecologicalFactors: ['Coastal Parks']
            },
            kpis: [{ title: 'New Cases (24h)', value: '12', change: 'Stable', changeType: 'decrease' }],
            alerts: [],
            hospitalData: { bedOccupancy: 65, icuOccupancy: 55, ventilatorAvailability: 35, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Moderate', feverSurveyReports: 20, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.',
            socioeconomicData: { povertyRate: 2, literacyRate: 98, sanitationAccess: 100 },
            oneHealthScore: { overall: 90, human: 90, animal: 90, environment: 90 }
        }
    ]
  },
  NOR: {
    id: 'NOR',
    name: 'North Region',
    profile: {
      population: '0.6 Million',
      populationDensity: '4,500/km²',
      climate: 'Tropical Rainforest',
      geography: 'Nature Reserves, Residential Towns, Border',
      hygieneIndex: 93,
      dataSources: [
        { name: 'MOH Singapore', credibility: 99, bias: 'Low' }
      ],
      healthcareCapacity: { icuBedsAvailable: '300', ventilatorsAvailable: '150', healthcareWorkerStatus: 'Adequate' },
      publicHealthResponse: { testingRatePer1000: 40.0, contactTracingEfficiency: 90 },
      socioeconomicFactors: { urbanizationLevel: 95, literacyRate: 97.5 }
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '65', change: '-2%', changeType: 'decrease' },
      { title: 'Active Clusters', value: '2', change: 'Stable', changeType: 'decrease' },
      { title: 'Hospital Bed Occupancy', value: '65%', change: 'Stable', changeType: 'decrease' }
    ],
    alerts: [],
    trendData: [
        { name: 'Week -4', value: 80 }, { name: 'This Week', value: 65 },
    ],
    viralGenomics: { dominantStrain: 'DENV-2', viralLoad: 50, viralLoadChange: -2, strainSummaryPrompt: '', dataSource: 'NPHL' },
    aiSummary: '- Region: North\\n- Primary Threat: Dengue (declining).\\n- Zoonotic Risk: High monitoring due to nature reserves.',
    drugInventory: [], vaccineInventory: [],
    districtPaths: [
        { id: 'WDL', name: 'Woodlands', d: 'M100 50 L150 50 L150 100 L100 100 Z' },
        { id: 'YSN', name: 'Yishun', d: 'M150 50 L200 50 L200 100 L150 100 Z' }
    ],
    districts: [
        { 
            id: 'WDL', name: 'Woodlands', value: 35, 
            profile: { population: '250,000', geography: 'Border Town', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Dengue'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '20', change: '-1%', changeType: 'decrease' }],
            alerts: [], hospitalData: { bedOccupancy: 65, icuOccupancy: 50, ventilatorAvailability: 20, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Moderate', feverSurveyReports: 30, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 2, literacyRate: 97, sanitationAccess: 100 },
            oneHealthScore: { overall: 88, human: 85, animal: 90, environment: 90 }
        },
        { 
            id: 'YSN', name: 'Yishun', value: 30, 
            profile: { population: '220,000', geography: 'Residential Town', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Dengue'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '15', change: 'Stable', changeType: 'decrease' }],
            alerts: [], hospitalData: { bedOccupancy: 60, icuOccupancy: 45, ventilatorAvailability: 25, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 25, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 2, literacyRate: 97, sanitationAccess: 100 },
            oneHealthScore: { overall: 89, human: 88, animal: 90, environment: 89 }
        }
    ]
  },
  NE: {
    id: 'NE',
    name: 'North-East Region',
    profile: {
      population: '0.9 Million',
      populationDensity: '9,000/km²',
      climate: 'Tropical Rainforest',
      geography: 'High-density new towns, coastal',
      hygieneIndex: 96,
      dataSources: [{ name: 'MOH Singapore', credibility: 99, bias: 'Low' }],
      healthcareCapacity: { icuBedsAvailable: '450', ventilatorsAvailable: '250', healthcareWorkerStatus: 'Adequate' },
      publicHealthResponse: { testingRatePer1000: 46.0, contactTracingEfficiency: 95 },
      socioeconomicFactors: { urbanizationLevel: 100, literacyRate: 98.8 }
    },
    kpis: [
      { title: 'New Cases (24h)', value: '75', change: '+1%', changeType: 'increase' },
      { title: 'Active Clusters', value: '3', change: 'Stable', changeType: 'decrease' },
      { title: 'Hospital Bed Occupancy', value: '72%', change: 'Stable', changeType: 'decrease' }
    ],
    alerts: [],
    trendData: [{ name: 'This Week', value: 75 }],
    viralGenomics: { dominantStrain: 'DENV-2', viralLoad: 55, viralLoadChange: 1, strainSummaryPrompt: '', dataSource: 'NPHL' },
    aiSummary: '- Region: North-East\\n- Situation is generally stable with small, contained clusters.',
    drugInventory: [], vaccineInventory: [],
    districtPaths: [
        { id: 'PGL', name: 'Punggol', d: 'M250 50 L300 50 L300 100 L250 100 Z' },
        { id: 'HGN', name: 'Hougang', d: 'M200 100 L250 100 L250 150 L200 150 Z' }
    ],
    districts: [
        { 
            id: 'PGL', name: 'Punggol', value: 40, 
            profile: { population: '180,000', geography: 'New Town', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['HFMD'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '25', change: '+2%', changeType: 'increase' }],
            alerts: [], hospitalData: { bedOccupancy: 70, icuOccupancy: 60, ventilatorAvailability: 30, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 40, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 1, literacyRate: 99, sanitationAccess: 100 },
            oneHealthScore: { overall: 90, human: 90, animal: 90, environment: 90 }
        },
        { 
            id: 'HGN', name: 'Hougang', value: 35, 
            profile: { population: '220,000', geography: 'Mature Town', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Dengue'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '15', change: 'Stable', changeType: 'decrease' }],
            alerts: [], hospitalData: { bedOccupancy: 75, icuOccupancy: 65, ventilatorAvailability: 20, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Moderate', feverSurveyReports: 30, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 1.5, literacyRate: 98, sanitationAccess: 100 },
            oneHealthScore: { overall: 89, human: 88, animal: 90, environment: 89 }
        }
    ]
  },
  WES: {
    id: 'WES',
    name: 'West Region',
    profile: {
      population: '0.9 Million',
      populationDensity: '4,500/km²',
      climate: 'Tropical Rainforest',
      geography: 'Industrial Hub, Residential',
      hygieneIndex: 94,
      dataSources: [{ name: 'MOH Singapore', credibility: 99, bias: 'Low' }],
      healthcareCapacity: { icuBedsAvailable: '400', ventilatorsAvailable: '200', healthcareWorkerStatus: 'Adequate' },
      publicHealthResponse: { testingRatePer1000: 44.0, contactTracingEfficiency: 93 },
      socioeconomicFactors: { urbanizationLevel: 100, literacyRate: 98.2 }
    },
    kpis: [
      { title: 'New Cases (24h)', value: '88', change: '-5%', changeType: 'decrease' },
      { title: 'Active Clusters', value: '2', change: 'Stable', changeType: 'decrease' },
      { title: 'Hospital Bed Occupancy', value: '68%', change: 'Stable', changeType: 'decrease' }
    ],
    alerts: [],
    trendData: [{ name: 'This Week', value: 88 }],
    viralGenomics: { dominantStrain: 'DENV-1', viralLoad: 45, viralLoadChange: -5, strainSummaryPrompt: '', dataSource: 'NPHL' },
    aiSummary: '- Region: West\\n- Stable situation with declining cases.',
    drugInventory: [], vaccineInventory: [],
    districtPaths: [
        { id: 'JUR', name: 'Jurong East', d: 'M50 150 L100 150 L100 200 L50 200 Z' },
        { id: 'CCK', name: 'Choa Chu Kang', d: 'M100 100 L150 100 L150 150 L100 150 Z' }
    ],
    districts: [
        { 
            id: 'JUR', name: 'Jurong East', value: 45, 
            profile: { population: '80,000', geography: 'Regional Centre, Industrial', hospitals: 2, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Dengue'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '20', change: '-2%', changeType: 'decrease' }],
            alerts: [], hospitalData: { bedOccupancy: 65, icuOccupancy: 55, ventilatorAvailability: 30, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Moderate', feverSurveyReports: 40, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 2, literacyRate: 98, sanitationAccess: 100 },
            oneHealthScore: { overall: 89, human: 88, animal: 90, environment: 89 }
        },
        { 
            id: 'CCK', name: 'Choa Chu Kang', value: 30, 
            profile: { population: '190,000', geography: 'Residential', hospitals: 1, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Dengue'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '15', change: 'Stable', changeType: 'decrease' }],
            alerts: [], hospitalData: { bedOccupancy: 60, icuOccupancy: 50, ventilatorAvailability: 20, staffStatus: 'Adequate' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 25, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 1.5, literacyRate: 98, sanitationAccess: 100 },
            oneHealthScore: { overall: 90, human: 89, animal: 91, environment: 90 }
        }
    ]
  }
`;

content = content.slice(0, afterWb) + newData + content.slice(afterWb);
fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected Singapore regions data!');
