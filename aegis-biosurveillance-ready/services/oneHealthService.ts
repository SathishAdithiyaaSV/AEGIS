import { HumanHealthData, ZoonoticAlert, EnvironmentalAlert, OneHealthIndexData, RiskLevel, OneHealthIndexBreakdown, MetricBreakdown } from '../types';

const RISK_SCORE_MAP: Record<RiskLevel, number> = {
  'Critical': 100,
  'High': 80,
  'Moderate': 50,
  'Low': 20,
  'None': 0,
};

// --- SCORING LOGIC ---

// Max scores for each sub-metric
const MAX_VELOCITY_SCORE = 40;
const MAX_SPREAD_SCORE = 30;
const MAX_SEVERITY_SCORE = 30;
const TOTAL_HUMAN_MAX = MAX_VELOCITY_SCORE + MAX_SPREAD_SCORE + MAX_SEVERITY_SCORE;

function calculateHumanScore(data: HumanHealthData): { score: number, breakdown: MetricBreakdown[] } {
  const breakdown: MetricBreakdown[] = [];

  // 1. Case Velocity Score (0-40)
  let velocityScore = 0;
  if (data.newCasesChange > 10) velocityScore = 40;
  else if (data.newCasesChange > 5) velocityScore = 30;
  else if (data.newCasesChange > 2) velocityScore = 20;
  else if (data.newCasesChange > 0) velocityScore = 10;
  breakdown.push({
    metric: 'Case Velocity',
    value: `${data.newCasesChange > 0 ? '+' : ''}${data.newCasesChange.toFixed(1)}% daily change`,
    score: velocityScore,
    maxScore: MAX_VELOCITY_SCORE,
    reasoning: `Measures the rate of new case growth. A daily change >10% indicates rapid, uncontrolled spread and receives the highest score.`
  });

  // 2. Geographic Spread Score (0-30)
  let spreadScore = 0;
  if (data.activeHotspots > 100) spreadScore = 30;
  else if (data.activeHotspots > 50) spreadScore = 25;
  else if (data.activeHotspots > 20) spreadScore = 15;
  else if (data.activeHotspots > 0) spreadScore = 5;
  breakdown.push({
    metric: 'Geographic Spread',
    value: `${data.activeHotspots} active hotspots`,
    score: spreadScore,
    maxScore: MAX_SPREAD_SCORE,
    reasoning: `Evaluates the breadth of the outbreak. A high number of hotspots suggests widespread community transmission, which is harder to contain.`
  });

  // 3. Severity Score (0-30)
  let severityScore = 0;
  const weightedSeverity = (data.hospitalizationRate * 0.7) + (data.icuRate * 1.3); // ICU rate is a stronger indicator
  if (weightedSeverity > 15) severityScore = 30;
  else if (weightedSeverity > 10) severityScore = 20;
  else if (weightedSeverity > 5) severityScore = 10;
  breakdown.push({
    metric: 'Severity Index',
    value: `${data.hospitalizationRate.toFixed(1)}% hospitalization`,
    score: severityScore,
    maxScore: MAX_SEVERITY_SCORE,
    reasoning: `Assesses disease severity through hospitalization and ICU rates. High rates indicate a virulent pathogen straining healthcare capacity.`
  });
  
  const totalScore = velocityScore + spreadScore + severityScore;
  return { score: totalScore, breakdown };
}

// Max scores
const MAX_RISK_SCORE = 60;
const MAX_PROXIMITY_SCORE = 40;
const TOTAL_ZOONOTIC_MAX = MAX_RISK_SCORE + MAX_PROXIMITY_SCORE;

function calculateZoonoticScore(alerts: ZoonoticAlert[]): { score: number, breakdown: MetricBreakdown[] } {
  if (alerts.length === 0) {
    return { score: 0, breakdown: [{ metric: "Zoonotic Threats", value: "None detected", score: 0, maxScore: TOTAL_ZOONOTIC_MAX, reasoning: "No active zoonotic alerts." }] };
  }
  
  const maxRiskAlert = alerts.reduce((max, current) => 
    RISK_SCORE_MAP[current.risk] > RISK_SCORE_MAP[max.risk] ? current : max
  );
  
  const breakdown: MetricBreakdown[] = [];

  // 1. Pathogen Risk Score (0-60)
  const riskScore = RISK_SCORE_MAP[maxRiskAlert.risk] * (MAX_RISK_SCORE / 100);
  breakdown.push({
    metric: 'Highest Pathogen Risk',
    value: `${maxRiskAlert.name} (${maxRiskAlert.risk})`,
    score: riskScore,
    maxScore: MAX_RISK_SCORE,
    reasoning: `Based on the WHO's risk assessment for pathogens with pandemic potential. 'Critical' risk pathogens like Nipah pose an imminent threat.`
  });

  // 2. Interface Proximity Score (0-40)
  let proximityScore = 0;
  const proximityMap = { 'Direct': 40, 'High': 30, 'Moderate': 15, 'Low': 5 };
  proximityScore = proximityMap[maxRiskAlert.interfaceProximity];
  breakdown.push({
    metric: 'Interface Proximity',
    value: `${maxRiskAlert.interfaceProximity} human contact`,
    score: proximityScore,
    maxScore: MAX_PROXIMITY_SCORE,
    reasoning: `Measures the likelihood of animal-to-human transmission. 'Direct' contact (e.g., poultry farms) significantly elevates spillover risk.`
  });
  
  const totalScore = riskScore + proximityScore;
  return { score: totalScore, breakdown };
}


