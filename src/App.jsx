import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import MatrixRain from './components/MatrixRain';
import CustomCursor from './components/CustomCursor';
import MouseSpotlight from './components/MouseSpotlight';
import Footer from './sections/Footer';
import Dashboard from './pages/Dashboard';

// Lazy-loaded pages for code splitting
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const BOOT_LOGS = [
  'SHIELD SECURITY SHELL v3.0.0',
  'HOST: rohitsharma9258.github.io',
  '==========================================',
  'LOAD: Initializing core system protocols...',
  'LOAD: Restoring secure web interface modules... OK',
  'LOAD: Spawning interactive skill radars... OK',
  'LOAD: Binding Router parameters and dynamic ports... OK',
  'LOAD: Injecting Lenis kinetic smooth scrolling engine... OK',
  'LOAD: MouseSpotlight module activated... OK',
  'SCAN: Auditing Wi-Fi Intruder Detector SQLite tables... OK',
  'SCAN: Building Vanguard Async Port Scanner API... OK',
  'SCAN: Verifying GitHub profile endpoints... OK',
  'STATUS: SYSTEM INTEGRITY 100% (STABLE)',
  'ACCESS: GRANTED!'
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < BOOT_LOGS.length) {
        const log = BOOT_LOGS[currentLogIndex];
        setBootLogs((prev) => [...prev, log]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      }
    }, 140);
    return () => clearInterval(interval);
  }, []);

  const getLogColor = (log) => {
    if (!log) return 'text-cyan-400/90';
    if (log.startsWith('STATUS') || log.startsWith('ACCESS')) return 'text-emerald-400 font-bold';
    if (log.startsWith('SCAN')) return 'text-blue-400';
    if (log.startsWith('LOAD')) return 'text-cyan-300';
    return 'text-cyan-400/90';
  };

  return (
    <>
      <CustomCursor />
      <div className="scanlines">

        {/* Boot Loader */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loader"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }}
              className="fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-center p-6 font-code text-xs md:text-sm text-cyan-400 select-none"
              aria-live="polite"
              aria-label="System boot sequence"
            >
              <div className="w-full max-w-lg bg-neutral-950 border border-cyan-500/20 rounded-md p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-[360px] justify-between">
                <div className="overflow-y-auto space-y-1.5 scrollbar-none flex-grow">
                  {bootLogs.map((log, i) => (
                    <div key={i} className={getLogColor(log)}>
                      {log.startsWith('ACCESS') ? '> ' : ''}{log}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-cyan-500/10 pt-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                    <span>SECURE_BOOT_ACTIVE</span>
                  </div>
                  <span>{Math.min(Math.round((bootLogs.length / BOOT_LOGS.length) * 100), 100)}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Website */}
        {!loading && (
          <div className="min-h-screen bg-black text-gray-100 flex flex-col relative">
            <MatrixRain />
            <MouseSpotlight />
            <Navbar />
            <main className="flex-grow" role="main">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center font-code text-cyan-400 text-sm">
                  <span className="animate-pulse">// Loading module...</span>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        )}

      </div>
    </>
  );
};

export default App;
