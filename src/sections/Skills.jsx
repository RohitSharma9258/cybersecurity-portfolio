import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaNetworkWired, FaUserShield, FaServer, FaCubes } from 'react-icons/fa';
import SkillRadar from '../components/SkillRadar';
import ProgressRing from '../components/ProgressRing';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('cyber');

  const categories = [
    { id: 'cyber', name: 'CYBERSECURITY', icon: <FaUserShield /> },
    { id: 'network', name: 'NETWORKING', icon: <FaNetworkWired /> },
    { id: 'prog', name: 'PROGRAMMING', icon: <FaCode /> },
    { id: 'frameworks', name: 'FRAMEWORKS & DATA', icon: <FaServer /> }
  ];

  const skillData = {
    cyber: [
      { name: 'Wireshark (Deep Packet Analysis)', level: 90 },
      { name: 'Scapy (Packet Crafting & Inspection)', level: 90 },
      { name: 'OWASP Top 10 Auditing', level: 80 },
      { name: 'API Security & Hardening', level: 85 },
      { name: 'Cryptography (Encryption/Hashing)', level: 80 },
      { name: 'Burp Suite & Metasploit', level: 75 }
    ],
    network: [
      { name: 'TCP/IP Model & Protocols', level: 90 },
      { name: 'DNS & HTTP/HTTPS Security', level: 90 },
      { name: 'ARP Spoofer Auditing & Defense', level: 85 },
      { name: 'Firewall Configurations & iptables', level: 80 },
      { name: 'Network Traffic Filtering', level: 85 }
    ],
    prog: [
      { name: 'Python (Security Tool Scripting)', level: 90 },
      { name: 'Java (OOP Development)', level: 80 },
      { name: 'JavaScript (Dynamic Web Systems)', level: 80 },
      { name: 'HTML & CSS (Responsive Layouts)', level: 85 }
    ],
    frameworks: [
      { name: 'Flask & Flask SocketIO', level: 80 },
      { name: 'Asyncio (Asynchronous Python CLI)', level: 85 },
      { name: 'Scikit-learn (AI ML Threat Models)', level: 70 },
      { name: 'MySQL & SQLite Databases', level: 80 },
      { name: 'Git, GitHub, & REST APIs', level: 90 }
    ]
  };

  return (
    <section id="skills" className="relative py-24 bg-black/95 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Skill_Inventory
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2"></div>
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Capabilities dashboard and active vulnerability defense utilities
          </p>
        </div>

        {/* Domain Mastery Rings */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-14">
          {[
            { label: 'Security', value: 88, color: '#06b6d4' },
            { label: 'Python', value: 90, color: '#10b981' },
            { label: 'Networking', value: 85, color: '#3b82f6' },
            { label: 'AI / ML', value: 70, color: '#8b5cf6' },
          ].map((ring) => (
            <ProgressRing
              key={ring.label}
              value={ring.value}
              size={100}
              strokeWidth={6}
              color={ring.color}
              label={ring.label}
            />
          ))}
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`font-cyber font-semibold text-xs md:text-sm px-5 py-3 rounded-sm flex items-center space-x-2 transition-all duration-300 border ${
                activeTab === cat.id
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-neutral-900/60 text-gray-400 border-neutral-800 hover:text-cyan-400 hover:border-cyan-500/30'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Split Grid: Progress on Left, Interactive Radar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Progress Bars (7 columns) */}
          <div className="lg:col-span-7 glass-panel border-cyan-500/10 p-6 md:p-8 rounded-lg">
            <div className="grid grid-cols-1 gap-6">
              {skillData[activeTab].map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs md:text-sm font-code">
                    <span className="text-gray-300">&gt; {skill.name}</span>
                    <span className="text-cyan-400 font-bold">{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                    {/* Glowing progress element */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      key={`${activeTab}-${index}`} // Reset animation when tab changes
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* System Diagnostic Footer inside skills card */}
            <div className="mt-8 pt-4 border-t border-neutral-900 flex justify-between items-center text-[10px] font-code text-neutral-500 select-none">
              <span>AUDIT STATUS: COMPLETE</span>
              <span>NO CRITICAL EXPLOITS FOUND</span>
            </div>
          </div>

          {/* Interactive Skill Radar (5 columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <SkillRadar />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
