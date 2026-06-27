import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaShieldAlt, FaRocket, FaNetworkWired } from 'react-icons/fa';

const timelineEvents = [
  {
    date: '2024 — Present',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'GLA University, Mathura',
    description: 'Specializing in computer science fundamentals, network architectures, and algorithms. Core courses include Data Structures & Algorithms, Database Management, and Network Security concepts.',
    icon: <FaGraduationCap />,
    color: '#06b6d4',
  },
  {
    date: '2025',
    title: 'Cisco Intro to Cybersecurity Certificate',
    organization: 'Cisco Networking Academy',
    description: 'Validated foundational skills in threat intelligence, network routing protocols, cryptographic operations, and risk management compliance frameworks.',
    icon: <FaCertificate />,
    color: '#10b981',
  },
  {
    date: '2025',
    title: 'TryHackMe CTF Practitioner',
    organization: 'TryHackMe platform',
    description: 'Active cybersecurity lab training. Completed modules covering OWASP Top 10 web vulnerabilities, network analysis (Wireshark), basic privilege escalation, and system forensics. Ranked in the top 5% globally.',
    icon: <FaShieldAlt />,
    color: '#3b82f6',
  },
  {
    date: '2024',
    title: 'Smart Wi-Fi Intruder Detector System',
    organization: 'Self-Directed Security Project',
    description: 'Designed and deployed a daemon packet sniffer script utilizing Scapy. Integrated dynamic host discovery, vendor MAC profile heuristics, database persistence, and automated firewall blocks.',
    icon: <FaRocket />,
    color: '#06b6d4',
  },
  {
    date: '2024',
    title: 'Vanguard Port Scanner Launch',
    organization: 'Self-Directed Network Project',
    description: 'Wrote an ultra-high throughput parallel port auditor using Python asyncio. Engineered semaphores to handle concurrent socket polls, banner grabs, and local API wrappers.',
    icon: <FaNetworkWired />,
    color: '#a855f7',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 bg-black/95 cyber-grid" aria-label="Professional and academic experience">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Experience_&amp;_Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2" />
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Chronological academic and technical milestone registry
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-neutral-800 ml-4 md:ml-32 space-y-12">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative">
              {/* Event Dot Indicator */}
              <span 
                className="absolute -left-[13px] md:-left-[17px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                style={{ borderColor: evt.color, boxShadow: `0 0 10px ${evt.color}50` }}
                aria-hidden="true"
              >
                <span className="text-xs md:text-sm" style={{ color: evt.color }}>{evt.icon}</span>
              </span>

              {/* Event Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel border-neutral-900 hover:border-cyan-500/30 p-6 rounded-lg ml-6 md:ml-12 transition-all duration-300 relative group"
              >
                {/* Horizontal connection line for desktop */}
                <div 
                  className="absolute top-4 -left-3 md:-left-6 w-3 md:w-6 h-[1px] bg-neutral-800 group-hover:bg-cyan-500/30 transition-colors hidden md:block" 
                  aria-hidden="true" 
                />

                {/* Left Date indicator for desktop */}
                <div 
                  className="absolute top-3.5 right-[102%] w-32 text-right font-code text-xs text-neutral-500 font-bold hidden md:block pr-6" 
                  aria-hidden="true"
                >
                  {evt.date}
                </div>

                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-cyber text-base font-bold text-white uppercase">{evt.title}</h3>
                    <h4 className="font-code text-xs text-cyan-400/80 mt-0.5">{evt.organization}</h4>
                  </div>
                  {/* Mobile date badge */}
                  <span className="bg-neutral-950 border border-neutral-800 text-neutral-400 font-code text-[10px] px-2.5 py-0.5 rounded-full md:hidden">
                    {evt.date}
                  </span>
                </div>
                
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                  {evt.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
