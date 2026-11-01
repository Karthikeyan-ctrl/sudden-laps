import React from 'react';
import { ThreeLapScene } from './components/ThreeLapScene';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen relative bg-[var(--bg)] text-[var(--text)] antialiased overflow-x-hidden">
      {/* Full-size 3D Background Animation */}
      <ThreeLapScene />

      {/* Foreground Content sitting directly upon the 3D background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ServicesSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
