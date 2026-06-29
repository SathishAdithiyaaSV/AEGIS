import React from 'react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-brand-dark-blue border border-brand-light-blue rounded-lg p-5 shadow-lg h-full flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-brand-accent hover:shadow-glow"
    >
      <div>
        <div className="flex items-center mb-3">
          <div className="p-2 bg-brand-light-blue/50 rounded-md mr-4">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="text-right mt-4">
        <span className="text-sm font-semibold text-brand-accent">
          Access Module &rarr;
        </span>
      </div>
    </div>
  );
};

export default ModuleCard;