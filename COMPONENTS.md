# Visual Components Reference Guide

This document catalogues the core visual components of the Cybersecurity Portfolio, including their styling tokens, state models, interactive capabilities, and layout guidelines.

---

## 🧭 Navbar (`Navbar.jsx`)
- **Role**: Site-wide navigation wrapper displaying brand identity, current local time, and quick status telemetry indicators.
- **Styling**: Absolute glassmorphism overlay (`bg-black/80` with blur filter) that transitions size on scroll.
- **State**:
  - `isOpen` (Boolean): Manages mobile responsive dropdown list toggling.
  - `systemTime` (String): Re-evaluates local time every 1000ms using setInterval.
  - `scrolled` (Boolean): Monitors scrolling threshold to toggle borders and blur metrics.
- **Accessibility**: Includes keyboard escape controls to dismiss mobile dialogs, custom focus outlines, and full ARIA navigation role landmarks.

---

## 🖥️ Cyber Terminal (`CyberTerminal.jsx`)
- **Role**: Highly interactive bash shell simulator that processes system directives and simulates hacker sandboxes.
- **Styling**: Framed console block themed in electric cyan (`text-cyan-400`), incorporating monospace typography and scrollbar tracks.
- **State**:
  - `currentDir` (String): Tracks dynamic directory path within mock filesystem.
  - `cmdHistory` (Array): Stores array of inputs for command line history.
  - `historyIdx` (Integer): Manages index traversal for keyboard up/down arrows.
- **Interactions**: Accepts standard shell commands (`cd`, `ls`, `cat`, `pwd`, `grep`, `neofetch`, `matrix`, `hack`, `ping`, etc.) matching standard Linux core utilities.

---

## 📊 Skill Radar (`SkillRadar.jsx`)
- **Role**: Custom Canvas/SVG data chart visualizing core competency mastery indices.
- **Styling**: Floating neon vector shape displaying a pentagon structure with dashed rings.
- **State**:
  - `hoveredPoint` (Object): Active focus element display for detailed HUD tooltips.
- **Calculations**: Translates level metrics into SVG coordinates using custom trigonometry sweeps:
  `x = center + radius * Math.cos(angle - Math.PI / 2)`

---

## 🎨 Custom Cursor (`CustomCursor.jsx`)
- **Role**: Custom mouse reticle element styling indicating hover states.
- **Styling**: Center dot paired with a floating outer halo using GSAP transitions.
- **State**: Track window coordinate positions and mouse hover boundaries.

---

## ⛈️ Matrix Rain (`MatrixRain.jsx`)
- **Role**: Matrix-themed falling character overlay.
- **Styling**: HTML5 2D context drawing loop using customizable speed rates.
