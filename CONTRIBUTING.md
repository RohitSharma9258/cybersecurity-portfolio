# Contributing Guidelines

Thank you for contributing to the Cybersecurity Portfolio project! Please follow these engineering standards when submitting pull requests.

## Development Workflow

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/amazing-improvement
   ```
2. Install dependencies cleanly using lockfiles:
   ```bash
   npm ci
   ```
3. Run code formatting and verification:
   ```bash
   npm run lint
   npm test
   ```
4. Commit your changes following clean guidelines:
   ```bash
   git commit -m "feat: expand console diagnostics parser"
   ```

## Coding Standards

### React Components
- Structure data-driven layouts utilizing JSON datasets rather than hardcoding nodes inside JSX.
- Implement explicit ARIA descriptions, semantic containers (`section`, `article`, `nav`), and high contrast focus styles for keyboard users.
- Add performance optimizations (like `useCallback`, `React.memo`, or lazy loading) for complex sub-components.

### CSS & Styling
- Apply Tailwind utility classes. Avoid duplicate ad-hoc CSS stylesheets.
- Respect prefers-reduced-motion queries by setting transition delays to zero when media queries evaluate to true.

### Security
- Sanitize external query links. Add `rel="noopener noreferrer"` to any anchor tag referencing cross-origin targets.
- Never hardcode private API tokens, email configuration IDs, or database credentials. Import variables through Vite environments.
