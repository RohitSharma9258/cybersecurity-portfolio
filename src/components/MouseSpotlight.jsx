import React, { useEffect, useRef } from 'react';

const MouseSpotlight = () => {
  const spotRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const el = spotRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(6,182,212,0.06) 0%, transparent 70%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 transition-none"
    />
  );
};

export default MouseSpotlight;
