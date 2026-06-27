import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaGithub, FaPlay, FaTerminal, FaShieldAlt, FaNetworkWired, FaServer, FaCogs, FaLock, FaBalanceScale, FaVial, FaRocket, FaLightbulb, FaClock } from 'react-icons/fa';
import projectsData from '../data/projectsData.json';
import { trackEvent } from '../utils/analytics';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [demoActive, setDemoActive] = useState(false);
  const [demoLogs, setDemoLogs] = useState([]);

  useEffect(() => {
    // Reset scroll to top on mount
    window.scrollTo(0, 0);
    const resolved = projectsData.find((p) => p.id === id);
    if (resolved) {
      setProject(resolved);
      trackEvent('project_detail_view', { id: resolved.id, title: resolved.title });
    }
  }, [id]);

  const triggerLiveDemoSim = () => {
    if (demoActive) return;
    setDemoActive(true);
    setDemoLogs(['Initializing mock sandbox environment...', 'Binding virtual interface vnet0...']);

    const logs = id === '1' 
      ? [
          'Scanning for broadcast packets...',
          'Captured ARP query: 192.168.1.18 asks who is 192.168.1.1',
          'Audit: MAC address [D4:A1:48:BC:E9:12] resolved.',
          'Checking threat signature index database...',
          'ALERT: MAC spoof signature mismatch detected!',
          'Threat rating calculated: 88% (CRITICAL)',
          'Writing iptables defense drop rule for MAC: D4:A1:48:BC:E9:12',
          'Database logs populated. Network sector secured.'
        ]
      : [
          'Resolving CIDR range: 10.0.0.0/29...',
          'Spawning non-blocking worker threads (Semaphore: 500 max)...',
          'Connection query: Port 22 (SSH) on 10.0.0.2 -> OPEN',
          'Banner grab: OpenSSH 8.2p1 Ubuntu (CVE audit pending)',
          'Connection query: Port 80 (HTTP) on 10.0.0.2 -> CLOSED',
          'Connection query: Port 443 (HTTPS) on 10.0.0.3 -> OPEN',
          'SQLite History Logger: Appended 8 results.',
          'Scan compile complete in 184ms.'
        ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setDemoLogs((prev) => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 450);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center font-code text-cyan-400">
        <div>[LOG]: Error resolving target project ID.</div>
        <Link to="/" className="text-xs text-white underline mt-4 flex items-center space-x-1">
          <FaChevronLeft /> <span>RETURN_TO_DASHBOARD</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 cyber-grid-dense pt-28 pb-20 relative select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 font-code text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 bg-cyan-950/10 px-3.5 py-2 rounded-sm transition-all border-glow-cyan"
        >
          <FaChevronLeft size={10} />
          <span>RETURN_TO_DASHBOARD</span>
        </Link>

        {/* Hero Section of project */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400 font-code text-xs select-none">
            <span className="p-1.5 border border-cyan-500/20 bg-cyan-950/20 rounded-sm">
              {project.id === '1' ? <FaShieldAlt /> : <FaNetworkWired />}
            </span>
            <span>SYSTEM_AUDIT_REPORT // ID_{project.id}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-cyber text-white tracking-wide uppercase">
            {project.title}
          </h1>
          <p className="text-cyan-400/80 font-code text-xs sm:text-sm">
            {project.subtitle}
          </p>
        </div>

        {/* Primary Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Core Dossier */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 01. Problem Statement */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-3 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">01_</span>PROBLEM_STATEMENT
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* 02. Core Capabilities */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">02_</span>CORE_CAPABILITIES
              </h3>
              <ul className="space-y-2.5 text-xs md:text-sm text-gray-300 font-code">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold mt-0.5">&gt;&gt;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 03. Technical Decisions */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">03_</span>TECHNICAL_DECISIONS
              </h3>
              <div className="space-y-3">
                {project.technicalDecisions.map((decision, i) => (
                  <div key={i} className="flex gap-2 text-xs md:text-sm text-gray-300 font-code">
                    <FaCogs className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{decision}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 04. Security Considerations */}
            <div className="glass-panel border-red-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-red-400">04_</span>SECURITY_CONSIDERATIONS
              </h3>
              <div className="space-y-3">
                {project.securityConsiderations.map((sc, i) => (
                  <div key={i} className="flex gap-2 text-xs md:text-sm text-gray-300 font-code">
                    <FaLock className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{sc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 05. Trade-offs */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">05_</span>TRADE_OFFS
              </h3>
              <div className="space-y-3">
                {project.tradeoffs.map((to, i) => (
                  <div key={i} className="flex gap-2 text-xs md:text-sm text-gray-300 font-code">
                    <FaBalanceScale className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{to}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 06. Testing Strategy */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">06_</span>TESTING_STRATEGY
              </h3>
              <div className="space-y-3">
                {project.testingStrategy.map((ts, i) => (
                  <div key={i} className="flex gap-2 text-xs md:text-sm text-gray-300 font-code">
                    <FaVial className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{ts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 07. Performance Optimizations */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">07_</span>PERFORMANCE_OPTIMIZATIONS
              </h3>
              <div className="space-y-3">
                {project.performanceOptimizations.map((po, i) => (
                  <div key={i} className="flex gap-2 text-xs md:text-sm text-gray-300 font-code">
                    <FaRocket className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{po}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 08. Lessons Learned */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">08_</span>LESSONS_LEARNED
              </h3>
              <div className="space-y-3">
                {project.lessonsLearned.map((ll, i) => (
                  <div key={i} className="flex gap-2 text-xs md:text-sm text-gray-300 font-code">
                    <FaLightbulb className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>{ll}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Specifications & Simulator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 09. Technology Stack */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
                <span className="text-cyan-400">09_</span>TECHNOLOGY_STACK
              </h3>
              <div className="space-y-3 font-code text-xs">
                {project.techStack.map((tech) => (
                  <div 
                    key={tech.name}
                    className="flex justify-between items-center border-b border-neutral-900 pb-2 text-gray-300"
                  >
                    <span className="text-cyan-400 font-bold">{tech.name}</span>
                    <span className="text-gray-400 text-[10px] text-right">{tech.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 10. Development Timeline */}
            <div className="glass-panel border-cyan-500/10 p-6 rounded-lg flex items-center justify-between">
              <span className="text-xs font-cyber font-bold text-white uppercase tracking-wider">10_DEVELOPMENT_TIMELINE</span>
              <span className="flex items-center gap-1.5 font-code text-xs text-emerald-400 border border-emerald-500/20 bg-emerald-950/20 px-3 py-1 rounded-sm">
                <FaClock size={11} aria-hidden="true" />
                {project.devTimeline}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-950 border border-neutral-800 hover:border-cyan-400 text-white font-cyber text-xs py-3 rounded-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
              >
                <FaGithub />
                <span>INSPECT_SOURCE</span>
              </a>
              <button
                onClick={triggerLiveDemoSim}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-cyber text-xs py-3 rounded-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold cursor-pointer"
              >
                <FaPlay />
                <span>RUN_SIMULATOR</span>
              </button>
            </div>

            {/* Simulator CLI Terminal */}
            {demoActive && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel border-cyan-500/20 p-4 rounded-md font-code text-[10px] md:text-xs text-cyan-400 bg-neutral-950 shadow-inner h-40 overflow-y-auto"
              >
                <div className="flex items-center space-x-2 border-b border-neutral-900 pb-1.5 mb-2 text-neutral-500 font-cyber">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block"></span>
                  <span>SIMULATED_LOG_STREAM</span>
                </div>
                <div className="space-y-1">
                  {demoLogs.map((log, i) => (
                    <div key={i} className={log.startsWith('ALERT') ? 'text-red-400' : log.startsWith('SUCCESS') || log.startsWith('Status') ? 'text-emerald-400' : 'text-cyan-400/90'}>
                      &gt; {log}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* 11. Engineering Architecture */}
        <div className="glass-panel border-cyan-500/10 p-6 md:p-8 rounded-lg">
          <h3 className="text-sm font-cyber font-bold text-white mb-4 flex items-center gap-2 select-none-decorative">
            <span className="text-cyan-400">11_</span>ENGINEERING_ARCHITECTURE
          </h3>
          
          <div className="overflow-x-auto pb-4 pt-2">
            <pre className="font-code text-[10px] md:text-xs text-cyan-300 bg-neutral-950/70 border border-neutral-900 p-4 rounded-sm mb-4 leading-relaxed overflow-x-auto">
              {project.architecture.diagram}
            </pre>
          </div>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            {project.architecture.summary}
          </p>
        </div>

        {/* 12. Vulnerability Mitigation (Challenges) */}
        <div className="glass-panel border-cyan-500/10 p-6 md:p-8 rounded-lg">
          <h3 className="text-sm font-cyber font-bold text-white mb-6 flex items-center gap-2 select-none-decorative">
            <span className="text-cyan-400">12_</span>VULNERABILITY_MITIGATION_LOG
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges.map((c, i) => (
              <div key={i} className="bg-neutral-950/60 border border-neutral-900 p-5 rounded-md flex flex-col justify-between">
                <div>
                  <h4 className="font-cyber text-xs font-bold text-red-400 mb-2 uppercase">
                    Incident: {c.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                    {c.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-900/60 text-[11px] font-code text-gray-300">
                  <span className="text-emerald-400 font-bold block mb-1">PATCH IMPLEMENTED:</span>
                  {c.solution}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 13. Future Improvements */}
        <div className="glass-panel border-cyan-500/10 p-6 rounded-lg">
          <h3 className="text-sm font-cyber font-bold text-white mb-3 flex items-center gap-2 select-none-decorative">
            <span className="text-cyan-400">13_</span>FUTURE_IMPROVEMENTS
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-gray-300 font-sans">
            {project.futureImprovements.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
