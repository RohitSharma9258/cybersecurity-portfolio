import React from 'react';
import { motion } from 'framer-motion';
import { FaFileDownload, FaGraduationCap, FaBriefcase, FaCode, FaCertificate } from 'react-icons/fa';
import { trackEvent } from '../utils/analytics';

const ResumePreview = () => {
  return (
    <section id="resume-preview" className="relative py-24 bg-black/90 cyber-grid-dense">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Curriculum_Vitae
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2"></div>
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Interactive Dossier & Document Download
          </p>
        </div>

        {/* Glassmorphic Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel border-cyan-500/20 p-6 md:p-10 rounded-lg shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
        >
          {/* Neon Scanner Line overlay */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
          {/* Resume Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-neutral-900 gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-cyber font-bold text-white tracking-wide">ROHIT SHARMA</h3>
              <p className="text-cyan-400 font-code text-sm mt-1">Cybersecurity Engineer & Software Developer</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-code mt-3">
                <span>📧 rohitsharma40421@gmail.com</span>
                <span>📞 +91 93684 13352</span>
                <span>📍 Mathura, UP, India</span>
              </div>
            </div>
            
            {/* Download Button */}
            <a
              href="/resume.pdf"
              download
              onClick={() => trackEvent('resume_download', { source: 'resume_preview' })}
              className="group bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold px-5 py-3 rounded-sm flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0"
            >
              <FaFileDownload className="group-hover:animate-bounce" />
              <span>DOWNLOAD_CV.bin</span>
            </a>
          </div>

          {/* Resume Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
            
            {/* Left Column (8 cols): Experience/Education/Projects */}
            <div className="md:col-span-8 space-y-8">
              
              {/* Education section */}
              <div>
                <h4 className="text-xs font-code text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2 select-none-decorative">
                  <FaGraduationCap /> 01 // ACADEMIC_REGISTRY
                </h4>
                <div className="border-l-2 border-neutral-900 pl-4 space-y-4">
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h5 className="font-cyber text-sm font-bold text-white uppercase">GLA University, Mathura</h5>
                      <span className="text-[10px] font-code text-gray-500">2024 — 2028</span>
                    </div>
                    <p className="text-xs text-blue-400 font-code mt-0.5">B.Tech in Computer Science Engineering</p>
                    <p className="text-xs text-gray-400 mt-2 font-sans leading-relaxed">
                      Specializing in cybersecurity foundations, cryptographical structures, computer networks, and object-oriented programming. Active participant in coding drills and capture-the-flag workshops.
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects Snapshot */}
              <div>
                <h4 className="text-xs font-code text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2 select-none-decorative">
                  <FaBriefcase /> 02 // TACTICAL_PROJECTS_SNAPSHOT
                </h4>
                <div className="border-l-2 border-neutral-900 pl-4 space-y-6">
                  {/* Project 1 */}
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h5 className="font-cyber text-sm font-bold text-white uppercase">Smart Wi-Fi Intruder Detection System</h5>
                      <span className="text-[10px] font-code text-cyan-500">[COMPILED]</span>
                    </div>
                    <p className="text-xs text-emerald-400 font-code mt-0.5">Python · Flask · Scapy · SQLite · Web Dashboard</p>
                    <p className="text-xs text-gray-400 mt-2 font-sans leading-relaxed">
                      Designed and executed a network intrusion monitor that parses live Wi-Fi frames via Scapy, evaluates client behavior, maps threat flags, and isolates unauthorized nodes by injecting firewall rules.
                    </p>
                  </div>
                  
                  {/* Project 2 */}
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h5 className="font-cyber text-sm font-bold text-white uppercase">Vanguard Port Scanner</h5>
                      <span className="text-[10px] font-code text-cyan-500">[COMPILED]</span>
                    </div>
                    <p className="text-xs text-emerald-400 font-code mt-0.5">Python · Asyncio · REST APIs · SQLite</p>
                    <p className="text-xs text-gray-400 mt-2 font-sans leading-relaxed">
                      Wrote a highly performant, non-blocking port scanner that sweeps subnet scopes concurrently, performs DNS/CIDR translation, identifies active services, and structures reports into neat JSON schemas.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): Skill Lists & Certifications */}
            <div className="md:col-span-4 space-y-8 md:border-l md:border-neutral-900 md:pl-8">
              
              {/* Skill Matrix */}
              <div>
                <h4 className="text-xs font-code text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2 select-none-decorative">
                  <FaCode /> SKILL_MATRIX
                </h4>
                <div className="space-y-3 font-code text-xs">
                  <div>
                    <span className="text-gray-500 block mb-1 uppercase tracking-wider text-[10px]">Cybersecurity</span>
                    <div className="flex flex-wrap gap-1">
                      {['Wireshark', 'Scapy', 'Burp Suite', 'OWASP Top 10', 'API Hardening'].map((s) => (
                        <span key={s} className="bg-neutral-950 border border-neutral-900 px-1.5 py-0.5 rounded-sm text-gray-300">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1 uppercase tracking-wider text-[10px]">Networking</span>
                    <div className="flex flex-wrap gap-1">
                      {['TCP/IP', 'DNS/HTTPS', 'iptables', 'Packet Routing'].map((s) => (
                        <span key={s} className="bg-neutral-950 border border-neutral-900 px-1.5 py-0.5 rounded-sm text-gray-300">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1 uppercase tracking-wider text-[10px]">Languages</span>
                    <div className="flex flex-wrap gap-1">
                      {['Python', 'Java', 'JavaScript', 'HTML/CSS'].map((s) => (
                        <span key={s} className="bg-neutral-950 border border-neutral-900 px-1.5 py-0.5 rounded-sm text-gray-300">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-code text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2 select-none-decorative">
                  <FaCertificate /> CREDENTIALS
                </h4>
                <div className="space-y-3">
                  <div className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-sm">
                    <h5 className="font-cyber text-[11px] font-bold text-white uppercase">Cisco: Intro to Cybersecurity</h5>
                    <p className="text-[10px] text-gray-500 font-code mt-0.5">Cisco Networking Academy</p>
                  </div>
                  <div className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-sm">
                    <h5 className="font-cyber text-[11px] font-bold text-white uppercase">TryHackMe CTF Practitioner</h5>
                    <p className="text-[10px] text-gray-500 font-code mt-0.5">In Progress · Top 5% Global Rank</p>
                  </div>
                </div>
              </div>

              {/* Secure Fingerprint */}
              <div className="border border-neutral-900 p-4 rounded-sm text-center">
                <span className="text-[9px] font-code text-neutral-600 block mb-1 select-none-decorative">SHA-256 SIGNATURE</span>
                <span className="text-[8px] font-code text-cyan-500/60 break-all select-all">
                  a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
                </span>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResumePreview;