// Max scores
const MAX_STATUS_SCORE = 70;
const MAX_STRENGTH_SCORE = 30;
const TOTAL_ENV_MAX = MAX_STATUS_SCORE + MAX_STRENGTH_SCORE;

function calculateEnvironmentalScore(alerts: EnvironmentalAlert[]): { score: number, breakdown: MetricBreakdown[] } {
    if (alerts.length === 0) {
        return { score: 0, breakdown: [{ metric: "Environmental Threats", value: "None detected", score: 0, maxScore: TOTAL_ENV_MAX, reasoning: "No environmental signals detected." }] };
    }
    
    let worstAlert: EnvironmentalAlert | null = null;
    let maxScore = -1;

    alerts.forEach(alert => {
        let currentScore = (alert.status === 'Confirmed') ? 100 : 75; // Use this to find the worst alert
        if (currentScore > maxScore) {
            maxScore = currentScore;
            worstAlert = alert;
        }
    });

    if (!worstAlert) return { score: 0, breakdown: [] }; // Should not happen if alerts.length > 0

    const breakdown: MetricBreakdown[] = [];
    
    // 1. Signal Status Score (0-70)
    let statusScore = worstAlert.status === 'Confirmed' ? MAX_STATUS_SCORE : 40;
    breakdown.push({
      metric: 'Signal Status',
      value: `${worstAlert.name} (${worstAlert.status})`,
      score: statusScore,
      maxScore: MAX_STATUS_SCORE,
      reasoning: `'Confirmed' pathogen presence in environmental samples (e.g., wastewater) is a definitive, high-risk indicator of community spread.`
    });

    // 2. Signal Strength Score (0-30)
    let strengthScore = 0;
    if (worstAlert.status === 'Trending' && worstAlert.signalStrength) {
      if (worstAlert.signalStrength > 200) strengthScore = 30;
      else if (worstAlert.signalStrength > 100) strengthScore = 20;
      else strengthScore = 10;
    }
    breakdown.push({
      metric: 'Signal Strength',
      value: worstAlert.signalStrength ? `+${worstAlert.signalStrength}%` : 'N/A',
      score: strengthScore,
      maxScore: MAX_STRENGTH_SCORE,
      reasoning: `For 'Trending' signals, this measures the rate of increase. A rapid spike (>200%) in viral RNA suggests an accelerating outbreak.`
    });
    
    const totalScore = statusScore + strengthScore;
    return { score: totalScore, breakdown };
}


// --- MAIN CALCULATION FUNCTION ---

export const calculateOneHealthIndex = (
  humanData: HumanHealthData,
  zoonoticAlerts: ZoonoticAlert[],
  environmentalAlerts: EnvironmentalAlert[]
): OneHealthIndexData => {
  const human = calculateHumanScore(humanData);
  const zoonotic = calculateZoonoticScore(zoonoticAlerts);
  const environmental = calculateEnvironmentalScore(environmentalAlerts);

  // Weighted final score
  const finalScore = Math.round(
    (human.score * 0.5) +
    (zoonotic.score * 0.3) +
    (environmental.score * 0.2)
  );

  let level: RiskLevel = 'Low';
  if (finalScore > 85) level = 'Critical';
  else if (finalScore > 70) level = 'High';
  else if (finalScore > 40) level = 'Moderate';

  const breakdown: OneHealthIndexBreakdown = {
    human: { score: Math.round(human.score * 0.5), breakdown: human.breakdown },
    zoonotic: { score: Math.round(zoonotic.score * 0.3), breakdown: zoonotic.breakdown },
    environmental: { score: Math.round(environmental.score * 0.2), breakdown: environmental.breakdown }
  };
  
  return {
    score: finalScore,
    level,
    breakdown,
  };
};