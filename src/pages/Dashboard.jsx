import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import CodingProfiles from '../sections/CodingProfiles';
import ResumePreview from '../sections/ResumePreview';
import Contact from '../sections/Contact';
import CyberTerminal from '../components/CyberTerminal';

const Dashboard = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <CodingProfiles />

      {/* Interactive Terminal Section */}
      <section id="terminal" className="py-24 bg-black/90 cyber-grid-dense" aria-label="Interactive terminal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
              &gt; Cyber_Security_Terminal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2" />
            <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
              Interactive shell — try: help, neofetch, hack, ascii, banner, cat resume.txt
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <CyberTerminal />
          </div>
        </div>
      </section>

      <ResumePreview />
      <Contact />
    </>
  );
};

export default Dashboard;
