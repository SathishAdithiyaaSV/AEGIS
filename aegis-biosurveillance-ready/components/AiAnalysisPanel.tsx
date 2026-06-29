import React, { useState, useCallback } from 'react';
import { getAiAnalysis } from '../services/geminiService';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.259 1.035.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 18l1.036-.259a3.375 3.375 0 002.455-2.456l.259-1.035.259 1.035a3.375 3.375 0 002.456 2.456l1.035.259-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <span className="text-gray-400">Aegis AI is analyzing data...</span>
    </div>
);

interface AiAnalysisPanelProps {
    dataSummary: string;
}

const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({ dataSummary }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');
    try {
      const result = await getAiAnalysis(dataSummary);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to fetch AI analysis.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dataSummary]);
  
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-brand-accent mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
         return <p key={index} className="font-bold my-1">{line.replace(/\*\*/g, '')}</p>
      }
      if (line.trim().startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc text-gray-300">{line.replace('- ', '')}</li>;
      }
      return <p key={index} className="my-1 text-gray-300">{line}</p>;
    });
  };

  return (
    <div className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <SparklesIcon className="w-6 h-6 mr-2 text-brand-accent" />
          Gemini AI Threat Analysis
        </h2>
        <button
          onClick={handleAnalysis}
          disabled={isLoading}
          className="bg-brand-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-brand-light-blue disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
             </>
          ) : (
            'Generate Report'
          )}
        </button>
      </div>

      <div className="prose prose-invert max-w-none bg-brand-dark p-4 rounded-md min-h-[200px]">
        {isLoading && <div className="flex justify-center items-center h-full pt-16"><LoadingSpinner /></div>}
        {error && <p className="text-red-500">{error}</p>}
        {analysis ? (
            <div>{renderFormattedText(analysis)}</div>
        ) : (
            !isLoading && <p className="text-gray-400">Click "Generate Report" to get the latest AI-powered threat analysis based on real-time data streams.</p>
        )}
      </div>
    </div>
  );
};

export default AiAnalysisPanel;
