import { AllSurveillanceData, SurveillanceMapData } from "../types";

export const surveillanceMapData: SurveillanceMapData = {
    livestock: [
        { id: 'KL', name: 'Kerala', value: 85 },
        { id: 'MH', name: 'Maharashtra', value: 70 },
        { id: 'WB', name: 'West Bengal', value: 90 },
    ],
    zoonotic: [
        { id: 'KL', name: 'Kerala', value: 95 },
        { id: 'KA', name: 'Karnataka', value: 80 },
        { id: 'WB', name: 'West Bengal', value: 75 },
    ],
    environmental: [
        { id: 'DL', name: 'Delhi', value: 92 },
        { id: 'KL', name: 'Kerala', value: 78 },
        { id: 'TN', name: 'Tamil Nadu', value: 85 },
    ],
    genomic: [
        { id: 'KL', name: 'Kerala', value: 90 },
        { id: 'MH', name: 'Maharashtra', value: 80 },
        { id: 'DL', name: 'Delhi', value: 85 },
    ],
    wildlife: [
        { id: 'GJ', name: 'Gujarat', value: 88 },
        { id: 'KA', name: 'Karnataka', value: 92 },
        { id: 'MP', name: 'Madhya Pradesh', value: 70 },
    ],
    disaster: [
        { id: 'AS', name: 'Assam', value: 95 },
        { id: 'MH', name: 'Maharashtra', value: 80 },
        { id: 'KL', name: 'Kerala', value: 85 },
    ],
    pest_crop: [
        { id: 'PB', name: 'Punjab', value: 90 },
        { id: 'UP', name: 'Uttar Pradesh', value: 85 },
        { id: 'MH', name: 'Maharashtra', value: 75 },
        { id: 'KA', name: 'Karnataka', value: 80 },
    ],
};

