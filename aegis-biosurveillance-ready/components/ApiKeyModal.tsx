import React from 'react';

const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);

interface ApiKeyModalProps {
  onSelectKey: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSelectKey }) => {
  return (
    <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-brand-dark-blue border-2 border-brand-accent shadow-glow rounded-lg w-full max-w-md p-8 text-center">
        <KeyIcon className="w-16 h-16 mx-auto text-brand-accent mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your API Key</h2>
        <p className="text-gray-400 mb-6">
          This application requires a user-provided API key to interact with Google's Generative AI models. Your key is used directly and is not stored.
        </p>
        <button
          onClick={onSelectKey}
          className="w-full bg-brand-accent text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-500 transition-colors"
        >
          Select API Key
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Project charges may apply. For more details, see the{' '}
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-accent">
            billing documentation
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;
