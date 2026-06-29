
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Threat, ZoonoticAlert, EnvironmentalAlert, WildlifeAlert, DisasterAlert, VaccineInventoryItem, Intervention, SimulationResult, TimeSeriesData, PredictiveDataPoint, GenomicSignal, BioThreat, LabStatus, BiologicalWeaponSignal, LivestockAlert, NationalBiosecurityIndexData, SlaughterhouseData, ChemicalWeaponSignal, PestInfestationAlert, CropDiseaseAlert, OdinSignal, GenomicAttributionResult, PlumeSimulationResult, SupplyChainAnalysis } from "../types";

const getAiClient = () => new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY! });

// --- Request Queue Implementation ---
// This prevents hitting the API rate limit by processing requests sequentially with a delay.
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private processing = false;
  private minDelay = 2000; // Minimum 2 seconds between requests to be safe

  async add<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await operation();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (e) {
          console.error("Queue task failed", e);
        }
        // Wait before next request to respect rate limits
        await new Promise(resolve => setTimeout(resolve, this.minDelay));
      }
    }

    this.processing = false;
  }
}

const apiQueue = new RequestQueue();

// Helper to wrap API calls with the queue and retry logic
const withRetryAndQueue = async <T>(
  apiCall: () => Promise<T>,
  maxRetries = 2
): Promise<T> => {
  return apiQueue.add(async () => {
    let lastError: unknown;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await apiCall();
      } catch (error) {
        lastError = error;
        // Check for rate limits or server errors
        const isRateLimit = error instanceof Error && (
            error.message.includes('429') || 
            error.message.toLowerCase().includes('rate limit') || 
            error.message.toLowerCase().includes('resource_exhausted')
        );
        
        if (isRateLimit) {
           console.warn(`Rate limit hit. Retrying... (${i + 1}/${maxRetries})`);
           // Add extra wait time for rate limits
           await new Promise(resolve => setTimeout(resolve, 4000 * (i + 1)));
        } else {
           throw error; // Throw non-retryable errors immediately
        }
      }
    }
    throw lastError;
  });
};

// --- API Functions ---

export const getAiAnalysis = async (dataSummary: string): Promise<string> => {
  try {
    const prompt = `You are Aegis, a biosurveillance AI. Analyze the following data summary and provide a concise, actionable threat analysis report for public health officials.
The report must be in Markdown format and include:
- A main heading '### Threat Assessment'.
- A 'Key Takeaways' section with critical points in bold.
- A bulleted list of 'Recommendations'.

Data Summary:
${dataSummary}`;

    const response = await withRetryAndQueue<GenerateContentResponse>(() => {
        const ai = getAiClient();
        return ai.models.generateContent({
            model: 'gemini-2.5-flash', // Switched to Flash for speed/cost on summaries
            contents: prompt,
        });
    });
    
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    return "System is currently experiencing high load. Please try again later.";
  }
};

export const getThreatsAnalysis = async (threats: Threat[]): Promise<Record<string, string>> => {
    if (!threats || threats.length === 0) return {};

    try {
        const threatsPrompts = threats.map(t => `- For "${t.name}", provide a summary based on: "${t.summaryPrompt}"`).join('\n');
        const prompt = `
You are Aegis, a biosurveillance AI. Analyze the following list of infectious disease threats.
For each threat, provide a single, concise sentence summary.
Return valid JSON where keys are threat names and values are summaries.

Threats:
${threatsPrompts}
`;
        const schemaProperties = threats.reduce((acc, threat) => {
            acc[threat.name] = { type: Type.STRING, description: `Summary for ${threat.name}.` };
            return acc;
        }, {} as Record<string, { type: Type; description: string; }>);

        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
          const ai = getAiClient();
          return ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: schemaProperties },
            },
          });
        });
        
        let jsonStr = response.text?.trim();
        if (jsonStr?.startsWith('```json')) jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        return jsonStr ? JSON.parse(jsonStr) : {};

    } catch (error) {
        console.error("Error generating bulk threat analysis:", error);
        return {};
    }
};

