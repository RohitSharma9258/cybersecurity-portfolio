import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaNetworkWired, FaBrain, FaLock, FaBug } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="relative py-24 bg-black/90 cyber-grid-dense" aria-label="Identity and background dossier">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Identity_Parameters
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2" />
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Resolving background records and active registry files
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Who Am I? */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="glass-panel border-cyan-500/10 p-6 md:p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-neutral-800 font-code text-[10px] select-none uppercase" aria-hidden="true">
                SEC_REGISTRY: 40421
              </div>
              <h3 className="text-xl font-bold font-cyber text-cyan-400 mb-4 flex items-center space-x-2">
                <FaUserCheck className="text-sm" aria-hidden="true" />
                <span>BIOLOGICAL_DOSSIER</span>
              </h3>
              <p className="text-gray-300 font-sans leading-relaxed text-sm md:text-base">
                I am a B.Tech Computer Science Engineering student at GLA University, Mathura. 
                My focus centers on securing digital systems, analyzing network packets, 
                and crafting lightweight backend defense tools. I operate at the intersection 
                of secure systems development and proactive network scripting.
              </p>
              <p className="text-gray-300 font-sans leading-relaxed text-sm md:text-base mt-4">
                Whether intercepting traffic with Scapy, writing high-performance non-blocking socket scanners 
                via python's async loops, or configuring local firewall rules, I enjoy auditing systems to spot 
                vulnerability footprints. I aim to build defensive utilities that improve digital security profiles.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Focus Areas & Profiling */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 uppercase select-none-decorative">
                // ACTIVE_DOMAINS
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: <FaLock className="text-cyan-400" />, title: 'Network Security Auditing', desc: 'ARP analysis, traffic interception, packet reconstruction.' },
                  { icon: <FaNetworkWired className="text-blue-400" />, title: 'Asynchronous Scripting', desc: 'Concurrent socket scanners, fast CLI probes, automated scripts.' },
                  { icon: <FaBrain className="text-purple-400" />, title: 'AI / ML Threat Intel', desc: 'Anomaly detection model pipelines, threat classification.' },
                  { icon: <FaBug className="text-red-400" />, title: 'OWASP Top 10 Hardening', desc: 'Validating inputs, securing headers, auditing API endpoints.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3.5">
                    <span className="text-lg mt-0.5" aria-hidden="true">{item.icon}</span>
                    <div>
                      <h4 className="font-cyber text-xs font-bold text-gray-200 uppercase">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
