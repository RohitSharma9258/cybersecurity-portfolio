# 🚀 Deployment Guide — Cybersecurity Portfolio

This guide outlines how to deploy the portfolio to various modern web hosting platforms.

---

## ⚡ Prerequisites

1. Ensure the production build completes successfully:
   ```bash
   npm run build
   ```
2. Configure your EmailJS environment variables in a `.env` file (or directly in your hosting platform dashboard).

---

## 🌐 Deploy to Vercel (Recommended)

Vercel is the easiest and fastest platform to deploy Vite-based React projects.

### Option 1: Via Vercel Git Integration
1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your repository.
4. Vercel will auto-detect Vite. Set the configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Click **Deploy**.

### Option 2: Via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run deployment command in root:
   ```bash
   vercel
   ```
3. Follow prompts. Set build directory to `dist`.

---

## ☁️ Deploy to Netlify

### Option 1: Git Integration
1. Log in to [Netlify](https://netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Link your Git repository.
4. Set the following build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Go to **Site Configuration** > **Environment variables** to add your EmailJS keys.

---

## 🛠️ Deploy to GitHub Pages

To host on `https://<username>.github.io/<repo-name>`:

1. In `vite.config.js`, set the base path to match your repo name:
   ```javascript
   export default defineConfig({
     base: '/<repo-name>/',
     // ...
   })
   ```
2. Install `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
3. In `package.json`, add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Run:
   ```bash
   npm run deploy
   ```
5. On GitHub, go to **Settings** > **Pages** and verify the source is set to the `gh-pages` branch.

---

## 🧡 Deploy to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Choose your repo.
4. Choose **Vite** as the framework preset.
5. In **Environment variables (advanced)**, add EmailJS configuration.
6. Click **Save and Deploy**.
