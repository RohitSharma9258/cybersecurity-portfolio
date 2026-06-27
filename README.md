# 🛡️ Rohit Sharma — Cybersecurity Engineer & Developer Portfolio v5.0

A premium, production-ready cybersecurity portfolio built with React 19, Vite, Framer Motion, GSAP, and Tailwind CSS. Optimized for 90-second recruiter scans, showcasing verified technical profiles, interactive project audits, and a stateful Linux bash shell emulation.

## ⚡ Features

- **Cybersecurity-themed design** — Glassmorphism, HUD radar, matrix rain, scanlines.
- **Interactive Terminal** — 30+ stateful commands supporting mock folder traversal (`cd`), detailed list logs (`ls`), file reads (`cat`), pattern matching (`grep`), and standard diagnostics.
- **Chronological Experience Timeline** — Merged academic, certification, and project milestones.
- **High-Density Coding Profiles** — Unified LeetCode stats, TryHackMe global standing, and GitHub contribution graphs.
- **Privacy-Friendly Analytics** — Client-side event logging for resume downloads, redirects, and scroll thresholds.
- **Secure Form Validation** — Input sanitization and format verification.
- **Accessibility (WCAG AA)** — Custom reticles, focus highlights, prefers-reduced-motion triggers.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Declarative animations |
| GSAP | Custom cursor & advanced animations |
| React Router | Client-side routing |
| EmailJS | Contact form email delivery |
| Canvas API | Skill radar visualization |

## 📁 Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── CustomCursor.jsx
│   ├── CyberTerminal.jsx
│   ├── MatrixRain.jsx
│   ├── ProgressRing.jsx
│   ├── SkillRadar.jsx
│   └── MouseSpotlight.jsx
├── sections/         # Page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── CodingProfiles.jsx
│   ├── ResumePreview.jsx
│   └── Contact.jsx
├── pages/            # Route pages
│   ├── Dashboard.jsx
│   ├── ProjectDetail.jsx
│   └── NotFound.jsx
├── data/             # Static data
│   └── projectsData.json
├── utils/            # Utilities
│   ├── analytics.js
│   └── terminalCommands.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials:
```bash
cp .env.example .env
```

## 📄 License
MIT License