export const getOneHealthRecommendations = async (indexSummary: string): Promise<string> => {
  try {
    const prompt = `You are Aegis, a strategic public health AI advisor.
Based on the One Health Index summary, provide a 3-point strategic action plan.
Format: Markdown, main heading '### Strategic Recommendations', bulleted list.

Index Summary:
${indexSummary}`;

    const response = await withRetryAndQueue<GenerateContentResponse>(() => {
      const ai = getAiClient();
      return ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });
    });

    return response.text || "Recommendations unavailable.";
  } catch (error: any) {
    console.error("Error generating One Health recommendations:", error);
    return `Error: ${error?.message || 'Unknown error'}`;
  }
};

export const getStateSpecificRecommendations = async (stateName: string, stateDataSummary: string): Promise<string> => {
    try {
        const prompt = `
You are Aegis, a public health strategist for India. Generate a state-specific action plan for ${stateName}.
Structure:
- '### Action Plan: ${stateName}'
- '**1. Immediate Public Health Directives**'
- '**2. Healthcare System Coordination**'
- '**3. Public Awareness Campaign**'

Data:
${stateDataSummary}
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
            });
        });

        return response.text || "Plan unavailable.";
    } catch (error) {
        console.error(`Error generating recommendations for ${stateName}:`, error);
        return "Plan generation failed.";
    }
};

export const getViralStrainAnalysis = async (strainName: string, promptDetails: string): Promise<string> => {
    try {
        const prompt = `
Analyze viral strain: **${strainName}**.
Details: ${promptDetails}.
Structure:
- '### Analysis: ${strainName}'
- '**Transmissibility**:'
- '**Severity**:'
- '**Key Mutations**:'
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
            });
        });

        return response.text || "Analysis unavailable.";
    } catch (error) {
        console.error(`Error generating viral strain analysis:`, error);
        return "Analysis failed.";
    }
};

export const getDrugInventoryRecommendations = async (contextName: string, inventorySummary: string): Promise<string> => {
    try {
        const prompt = `
Analyze drug inventory for ${contextName}.
Structure:
- '### Inventory Optimization Plan: ${contextName}'
- '**1. Procurement Priorities (Urgent)**'
- '**2. Stock Redistribution**'
- '**3. Cost-Saving & Efficiency**'

Data:
${inventorySummary}
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
        });

        return response.text || "Inventory plan unavailable.";
    } catch (error) {
        console.error("Error generating inventory plan:", error);
        return "Inventory planning failed.";
    }
};

export const getDistrictActionPlan = async (districtName: string, stateName: string, summary: string): Promise<string> => {
    try {
        const prompt = `
Generate grassroots action plan for **${districtName}**, **${stateName}**.
Structure:
- '### Grassroots Action Plan: ${districtName}'
- **1. Community Health Workers (ASHAs)**
- **2. Sanitation & Vector Control Teams**
- **3. Local Transport & Logistics**
- **4. Public Awareness**

Data:
${summary}
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
            });
        });

        return response.text || "District plan unavailable.";
    } catch (error) {
        console.error("Error generating district plan:", error);
        return "District plan failed.";
    }
};

// --- Alert Response Generators (Zoonotic, Wastewater, Wildlife, Disaster, Genomic, Weapons, Agriculture) ---
// Using generic handler to reduce code duplication for similar patterns, but keeping distinct functions for type safety

const generateAlertResponse = async (prompt: string, model: string = 'gemini-2.5-pro') => {
    try {
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({ model, contents: prompt });
        });
        return response.text || "Response unavailable.";
    } catch (error) {
        console.error("Error generating alert response:", error);
        return "AI analysis failed due to high load.";
    }
};

export const getZoonoticActionPlan = async (alert: ZoonoticAlert): Promise<string> => {
    const prompt = `
Strategic Action Plan for **${alert.name}** in **${alert.location}**.
Structure:
- '### Strategic Action Plan: ${alert.name}'
- **1. Veterinary & Animal Health Response**
- **2. Public Health & Medical Response**
- **3. Community & Public Communication**
`;
    return generateAlertResponse(prompt);
};

