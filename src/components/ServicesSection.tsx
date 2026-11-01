import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="text-xs text-[var(--accent)] tracking-[0.12em] uppercase mb-3.5 font-bold">
          What we do
        </div>
        <h2 className="text-[clamp(30px,5vw,48px)] tracking-[-0.03em] leading-[1.1] max-w-[640px] font-bold text-[var(--text)] heading-backdrop">
          From code to content, <em className="serif-accent">all</em> under one roof
        </h2>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={index}
              className="card-3d bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--line)] rounded-[22px] p-7 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <i
                aria-hidden="true"
                className="grid place-items-center w-11 h-11 rounded-[14px] bg-[var(--glow)] text-[var(--accent)] not-italic text-xl mb-5 font-semibold"
              >
                {service.icon}
              </i>
              <h3 className="text-[19px] font-bold text-[var(--text)] mb-2 tracking-[-0.01em]">
                {service.title}
              </h3>
              <p className="text-[var(--muted)] text-[14.5px] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
