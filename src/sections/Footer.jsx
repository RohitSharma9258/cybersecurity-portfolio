import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronUp, FaGithub, FaLinkedin, FaEnvelope, FaSkull, FaLock, FaTerminal, FaCode } from 'react-icons/fa';

const quickLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Profiles', href: '/#profiles' },
  { label: 'GitHub', href: '/#github' },
  { label: 'Terminal', href: '/#terminal' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

const socials = [
  {
    icon: <FaGithub />,
    href: 'https://github.com/RohitSharma9258',
    label: 'GitHub',
    color: 'hover:text-white',
  },
  {
    icon: <FaLinkedin />,
    href: 'https://linkedin.com/in/rohit-sharma-404306310',
    label: 'LinkedIn',
    color: 'hover:text-blue-400',
  },
  {
    icon: <FaEnvelope />,
    href: 'mailto:rohitsharma40421@gmail.com',
    label: 'Email',
    color: 'hover:text-cyan-400',
  },
  {
    icon: <FaCode />,
    href: 'https://leetcode.com/u/rohitsharma925880',
    label: 'LeetCode',
    color: 'hover:text-orange-400',
  },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-black border-t border-neutral-900 pt-14 pb-8 overflow-hidden font-code text-xs" role="contentinfo">

      {/* Top Section: Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <FaSkull className="text-cyan-400 animate-pulse" aria-hidden="true" />
              <span className="font-cyber font-bold tracking-widest text-white text-base">ROHIT SHARMA</span>
            </div>
            <p className="text-neutral-500 leading-relaxed max-w-xs">
              Cybersecurity Student · Software Developer · AI Security Enthusiast. Building defensive tools that matter.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`text-neutral-500 ${s.color} transition-all duration-200 text-base`}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-cyber font-semibold text-cyan-400/80 uppercase tracking-widest text-[11px] mb-4">
              // QUICK_LINKS
            </h3>
            <nav aria-label="Footer quick links">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-500 hover:text-cyan-400 transition-colors flex items-center space-x-1.5"
                    >
                      <span className="text-cyan-500/50">›</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* System Readout Column */}
          <div className="flex flex-col space-y-2 text-neutral-500">
            <h3 className="font-cyber font-semibold text-cyan-400/80 uppercase tracking-widest text-[11px] mb-2">
              // SYSTEM_STATUS
            </h3>
            <div className="flex items-center space-x-2">
              <FaLock className="text-[10px] text-cyan-400" aria-hidden="true" />
              <span className="text-cyan-400/80">SECURE PROFILE ACTIVE</span>
            </div>
            <div>ENCRYPTION: AES-256-GCM</div>
            <div>SIGN: HMAC-SHA512</div>
            <div>MEM_STATUS: STABLE</div>
            <div>PACKET_FILTER: ACTIVE</div>
            <div className="text-[10px] text-neutral-700 pt-1">SHA256: d85a9f2a4e9b8c6f1a3d5e7f9c2b4a8e</div>
            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 mt-3 text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/20 hover:border-cyan-500/50 px-3 py-1.5 rounded-sm w-fit"
              aria-label="Download resume PDF"
            >
              <FaTerminal className="text-[10px]" aria-hidden="true" />
              <span>DOWNLOAD_RESUME</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-neutral-900 pt-6 gap-4">
          <div className="text-neutral-600 text-[10px]">
            © {new Date().getFullYear()} Rohit Sharma · All secure modules compile-locked.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-neutral-700 text-[10px]">Built with React 19 · Vite · Tailwind v4 · Framer Motion</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 border border-neutral-800 hover:border-cyan-400 bg-neutral-950/60 text-cyan-400 rounded-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              aria-label="Scroll back to top"
            >
              <FaChevronUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
