import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setSystemTime(date.toLocaleTimeString([], { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Profiles', href: '/#profiles' },
    { name: 'Terminal', href: '/#terminal' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <FaShieldAlt className="text-cyan-400 text-xl animate-pulse" aria-hidden="true" />
            <a
              href="#"
              rel="noopener noreferrer"
              className="font-cyber font-bold text-lg text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              aria-label="Rohit Sharma — Home"
            >
              ROHIT_SHARMA <span className="text-blue-500 font-code">&gt;_</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-code text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 relative group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* System status display */}
          <div className="hidden lg:flex items-center space-x-4 border border-neutral-800 bg-neutral-950/60 px-3 py-1 rounded-sm text-xs font-code">
            <span className="flex items-center text-emerald-400 space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" aria-hidden="true"></span>
              <span>SYS_ONLINE</span>
            </span>
            <span className="text-neutral-600" aria-hidden="true">|</span>
            <span className="text-cyan-400">LOC: Mathura, IN</span>
            <span className="text-neutral-600" aria-hidden="true">|</span>
            <span className="text-blue-400">TIME: {systemTime}</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 border-b border-cyan-500/20 bg-black/95 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block font-code text-base text-gray-300 hover:text-cyan-400 py-2 border-b border-neutral-900"
              tabIndex={isOpen ? 0 : -1}
            >
              &gt; {item.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-3 pt-3 text-xs font-code text-neutral-400">
            <span className="text-emerald-400">ONLINE</span>
            <span aria-hidden="true">•</span>
            <span className="text-cyan-400">LOC: IN</span>
            <span aria-hidden="true">•</span>
            <span className="text-blue-400">{systemTime}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
