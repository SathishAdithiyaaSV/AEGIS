import React from 'react';

interface BioshieldFullscreenProps {
  onBack: () => void;
}

const BioshieldFullscreen: React.FC<BioshieldFullscreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex items-center justify-between px-4 py-3 sm:px-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-lg shadow-black/30 transition hover:border-red-400/50 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Aegis</span>
        </button>
        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-300/80">
            Fullscreen Route
          </p>
          <p className="text-xs text-slate-400">Bioshield mission view</p>
        </div>
      </div>
      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-black shadow-2xl shadow-black/50">
          <iframe
            title="Bioshield Fullscreen Console"
            src="/bioshield/index.html"
            className="h-[calc(100vh-5.5rem)] min-h-[720px] w-full bg-slate-950"
          />
        </div>
      </div>
    </div>
  );
};

export default BioshieldFullscreen;
