import React from 'react';
import { STATS_DATA } from '../data/statsData';

export const Hero: React.FC = () => {
  return (
    <header className="relative pt-20 pb-20 sm:pt-28 sm:pb-24 text-center z-10" id="top">
      {/* Soft ambient radial highlight in light mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 w-[720px] h-[720px] max-w-[140vw] -z-10 bg-[radial-gradient(circle_at_35%_40%,var(--glow),transparent_60%),radial-gradient(circle_at_70%_60%,var(--glow2),transparent_60%)]"
      />

      <div className="max-w-[1120px] mx-auto px-6">
        {/* Pill */}
        <div className="inline-block border border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-[var(--accent)] tracking-[0.08em] uppercase mb-7 font-semibold shadow-xs">
          IT &amp; media solutions
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(42px,8vw,90px)] leading-[1.04] tracking-[-0.04em] font-bold text-[var(--text)] max-w-4xl mx-auto heading-backdrop">
          Every lap,
          <br />
          a new <em className="serif-accent">level.</em>
        </h1>

        {/* Subtitle */}
        <p className="max-w-[560px] mx-auto text-base sm:text-[18px] text-[var(--muted)] leading-relaxed mt-6 mb-10 font-normal">
          Sudden Laps is your one-stop partner for software, cloud, design and digital media — we
          build the product and help the world discover it.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-block px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-md hover:-translate-y-0.5 hover:shadow-[0_10px_30px_var(--glow)] transition-all duration-200 cursor-pointer"
          >
            Start your project
          </a>
          <a
            href="#services"
            className="inline-block px-7 py-3.5 rounded-full text-sm font-semibold text-[var(--text)] bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--line)] hover:bg-[var(--surface)] shadow-xs transition-all duration-200 cursor-pointer"
          >
            Explore services
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[var(--line)] border border-[var(--line)] rounded-[24px] overflow-hidden mt-20 shadow-md backdrop-blur-md bg-[var(--surface)]/80">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="bg-[var(--surface)]/90 py-8 px-4 text-center transition-colors">
              <b className="block text-3xl sm:text-[36px] tracking-tight font-bold text-[var(--accent)]">
                {stat.value}
              </b>
              <span className="text-xs sm:text-[13px] text-[var(--muted)] mt-1.5 block font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
