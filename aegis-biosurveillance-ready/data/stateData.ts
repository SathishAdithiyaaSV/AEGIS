import { DetailedStateData } from '../types';

const now = new Date();

export const detailedStateData: Record<string, DetailedStateData> = {
  KL: {
    id: 'KL',
    name: 'Kerala',
    profile: {
      population: '35.7 Million',
      populationDensity: '860/km²',
      climate: 'Tropical Monsoon with distinct wet and dry seasons.',
      geography: 'Coastal plains, central highlands, extensive backwaters, and forests.',
      hygieneIndex: 82,
      dataSources: [
        { name: 'Kerala State Health Services', credibility: 95, bias: 'Low' },
        { name: 'National Centre for Disease Control (NCDC)', credibility: 98, bias: 'Low' },
        { name: 'Indian Council of Medical Research (ICMR)', credibility: 97, bias: 'Low' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '1,250',
        ventilatorsAvailable: '800',
        healthcareWorkerStatus: 'Strained',
      },
      publicHealthResponse: {
        testingRatePer1000: 15.2,
        contactTracingEfficiency: 78,
      },
      socioeconomicFactors: {
        urbanizationLevel: 47.7,
        literacyRate: 96.2,
      }
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '3,210', change: '+12.5%', changeType: 'increase' },
      { title: 'Active Alerts', value: '4', change: '+1 Critical', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '88%', change: 'High', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'Severe Dengue Outbreak', district: 'Ernakulam', timestamp: '3 hours ago', severity: 'Critical', date: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Leptospirosis Cases Rising', district: 'Thrissur', timestamp: '1 day ago', severity: 'High', date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 1200 },
        { name: 'Week -3', value: 1800 },
        { name: 'Week -2', value: 2500 },
        { name: 'Week -1', value: 2850 },
        { name: 'This Week', value: 3210 },
    ],
    viralGenomics: {
        dominantStrain: 'DENV-2 Serotype',
        viralLoad: 85,
        viralLoadChange: 15, // +15%
        strainSummaryPrompt: 'Focus on why DENV-2 is associated with more severe outcomes like Dengue Hemorrhagic Fever.',
        dataSource: 'INSACOG Genomic Surveillance',
    },
    aiSummary: `
- State: Kerala
- Primary Threat: Severe Dengue outbreak, DENV-2 serotype, concentrated in Ernakulam district.
- Case Velocity: New cases are increasing rapidly at +12.5% daily.
- Healthcare Strain: Hospital bed occupancy is at a critical 88%. Healthcare workers are strained.
- Secondary Threat: Post-monsoon Leptospirosis cases are on the rise in Thrissur.
- Zoonotic Risk: High vigilance for Nipah Virus in Kozhikode due to proximity to known fruit bat reservoirs.
- Environmental Signals: High Dengue RNA in Ernakulam wastewater; Leptospira DNA in Thrissur floodwater.
- Environmental Factors: Tropical monsoon climate and high population density are exacerbating vector-borne disease spread. Coastal and forest geography creates diverse breeding grounds for vectors.
- Public Health Response: Contact tracing efficiency is at 78%, may require enhancement to curb spread.
- Dominant Strains: DENV-2 is the primary concern. Historical context of Nipah Virus requires high alert for any neurological symptom clusters.
`,
    predictionDetails: {
        targetDisease: "Dengue",
        baselineForecast: [
            { name: "Week +1", value: 3600 },
            { name: "Week +2", value: 4100 },
            { name: "Week +3", value: 4500 },
            { name: "Week +4", value: 4800 },
        ],
        interventions: [
            { id: 'vector_control', name: 'Targeted Vector Control', description: 'Intensified fogging and larval source reduction in the top 5 high-risk districts (Ernakulam, Thrissur, etc.).' },
            { id: 'awareness_campaign', name: 'Statewide Awareness Campaign', description: 'Aggressive public information campaign via TV, radio, and social media on eliminating household breeding sites.' },
            { id: 'school_closure', name: 'School & College Closures', description: 'Temporary closure of educational institutions in the 3 most affected districts to reduce youth transmission.' },
        ],
    },
    drugInventory: [
        { name: 'Paracetamol 500mg', stock: 80000, burnRate: 12000, category: 'Analgesic' },
        { name: 'IV Fluids (Saline)', stock: 25000, burnRate: 4500, category: 'IV Fluid' },
        { name: 'Platelet Transfusion Kits', stock: 500, burnRate: 150, category: 'Medical Supply' },
        { name: 'Doxycycline 100mg', stock: 40000, burnRate: 2500, category: 'Antibiotic' },
    ],
    vaccineInventory: [
        { name: 'DengueShield (Inactivated)', targetPathogen: 'Dengue (All Serotypes)', type: 'Inactivated', dosesAvailable: 2_500_000, monthlyProductionCapacity: 0, efficacy: 85, wastageRate: 12 },
        { name: 'NipahGuard (mRNA)', targetPathogen: 'Nipah Virus (NiV)', type: 'mRNA', dosesAvailable: 50_000, monthlyProductionCapacity: 0, efficacy: 95, wastageRate: 18 },
    ],
    zoonoticAlerts: [
      { name: 'Nipah Virus (NiV)', location: 'Kozhikode district', risk: 'Critical', interfaceProximity: 'High', primaryVector: 'Fruit Bats' },
      { name: 'Avian Influenza (H5N1)', location: 'Alappuzha poultry farms', risk: 'High', interfaceProximity: 'Direct', primaryVector: 'Migratory Birds / Poultry' },
    ],
    environmentalAlerts: [
      { name: 'Dengue RNA', location: 'Ernakulam Sentinel Site', status: 'Trending', signalStrength: 180, sourceType: 'Wastewater' },
      { name: 'Leptospira DNA', location: 'Thrissur Floodplains', status: 'Confirmed', sourceType: 'Floodwater' },
      { name: 'Avian Influenza RNA', location: 'Kerala Statewide Sentinel Network', status: 'Trending', signalStrength: 85, sourceType: 'Zoonotic Wastewater' },
    ],
    genomicSignals: [
      { id: 'kl1', strainName: 'DENV-2 - Cosmopolitan Genotype', location: 'Ernakulam, Thrissur', significance: 'Increased Severity', summary: 'Linked to recent surge in hospitalizations and DHF cases.', dataSource: 'INSACOG / State Lab' },
      { id: 'kl2', strainName: 'Chikungunya - ECSA Genotype', location: 'Kottayam', significance: 'Under Monitoring', summary: 'East/Central/South African genotype detected, known for causing high fever and arthralgia.', dataSource: 'INSACOG / State Lab' },
    ],
    districtPaths: [
        { id: 'EKM', name: 'Ernakulam', d: 'M150 200 L170 190 L180 210 L160 220 Z' },
        { id: 'TSR', name: 'Thrissur', d: 'M155 170 L175 160 L185 180 L165 190 Z' },
        { id: 'TVM', name: 'Thiruvananthapuram', d: 'M140 230 L160 220 L170 240 L150 250 Z' },
        { id: 'KTM', name: 'Kottayam', d: 'M170 215 L190 205 L200 225 L180 235 Z' },
    ],
    districts: [
        { 
            id: 'EKM', 
            name: 'Ernakulam', 
            value: 1250, 
            profile: { 
                population: '3.4 Million', 
                geography: 'Coastal, Major port city, High tourist footfall', 
                hospitals: 25,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Leptospirosis', 'Chikungunya'],
                ecologicalFactors: ['High urbanization', 'Backwater ecosystem', 'Port of entry'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '450', change: '+15%', changeType: 'increase' },
            ],
            alerts: [
                { id: 101, title: 'Hospital ICU Capacity Critical', timestamp: '1 hour ago', severity: 'Critical', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 95,
                icuOccupancy: 98,
                ventilatorAvailability: 15,
                staffStatus: 'Overwhelmed',
            },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 1205,
                localEnvironmentalSignals: [
                    { id: 5, description: 'Uncovered water storage found, confirmed mosquito breeding ground sample.', sourceType: 'Water Management', highlight: true },
                    { id: 6, description: 'Avian Influenza RNA detected in poultry farm wastewater near Perumbavoor.', sourceType: 'Zoonotic Wastewater' },
                    { id: 7, description: 'High coliform bacteria count in public well, Aluva region.', sourceType: 'Water Source' },
                    { id: 2, description: 'Unusual mosquito breeding reported at Fort Kochi tourist area', sourceType: 'Community Report' },
                    { id: 3, description: 'Increased rodent sightings near Mattancherry market', sourceType: 'Market' },
                    { id: 4, description: 'Leptospira DNA traces in wastewater, Kakkanad IT park area.', sourceType: 'Zoonotic Wastewater' },
                ],
                livestockAlerts: [
                    { disease: 'Avian Influenza', species: 'Poultry', riskLevel: 'High', economicImpact: 'High' }
                ],
                cropDiseaseAlerts: [
                    { disease: 'Rice Blast', cropType: 'Paddy', threatLevel: 'Moderate', potentialYieldLoss: 20 }
                ],
                pestInfestationAlerts: [
                    { pest: 'Coconut Mite', cropType: 'Coconut', severity: 'Moderate', economicImpact: 'High', summary: 'Widespread infestation reported in coastal areas, impacting coconut yield.' }
                ],
                genomicSignals: [
                    { id: 'ekm1', strainName: 'DENV-2 - Specific Mutation (NS1-H42R)', location: 'Ernakulam General Hospital Cluster', significance: 'Increased Severity', summary: 'Novel mutation identified in a cluster of severe DHF cases.', dataSource: 'Local Sequencing' },
                ],
            },
            drugInventory: [
                { name: 'Paracetamol 500mg', stock: 20000, burnRate: 4000, category: 'Analgesic' },
                { name: 'IV Fluids (Saline)', stock: 5000, burnRate: 1500, category: 'IV Fluid' },
                { name: 'Platelet Transfusion Kits', stock: 100, burnRate: 50, category: 'Medical Supply' },
            ],
            aiSummary: `
- District: Ernakulam
- Primary Threat: Critical Dengue outbreak (DENV-2), with a 15% daily case increase, exacerbated by poor water management practices. Water surveillance has also identified high coliform counts in public wells in Aluva, increasing risk of water-borne diseases.
- Geography: The coastal port city with high tourist footfall is a major factor in rapid transmission. Beaches and urban markets are high-risk zones.
- Healthcare Strain: ICU capacity is at 98%, and staff are overwhelmed. Immediate support is required.
- Local Intel: Community reports confirm high mosquito breeding in tourist areas (Fort Kochi). Zoonotic surveillance is tracking multiple threats, with Leptospira DNA near the IT corridor and Avian Influenza RNA detected in poultry farm wastewater near Perumbavoor.
- Drug Inventory: Platelet kits have only 2 Days of Supply (DoS) remaining, a critical shortage. IV fluids are also low.
`,
            socioeconomicData: {
                povertyRate: 4.6,
                literacyRate: 97.5,
                sanitationAccess: 98.2,
            },
            oneHealthScore: {
                overall: 88,
                human: 92,
                animal: 85,
                environment: 87,
            },
        },
        { 
            id: 'TSR', 
            name: 'Thrissur', 
            value: 800,
            profile: { 
                population: '3.2 Million',
                geography: 'Coastal plains, Central highlands (forests)',
                hospitals: 18,
                healthcareEffectiveness: 'High',
                climaticZones: 2,
                prevalentDiseases: ['Leptospirosis', 'Dengue'],
                ecologicalFactors: ['Riverine ecosystem', 'Forest-urban interface'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '180', change: '+8%', changeType: 'increase' },
            ],
            alerts: [
                { id: 102, title: 'Contaminated Water Source Found', timestamp: '6 hours ago', severity: 'High', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 78,
                icuOccupancy: 85,
                ventilatorAvailability: 45,
                staffStatus: 'Strained',
            },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 650,
                localEnvironmentalSignals: [
                    { id: 1, description: 'Leptospira DNA in Chalakudy River', sourceType: 'Water Source' }
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                 { name: 'Doxycycline 100mg', stock: 15000, burnRate: 1200, category: 'Antibiotic' }
            ],
            aiSummary: `
- District: Thrissur
- Primary Threat: Rising Leptospirosis cases linked to contaminated river water post-monsoon.
- Geography: Forested highlands and coastal plains create diverse environments for zoonotic and water-borne diseases.
`,
            socioeconomicData: {
                povertyRate: 5.2,
                literacyRate: 96.8,
                sanitationAccess: 97.1,
            },
            oneHealthScore: {
                overall: 75,
                human: 78,
                animal: 60,
                environment: 85,
            },
        },
        { 
            id: 'TVM', 
            name: 'Thiruvananthapuram', 
            value: 650,
            profile: { 
                population: '3.3 Million', 
                geography: 'Coastal, State Capital', 
                hospitals: 30,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Typhoid'],
                ecologicalFactors: ['Urban heat island effect', 'Coastal erosion'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '110', change: '+5%', changeType: 'increase' },
            ],
            alerts: [
                { id: 103, title: 'Dengue Awareness Drive Launched', timestamp: '1 day ago', severity: 'Moderate', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 65,
                icuOccupancy: 70,
                ventilatorAvailability: 60,
                staffStatus: 'Adequate',
            },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 420,
                localEnvironmentalSignals: [],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [],
            aiSummary: 'Cases are stable, but vigilance is required due to proximity to high-risk zones.',
            socioeconomicData: {
                povertyRate: 5.1,
                literacyRate: 95.9,
                sanitationAccess: 99.2,
            },
            oneHealthScore: {
                overall: 65,
                human: 68,
                animal: 55,
                environment: 70,
            },
        },
        {
            id: 'KTM',
            name: 'Kottayam',
            value: 510,
            profile: {
                population: '2.0 Million',
                geography: 'Highlands, Rubber plantations',
                hospitals: 15,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Scrub Typhus'],
                ecologicalFactors: ['Monoculture plantations', 'Human-wildlife conflict'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '95', change: '+4%', changeType: 'increase' },
            ],
            alerts: [],
            hospitalData: {
                bedOccupancy: 72,
                icuOccupancy: 68,
                ventilatorAvailability: 55,
                staffStatus: 'Strained',
            },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 312,
                localEnvironmentalSignals: [],
                livestockAlerts: [],
                cropDiseaseAlerts: [
                    { disease: 'Abnormal Leaf Fall', cropType: 'Rubber', threatLevel: 'High', potentialYieldLoss: 30 }
                ],
            },
            drugInventory: [],
            aiSummary: 'Low case count, but a strained healthcare system indicates low baseline capacity.',
            socioeconomicData: {
                povertyRate: 6.8,
                literacyRate: 97.2,
                sanitationAccess: 96.5,
            },
            oneHealthScore: {
                overall: 72,
                human: 70,
                animal: 65,
                environment: 80,
            },
        }
    ]
  },
  MH: {
    id: 'MH',
    name: 'Maharashtra',
    profile: {
      population: '126.4 Million',
      populationDensity: '370/km²',
      climate: 'Tropical Wet and Dry',
      geography: 'Coastal plains (Konkan), Deccan plateau, Western Ghats.',
      hygieneIndex: 68,
      dataSources: [
        { name: 'Directorate of Health Services, Maharashtra', credibility: 94, bias: 'Low' },
        { name: 'National Centre for Disease Control (NCDC)', credibility: 98, bias: 'Low' },
        { name: 'World Health Organization (WHO) India', credibility: 99, bias: 'Low' },
      ],
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '1,850', change: '+6.2%', changeType: 'increase' },
      { title: 'Suspected Malaria Cases', value: '420', change: '-2.1%', changeType: 'decrease' },
      { title: 'Air Quality Index (AQI)', value: '155 (Unhealthy)', change: 'Worsening', changeType: 'increase' },
    ],
    alerts: [
        { id: 1, title: 'Dengue Spike in Urban Areas', district: 'Mumbai', timestamp: '18 hours ago', severity: 'High', date: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString() },
        { id: 2, title: 'H1N1 Cluster Detected', district: 'Pune', timestamp: '2 days ago', severity: 'High', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 900 },
        { name: 'Week -3', value: 1100 },
        { name: 'Week -2', value: 1450 },
        { name: 'Week -1', value: 1740 },
        { name: 'This Week', value: 1850 },
    ],
    viralGenomics: {
        dominantStrain: 'DENV-1 Serotype',
        viralLoad: 65,
        viralLoadChange: 8, // +8%
        strainSummaryPrompt: 'Focus on DENV-1 being a common serotype causing classic Dengue fever in densely populated urban areas.',
        dataSource: 'NIV Pune Sequencing Data',
    },
    aiSummary: `
- State: Maharashtra
- Primary Threat: Dengue (DENV-1) outbreak, heavily affecting dense urban centers like Mumbai.
- Secondary Threat: A new H1N1 cluster has been identified in Pune, requiring immediate containment measures.
- Environmental Factors: Poor air quality in major cities may be exacerbating respiratory conditions, potentially complicating diagnoses. Diverse geography from coastal areas to plateaus supports various disease vectors.
- Population Dynamics: The large and dense population of 126.4 million presents a significant challenge for controlling community transmission.
- Dominant Strains: DENV-1 and Influenza H1N1 are the key pathogens to monitor.
`,
    drugInventory: [
        { name: 'Paracetamol 500mg', stock: 150000, burnRate: 15000, category: 'Analgesic' },
        { name: 'Oseltamivir (Tamiflu)', stock: 12000, burnRate: 2800, category: 'Antiviral' },
        { name: 'IV Fluids (Saline)', stock: 60000, burnRate: 5000, category: 'IV Fluid' },
        { name: 'Azithromycin 500mg', stock: 95000, burnRate: 7000, category: 'Antibiotic' },
    ],
    vaccineInventory: [],
    districts: [],
    districtPaths: [],
  },
  DL: {
    id: 'DL',
    name: 'New Delhi (NCT)',
    profile: {
      population: '20.2 Million',
      populationDensity: '11,320/km² (Highest in India)',
      climate: 'Humid subtropical & semi-arid; extreme summer and winter seasons.',
      geography: 'Urban megacity in the Indo-Gangetic plain, Yamuna river basin.',
      hygieneIndex: 65,
      dataSources: [
        { name: 'Delhi Dept. of Health Services', credibility: 92, bias: 'Low' },
        { name: 'National Centre for Disease Control (NCDC)', credibility: 98, bias: 'Low' },
        { name: 'Municipal Corporation of Delhi (MCD)', credibility: 88, bias: 'Moderate' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '3,500',
        ventilatorsAvailable: '1,800',
        healthcareWorkerStatus: 'Strained',
      },
      publicHealthResponse: {
        testingRatePer1000: 25.5,
        contactTracingEfficiency: 65,
      },
      socioeconomicFactors: {
        urbanizationLevel: 97.5,
        literacyRate: 88.7,
      }
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '1,150', change: '+9.8%', changeType: 'increase' },
      { title: 'Respiratory Illness', value: '4,200 admits', change: '+15% (AQI > 350)', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '92%', change: 'Critical', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'Dengue outbreak escalates', district: 'East Delhi', timestamp: '6 hours ago', severity: 'Critical', date: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Spike in pediatric asthma cases', district: 'South Delhi', timestamp: '1 day ago', severity: 'High', date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 450 },
        { name: 'Week -3', value: 600 },
        { name: 'Week -2', value: 820 },
        { name: 'Week -1', value: 1050 },
        { name: 'This Week', value: 1150 },
    ],
    viralGenomics: {
        dominantStrain: 'DENV-3 Serotype',
        viralLoad: 78,
        viralLoadChange: 18, // +18%
        strainSummaryPrompt: 'Focus on the rapid urban transmission of DENV-3 and its potential for causing severe symptoms in a high-density population with high air pollution as a comorbidity factor.',
        dataSource: 'NCDC Genomic Surveillance',
    },
    aiSummary: `
- State: New Delhi (NCT)
- Primary Threat: Rapidly escalating Dengue outbreak (DENV-3 serotype), heavily concentrated in the densely populated East Delhi district.
- Comorbidity Factor: Severe air pollution (AQI > 350) is causing a significant spike in respiratory illnesses, complicating diagnoses and straining hospital capacity further.
- Healthcare Strain: Bed occupancy is at a critical 92%, with healthcare workers strained across the city-state.
- Zoonotic Risk: High risk of Avian Influenza spillover from major poultry markets like Ghazipur.
- Environmental Signals: Wastewater surveillance shows high Influenza A RNA signals in the Najafgarh drain catchment, indicating widespread community transmission of flu.
- Population Dynamics: Extreme population density (11,320/km²) is a major amplifier for disease transmission.
`,
    predictionDetails: {
        targetDisease: "Dengue",
        baselineForecast: [
            { name: "Week +1", value: 1350 },
            { name: "Week +2", value: 1600 },
            { name: "Week +3", value: 1900 },
            { name: "Week +4", value: 2100 },
        ],
        interventions: [
            { id: 'water_management', name: 'Aggressive Water Management', description: 'Daily monitoring and chemical treatment of all stagnant water bodies and construction sites across all districts.' },
            { id: 'public_restrictions', name: 'Public Restrictions', description: 'Impose restrictions on public gatherings and close outdoor markets for 2 weeks to limit transmission.' },
        ],
    },
    drugInventory: [
        { name: 'Paracetamol 650mg', stock: 120000, burnRate: 15000, category: 'Analgesic' },
        { name: 'ORS Packets', stock: 250000, burnRate: 20000, category: 'Medical Supply' },
        { name: 'Budesonide Inhalers', stock: 30000, burnRate: 8000, category: 'Medical Supply' },
        { name: 'Doxycycline 100mg', stock: 60000, burnRate: 3500, category: 'Antibiotic' },
    ],
    vaccineInventory: [
        { name: 'DengueShield (Inactivated)', targetPathogen: 'Dengue (All Serotypes)', type: 'Inactivated', dosesAvailable: 1_000_000, monthlyProductionCapacity: 0, efficacy: 85, wastageRate: 15 },
    ],
    zoonoticAlerts: [
      { name: 'Avian Influenza (H5N1)', location: 'Ghazipur Poultry Market', risk: 'High', interfaceProximity: 'Direct', primaryVector: 'Poultry' },
    ],
    environmentalAlerts: [
      { name: 'Influenza A RNA', location: 'Najafgarh Drain Sentinel', status: 'Trending', signalStrength: 250, sourceType: 'Wastewater' },
    ],
    districtPaths: [
        { id: 'ED', name: 'East Delhi', d: 'M185 180 L205 170 L215 190 L195 200 Z' },
        { id: 'SD', name: 'South Delhi', d: 'M150 200 L170 190 L180 210 L160 220 Z' },
        { id: 'CD', name: 'Central Delhi', d: 'M170 170 L190 160 L200 180 L180 190 Z' },
    ],
    districts: [
        { 
            id: 'ED', 
            name: 'East Delhi', 
            value: 650, 
            profile: { 
                population: '4.0 Million', 
                geography: 'Highly dense residential area, borders UP.', 
                hospitals: 15,
                healthcareEffectiveness: 'Low',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Typhoid', 'TB'],
                ecologicalFactors: ['High pollution levels', 'Urban crowding'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '380', change: '+18%', changeType: 'increase' },
            ],
            alerts: [
                { id: 201, title: 'Two major hospitals report zero ICU beds', timestamp: '2 hour ago', severity: 'Critical', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 98,
                icuOccupancy: 100,
                ventilatorAvailability: 5,
                staffStatus: 'Overwhelmed',
            },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 1850,
                localEnvironmentalSignals: [
                    { id: 1, description: 'Community reports of overflowing garbage dumps and stagnant water in Patparganj area.', sourceType: 'Community Report', highlight: true },
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                { name: 'Paracetamol 650mg', stock: 15000, burnRate: 5000, category: 'Analgesic' },
                { name: 'ORS Packets', stock: 20000, burnRate: 8000, category: 'Medical Supply' },
            ],
            aiSummary: `
- District: East Delhi
- Primary Threat: Epicenter of the Dengue outbreak, with cases rising 18% daily. Poor sanitation and high density are key drivers.
- Healthcare Strain: Complete saturation of ICU capacity. System is overwhelmed.
- Local Intel: Community reports confirm widespread sanitation issues, creating ideal mosquito breeding grounds.
- Drug Inventory: Critical shortage of both Paracetamol and ORS, with only a 3-day supply of analgesics.
`,
            socioeconomicData: {
                povertyRate: 12.5,
                literacyRate: 89.2,
                sanitationAccess: 85.1,
            },
            oneHealthScore: {
                overall: 92,
                human: 95,
                animal: 70,
                environment: 90,
            },
        },
        { 
            id: 'SD', 
            name: 'South Delhi', 
            value: 350,
            profile: { 
                population: '2.8 Million',
                geography: 'Affluent residential, commercial hubs.',
                hospitals: 22,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Respiratory Illnesses', 'Dengue'],
                ecologicalFactors: ['Air pollution hotspot', 'Reduced green cover'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '120', change: '+7%', changeType: 'increase' },
            ],
            alerts: [
                { id: 202, title: 'AQI-related ER visits up 30%', timestamp: '8 hours ago', severity: 'High', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 85,
                icuOccupancy: 90,
                ventilatorAvailability: 40,
                staffStatus: 'Strained',
            },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 800,
                localEnvironmentalSignals: [],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                 { name: 'Budesonide Inhalers', stock: 12000, burnRate: 3000, category: 'Medical Supply' }
            ],
            aiSummary: `
- District: South Delhi
- Primary Threat: Respiratory illnesses driven by severe air pollution. Dengue cases are present but rising more slowly than in East Delhi.
- Healthcare Strain: Healthcare system is effective but strained due to high patient load from both communicable and non-communicable (pollution-related) diseases.
`,
            socioeconomicData: {
                povertyRate: 7.1,
                literacyRate: 92.5,
                sanitationAccess: 97.8,
            },
            oneHealthScore: {
                overall: 80,
                human: 85,
                animal: 60,
                environment: 88,
            },
        },
        { 
            id: 'CD', 
            name: 'Central Delhi', 
            value: 150,
            profile: { 
                population: '0.6 Million', 
                geography: 'Government buildings, commercial center, high transit population.', 
                hospitals: 12,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Influenza'],
                ecologicalFactors: ['High traffic emissions', 'Limited residential zones'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '45', change: '+5%', changeType: 'increase' },
            ],
            alerts: [],
            hospitalData: {
                bedOccupancy: 70,
                icuOccupancy: 75,
                ventilatorAvailability: 65,
                staffStatus: 'Adequate',
            },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 350,
                localEnvironmentalSignals: [],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [],
            aiSummary: 'Relatively stable situation due to lower residential density, but high daily transit population poses a risk for disease transmission across the city.',
            socioeconomicData: {
                povertyRate: 8.5,
                literacyRate: 90.1,
                sanitationAccess: 95.2,
            },
            oneHealthScore: {
                overall: 70,
                human: 72,
                animal: 60,
                environment: 75,
            },
        },
    ]
  },
  TN: {
    id: 'TN',
    name: 'Tamil Nadu',
    profile: {
      population: '77.8 Million',
      populationDensity: '555/km²',
      climate: 'Tropical savanna, humid with distinct monsoon seasons.',
      geography: 'Coastal plains, Eastern and Western Ghats, Kaveri river delta.',
      hygieneIndex: 78,
      dataSources: [
        { name: 'Tamil Nadu Health & Family Welfare Dept', credibility: 96, bias: 'Low' },
        { name: 'National Centre for Disease Control (NCDC)', credibility: 98, bias: 'Low' },
        { name: 'King Institute of Preventive Medicine', credibility: 95, bias: 'Low' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '2,800',
        ventilatorsAvailable: '1,500',
        healthcareWorkerStatus: 'Strained',
      },
      publicHealthResponse: {
        testingRatePer1000: 18.2,
        contactTracingEfficiency: 72,
      },
      socioeconomicFactors: {
        urbanizationLevel: 48.4,
        literacyRate: 82.9,
      }
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '2,200', change: '+10.2%', changeType: 'increase' },
      { title: 'Active Hotspots', value: '18', change: '+3 in Chennai', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '85%', change: 'High', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'Dengue DENV-3 outbreak', district: 'Chennai', timestamp: '5 hours ago', severity: 'Critical', date: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Chikungunya cluster identified', district: 'Coimbatore', timestamp: '2 days ago', severity: 'High', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 1100 },
        { name: 'Week -3', value: 1400 },
        { name: 'Week -2', value: 1750 },
        { name: 'Week -1', value: 2000 },
        { name: 'This Week', value: 2200 },
    ],
    viralGenomics: {
        dominantStrain: 'DENV-3 Serotype',
        viralLoad: 82,
        viralLoadChange: 14, // +14%
        strainSummaryPrompt: 'Focus on DENV-3\'s association with severe fever and its rapid spread in urban settings like Chennai.',
        dataSource: 'State Public Health Laboratory',
    },
    aiSummary: `
- State: Tamil Nadu
- Primary Threat: Critical Dengue outbreak (DENV-3 serotype) centered in the megacity of Chennai.
- Case Velocity: New cases are increasing at an alarming rate of +10.2% daily.
- Healthcare Strain: Hospital capacity is under significant pressure with 85% bed occupancy.
- Secondary Threat: A notable Chikungunya cluster is emerging in Coimbatore, an industrial hub near forested areas.
- Zoonotic Risk: Kyasanur Forest Disease (KFD) is a known risk in the forested Western Ghats region bordering other states.
- Environmental Signals: High Dengue RNA signals confirmed in Chennai's wastewater systems, indicating widespread, potentially under-reported, community transmission.
- Population Dynamics: High urbanization (48.4%) and population density in cities like Chennai amplify the spread of vector-borne diseases.
`,
    drugInventory: [
        { name: 'Paracetamol 500mg', stock: 150000, burnRate: 18000, category: 'Analgesic' },
        { name: 'IV Fluids (Saline)', stock: 50000, burnRate: 8000, category: 'IV Fluid' },
        { name: 'Platelet Transfusion Kits', stock: 800, burnRate: 200, category: 'Medical Supply' },
        { name: 'Chloroquine', stock: 60000, burnRate: 1500, category: 'Antiviral' }, // For Malaria, lower burn rate
    ],
    vaccineInventory: [
        { name: 'DengueShield (Inactivated)', targetPathogen: 'Dengue (All Serotypes)', type: 'Inactivated', dosesAvailable: 1_800_000, monthlyProductionCapacity: 0, efficacy: 85, wastageRate: 10 },
    ],
    zoonoticAlerts: [
      { name: 'Kyasanur Forest Disease (KFD)', location: 'Nilgiris District (Western Ghats)', risk: 'High', interfaceProximity: 'High', primaryVector: 'Ticks (Haemaphysalis spinigera)' },
    ],
    environmentalAlerts: [
      { name: 'Dengue RNA', location: 'Chennai (Adyar) Sentinel', status: 'Confirmed', sourceType: 'Wastewater' },
      { name: 'Chikungunya RNA', location: 'Coimbatore Sentinel', status: 'Trending', signalStrength: 120, sourceType: 'Wastewater' },
    ],
    districtPaths: [
        { id: 'CHN', name: 'Chennai', d: 'M200 150 L220 140 L230 160 L210 170 Z' },
        { id: 'CBE', name: 'Coimbatore', d: 'M160 180 L180 170 L190 190 L170 200 Z' },
    ],
    districts: [
        { 
            id: 'CHN', 
            name: 'Chennai', 
            value: 980, 
            profile: { 
                population: '11.2 Million', 
                geography: 'Coastal megacity, major port, high population density.', 
                hospitals: 45,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Typhoid', 'Chikungunya'],
                ecologicalFactors: ['Coastal flooding risk', 'Urban water body pollution'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '750', change: '+15%', changeType: 'increase' },
            ],
            alerts: [
                { id: 301, title: 'Waterlogging reported in several zones after rainfall', timestamp: '10 hours ago', severity: 'High', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 94,
                icuOccupancy: 96,
                ventilatorAvailability: 20,
                staffStatus: 'Overwhelmed',
            },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 2500,
                localEnvironmentalSignals: [
                    { id: 1, description: 'Confirmed high Dengue RNA signal in Adyar river wastewater sample.', sourceType: 'Water Source', highlight: true },
                    { id: 2, description: 'Stagnant water and mosquito breeding sites reported in T. Nagar commercial area.', sourceType: 'Community Report' },
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                { name: 'Paracetamol 500mg', stock: 40000, burnRate: 8000, category: 'Analgesic' },
                { name: 'Platelet Transfusion Kits', stock: 250, burnRate: 100, category: 'Medical Supply' },
            ],
            aiSummary: `
- District: Chennai
- Primary Threat: Critical Dengue DENV-3 outbreak, with cases rising 15% daily. Waterlogging after rains is severely exacerbating the situation.
- Healthcare Strain: ICU capacity is almost fully saturated at 96%. The healthcare system is overwhelmed.
- Local Intel: Confirmed high Dengue RNA in wastewater indicates massive community spread. Community reports confirm breeding sites in high-traffic commercial zones.
- Drug Inventory: Platelet kits are critically low, with only a 2.5-day supply remaining.
`,
            socioeconomicData: {
                povertyRate: 9.8,
                literacyRate: 90.1,
                sanitationAccess: 92.5,
            },
            oneHealthScore: {
                overall: 85,
                human: 90,
                animal: 70,
                environment: 89,
            },
        },
        { 
            id: 'CBE', 
            name: 'Coimbatore', 
            value: 550,
            profile: { 
                population: '3.6 Million',
                geography: 'Industrial city at the foothills of the Western Ghats.',
                hospitals: 30,
                healthcareEffectiveness: 'High',
                climaticZones: 2,
                prevalentDiseases: ['Chikungunya', 'Dengue', 'KFD'],
                ecologicalFactors: ['Proximity to forest reserves', 'Industrial pollution'],
            },
            kpis: [
                { title: 'New Cases (24h)', value: '210', change: '+8%', changeType: 'increase' },
            ],
            alerts: [
                { id: 302, title: 'Increased Aedes mosquito density near forested areas', timestamp: '1 day ago', severity: 'Moderate', date: new Date().toISOString() }
            ],
            hospitalData: {
                bedOccupancy: 75,
                icuOccupancy: 80,
                ventilatorAvailability: 55,
                staffStatus: 'Strained',
            },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 950,
                localEnvironmentalSignals: [
                    { id: 1, description: 'Trending Chikungunya RNA in local wastewater.', sourceType: 'Water Source' },
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                 { name: 'Paracetamol 500mg', stock: 30000, burnRate: 2500, category: 'Analgesic' }
            ],
            aiSummary: `
- District: Coimbatore
- Primary Threat: Emerging Chikungunya cluster, with cases rising 8% daily. Dengue is also co-circulating.
- Geographic Risk: Proximity to the Western Ghats increases the risk of zoonotic spillover events like KFD. Surveillance of the urban-forest interface is critical.
- Healthcare Strain: The system is strained but currently managing the patient load.
`,
            socioeconomicData: {
                povertyRate: 11.2,
                literacyRate: 88.9,
                sanitationAccess: 89.1,
            },
            oneHealthScore: {
                overall: 78,
                human: 80,
                animal: 75,
                environment: 79,
            },
        },
    ]
  },
  KA: {
    id: 'KA',
    name: 'Karnataka',
    profile: {
      population: '67.7 Million',
      populationDensity: '320/km²',
      climate: 'Varies from arid to tropical monsoon.',
      geography: 'Deccan Plateau, Western Ghats (Malenadu), coastal plains.',
      hygieneIndex: 75,
      dataSources: [
        { name: 'Karnataka Health & Family Welfare Services', credibility: 95, bias: 'Low' },
        { name: 'National Institute of Virology (NIV) Bengaluru', credibility: 99, bias: 'Low' },
        { name: 'Manipal Institute of Virology', credibility: 96, bias: 'Low' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '3,200',
        ventilatorsAvailable: '1,900',
        healthcareWorkerStatus: 'Strained',
      },
      publicHealthResponse: {
        testingRatePer1000: 20.1,
        contactTracingEfficiency: 70,
      },
      socioeconomicFactors: {
        urbanizationLevel: 38.6,
        literacyRate: 75.4,
      }
    },
    kpis: [
      { title: 'New Dengue Cases (24h)', value: '1,900', change: '+9.5%', changeType: 'increase' },
      { title: 'KFD Alerts', value: '2', change: 'New case in Shivamogga', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '89%', change: 'Critical', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'Dengue outbreak in IT corridor', district: 'Bengaluru Urban', timestamp: '8 hours ago', severity: 'Critical', date: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Confirmed Kyasanur Forest Disease (KFD)', district: 'Shivamogga', timestamp: '1 day ago', severity: 'High', date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 950 },
        { name: 'Week -3', value: 1200 },
        { name: 'Week -2', value: 1550 },
        { name: 'Week -1', value: 1730 },
        { name: 'This Week', value: 1900 },
    ],
    viralGenomics: {
        dominantStrain: 'DENV-1 & DENV-3 Co-circulation',
        viralLoad: 80,
        viralLoadChange: 12, // +12%
        strainSummaryPrompt: 'Analyze the public health implications of DENV-1 and DENV-3 co-circulating in a major urban hub like Bengaluru, considering risks of severe disease.',
        dataSource: 'NIV Bengaluru Field Unit',
    },
    aiSummary: `
- State: Karnataka
- Primary Threat: Critical Dengue outbreak with co-circulation of DENV-1 and DENV-3, centered in the densely populated tech hub of Bengaluru.
- Zoonotic Emergency: Active Kyasanur Forest Disease (KFD) alerts in the forested Shivamogga district represent a significant, localized threat with high mortality.
- Healthcare Strain: Bed occupancy is at a critical 89%, particularly strained in Bengaluru Urban.
- Urban-Rural Divide: The state faces a dual challenge: a modern, urban disease outbreak in Bengaluru and a classic zoonotic, forest-based disease in Shivamogga.
- Environmental Signals: High Dengue RNA in Bengaluru wastewater confirms widespread transmission beyond reported cases.
`,
    drugInventory: [
        { name: 'Paracetamol 500mg', stock: 200000, burnRate: 22000, category: 'Analgesic' },
        { name: 'IV Fluids (Saline)', stock: 60000, burnRate: 9000, category: 'IV Fluid' },
        { name: 'Platelet Transfusion Kits', stock: 1000, burnRate: 250, category: 'Medical Supply' },
    ],
    vaccineInventory: [],
    zoonoticAlerts: [
      { name: 'Kyasanur Forest Disease (KFD)', location: 'Shivamogga & Uttara Kannada districts', risk: 'Critical', interfaceProximity: 'Direct', primaryVector: 'Ticks on monkeys/rodents' },
    ],
    environmentalAlerts: [
      { name: 'Dengue RNA (High Diversity)', location: 'Bengaluru (Bellandur)', status: 'Confirmed', sourceType: 'Wastewater' },
    ],
    districtPaths: [
        { id: 'BLR', name: 'Bengaluru Urban', d: 'M180 250 L200 240 L210 260 L190 270 Z' },
        { id: 'MYS', name: 'Mysuru', d: 'M170 280 L190 270 L200 290 L180 300 Z' },
        { id: 'SHV', name: 'Shivamogga', d: 'M150 230 L170 220 L180 240 L160 250 Z' },
    ],
    districts: [
        { 
            id: 'BLR', 
            name: 'Bengaluru Urban', 
            value: 1100, 
            profile: { 
                population: '13.1 Million', 
                geography: 'Major IT hub, high-density, construction sites.', 
                hospitals: 70,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Chikungunya', 'H1N1'],
                ecologicalFactors: ['Rapid urbanization', 'Bellandur Lake pollution'],
            },
            kpis: [ { title: 'New Cases (24h)', value: '850', change: '+14%', changeType: 'increase' } ],
            alerts: [ { id: 401, title: 'Multiple hospitals report bed shortages', timestamp: '4 hours ago', severity: 'Critical', date: new Date().toISOString() } ],
            hospitalData: { bedOccupancy: 96, icuOccupancy: 98, ventilatorAvailability: 18, staffStatus: 'Overwhelmed' },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 3200,
                localEnvironmentalSignals: [
                    { id: 1, description: 'Confirmed Dengue RNA in Bellandur lake catchment wastewater.', sourceType: 'Water Source', highlight: true },
                    { id: 2, description: 'Numerous reports of stagnant water at construction sites in Whitefield.', sourceType: 'Community Report' },
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                { name: 'Paracetamol 500mg', stock: 50000, burnRate: 10000, category: 'Analgesic' },
                { name: 'Platelet Transfusion Kits', stock: 300, burnRate: 120, category: 'Medical Supply' },
            ],
            aiSummary: `
- District: Bengaluru Urban
- Primary Threat: Severe Dengue outbreak with high case velocity (+14% daily), driven by widespread mosquito breeding at construction sites.
- Healthcare Strain: System is at breaking point with 98% ICU occupancy.
- Local Intel: Wastewater confirms high viral load in the Bellandur area. Community intelligence points to construction sites as key breeding grounds.
- Drug Inventory: Platelet kits are critically low, with only a 2.5-day supply.
`,
            socioeconomicData: {
                povertyRate: 8.4,
                literacyRate: 88.5,
                sanitationAccess: 95.3,
            },
            oneHealthScore: {
                overall: 82,
                human: 88,
                animal: 65,
                environment: 85,
            },
        },
        { 
            id: 'SHV', 
            name: 'Shivamogga', 
            value: 85,
            profile: { 
                population: '1.8 Million',
                geography: 'Forested, Malenadu region, Western Ghats.',
                hospitals: 12,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 2,
                prevalentDiseases: ['KFD', 'Malaria', 'Leptospirosis'],
                ecologicalFactors: ['Deforestation pressures', 'High biodiversity'],
            },
            kpis: [ { title: 'New KFD Cases (24h)', value: '3', change: '+1', changeType: 'increase' } ],
            alerts: [ { id: 402, title: 'Unusual monkey deaths reported near Agumbe', timestamp: '2 days ago', severity: 'High', date: new Date().toISOString() } ],
            hospitalData: { bedOccupancy: 60, icuOccupancy: 75, ventilatorAvailability: 50, staffStatus: 'Adequate' },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 150,
                localEnvironmentalSignals: [ { id: 1, description: 'Reports of monkey deaths, a key KFD indicator.', sourceType: 'Community Report', highlight: true } ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [],
            aiSummary: `
- District: Shivamogga
- Primary Threat: Kyasanur Forest Disease (KFD). Even low case numbers are a critical concern due to high mortality.
- Geographic Risk: Deep within the Western Ghats, the primary risk is spillover from animal populations (monkeys, rodents) via ticks.
- Local Intel: Reports of monkey deaths are a classic early warning sign for KFD and require immediate investigation by veterinary and health teams.
`,
            socioeconomicData: {
                povertyRate: 15.1,
                literacyRate: 80.4,
                sanitationAccess: 80.2,
            },
            oneHealthScore: {
                overall: 80,
                human: 75,
                animal: 90,
                environment: 78,
            },
        },
    ]
  },
  UP: {
    id: 'UP',
    name: 'Uttar Pradesh',
    profile: {
      population: '241 Million (Most Populous)',
      populationDensity: '828/km²',
      climate: 'Humid subtropical with dry winters.',
      geography: 'Fertile Indo-Gangetic Plain, major river systems (Ganges, Yamuna).',
      hygieneIndex: 55,
      dataSources: [
        { name: 'Uttar Pradesh Health Department', credibility: 85, bias: 'Moderate' },
        { name: 'National Centre for Disease Control (NCDC)', credibility: 98, bias: 'Low' },
        { name: 'ICMR - National Institute of Virology, Gorakhpur', credibility: 97, bias: 'Low' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '5,500',
        ventilatorsAvailable: '2,500',
        healthcareWorkerStatus: 'Overwhelmed',
      },
      publicHealthResponse: {
        testingRatePer1000: 8.5,
        contactTracingEfficiency: 55,
      },
      socioeconomicFactors: {
        urbanizationLevel: 22.3,
        literacyRate: 67.7,
      }
    },
    kpis: [
      { title: 'New JE Cases (24h)', value: '150', change: '+12%', changeType: 'increase' },
      { title: 'Acute Encephalitis Syndrome', value: '450 cases', change: '+8%', changeType: 'increase' },
      { title: 'Contaminated Water Sources', value: '82', change: 'Post-flood reports', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'Japanese Encephalitis (JE) outbreak', district: 'Gorakhpur', timestamp: '1 day ago', severity: 'Critical', date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Cholera cluster near Ganges', district: 'Varanasi', timestamp: '3 days ago', severity: 'High', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 80 },
        { name: 'Week -3', value: 95 },
        { name: 'Week -2', value: 110 },
        { name: 'Week -1', value: 130 },
        { name: 'This Week', value: 150 },
    ],
    viralGenomics: {
        dominantStrain: 'Japanese Encephalitis Virus (JEV) Genotype I',
        viralLoad: 88,
        viralLoadChange: 20, // +20%
        strainSummaryPrompt: 'Analyze the significance of JEV Genotype I in the context of the Gorakhpur region, its link to pigs as amplifying hosts, and its high mortality in children.',
        dataSource: 'NIV Gorakhpur Unit',
    },
    aiSummary: `
- State: Uttar Pradesh
- Primary Threat: Critical Japanese Encephalitis (JE) outbreak in the Gorakhpur division, a historical hotspot. High case velocity (+12% daily) and mortality risk in pediatric populations.
- Secondary Threat: Water-borne diseases like Cholera are a major concern, especially post-flooding near major rivers.
- Healthcare Strain: The healthcare system is overwhelmed due to the sheer population size and high patient load from endemic diseases.
- Zoonotic Risk: JE is a classic zoonotic disease with pigs as amplifying hosts and mosquitoes as vectors, a common interface in rural UP.
- Environmental Signals: Cholera bacteria confirmed in water sources in Varanasi.
`,
    drugInventory: [
        { name: 'Paracetamol 500mg', stock: 500000, burnRate: 45000, category: 'Analgesic' },
        { name: 'ORS Packets', stock: 1000000, burnRate: 90000, category: 'Medical Supply' },
        { name: 'Doxycycline 100mg', stock: 200000, burnRate: 15000, category: 'Antibiotic' },
    ],
    vaccineInventory: [
        { name: 'JENVAC (Inactivated)', targetPathogen: 'Japanese Encephalitis Virus', type: 'Inactivated', dosesAvailable: 5_000_000, monthlyProductionCapacity: 1_000_000, efficacy: 98, wastageRate: 8 },
    ],
    zoonoticAlerts: [
      { name: 'Japanese Encephalitis (JE)', location: 'Gorakhpur Division', risk: 'Critical', interfaceProximity: 'Direct', primaryVector: 'Culex mosquitoes (from pigs/birds)' },
    ],
    environmentalAlerts: [
      { name: 'Vibrio cholerae', location: 'Varanasi Ghats Water Sample', status: 'Confirmed', sourceType: 'Wastewater' },
    ],
    districtPaths: [
        { id: 'LKO', name: 'Lucknow', d: 'M140 180 L160 170 L170 190 L150 200 Z' },
        { id: 'GKP', name: 'Gorakhpur', d: 'M180 150 L200 140 L210 160 L190 170 Z' },
    ],
    districts: [
        { 
            id: 'GKP', 
            name: 'Gorakhpur', 
            value: 120, 
            profile: { 
                population: '4.5 Million', 
                geography: 'Terai region, paddy fields, high water-logging.', 
                hospitals: 10,
                healthcareEffectiveness: 'Low',
                climaticZones: 1,
                prevalentDiseases: ['Japanese Encephalitis', 'Acute Encephalitis Syndrome'],
                ecologicalFactors: ['Intensive rice cultivation', 'Proximity to pig farming'],
            },
            kpis: [ { title: 'New AES Cases (24h)', value: '80', change: '+15%', changeType: 'increase' } ],
            alerts: [ { id: 501, title: 'BRD Medical College reports full pediatric ICU', timestamp: '12 hours ago', severity: 'Critical', date: new Date().toISOString() } ],
            hospitalData: { bedOccupancy: 99, icuOccupancy: 100, ventilatorAvailability: 10, staffStatus: 'Overwhelmed' },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 1500,
                localEnvironmentalSignals: [
                    { id: 1, description: 'High density of Culex mosquitoes found near pig farms on the city outskirts.', sourceType: 'Community Report', highlight: true },
                ],
                livestockAlerts: [
                    { disease: 'Japanese Encephalitis', species: 'Swine', riskLevel: 'High', economicImpact: 'Moderate' },
                ],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                { name: 'Paracetamol 500mg', stock: 40000, burnRate: 8000, category: 'Analgesic' },
            ],
            aiSummary: `
- District: Gorakhpur
- Primary Threat: Epicenter of the Japanese Encephalitis outbreak. The entire pediatric healthcare system is overwhelmed.
- Geographic Risk: Paddy fields and water-logging create ideal breeding grounds for Culex mosquitoes, the primary vector for JE.
- Local Intel: Surveillance confirms high vector density near pig farms, the amplifying hosts for the virus. This is a critical control point.
- Healthcare Strain: The main tertiary care hospital (BRD) is completely saturated.
`,
            socioeconomicData: {
                povertyRate: 35.2,
                literacyRate: 72.1,
                sanitationAccess: 60.5,
            },
            oneHealthScore: {
                overall: 95,
                human: 98,
                animal: 95,
                environment: 92,
            },
        },
        { 
            id: 'LKO', 
            name: 'Lucknow', 
            value: 210,
            profile: { 
                population: '4.6 Million',
                geography: 'State capital, urban center.',
                hospitals: 25,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 1,
                prevalentDiseases: ['Dengue', 'Typhoid', 'Influenza'],
                ecologicalFactors: ['Gomti river pollution', 'Urban expansion'],
            },
            kpis: [ { title: 'New Dengue Cases (24h)', value: '110', change: '+8%', changeType: 'increase' } ],
            alerts: [],
            hospitalData: { bedOccupancy: 80, icuOccupancy: 85, ventilatorAvailability: 40, staffStatus: 'Strained' },
            surveillanceData: {
                vectorDensityIndex: 'Moderate',
                feverSurveyReports: 900,
                localEnvironmentalSignals: [],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [],
            aiSummary: `
- District: Lucknow
- Primary Threat: Standard urban vector-borne diseases like Dengue are prevalent and rising.
- Healthcare Strain: The system is strained but has more capacity than rural districts. It may receive patient overflow from harder-hit regions like Gorakhpur.
`,
            socioeconomicData: {
                povertyRate: 18.9,
                literacyRate: 84.7,
                sanitationAccess: 88.2,
            },
            oneHealthScore: {
                overall: 76,
                human: 79,
                animal: 65,
                environment: 75,
            },
        },
    ]
  },
  MP: {
    id: 'MP',
    name: 'Madhya Pradesh',
    profile: {
      population: '85 Million',
      populationDensity: '240/km²',
      climate: 'Humid subtropical, with hot summers and cool, dry winters.',
      geography: 'Central plateau, Vindhya and Satpura ranges, large forested areas.',
      hygieneIndex: 62,
      dataSources: [
        { name: 'Madhya Pradesh Dept. of Public Health', credibility: 88, bias: 'Low' },
        { name: 'National Centre for Disease Control (NCDC)', credibility: 98, bias: 'Low' },
        { name: 'National Institute for Research in Tribal Health (NIRTH)', credibility: 95, bias: 'Low' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '3,800',
        ventilatorsAvailable: '1,600',
        healthcareWorkerStatus: 'Strained',
      },
      publicHealthResponse: {
        testingRatePer1000: 9.8,
        contactTracingEfficiency: 62,
      },
      socioeconomicFactors: {
        urbanizationLevel: 28,
        literacyRate: 69.3,
      }
    },
    kpis: [
      { title: 'New Malaria Cases (24h)', value: '850', change: '+15.2%', changeType: 'increase' },
      { title: 'Active Chikungunya Alerts', value: '12', change: '+2 High', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '78%', change: 'High', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'P. falciparum Malaria Spike', district: 'Bhopal', timestamp: '1 day ago', severity: 'Critical', date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Chikungunya Cluster', district: 'Indore', timestamp: '3 days ago', severity: 'High', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 400 },
        { name: 'Week -3', value: 550 },
        { name: 'Week -2', value: 680 },
        { name: 'Week -1', value: 740 },
        { name: 'This Week', value: 850 },
    ],
    viralGenomics: {
        dominantStrain: 'Plasmodium falciparum (Drug-Resistant markers detected)',
        viralLoad: 75, // Using this for parasite load
        viralLoadChange: 18, // +18%
        strainSummaryPrompt: 'Analyze the threat of Plasmodium falciparum with potential artemisinin-resistance markers in Central India, focusing on risks to tribal populations.',
        dataSource: 'NIRTH Genomic Surveillance',
    },
    aiSummary: `
- State: Madhya Pradesh
- Primary Threat: A surge in drug-resistant P. falciparum Malaria, particularly concerning in forested and tribal areas. Cases are up 15.2% daily.
- Secondary Threat: Chikungunya clusters are emerging in urban centers like Indore, straining healthcare resources.
- Healthcare Strain: Bed occupancy is high at 78%, and the system is strained, especially in rural areas.
- Zoonotic Risk: High risk of Scrub Typhus from forested regions and Kyasanur Forest Disease (KFD) spillover from bordering states.
- Environmental Factors: Post-monsoon season creates ideal breeding grounds for Anopheles mosquitoes. Large forest cover increases human-animal interface.
`,
    drugInventory: [
        { name: 'Artesunate injections', stock: 15000, burnRate: 2500, category: 'Antiviral' },
        { name: 'Rapid Diagnostic Kits (Malaria)', stock: 120000, burnRate: 15000, category: 'Medical Supply' },
        { name: 'Paracetamol 500mg', stock: 250000, burnRate: 20000, category: 'Analgesic' },
        { name: 'Doxycycline 100mg', stock: 80000, burnRate: 4000, category: 'Antibiotic' },
    ],
    vaccineInventory: [
        { name: 'JENVAC (Inactivated)', targetPathogen: 'Japanese Encephalitis Virus', type: 'Inactivated', dosesAvailable: 800_000, monthlyProductionCapacity: 0, efficacy: 98, wastageRate: 10 },
    ],
    zoonoticAlerts: [
      { name: 'Scrub Typhus', location: 'Bhopal Division Forest Areas', risk: 'High', interfaceProximity: 'High', primaryVector: 'Chiggers (Mites)' },
    ],
    environmentalAlerts: [],
    districtPaths: [
        { id: 'BPL', name: 'Bhopal', d: 'M180 180 L200 170 L210 190 L190 200 Z' },
        { id: 'IND', name: 'Indore', d: 'M150 210 L170 200 L180 220 L160 230 Z' },
    ],
    districts: [
        { 
            id: 'BPL', 
            name: 'Bhopal', 
            value: 450, 
            profile: { 
                population: '2.4 Million', 
                geography: 'State capital, numerous lakes, hilly terrain.', 
                hospitals: 18,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 1,
                prevalentDiseases: ['Malaria', 'Dengue'],
                ecologicalFactors: ['Urban lakes ecosystem', 'Forest fringe areas'],
            },
            kpis: [ { title: 'New Cases (24h)', value: '120', change: '+18%', changeType: 'increase' } ],
            alerts: [ { id: 601, title: 'Reports of high mosquito density near Upper Lake', timestamp: '10 hours ago', severity: 'High', date: new Date().toISOString() } ],
            hospitalData: { bedOccupancy: 85, icuOccupancy: 90, ventilatorAvailability: 35, staffStatus: 'Strained' },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 1100,
                localEnvironmentalSignals: [
                    { id: 1, description: 'Community reports of stagnant water in residential colonies.', sourceType: 'Community Report', highlight: true },
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                { name: 'Artesunate injections', stock: 5000, burnRate: 800, category: 'Antiviral' },
            ],
            aiSummary: `
- District: Bhopal
- Primary Threat: Malaria outbreak with high case velocity (+18%). Stagnant water issues are exacerbating mosquito breeding.
- Healthcare Strain: System is strained with 90% ICU occupancy.
- Local Intel: Community reports confirm mosquito breeding grounds, which require immediate action from municipal teams.
`,
            socioeconomicData: {
                povertyRate: 16.5,
                literacyRate: 85.2,
                sanitationAccess: 82.1,
            },
            oneHealthScore: {
                overall: 79,
                human: 83,
                animal: 70,
                environment: 81,
            },
        },
    ]
  },
  WB: {
    id: 'WB',
    name: 'West Bengal',
    profile: {
      population: '99 Million',
      populationDensity: '1,028/km²',
      climate: 'Tropical wet-and-dry in south, humid subtropical in north.',
      geography: 'Ganges delta, coastal plains, Himalayan foothills.',
      hygieneIndex: 58,
      dataSources: [
        { name: 'West Bengal Dept. of Health & Family Welfare', credibility: 90, bias: 'Low' },
        { name: 'National Institute of Cholera and Enteric Diseases (NICED)', credibility: 99, bias: 'Low' },
        { name: 'ICMR', credibility: 97, bias: 'Low' },
      ],
      healthcareCapacity: {
        icuBedsAvailable: '4,500',
        ventilatorsAvailable: '2,200',
        healthcareWorkerStatus: 'Overwhelmed',
      },
      publicHealthResponse: {
        testingRatePer1000: 12.1,
        contactTracingEfficiency: 60,
      },
      socioeconomicFactors: {
        urbanizationLevel: 31.9,
        literacyRate: 76.3,
      }
    },
    kpis: [
      { title: 'New Cholera Cases (24h)', value: '1,240', change: '+22.5%', changeType: 'increase' },
      { title: 'Active Dengue Alerts', value: '25', change: '+5 Critical', changeType: 'increase' },
      { title: 'Hospital Bed Occupancy', value: '94%', change: 'Critical', changeType: 'increase' },
    ],
    alerts: [
      { id: 1, title: 'Severe Cholera Outbreak', district: 'Kolkata', timestamp: '8 hours ago', severity: 'Critical', date: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
      { id: 2, title: 'Avian Influenza H5N1 detected in poultry', district: 'North 24 Parganas', timestamp: '2 days ago', severity: 'High', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    trendData: [
        { name: 'Week -4', value: 500 },
        { name: 'Week -3', value: 700 },
        { name: 'Week -2', value: 950 },
        { name: 'Week -1', value: 1010 },
        { name: 'This Week', value: 1240 },
    ],
    viralGenomics: {
        dominantStrain: 'Vibrio cholerae O1, El Tor biotype',
        viralLoad: 92, // Using for bacterial load
        viralLoadChange: 25, // +25%
        strainSummaryPrompt: 'Analyze the significance of the V. cholerae O1 El Tor biotype in causing a rapid, severe cholera outbreak in a dense urban environment like Kolkata, focusing on water contamination pathways.',
        dataSource: 'NICED Kolkata Genomic Surveillance',
    },
    aiSummary: `
- State: West Bengal
- Primary Threat: A critical, fast-moving Cholera outbreak (V. cholerae O1) is centered in Kolkata, with cases up 22.5% daily. This is a public health emergency.
- Secondary Threat: Dengue cases are also on the rise, co-circulating and adding pressure to the healthcare system.
- Healthcare Strain: Bed occupancy is at a critical 94%. The healthcare system is overwhelmed.
- Zoonotic Emergency: Active Avian Influenza (H5N1) has been detected in poultry in North 24 Parganas, posing a significant spillover risk due to proximity to Kolkata.
- Environmental Factors: Post-monsoon waterlogging and contamination of municipal water sources are the primary drivers of the cholera outbreak.
`,
    drugInventory: [
        { name: 'ORS Packets', stock: 800000, burnRate: 150000, category: 'Medical Supply' },
        { name: 'IV Fluids (Saline)', stock: 150000, burnRate: 35000, category: 'IV Fluid' },
        { name: 'Doxycycline 100mg', stock: 250000, burnRate: 20000, category: 'Antibiotic' },
        { name: 'Azithromycin 500mg', stock: 180000, burnRate: 12000, category: 'Antibiotic' },
    ],
    vaccineInventory: [
        { name: 'BharatChol (Oral)', targetPathogen: 'Vibrio cholerae', type: 'Oral', dosesAvailable: 4_000_000, monthlyProductionCapacity: 0, efficacy: 90, wastageRate: 10 },
    ],
    zoonoticAlerts: [
      { name: 'Avian Influenza (H5N1)', location: 'Poultry farms, North 24 Parganas', risk: 'Critical', interfaceProximity: 'Direct', primaryVector: 'Poultry' },
    ],
    environmentalAlerts: [
      { name: 'Vibrio cholerae', location: 'Kolkata Municipal Water Supply', status: 'Confirmed', sourceType: 'Wastewater' },
    ],
    districtPaths: [
        { id: 'KOL', name: 'Kolkata', d: 'M220 220 L240 210 L250 230 L230 240 Z' },
        { id: 'N24', name: 'North 24 Parganas', d: 'M245 205 L265 195 L275 215 L255 225 Z' },
    ],
    districts: [
        { 
            id: 'KOL', 
            name: 'Kolkata', 
            value: 950, 
            profile: { 
                population: '4.5 Million (15M Metro)', 
                geography: 'Megacity on Ganges delta, prone to waterlogging.', 
                hospitals: 55,
                healthcareEffectiveness: 'Moderate',
                climaticZones: 1,
                prevalentDiseases: ['Cholera', 'Dengue', 'Typhoid'],
                ecologicalFactors: ['River delta pollution', 'Urban flooding'],
            },
            kpis: [ { title: 'New Cases (24h)', value: '780', change: '+25%', changeType: 'increase' } ],
            alerts: [ { id: 701, title: 'Multiple hospitals report running out of IV fluids', timestamp: '4 hours ago', severity: 'Critical', date: new Date().toISOString() } ],
            hospitalData: { bedOccupancy: 98, icuOccupancy: 95, ventilatorAvailability: 25, staffStatus: 'Overwhelmed' },
            surveillanceData: {
                vectorDensityIndex: 'High',
                feverSurveyReports: 4500,
                localEnvironmentalSignals: [
                    { id: 1, description: 'V. cholerae O1 confirmed in municipal tap water samples from Behala area.', sourceType: 'Water Source', highlight: true },
                    { id: 2, description: 'Widespread reports of waterlogging and sewer backflow after heavy rains.', sourceType: 'Community Report' },
                ],
                livestockAlerts: [],
                cropDiseaseAlerts: [],
            },
            drugInventory: [
                { name: 'ORS Packets', stock: 200000, burnRate: 80000, category: 'Medical Supply' },
                { name: 'IV Fluids (Saline)', stock: 30000, burnRate: 15000, category: 'IV Fluid' },
            ],
            aiSummary: `
- District: Kolkata
- Primary Threat: Epicenter of a severe Cholera outbreak, with cases rising 25% daily. Contaminated municipal water is the confirmed source.
- Healthcare Strain: System is overwhelmed, with critical shortages of IV fluids and only 2 Days of Supply remaining.
- Local Intel: The outbreak is directly linked to water contamination in Behala. Widespread waterlogging is exacerbating the spread.
- Drug Inventory: Critical shortage of both ORS and IV fluids.
`,
            socioeconomicData: {
                povertyRate: 11.9,
                literacyRate: 86.3,
                sanitationAccess: 90.7,
            },
            oneHealthScore: {
                overall: 91,
                human: 96,
                animal: 75,
                environment: 94,
            },
        },
    ]
  },

  CEN: {
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
    aiSummary: '- Region: Central\n- Primary Threat: Dengue outbreak in Bukit Merah.\n- Healthcare Strain: Moderate, beds available.\n- Local Intel: Vector control operations intensified.',
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
            aiSummary: '- District: Bukit Merah\n- Primary Threat: Dengue Red Zone with multiple active clusters.',
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
    aiSummary: '- Region: East\n- Primary Threat: HFMD outbreaks in preschools.',
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
    aiSummary: '- Region: North\n- Primary Threat: Dengue (declining).\n- Zoonotic Risk: High monitoring due to nature reserves.',
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
    aiSummary: '- Region: North-East\n- Situation is generally stable with small, contained clusters.',
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
    aiSummary: '- Region: West\n- Stable situation with declining cases.',
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

  ,ENG: {
    id: 'ENG',
    name: 'England',
    profile: {
      population: '56.3 Million',
      populationDensity: '432/km²',
      climate: 'Temperate Maritime',
      geography: 'Rolling hills, urban centers, and coastal plains',
      hygieneIndex: 94,
      dataSources: [
        { name: 'NHS England', credibility: 99, bias: 'Low' },
        { name: 'UK Health Security Agency (UKHSA)', credibility: 98, bias: 'Low' }
      ],
      healthcareCapacity: {
        icuBedsAvailable: '4,100',
        ventilatorsAvailable: '3,000',
        healthcareWorkerStatus: 'Strained'
      },
      publicHealthResponse: {
        testingRatePer1000: 48.5,
        contactTracingEfficiency: 85
      },
      socioeconomicFactors: {
        urbanizationLevel: 83,
        literacyRate: 99
      }
    },
    kpis: [
      { title: 'New Influenza Cases (24h)', value: '3,400', change: '+12%', changeType: 'increase' },
      { title: 'Norovirus Outbreaks', value: '15', change: '+5', changeType: 'increase' },
      { title: 'A&E Occupancy', value: '92%', change: 'Critical', changeType: 'increase' }
    ],
    alerts: [
      { id: 4001, title: 'Norovirus Outbreak in Care Homes', district: 'Oxfordshire', timestamp: '3 hours ago', severity: 'High', date: new Date().toISOString() }
    ],
    trendData: [
        { name: 'Week -4', value: 2000 },
        { name: 'Week -3', value: 2200 },
        { name: 'Week -2', value: 2500 },
        { name: 'Week -1', value: 3000 },
        { name: 'This Week', value: 3400 },
    ],
    viralGenomics: {
        dominantStrain: 'Influenza A (H3N2)',
        viralLoad: 75,
        viralLoadChange: 12,
        strainSummaryPrompt: 'Analyze the high incidence of H3N2 among the elderly population.',
        dataSource: 'UKHSA Genomic Surveillance'
    },
    aiSummary: '- Region: England\n- Primary Threat: Rising Influenza A cases and localized Norovirus outbreaks.\n- Healthcare Strain: A&E departments are facing high pressure.\n- Local Intel: Care homes in Oxfordshire are reporting rapid transmission of Norovirus.',
    drugInventory: [
        { name: 'Oseltamivir (Tamiflu)', stock: 250000, burnRate: 15000, category: 'Antiviral' },
        { name: 'IV Fluids (Saline)', stock: 80000, burnRate: 10000, category: 'IV Fluid' }
    ],
    vaccineInventory: [],
    districtPaths: [
        { id: 'OXF', name: 'Oxfordshire', d: 'M150 180 L180 170 L200 190 L160 210 Z' },
        { id: 'LDN', name: 'Greater London', d: 'M200 200 L230 190 L240 220 L210 230 Z' }
    ],
    districts: [
        { 
            id: 'OXF', 
            name: 'Oxfordshire', 
            value: 80, 
            profile: { 
                population: '691,000', 
                geography: 'Semi-rural with historic urban center', 
                hospitals: 4,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Norovirus', 'Influenza'],
                ecologicalFactors: ['Large student population', 'Elderly demographics']
            },
            kpis: [{ title: 'New Cases (24h)', value: '145', change: '+20%', changeType: 'increase' }],
            alerts: [{ id: 4101, title: 'Multiple care homes reporting Norovirus', timestamp: '1 hour ago', severity: 'Critical', date: new Date().toISOString() }],
            hospitalData: { bedOccupancy: 88, icuOccupancy: 85, ventilatorAvailability: 45, staffStatus: 'Strained' },
            surveillanceData: {
                vectorDensityIndex: 'Low',
                feverSurveyReports: 350,
                localEnvironmentalSignals: [{ id: 1, description: 'Increased gastrointestinal illness reports in university clinics', sourceType: 'Community Report' }],
                livestockAlerts: [], cropDiseaseAlerts: []
            },
            drugInventory: [
                { name: 'Oral Rehydration Salts', stock: 5000, burnRate: 800, category: 'Supportive' }
            ],
            aiSummary: '- District: Oxfordshire\n- Primary Threat: Rapid spread of Norovirus in residential care homes and university accommodations.',
            socioeconomicData: { povertyRate: 9, literacyRate: 99, sanitationAccess: 100 },
            oneHealthScore: { overall: 88, human: 85, animal: 92, environment: 87 }
        },
        { 
            id: 'LDN', 
            name: 'Greater London', 
            value: 250, 
            profile: { 
                population: '8.9 Million', 
                geography: 'Dense Urban Megacity', 
                hospitals: 35,
                healthcareEffectiveness: 'High',
                climaticZones: 1,
                prevalentDiseases: ['Influenza', 'RSV'],
                ecologicalFactors: ['High transit population']
            },
            kpis: [{ title: 'New Cases (24h)', value: '1,200', change: '+8%', changeType: 'increase' }],
            alerts: [],
            hospitalData: { bedOccupancy: 95, icuOccupancy: 92, ventilatorAvailability: 150, staffStatus: 'Overwhelmed' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 4500, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'High respiratory disease burden. A&E capacity is severely stretched.',
            socioeconomicData: { povertyRate: 15, literacyRate: 99, sanitationAccess: 100 },
            oneHealthScore: { overall: 85, human: 82, animal: 90, environment: 83 }
        }
    ]
  },
  SCT: {
    id: 'SCT',
    name: 'Scotland',
    profile: {
      population: '5.4 Million',
      populationDensity: '70/km²',
      climate: 'Temperate Oceanic',
      geography: 'Highlands, Lowlands, Islands',
      hygieneIndex: 95,
      dataSources: [
        { name: 'Public Health Scotland', credibility: 99, bias: 'Low' }
      ],
      healthcareCapacity: { icuBedsAvailable: '500', ventilatorsAvailable: '350', healthcareWorkerStatus: 'Strained' },
      publicHealthResponse: { testingRatePer1000: 50.1, contactTracingEfficiency: 88 },
      socioeconomicFactors: { urbanizationLevel: 83, literacyRate: 99 }
    },
    kpis: [
      { title: 'New Cases (24h)', value: '850', change: '+4%', changeType: 'increase' },
      { title: 'H5N1 Alerts', value: '1', change: 'New', changeType: 'increase' }
    ],
    alerts: [
      { id: 4002, title: 'H5N1 detected in poultry', district: 'Lothian', timestamp: '1 day ago', severity: 'Critical', date: new Date().toISOString() }
    ],
    trendData: [{ name: 'This Week', value: 850 }],
    viralGenomics: { dominantStrain: 'Influenza A', viralLoad: 65, viralLoadChange: 4, strainSummaryPrompt: '', dataSource: 'PHS' },
    aiSummary: '- Region: Scotland\n- Primary Threat: Avian Influenza outbreak in Lothian poultry farms.',
    drugInventory: [], vaccineInventory: [],
    districtPaths: [
        { id: 'LTH', name: 'Lothian', d: 'M150 100 L180 90 L190 120 L160 130 Z' },
        { id: 'GLG', name: 'Greater Glasgow', d: 'M120 100 L150 90 L160 120 L130 130 Z' }
    ],
    districts: [
        { 
            id: 'LTH', name: 'Lothian', value: 90, 
            profile: { population: '900,000', geography: 'Coastal and Urban', hospitals: 5, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Influenza'], ecologicalFactors: ['Poultry farms'] },
            kpis: [{ title: 'New Cases (24h)', value: '150', change: '+2%', changeType: 'increase' }],
            alerts: [{ id: 4102, title: 'Avian Influenza confirmed at 3 farms', timestamp: '1 day ago', severity: 'Critical', date: new Date().toISOString() }],
            hospitalData: { bedOccupancy: 82, icuOccupancy: 75, ventilatorAvailability: 50, staffStatus: 'Strained' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 400, localEnvironmentalSignals: [], livestockAlerts: [{ id: 1, description: 'H5N1 confirmed in commercial flock', species: 'Poultry' }], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Zoonotic spillover risk is high.', socioeconomicData: { povertyRate: 11, literacyRate: 99, sanitationAccess: 100 },
            oneHealthScore: { overall: 75, human: 85, animal: 40, environment: 80 }
        },
        { 
            id: 'GLG', name: 'Greater Glasgow', value: 120, 
            profile: { population: '1.2 Million', geography: 'Urban', hospitals: 6, healthcareEffectiveness: 'High', climaticZones: 1, prevalentDiseases: ['Influenza'], ecologicalFactors: [] },
            kpis: [{ title: 'New Cases (24h)', value: '250', change: 'Stable', changeType: 'decrease' }],
            alerts: [], hospitalData: { bedOccupancy: 88, icuOccupancy: 80, ventilatorAvailability: 60, staffStatus: 'Strained' },
            surveillanceData: { vectorDensityIndex: 'Low', feverSurveyReports: 600, localEnvironmentalSignals: [], livestockAlerts: [], cropDiseaseAlerts: [] },
            drugInventory: [], aiSummary: 'Stable.', socioeconomicData: { povertyRate: 14, literacyRate: 99, sanitationAccess: 100 },
            oneHealthScore: { overall: 86, human: 85, animal: 90, environment: 83 }
        }
    ]
  },
  WAL: {
    id: 'WAL',
    name: 'Wales',
    profile: {
      population: '3.1 Million',
      populationDensity: '150/km²',
      climate: 'Temperate Maritime',
      geography: 'Mountainous, Coastal',
      hygieneIndex: 94,
      dataSources: [{ name: 'Public Health Wales', credibility: 98, bias: 'Low' }],
      healthcareCapacity: { icuBedsAvailable: '200', ventilatorsAvailable: '150', healthcareWorkerStatus: 'Adequate' },
      publicHealthResponse: { testingRatePer1000: 42.0, contactTracingEfficiency: 85 },
      socioeconomicFactors: { urbanizationLevel: 67, literacyRate: 99 }
    },
    kpis: [{ title: 'New Cases (24h)', value: '420', change: '-1%', changeType: 'decrease' }],
    alerts: [], trendData: [{ name: 'This Week', value: 420 }],
    viralGenomics: { dominantStrain: 'RSV', viralLoad: 50, viralLoadChange: -1, strainSummaryPrompt: '', dataSource: 'PHW' },
    aiSummary: '- Region: Wales\n- Stable situation.',
    drugInventory: [], vaccineInventory: [], districtPaths: [], districts: []
  },
  NIR: {
    id: 'NIR',
    name: 'Northern Ireland',
    profile: {
      population: '1.9 Million',
      populationDensity: '133/km²',
      climate: 'Temperate Maritime',
      geography: 'Rolling hills, Loughs',
      hygieneIndex: 93,
      dataSources: [{ name: 'Public Health Agency NI', credibility: 98, bias: 'Low' }],
      healthcareCapacity: { icuBedsAvailable: '120', ventilatorsAvailable: '80', healthcareWorkerStatus: 'Adequate' },
      publicHealthResponse: { testingRatePer1000: 40.0, contactTracingEfficiency: 82 },
      socioeconomicFactors: { urbanizationLevel: 65, literacyRate: 99 }
    },
    kpis: [{ title: 'New Cases (24h)', value: '310', change: 'Stable', changeType: 'decrease' }],
    alerts: [], trendData: [{ name: 'This Week', value: 310 }],
    viralGenomics: { dominantStrain: 'Influenza B', viralLoad: 45, viralLoadChange: 0, strainSummaryPrompt: '', dataSource: 'PHA' },
    aiSummary: '- Region: Northern Ireland\n- Stable situation.',
    drugInventory: [], vaccineInventory: [], districtPaths: [], districts: []
  }
};
