import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#f7f6fd]/80 border-b border-[var(--line)]">
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-[var(--text)]">
          <svg viewBox="0 0 32 32" className="w-[26px] h-[26px]" fill="none">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#7c3aed" />
                <stop offset="0.55" stopColor="#2563eb" />
                <stop offset="1" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            <rect x="3" y="7" width="26" height="18" rx="9" stroke="url(#lg)" strokeWidth="3.5" />
            <circle cx="22" cy="7" r="3.6" fill="#e11d48" />
          </svg>
          <span>Sudden Laps</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--muted)]">
          <a href="#services" className="hover:text-[var(--text)] transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-[var(--text)] transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-[var(--text)] transition-colors">
            Contact
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="inline-block px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_25px_var(--glow)] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Let’s talk
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-[var(--surface)] border-b border-[var(--line)] space-y-3 text-sm font-medium">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[var(--text)]"
          >
            Services
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[var(--text)]"
          >
            Process
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[var(--text)]"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};
