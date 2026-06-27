import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillRadar = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const skills = [
    { name: 'Security Audits', level: 85, angle: 0 },
    { name: 'Network Security', level: 90, angle: (2 * Math.PI) / 5 },
    { name: 'Database Hardening', level: 80, angle: (4 * Math.PI) / 5 },
    { name: 'Script Automation', level: 90, angle: (6 * Math.PI) / 5 },
    { name: 'Framework Dev', level: 80, angle: (8 * Math.PI) / 5 },
  ];

  const size = 320;
  const center = size / 2;
  const maxRadius = 110;

  // Helper: compute (x, y) coordinates for a given radius and angle
  const getCoordinates = (radius, angle) => {
    // Subtract Math.PI / 2 so the first point faces straight up
    const x = center + radius * Math.cos(angle - Math.PI / 2);
    const y = center + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  // Grid levels (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1];

  // Path coordinates for Rohit's skill level shape
  const skillPoints = skills.map((s) => {
    const radius = (s.level / 100) * maxRadius;
    return getCoordinates(radius, s.angle);
  });

  const skillPathString = skillPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative bg-neutral-950/40 p-4 border border-cyan-500/10 rounded-lg shadow-inner">
        
        {/* SVG Radar Container */}
        <svg width={size} height={size} className="overflow-visible select-none">
          
          {/* Radar background grid rings */}
          {gridLevels.map((level, idx) => {
            const radius = level * maxRadius;
            const points = skills.map((s) => getCoordinates(radius, s.angle));
            const pathStr = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
            
            return (
              <path
                key={idx}
                d={pathStr}
                fill="none"
                stroke="rgba(6, 182, 212, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Web grid spoke lines */}
          {skills.map((s, idx) => {
            const end = getCoordinates(maxRadius, s.angle);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke="rgba(6, 182, 212, 0.12)"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Skills Area Polygon */}
          <motion.path
            initial={{ d: `M ${center} ${center} L ${center} ${center} L ${center} ${center} L ${center} ${center} L ${center} ${center} Z` }}
            animate={{ d: skillPathString }}
            transition={{ duration: 1, ease: 'easeOut' }}
            fill="rgba(6, 182, 212, 0.15)"
            stroke="rgba(6, 182, 212, 0.7)"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]"
          />

          {/* Interactive nodes/dots on coordinates */}
          {skills.map((s, idx) => {
            const p = skillPoints[idx];
            return (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  className="fill-cyan-400 stroke-neutral-950 stroke-2 cursor-pointer hover:scale-150 transition-transform duration-200"
                  onMouseEnter={() => setHoveredPoint(s)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {skills.map((s, idx) => {
            // Push labels slightly outwards from the max radius
            const labelPos = getCoordinates(maxRadius + 22, s.angle);
            
            // Adjust label alignments
            let textAnchor = 'middle';
            if (labelPos.x < center - 10) textAnchor = 'end';
            if (labelPos.x > center + 10) textAnchor = 'start';

            return (
              <text
                key={idx}
                x={labelPos.x}
                y={labelPos.y + 4}
                textAnchor={textAnchor}
                className="fill-gray-400 font-cyber text-[9px] font-semibold uppercase tracking-wider"
              >
                {s.name}
              </text>
            );
          })}

        </svg>

        {/* Dynamic HUD Tooltip Overlay inside the radar */}
        {hoveredPoint && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-950/95 border border-cyan-400/80 px-3 py-1.5 rounded-sm shadow-2xl font-code text-[10px] text-center w-28 select-none z-10 pointer-events-none">
            <div className="text-white font-bold">{hoveredPoint.name}</div>
            <div className="text-cyan-400 font-bold mt-0.5">{hoveredPoint.level}% LEVEL</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SkillRadar;
