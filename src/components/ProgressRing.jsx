import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProgressRing — animated SVG circular progress ring.
 * Props: value (0-100), size (px), strokeWidth (px), color (tailwind/hex), label
 */
const ProgressRing = ({ value = 0, size = 120, strokeWidth = 8, color = '#06b6d4', label = '' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg width={size} height={size} className="rotate-[-90deg]" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-cyber font-bold text-white" style={{ fontSize: size * 0.18 }}>
            {value}%
          </span>
        </div>
      </div>
      {label && (
        <span className="font-code text-[11px] text-gray-400 uppercase tracking-wider text-center">
          {label}
        </span>
      )}
    </div>
  );
};

export default ProgressRing;
