import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFolderOpen, FaEnvelope, FaFileDownload, FaTerminal } from 'react-icons/fa';
import { trackEvent } from '../utils/analytics';

const Hero = () => {
  const titles = [
    'Cybersecurity Student',
    'Software Developer',
    'AI Security Enthusiast',
    'Ethical Hacking Passionate'
  ];

  const [text, setText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const currentFullText = titles[titleIndex];

    const handleTyping = () => {
      if (isDeleting) {
        // Delete characters
        setText(currentFullText.substring(0, text.length - 1));
        setSpeed(50); // Speed up deleting
      } else {
        // Add characters
        setText(currentFullText.substring(0, text.length + 1));
        setSpeed(120);
      }

      // Check transitions
      if (!isDeleting && text === currentFullText) {
        // Wait at peak before deleting
        timer = setTimeout(() => setIsDeleting(true), 1500);
        return;
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setSpeed(150);
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cyber-grid">
      {/* Laser scanner effect */}
      <div className="cyber-scanner"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Intro Text Column */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 border border-cyan-500/20 bg-cyan-950/20 px-3 py-1.5 rounded-full text-xs font-code text-cyan-400 self-start border-glow-cyan"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>SYSTEM CONSOLE v1.0.8 // SECURE CHANNEL</span>
          </motion.div>

          <div className="space-y-3">
            <motion.h4 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 font-code tracking-widest text-sm uppercase"
            >
              Initialize Handshake...
            </motion.h4>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold font-cyber text-white tracking-tight"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">Rohit Sharma</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-10 text-xl sm:text-2xl font-code text-cyan-400 flex items-center"
            >
              <span>&gt; </span>
              <span className="typing-cursor font-semibold pl-1">{text}</span>
            </motion.div>

            {/* Instant-read stat badges for recruiters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              {[
                { label: '2 Projects', color: 'cyan' },
                { label: '150+ LeetCode', color: 'blue' },
                { label: 'Top 5% TryHackMe', color: 'emerald' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 text-xs font-code px-3 py-1 rounded-full border border-${badge.color}-500/20 bg-${badge.color}-950/20 text-${badge.color}-400`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-${badge.color}-400`} aria-hidden="true" />
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-400 max-w-xl text-sm sm:text-base font-sans leading-relaxed"
          >
            I am a B.Tech Computer Science Engineering student at GLA University, Mathura. 
            Focused on crafting bulletproof software, scripting automated network defenses, 
            and deploying deep neural networks for artificial intelligence threat detection.
          </motion.p>

          {/* Social Links & CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4 items-center"
          >
            {/* Primary Action Button */}
            <a 
              href="#contact" 
              onClick={() => trackEvent('cta_click', { button: 'strike_contact' })}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold px-6 py-3 rounded-sm flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <FaEnvelope />
              <span>STRIKE_CONTACT</span>
            </a>

            {/* Secondary Action Button */}
            <a 
              href="#projects" 
              onClick={() => trackEvent('cta_click', { button: 'load_projects' })}
              className="border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 text-cyan-400 font-cyber font-bold px-6 py-3 rounded-sm flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:bg-cyan-950/40"
            >
              <FaFolderOpen />
              <span>LOAD_PROJECTS</span>
            </a>

            {/* Resume Button */}
            <a 
              href="/resume.pdf" 
              download 
              onClick={() => trackEvent('resume_download', { source: 'hero' })}
              className="border border-neutral-700 hover:border-neutral-500 bg-neutral-900/60 text-gray-300 font-code text-xs px-4 py-3 rounded-sm flex items-center space-x-1.5 transition-all duration-300"
            >
              <FaFileDownload />
              <span>RESUME.bin</span>
            </a>
          </motion.div>

          {/* Social Icons row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex space-x-5 text-gray-500 pt-6"
          >
            <a 
              href="https://github.com/RohitSharma9258" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('social_click', { platform: 'github' })}
              className="hover:text-cyan-400 transition-colors duration-200" 
              aria-label="GitHub Profile"
            >
              <FaGithub size={22} />
            </a>
            <a 
              href="https://linkedin.com/in/rohit-sharma-404306310" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('social_click', { platform: 'linkedin' })}
              className="hover:text-cyan-400 transition-colors duration-200" 
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={22} />
            </a>
            <a 
              href="https://tryhackme.com/p/rohitsharma9" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('social_click', { platform: 'tryhackme' })}
              className="hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-1" 
              aria-label="TryHackMe Profile"
            >
              <FaTerminal size={18} className="mr-0.5" />
              <span className="text-[10px] font-code">THM</span>
            </a>
            <a 
              href="https://leetcode.com/u/rohitsharma925880" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('social_click', { platform: 'leetcode' })}
              className="hover:text-cyan-400 transition-colors duration-200 text-[10px] font-code font-bold self-center border border-neutral-800 px-1.5 py-0.5 rounded-sm" 
              aria-label="LeetCode Profile"
            >
              LEETCODE
            </a>
          </motion.div>
        </div>

        {/* Right Dashboard Cockpit HUD Columns */}
        <div className="lg:col-span-5 hidden lg:flex justify-center relative select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-80 h-80 relative flex items-center justify-center border border-cyan-500/10 rounded-full"
          >
            {/* HUD Outer Circular Grid */}
            <div className="absolute inset-0 border border-dashed border-cyan-500/10 rounded-full animate-[spin_80s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            <div className="absolute inset-10 border border-dashed border-blue-500/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
            
            {/* Decorative Crosshair */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/10"></div>
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-500/10"></div>

            {/* Core Radar Scanner Sweep */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.15) 0deg, transparent 90deg, transparent 360deg)',
                animation: 'spin 4s linear infinite'
              }}
            ></div>

            {/* Radar Dot Highlights (simulating detected security anomalies) */}
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full"></div>

            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full"></div>

            <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>

            {/* Digital Stats Overlay */}
            <div className="absolute bg-neutral-950/90 border border-neutral-800 p-4 rounded-sm font-code text-[10px] text-cyan-400 w-44 shadow-2xl flex flex-col space-y-1.5 border-glow-cyan">
              <div className="text-white border-b border-cyan-500/20 pb-1 mb-1 font-cyber">RADAR_STATS</div>
              <div>THREAT_LEVEL: LOW</div>
              <div>IP_RESOLVED: 12.189.9.4</div>
              <div>DECRYPT: 89.2%</div>
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>SECTOR: SAFE</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[10px] font-code text-gray-500 mb-2 uppercase tracking-widest">Scroll Down</span>
        <div className="w-5 h-8 border-2 border-neutral-700 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-cyan-400 rounded-full"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