export const getWastewaterActionPlan = async (alert: EnvironmentalAlert): Promise<string> => {
    const prompt = `
Response Plan for **${alert.name}** signal in wastewater at **${alert.location}**.
Structure:
- '### Optimization & Response Plan: ${alert.name}'
- **1. Targeted Public Health Intervention**
- **2. Water & Infrastructure Response**
- **3. Proactive Surveillance Enhancement**
`;
    return generateAlertResponse(prompt);
};

export const getWildlifeActionPlan = async (alert: WildlifeAlert): Promise<string> => {
    const prompt = `
Action Plan for **${alert.disease}** in **${alert.species}** at **${alert.location}**.
Risk to Humans: ${alert.riskToHumans}.
Structure:
- '### Strategic Action Plan: ${alert.disease}'
- **1. Wildlife & Environmental Response**
- **2. Public Health Interface**
- **3. Livestock & Agricultural Protection**
`;
    return generateAlertResponse(prompt);
};

export const getDisasterDiseaseActionPlan = async (alert: DisasterAlert): Promise<string> => {
    const prompt = `
Public Health Plan for **${alert.disasterType}** in **${alert.location}**.
Risks: ${alert.associatedDiseaseRisks.join(', ')}.
Structure:
- '### Public Health Action Plan: ${alert.disasterType}'
- **1. Immediate Health & Sanitation Measures**
- **2. Disease Surveillance & Control**
- **3. Public Health Communication**
`;
    return generateAlertResponse(prompt);
};

export const getGenomicActionPlan = async (signal: GenomicSignal): Promise<string> => {
    const prompt = `
Response Plan for genomic signal **${signal.strainName}** in **${signal.location}**.
Significance: ${signal.significance}.
Structure:
- '### Genomic Response Plan: ${signal.strainName}'
- **1. Enhanced Surveillance & Sequencing**
- **2. Clinical & Public Health Guidance**
- **3. Countermeasure Assessment**
`;
    return generateAlertResponse(prompt);
};

export const getBiologicalWeaponActionPlan = async (alert: BiologicalWeaponSignal): Promise<string> => {
    const prompt = `
Bio-Threat Response for **${alert.agent}** at **${alert.location}**.
Structure:
- '### Biological Threat Response Plan: ${alert.agent}'
- **1. Immediate Containment & Decontamination**
- **2. Public Health & Medical Countermeasures**
- **3. Attribution & Intelligence**
`;
    return generateAlertResponse(prompt);
};

export const getChemicalWeaponActionPlan = async (alert: ChemicalWeaponSignal): Promise<string> => {
    const prompt = `
Chemical Threat Response for **${alert.agent}** at **${alert.location}**.
Concentration: ${alert.concentration} ppb.
Structure:
- '### Chemical Threat Response Plan: ${alert.agent}'
- **1. Immediate Public Safety & Containment**
- **2. Medical Countermeasures & Public Health**
- **3. Environmental & Forensic Response**
`;
    return generateAlertResponse(prompt);
};

export const getLivestockActionPlan = async (alert: LivestockAlert): Promise<string> => {
    const prompt = `
Action Plan for **${alert.disease}** in **${alert.species}**.
Economic Impact: ${alert.economicImpact}.
Structure:
- '### Strategic Action Plan: ${alert.disease}'
- **1. Veterinary & Containment Response**
- **2. Economic & Trade Impact Mitigation**
- **3. Public Health Interface**
`;
    return generateAlertResponse(prompt);
};

export const getPestCropActionPlan = async (alert: PestInfestationAlert | CropDiseaseAlert): Promise<string> => {
    const isPest = 'pest' in alert;
    const name = isPest ? alert.pest : alert.disease;
    const crop = alert.cropType;
    const prompt = `
Agricultural Action Plan for **${name}** on **${crop}**.
Structure:
- '### Agricultural Action Plan: ${name}'
- **1. Immediate Containment & Control**
- **2. Economic & Supply Chain Mitigation**
- **3. Farmer & Public Communication**
`;
    return generateAlertResponse(prompt);
};

