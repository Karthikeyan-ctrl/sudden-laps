import React from 'react';
import { PROCESS_STEPS } from '../data/processData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 border-t border-[var(--line)] relative z-10">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="text-xs text-[var(--accent)] tracking-[0.12em] uppercase mb-3.5 font-bold">
          How we work
        </div>
        <h2 className="text-[clamp(30px,5vw,48px)] tracking-[-0.03em] leading-[1.1] max-w-[640px] font-bold text-[var(--text)] heading-backdrop">
          A simple process, <em className="serif-accent">real</em> results
        </h2>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={index}
              className="border-t-2 border-[var(--line)] pt-6 transition-transform duration-200 hover:-translate-y-1 bg-[var(--surface)]/70 backdrop-blur-xs p-5 rounded-b-2xl"
            >
              <b className="font-display-serif text-[44px] text-[var(--accent)] font-normal block leading-none mb-2">
                {step.number}
              </b>
              <h3 className="my-1.5 text-[18px] font-bold text-[var(--text)]">
                {step.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
