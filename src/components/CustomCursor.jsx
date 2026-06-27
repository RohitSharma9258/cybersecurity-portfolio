import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

    // Guard: only animate if the ring DOM node exists
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    }
  }, []);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const updateHoverables = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"], select');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
        el.style.cursor = 'none';
      });
    };

    updateHoverables();
    const observer = new MutationObserver(updateHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
      document.body.style.cursor = 'auto';
    };
  }, [onMouseMove]);

  // Always render the DOM nodes so ringRef is never null when GSAP fires
  return (
    <div
      className={`hidden md:block ${isHovered ? 'custom-cursor-hover' : ''}`}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s' }}
      aria-hidden="true"
    >
      <div
        className="custom-cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
};

export default CustomCursor;