export const allSurveillanceData: AllSurveillanceData = {
    livestock: {
        'KL': {
            vaccinationStats: [
                { species: 'Cattle', vaccinated: 4_500_000, total: 5_200_000, targetDiseases: ['FMD', 'Brucellosis'] },
                { species: 'Poultry', vaccinated: 22_000_000, total: 25_000_000, targetDiseases: ['Avian Influenza (HPAI)', 'Newcastle Disease'] },
                { species: 'Goat/Sheep', vaccinated: 1_200_000, total: 1_800_000, targetDiseases: ['PPR', 'Goat Pox'] },
                { species: 'Dogs', vaccinated: 800_000, total: 1_100_000, targetDiseases: ['Rabies'] },
            ],
            prevalentDiseases: [
                { disease: 'Avian Influenza (HPAI)', species: 'Poultry', risk: 'High', summary: 'Recurring outbreaks in Alappuzha backwaters, linked to migratory birds.' },
                { disease: 'Leptospirosis', species: 'Cattle', risk: 'Moderate', summary: 'Post-monsoon risk high in water-logged areas, transmissible to humans.' },
            ],
            aiSummary: 'Kerala has robust vaccination programs but faces significant challenges from Avian Influenza in its dense poultry populations. Post-monsoon health management for cattle is critical to prevent zoonotic spillovers like Leptospirosis.'
        },
        'MH': {
            vaccinationStats: [
                { species: 'Cattle', vaccinated: 15_000_000, total: 20_000_000, targetDiseases: ['FMD'] },
                { species: 'Poultry', vaccinated: 80_000_000, total: 100_000_000, targetDiseases: ['Avian Influenza'] },
            ],
            prevalentDiseases: [
                { disease: 'Foot and Mouth Disease (FMD)', species: 'Cattle', risk: 'High', summary: 'Endemic in several districts, impacting dairy economy.' },
            ],
            aiSummary: 'Maharashtra\'s massive livestock population requires continuous FMD vaccination campaigns. The poultry industry remains vulnerable to Avian Influenza, though no active outbreaks are reported.'
        }
    },
    zoonotic: {
        'KL': {
            highRiskVectors: [
                { vector: 'Bats', diseases: ['Nipah Virus'], prevalence: 'High' },
                { vector: 'Mosquitoes', diseases: ['Dengue', 'Chikungunya'], prevalence: 'High' },
                { vector: 'Rodents', diseases: ['Leptospirosis'], prevalence: 'Moderate' },
            ],
            sentinelSpecies: [
                { species: 'Fruit Bats (Pteropus)', status: 'Alert', lastChecked: '48h ago', location: 'Kozhikode Bat Colonies' },
                { species: 'Macaques', status: 'Nominal', lastChecked: '1 week ago', location: 'Silent Valley Buffer Zone' },
            ],
            aiSummary: 'Kerala remains on high alert for Nipah virus due to active surveillance in bat colonies. The high prevalence of mosquito and rodent vectors makes vector control a year-round priority to prevent outbreaks.'
        }
    },
    environmental: {
        'DL': {
            waterSources: [
                { location: 'Yamuna River', sourceType: 'River', quality: 'Poor', contaminants: ['E. coli', 'Heavy Metals'] },
                { location: 'Okhla Barrage', sourceType: 'Lake', quality: 'Poor', contaminants: ['Industrial Effluents', 'Vibrio species'] },
                { location: 'Wazirabad Treatment Plant', sourceType: 'Urban Supply', quality: 'Fair', contaminants: ['High Ammonia levels (seasonal)'] },
            ],
            airQualityHotspots: [
                { location: 'Anand Vihar', aqi: 412, primaryPollutant: 'PM2.5' },
                { location: 'Jahangirpuri', aqi: 388, primaryPollutant: 'PM2.5' },
            ],
            aiSummary: 'Delhi\'s primary environmental health risks stem from severe air pollution and contamination of the Yamuna river. Water quality issues pose a constant threat of water-borne diseases like cholera and typhoid.'
        }
    },
    genomic: {
        'KL': {
            sequencingCapacity: {
                labs: 4,
                throughput: 1500,
            },
            circulatingStrains: [
                { strain: 'DENV-2 (Cosmopolitan)', pathogen: 'Dengue Virus', prevalence: 65, significance: 'Increased Severity' },
                { strain: 'Chikungunya (ECSA)', pathogen: 'Chikungunya Virus', prevalence: 20, significance: 'Under Monitoring' },
                { strain: 'Nipah (Bangladesh)', pathogen: 'Nipah Virus', prevalence: 0, significance: 'Under Monitoring' },
            ],
            aiSummary: 'Kerala has moderate sequencing capacity, currently focused on the DENV-2 strain driving severe dengue cases. The ability to rapidly sequence any suspected Nipah cases is critical.'
        }
    },
    wildlife: {
        'KA': {
            populationStatus: [
                { species: 'Monkeys (Macaques)', healthStatus: 'Monitoring', populationTrend: 'Stable', keyPathogens: ['Kyasanur Forest Disease (KFD)'] },
                { species: 'Elephants', healthStatus: 'Healthy', populationTrend: 'Stable', keyPathogens: ['Tuberculosis'] },
                { species: 'Wild Boar', healthStatus: 'Healthy', populationTrend: 'Increasing', keyPathogens: ['Brucellosis'] },
            ],
            interfaceHotspots: [
                { location: 'Shivamogga District', description: 'High human-monkey interaction in forested areas increases KFD risk.' },
                { location: 'Bandipur Tiger Reserve', description: 'Tourist and village proximity to elephant corridors.' },
            ],
            aiSummary: 'Karnataka\'s primary wildlife health concern is KFD in monkey populations, acting as a reservoir for human infection in the Western Ghats region. Human-wildlife conflict zones require heightened surveillance.'
        }
    },
    disaster: {
        'KL': {
            currentRisks: [
                { disasterType: 'Flood', riskLevel: 'High', forecast: 'Heavy monsoon rains expected in the next 72 hours.' },
                { disasterType: 'Landslide', riskLevel: 'Moderate', forecast: 'Risk elevated in highland districts due to soil saturation.' },
            ],
            preparedness: [
                { metric: 'Hospital Surge Capacity', status: 'Partial', details: 'Urban hospitals have plans, but rural PHCs lack resources.' },
                { metric: 'Emergency Shelters', status: 'Ready', details: 'Over 3,000 shelters identified and pre-stocked.' },
                { metric: 'Medical Stockpiles', status: 'Partial', details: 'Adequate for diarrheal diseases, but lacking specific leptospirosis prophylactics.' },
            ],
            aiSummary: 'Kerala faces an imminent high risk of flooding, which will exacerbate the ongoing Leptospirosis and Dengue situations. While shelters are ready, medical stockpile gaps for flood-related diseases need immediate attention.'
        }
    },
    pest_crop: {
        'PB': {
            prevalentPests: [
                { pest: 'Whitefly', risk: 'High', affectedCrops: ['Cotton'] },
                { pest: 'Aphids', risk: 'Moderate', affectedCrops: ['Wheat', 'Mustard'] },
            ],
            prevalentDiseases: [
                { disease: 'Yellow Rust', risk: 'High', affectedCrops: ['Wheat'] },
                { disease: 'Sheath Blight', risk: 'Moderate', affectedCrops: ['Rice'] },
            ],
            aiSummary: 'Punjab faces significant threats from Yellow Rust in its wheat monoculture and Whitefly infestations in cotton. These threats pose a direct risk to the state\'s agricultural output and national food security. Proactive pest and disease management is critical post-sowing.'
        },
        'KA': {
             prevalentPests: [
                { pest: 'Fall Armyworm', risk: 'High', affectedCrops: ['Maize'] },
                { pest: 'Thrips', risk: 'Moderate', affectedCrops: ['Chilli', 'Cotton'] },
            ],
            prevalentDiseases: [
                { disease: 'Coffee Leaf Rust', risk: 'High', affectedCrops: ['Coffee'] },
                { disease: 'Rice Blast', risk: 'Moderate', affectedCrops: ['Rice'] },
            ],
            aiSummary: 'Karnataka\'s diverse agriculture is threatened by Fall Armyworm in maize and Coffee Leaf Rust in its valuable coffee plantations. The economic impact of these threats is significant, requiring targeted interventions.'
        }
    }
};