export const getSlaughterhouseActionPlan = async (alert: SlaughterhouseData): Promise<string> => {
    const prompt = `
Mitigation Plan for slaughterhouse at **${alert.location}**.
Hygiene Score: ${alert.hygieneScore}. Pathogens: ${alert.pathogensDetected.join(', ')}.
Structure:
- '### Mitigation Action Plan: ${alert.location}'
- **1. Immediate Public Health Directives**
- **2. Regulatory & On-Site Actions**
- **3. Worker Safety & Health**
`;
    return generateAlertResponse(prompt);
};

export const getLabNetworkAnalysis = async (labStatuses: string): Promise<string> => {
    const prompt = `Analyze BSL-3/4 lab network readiness. Provide a one-paragraph summary.\nData:\n${labStatuses}`;
    return generateAlertResponse(prompt, 'gemini-2.5-flash');
};

export const getBiothreatAnalysis = async (threats: BioThreat[]): Promise<Record<string, string>> => {
    if (!threats || threats.length === 0) return {};
    try {
        const threatsPrompts = threats.map(t => `- "${t.agent}": ${t.summaryPrompt}`).join('\n');
        const prompt = `Analyze bio-threats. Return JSON { "agentName": "summary" }.\n${threatsPrompts}`;
        const schemaProperties = threats.reduce((acc, t) => {
            acc[t.agent] = { type: Type.STRING, description: `Summary for ${t.agent}` };
            return acc;
        }, {} as Record<string, any>);

        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: schemaProperties } }
            });
        });
        
        let jsonStr = response.text?.trim();
        if (jsonStr?.startsWith('```json')) jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        return jsonStr ? JSON.parse(jsonStr) : {};
    } catch (e) { return {}; }
};

export const getBulkBiosecurityAnalysisAndPlan = async (
  components: NationalBiosecurityIndexData['breakdown']
): Promise<Record<keyof NationalBiosecurityIndexData['breakdown'], { summary: string; plan: string }>> => {
  const componentKeys = Object.keys(components) as Array<keyof typeof components>;
  try {
    const prompts = componentKeys.map(key => `- "${key}": ${components[key].contextPrompt}`).join('\n');
    const prompt = `Analyze biosecurity components. Return JSON where keys are component names, values are objects { "summary": "string", "plan": "markdown string" }.\n${prompts}`;
    
    const schemaProperties = componentKeys.reduce((acc, key) => {
      acc[key] = {
        type: Type.OBJECT,
        properties: { summary: { type: Type.STRING }, plan: { type: Type.STRING } },
        required: ['summary', 'plan']
      };
      return acc;
    }, {} as Record<string, any>);

    const response = await withRetryAndQueue<GenerateContentResponse>(() => {
      const ai = getAiClient();
      return ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: schemaProperties } }
      });
    });

    let jsonStr = response.text?.trim();
    if (jsonStr?.startsWith('```json')) jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
    return jsonStr ? JSON.parse(jsonStr) : {};
  } catch (e) { throw new Error("Analysis unavailable."); }
};

export const getVaccineOptimizationPlan = async (contextName: string, population: string, inventory: VaccineInventoryItem[], threatSummary: string): Promise<string> => {
    const inventorySummary = inventory.map(item => `- ${item.name}: ${item.dosesAvailable} doses`).join('\n');
    const prompt = `
Vaccine Strategy for **${contextName}** (Pop: ${population}).
Structure:
- '### Vaccine Strategy & Optimization: ${contextName}'
- **1. Strategic Production & Procurement Targets**
- **2. National/State Stockpile Inventory Strategy**
- **3. Prioritized Distribution Plan**
- **4. Wastage Mitigation & Efficiency**

Data:
${threatSummary}
Inventory:
${inventorySummary}
`;
    return generateAlertResponse(prompt);
};

