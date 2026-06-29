import React from 'react';

const BioshieldWorkspace: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-red-500/30 bg-slate-950/70 p-6 shadow-2xl shadow-red-950/20 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-300">
              Integrated Counter-Biosecurity
            </p>
            <h2 className="text-3xl font-bold text-white">Bioshield Operations Console</h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              Bioshield is now accessible inside Aegis as a unified mission workspace. Use this
              console to move from biosurveillance into synthetic-threat analysis without leaving
              the main site.
            </p>
          </div>
          <a
            href="#/bioshield/fullscreen"
            className="inline-flex items-center justify-center rounded-lg border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
          >
            Open Fullscreen
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-light-blue bg-slate-950 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-brand-light-blue bg-slate-900/80 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">Embedded Bioshield View</p>
            <p className="text-xs text-slate-400">Hosted inside the Aegis application shell</p>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
            Unified Site
          </span>
        </div>
        <iframe
          title="Bioshield Operations Console"
          src="/bioshield/index.html"
          className="h-[calc(100vh-19rem)] min-h-[720px] w-full bg-slate-950"
        />
      </div>
    </section>
  );
};

export default BioshieldWorkspace;
