// Privacy-friendly clientside analytics tracker for portfolio sessions

const IS_DEV = import.meta.env.MODE === 'development';

export const trackEvent = (eventName, eventData = {}) => {
  try {
    const timestamp = new Date().toISOString();
    const payload = { eventName, eventData, timestamp };

    // Console logging for debugging in development mode
    if (IS_DEV) {
      console.log(`[ANALYTICS]: ${eventName}`, eventData);
    }

    // Persist session metrics locally inside localStorage (no invasive cookies)
    const metricsKey = 'portfolio_analytics_log';
    const existing = JSON.parse(localStorage.getItem(metricsKey) || '[]');
    existing.push(payload);
    
    // Cap log history length at 100 entries to prevent local storage bloat
    if (existing.length > 100) {
      existing.shift();
    }
    
    localStorage.setItem(metricsKey, JSON.stringify(existing));

    // Custom browser events to let developer dashboards bind to triggers
    const customEvent = new CustomEvent('portfolio_metric', { detail: payload });
    window.dispatchEvent(customEvent);

  } catch (err) {
    if (IS_DEV) {
      console.error('Failed to log analytics metric:', err);
    }
  }
};

// Auto-track scroll depth thresholds
if (typeof window !== 'undefined') {
  const trackedThresholds = new Set();
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    
    const scrolledPercent = Math.round((window.scrollY / totalHeight) * 100);
    const thresholds = [25, 50, 75, 100];
    
    for (const threshold of thresholds) {
      if (scrolledPercent >= threshold && !trackedThresholds.has(threshold)) {
        trackedThresholds.add(threshold);
        trackEvent('scroll_depth_threshold', { percentage: threshold });
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
}
