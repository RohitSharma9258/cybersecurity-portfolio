import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSkullCrossbones, FaHome, FaTerminal } from 'react-icons/fa';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 — Access Denied | Rohit Sharma';
    return () => { document.title = 'Rohit Sharma | Cybersecurity Portfolio'; };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden cyber-grid-dense">

      {/* Glitch scanlines overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-red-950/10 pointer-events-none" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg relative z-10"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="flex justify-center mb-8"
          aria-hidden="true"
        >
          <div className="w-24 h-24 rounded-full bg-red-950/30 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            <FaSkullCrossbones className="text-4xl text-red-400" />
          </div>
        </motion.div>

        {/* Error code */}
        <div className="font-code text-xs text-red-400/80 uppercase tracking-widest mb-3">
          ERROR_CODE: 404 // ROUTE_NOT_FOUND
        </div>

        {/* Glitch 404 text */}
        <h1
          className="font-cyber font-black text-7xl md:text-9xl text-red-500 mb-2 select-none"
          style={{ textShadow: '4px 0 #06b6d4, -4px 0 #a855f7' }}
          aria-label="404 - Page not found"
        >
          404
        </h1>

        <div className="font-cyber text-xl font-bold text-white uppercase tracking-wider mb-4">
          ACCESS DENIED
        </div>

        <p className="font-code text-sm text-gray-500 leading-relaxed mb-10 max-w-sm mx-auto">
          The requested endpoint does not exist or has been moved to a classified location.
          Your intrusion attempt has been logged.
        </p>

        {/* Terminal log block */}
        <div className="glass-panel border-red-500/20 bg-red-950/5 p-4 rounded-md font-code text-xs text-left mb-8 space-y-1.5">
          <div className="text-red-400">[ERROR] Route not found: {window.location.pathname}</div>
          <div className="text-red-400/60">[LOG] Unauthorized access attempt recorded.</div>
          <div className="text-yellow-400/80">[WARN] Firewall rule RS_404 activated.</div>
          <div className="text-cyan-400 animate-pulse">[SYS] Redirecting to safe endpoint...</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            aria-label="Return to home dashboard"
          >
            <FaHome aria-hidden="true" />
            <span>RETURN HOME</span>
          </Link>
          <Link
            to="/#terminal"
            className="flex items-center space-x-2 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 font-cyber font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300"
            aria-label="Open terminal"
          >
            <FaTerminal aria-hidden="true" />
            <span>OPEN TERMINAL</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
