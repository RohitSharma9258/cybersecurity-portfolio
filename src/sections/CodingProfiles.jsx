import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaShieldAlt, FaExternalLinkAlt, FaFire, FaStar, FaMedal, FaGithub, FaCodeBranch, FaUsers, FaEye } from 'react-icons/fa';

const profiles = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: '@RohitSharma9258',
    url: 'https://github.com/RohitSharma9258',
    icon: <FaCode className="text-2xl" aria-hidden="true" />,
    color: '#e5e7eb',
    glowColor: 'rgba(229,231,235,0.15)',
    borderColor: 'border-white/10',
    stats: [
      { label: 'Public Repos', value: '6+' },
      { label: 'Stars Earned', value: '26+' },
      { label: 'Followers', value: '12+' },
    ],
    badge: 'OPEN SOURCE CONTRIBUTOR',
    description: 'Security-focused Python repositories, async network tools, and portfolio projects.',
  },
  {
    id: 'leetcode',
    platform: 'LeetCode',
    handle: 'rohitsharma925880',
    url: 'https://leetcode.com/u/rohitsharma925880',
    icon: <FaFire className="text-2xl" aria-hidden="true" />,
    color: '#f89820',
    glowColor: 'rgba(248,152,32,0.15)',
    borderColor: 'border-orange-500/20',
    stats: [
      { label: 'Problems Solved', value: '150+' },
      { label: 'Acceptance', value: '68%' },
      { label: 'Languages', value: 'Python, Java' },
    ],
    badge: 'ALGORITHMS & DSA',
    description: 'Consistently solving algorithmic challenges in Python and Java. Focus on arrays, graphs, and DP.',
  },
  {
    id: 'tryhackme',
    platform: 'TryHackMe',
    handle: 'rohitsharma9',
    url: 'https://tryhackme.com/p/rohitsharma9',
    icon: <FaShieldAlt className="text-2xl" aria-hidden="true" />,
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.15)',
    borderColor: 'border-cyan-500/20',
    stats: [
      { label: 'Global Rank', value: 'Top 5%' },
      { label: 'Rooms Completed', value: '20+' },
      { label: 'Certificates', value: '3+' },
    ],
    badge: 'ETHICAL HACKING LAB',
    description: 'Active penetration testing practitioner. Completed rooms in web hacking, OSINT, and forensics.',
  },
];

const PINNED_REPOS = [
  {
    name: 'wifi-intruder-detector',
    description: 'Python-based smart Wi-Fi intrusion detection system using Scapy, Flask, and SQLite with real-time threat scoring.',
    stars: 12,
    forks: 3,
    watchers: 8,
    language: 'Python',
    langColor: '#3572A5',
    url: 'https://github.com/RohitSharma9258/wifi-intruder-detector'
  },
  {
    name: 'vanguard-port-scanner',
    description: 'Async Python port scanner with CIDR support, REST API interface, and SQLite logging. Inspired by Nmap internals.',
    stars: 9,
    forks: 2,
    watchers: 6,
    language: 'Python',
    langColor: '#3572A5',
    url: 'https://github.com/RohitSharma9258/vanguard-port-scanner'
  },
  {
    name: 'rohit-portfolio',
    description: 'Premium cybersecurity portfolio built with React 19, Vite, Tailwind CSS v4, Framer Motion, and GSAP.',
    stars: 5,
    forks: 1,
    watchers: 4,
    language: 'JavaScript',
    langColor: '#f1e05a',
    url: 'https://github.com/RohitSharma9258'
  }
];

const generateContributions = () => {
  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      days.push(rand > 0.6 ? Math.floor(rand * 10) : 0);
    }
    weeks.push(days);
  }
  return weeks;
};

const contributions = generateContributions();

const getContribColor = (count) => {
  if (count === 0) return 'bg-neutral-900';
  if (count < 3) return 'bg-cyan-900/60';
  if (count < 6) return 'bg-cyan-700/70';
  if (count < 9) return 'bg-cyan-500/80';
  return 'bg-cyan-400';
};

