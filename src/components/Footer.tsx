import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--line)] py-9 text-[var(--muted)] text-[13px] relative z-10 bg-[var(--surface)]/80 backdrop-blur-sm">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>&copy; 2026 Sudden Laps. All rights reserved.</span>
        <span className="font-medium text-[var(--text)]">Every Lap, A New Level</span>
      </div>
    </footer>
  );
};