export const getSimulationAnalysis = async (stateName: string, contextSummary: string, intervention: Intervention, baselineForecast: number[]): Promise<SimulationResult> => {
    try {
        const prompt = `
Simulate outbreak intervention for ${stateName}.
Intervention: ${intervention.name}.
Baseline: ${baselineForecast.join(', ')}.
Context: ${contextSummary}.
Return JSON: { "projectedCases": [int, int, int, int], "narrativeSummary": "markdown" }
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            projectedCases: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                            narrativeSummary: { type: Type.STRING }
                        }
                    }
                }
            });
        });
        let jsonStr = response.text?.trim();
        if (jsonStr?.startsWith('```json')) jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        return JSON.parse(jsonStr!);
    } catch (e) { throw new Error("Simulation failed."); }
};

export const getChartInterpretation = async (stateName: string, diseaseName: string, historicalData: TimeSeriesData[], baselineForecast: PredictiveDataPoint[], simulatedData: PredictiveDataPoint[], interventionName: string): Promise<string> => {
    const prompt = `Interpret outbreak chart for ${stateName}, ${diseaseName}. Intervention: ${interventionName}.
    Historical: ${historicalData.map(d => d.value).join(', ')}.
    Baseline: ${baselineForecast.map(d => d.value).join(', ')}.
    Simulated: ${simulatedData.map(d => d.value).join(', ')}.
    Provide Markdown interpretation.`;
    return generateAlertResponse(prompt);
};

export const getPlumeSimulationAnalysis = async (agent: string, location: string, weather: string): Promise<PlumeSimulationResult> => {
    try {
        const prompt = `
Plume simulation for ${agent} at ${location}. Weather: ${weather}.
Return JSON: { "evacuationOrders": "markdown", "projectedImpact": "markdown", "responderGuidance": "markdown" }
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            evacuationOrders: { type: Type.STRING },
                            projectedImpact: { type: Type.STRING },
                            responderGuidance: { type: Type.STRING }
                        },
                        required: ['evacuationOrders', 'projectedImpact', 'responderGuidance']
                    }
                }
            });
        });
        let jsonStr = response.text?.trim();
        if (jsonStr?.startsWith('```json')) jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        return JSON.parse(jsonStr!);
    } catch (e) { throw new Error("Plume simulation failed."); }
};

export const getGenomicAttribution = async (signal: OdinSignal): Promise<GenomicAttributionResult> => {
    try {
        const prompt = `
Genomic attribution for signal: ${signal.title}. Context: ${signal.context}.
Return JSON: { "attribution": "enum", "confidence": int, "geneticMarkers": [string], "originAnalysis": "string", "strategicSummary": "string" }
Enum: 'Natural Origin', 'Accidental Lab Release', 'Deliberate Weaponization'.
`;
        const response = await withRetryAndQueue<GenerateContentResponse>(() => {
            const ai = getAiClient();
            return ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            attribution: { type: Type.STRING, enum: ['Natural Origin', 'Accidental Lab Release', 'Deliberate Weaponization'] },
                            confidence: { type: Type.INTEGER },
                            geneticMarkers: { type: Type.ARRAY, items: { type: Type.STRING } },
                            originAnalysis: { type: Type.STRING },
                            strategicSummary: { type: Type.STRING },
                        },
                        required: ['attribution', 'confidence', 'geneticMarkers', 'originAnalysis', 'strategicSummary']
                    }
                }
            });
        });
        let jsonStr = response.text?.trim();
        if (jsonStr?.startsWith('```json')) jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        return JSON.parse(jsonStr!);
    } catch (e) { throw new Error("Attribution failed."); }
};

export const getSupplyChainRecommendations = async (analysis: SupplyChainAnalysis): Promise<string> => {
    const prompt = `
Supply Chain Strategy for ${analysis.category}.
Context: ${analysis.aiPromptContext}.
Structure:
- '### Strategic Recommendations'
- **1. Diversification & Redundancy**
- **2. Security Hardening**
- **3. Policy & Stockpiling**
`;
    return generateAlertResponse(prompt);
};