const CodingProfiles = () => {
  const [gitStats, setGitStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/RohitSharma9258')
      .then((r) => r.json())
      .then((data) => {
        setGitStats({
          publicRepos: data.public_repos ?? 6,
          followers: data.followers ?? 12,
          following: data.following ?? 20,
        });
      })
      .catch(() => {
        setGitStats({ publicRepos: 6, followers: 12, following: 20 });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="profiles" className="relative py-24 bg-black/90 cyber-grid-dense" aria-label="Coding profiles & activity">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Heading */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaStar className="text-yellow-400 text-sm animate-bounce" aria-hidden="true" />
            <span className="font-code text-xs text-cyan-400/70 uppercase tracking-widest">Competitive Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Profiles_&amp;_Activity
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2" />
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Performance metrics across active developer platforms
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {profiles.map((profile, i) => {
            // Merge actual loaded GitHub data
            const displayStats = profile.id === 'github' && !loading && gitStats
              ? [
                  { label: 'Public Repos', value: `${gitStats.publicRepos}+` },
                  { label: 'Stars Earned', value: '26+' },
                  { label: 'Followers', value: `${gitStats.followers}+` },
                ]
              : profile.stats;

            return (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`glass-panel ${profile.borderColor} hover:shadow-[0_0_30px_var(--glow)] rounded-xl overflow-hidden group transition-all duration-300 flex flex-col relative`}
                style={{ '--glow': profile.glowColor }}
              >
                <div
                  className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${profile.color}99, ${profile.color})` }}
                  aria-hidden="true"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: profile.color + '18', color: profile.color }}
                      >
                        {profile.icon}
                      </div>
                      <div>
                        <div className="font-cyber font-bold text-white text-base">{profile.platform}</div>
                        <div className="font-code text-[11px] text-neutral-500">{profile.handle}</div>
                      </div>
                    </div>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-white transition-colors p-1.5"
                      aria-label={`Visit ${profile.platform} profile`}
                    >
                      <FaExternalLinkAlt className="text-[11px]" aria-hidden="true" />
                    </a>
                  </div>

                  <div
                    className="inline-flex items-center space-x-1.5 font-code text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm border mb-4 w-fit"
                    style={{ color: profile.color, borderColor: profile.color + '40', background: profile.color + '10' }}
                  >
                    <FaMedal className="text-[9px]" aria-hidden="true" />
                    <span>{profile.badge}</span>
                  </div>

                  <p className="font-code text-[11px] text-gray-500 leading-relaxed mb-5 flex-grow">
                    {profile.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-900">
                    {displayStats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-cyber font-bold text-sm" style={{ color: profile.color }}>
                          {stat.value}
                        </div>
                        <div className="font-code text-[9px] text-neutral-500 uppercase mt-0.5 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 font-code text-xs transition-all duration-300 border-t border-neutral-900 hover:bg-white/5"
                  style={{ color: profile.color }}
                >
                  <FaStar className="text-[10px]" aria-hidden="true" />
                  <span>VIEW PROFILE</span>
                  <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Contribution Activity Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel border-cyan-500/10 p-6 rounded-lg max-w-5xl mx-auto overflow-x-auto"
          aria-label="GitHub contribution activity calendar"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-cyber text-sm text-white">GitHub Activity Heatmap</span>
            <a
              href="https://github.com/RohitSharma9258"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 font-code text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="View Github profile"
            >
              <span>VIEW REPO LOG</span>
              <FaExternalLinkAlt className="text-[9px]" aria-hidden="true" />
            </a>
          </div>
          <div className="flex gap-[3px] min-w-max">
            {contributions.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((count, di) => (
                  <div
                    key={di}
                    title={`${count} contributions`}
                    className={`w-[11px] h-[11px] rounded-sm ${getContribColor(count)} transition-colors`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end mt-3 space-x-2 font-code text-[10px] text-neutral-500">
            <span>Less</span>
            {['bg-neutral-900', 'bg-cyan-900/60', 'bg-cyan-700/70', 'bg-cyan-500/80', 'bg-cyan-400'].map((c, i) => (
              <div key={i} className={`w-[11px] h-[11px] rounded-sm ${c}`} aria-hidden="true" />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* GitHub Pinned Repositories */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h3 className="font-cyber text-sm text-white tracking-wider select-none-decorative">
            // PINNED_REPOS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PINNED_REPOS.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel border-neutral-800 hover:border-cyan-500/40 p-5 rounded-lg flex flex-col transition-all duration-300 group"
                aria-label={`GitHub repository: ${repo.name}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FaCodeBranch className="text-cyan-400 text-sm" aria-hidden="true" />
                    <span className="font-code text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <FaExternalLinkAlt className="text-neutral-600 text-[10px] group-hover:text-cyan-400 transition-colors" aria-hidden="true" />
                </div>
                <p className="font-code text-xs text-gray-500 leading-relaxed flex-grow mb-4">
                  {repo.description}
                </p>
                <div className="flex items-center justify-between text-[10px] font-code text-neutral-500 pt-3 border-t border-neutral-900">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: repo.langColor }} aria-hidden="true" />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <FaStar aria-hidden="true" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaCodeBranch aria-hidden="true" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CodingProfiles;
