# Changelog

All notable changes to this project will be documented in this file.

## [5.0.0] — 2026-06-27
### Added
- Expanded terminal core commands list, supporting stateful directory traversal (`cd`), detailed list logs (`ls`), file reads (`cat`), pattern matching (`grep`), and standard utilities (`uname`, `ifconfig`, `top`, etc.).
- Integrated privacy-friendly clientside analytics utility (`analytics.js`) supporting event tracking on downloads, social redirects, and scroll thresholds.
- Created `Experience.jsx` Timeline combining B.Tech education, certifications, and project milestones chronologically.
- Created `vitest.config.js` and Playwright configuration setup to structure testing suites.
- Created `Dockerfile` and automated build configurations for Nginx routing setups.

### Changed
- Refactored project details deep-dives to document architecture, technical decisions, trade-offs, security, optimizations, and testing strategies.
- Streamlined biological details in `About.jsx` to focus on focus areas and eliminate duplicated education blocks.
- Consolidated profile activities (GitHub activity calendars, repos, and profiles) inside a unified `CodingProfiles.jsx` component.

### Removed
- Retired redundant `Services.jsx`, `Blog.jsx`, `Achievements.jsx`, and `GithubStats.jsx` layout sections to optimize page readability for recruiters.
