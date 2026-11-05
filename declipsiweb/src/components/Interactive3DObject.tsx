import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RabbitHoleItem } from '../data/portfolioData';

interface Interactive3DObjectProps {
  item: RabbitHoleItem;
  nodePrefix: string;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export const Interactive3DObject: React.FC<Interactive3DObjectProps> = ({
  item,
  nodePrefix,
  isActive,
  onSelect,
}) => {
  const [tilt, setTilt] = useState({ x: 10, y: -14 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 30 });
  const [isHovered, setIsHovered] = useState(false);

  const showBubble = isActive || isHovered;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const nx = (px - 0.5) * 2;
    const ny = (py - 0.5) * 2;
    setTilt({ x: -ny * 22, y: nx * 22 });
    setGlarePos({ x: Math.round(px * 100), y: Math.round(py * 100) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 10, y: -14 });
    setGlarePos({ x: 50, y: 30 });
  };

  const render3DArtwork = () => {
    switch (item.shapeType) {
      case 'polyhedron':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 overflow-visible animate-float-slow">
            <defs>
              <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4D2D" />
                <stop offset="100%" stopColor="#9E1F08" />
              </linearGradient>
            </defs>
            <g>
              <polygon points="60,10 104,36 60,56" fill="#FF6B4E" stroke="#141413" strokeWidth="1.5" />
              <polygon points="60,10 16,36 60,56" fill="#FF4D2D" stroke="#141413" strokeWidth="1.5" />
              <polygon points="16,36 60,56 32,98" fill="#D93618" stroke="#141413" strokeWidth="1.5" />
              <polygon points="104,36 60,56 88,98" fill="#E84325" stroke="#141413" strokeWidth="1.5" />
              <polygon points="60,56 32,98 88,98" fill="url(#polyGrad)" stroke="#141413" strokeWidth="1.5" />
              <polygon points="32,98 60,112 88,98" fill="#8C1D09" stroke="#141413" strokeWidth="1.5" />
            </g>
            {/* Continuously Flowing Orbital Ring + Orbiting Satellite */}
            <ellipse
              cx="60"
              cy="60"
              rx="52"
              ry="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="6 4"
              transform="rotate(-22 60 60)"
              className="animate-dash-flow"
            />
            <circle cx="14" cy="78" r="4.5" fill="#C6FF00" stroke="#141413" strokeWidth="1.5" />
          </svg>
        );

      case 'smartphone':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 overflow-visible animate-float-reverse">
            <rect x="34" y="14" width="56" height="94" rx="12" fill="#141413" />
            <rect
              x="30"
              y="10"
              width="56"
              height="94"
              rx="12"
              fill="#FAF8F5"
              stroke="#141413"
              strokeWidth="2"
            />
            <rect x="35" y="18" width="46" height="76" rx="7" fill="#141413" />
            <path
              id="smartphone-velocity-curve"
              d="M 40 72 C 52 72, 56 34, 76 34"
              fill="none"
              stroke="#C6FF00"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Keyframe Playhead Gliding Along the Velocity Curve */}
            <circle r="3.5" fill="#FF4D2D" stroke="#FAF8F5" strokeWidth="1.2">
              <animateMotion
                dur="2.2s"
                repeatCount="indefinite"
                path="M 40 72 C 52 72, 56 34, 76 34"
              />
            </circle>
            <rect
              x="44"
              y="62"
              width="8"
              height="8"
              fill="#FF4D2D"
              transform="rotate(45 48 66)"
            />
            <rect
              x="66"
              y="32"
              width="8"
              height="8"
              fill="#C6FF00"
              transform="rotate(45 70 36)"
            />
            <rect x="39" y="79" width="28" height="4" rx="2" fill="#FF4D2D" />
            <rect x="47" y="86" width="30" height="4" rx="2" fill="#C6FF00" />
          </svg>
        );

      case 'stylus':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 overflow-visible animate-float-slow">
            <rect
              x="18"
              y="34"
              width="72"
              height="62"
              rx="14"
              fill="#FAF8F5"
              stroke="#141413"
              strokeWidth="2"
            />
            <circle cx="38" cy="54" r="9" fill="#FF4D2D" />
            <circle cx="64" cy="54" r="9" fill="#C6FF00" stroke="#141413" strokeWidth="1.2" />
            <path
              d="M 30 78 Q 52 64, 76 80"
              fill="none"
              stroke="#141413"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 4"
              className="animate-dash-flow"
            />
            {/* Animated Drawing Stylus */}
            <g className="animate-stylus-draw">
              <rect
                x="62"
                y="10"
                width="12"
                height="74"
                rx="5"
                fill="#141413"
                stroke="#FAF8F5"
                strokeWidth="1.5"
              />
              <polygon points="62,84 74,84 68,100" fill="#FF4D2D" />
              <rect x="62" y="24" width="12" height="6" fill="#C6FF00" />
            </g>
          </svg>
        );

      case 'aicore':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 overflow-visible animate-float-reverse">
            <ellipse
              cx="60"
              cy="60"
              rx="48"
              ry="20"
              fill="none"
              stroke="#FF4D2D"
              strokeWidth="2.2"
              strokeDasharray="10 5"
              transform="rotate(30 60 60)"
              className="animate-dash-flow"
            />
            <ellipse
              cx="60"
              cy="60"
              rx="48"
              ry="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 6"
              transform="rotate(-30 60 60)"
              className="animate-dash-flow"
            />
            <polygon
              points="60,22 90,60 60,98 30,60"
              fill="#141413"
              stroke="#C6FF00"
              strokeWidth="2.2"
            />
            <polygon points="60,34 78,60 60,86 42,60" fill="#C6FF00" />
            <circle cx="60" cy="60" r="6" fill="#141413" />
          </svg>
        );

      case 'magnet':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 overflow-visible animate-float-slow">
            {/* Magnetic Field Waves */}
            <path
              d="M 36 16 Q 60 4, 84 16"
              fill="none"
              stroke="#C6FF00"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-dash-flow"
            />
            <path
              d="M 32 32 L 32 66 A 28 28 0 0 0 88 66 L 88 32"
              fill="none"
              stroke="#FF4D2D"
              strokeWidth="16"
              strokeLinecap="butt"
            />
            <rect x="24" y="22" width="16" height="14" fill="#FAF8F5" stroke="#141413" strokeWidth="2" />
            <rect x="80" y="22" width="16" height="14" fill="#FAF8F5" stroke="#141413" strokeWidth="2" />
            <polygon
              points="64,34 46,62 58,62 52,90 76,56 62,56"
              fill="#C6FF00"
              stroke="#141413"
              strokeWidth="1.8"
            />
          </svg>
        );

      case 'browser':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 overflow-visible animate-float-reverse">
            <rect x="18" y="26" width="88" height="68" rx="10" fill="#141413" />
            <rect
              x="14"
              y="20"
              width="88"
              height="68"
              rx="10"
              fill="#FAF8F5"
              stroke="#141413"
              strokeWidth="2"
            />
            <line x1="14" y1="34" x2="102" y2="34" stroke="#141413" strokeWidth="1.8" />
            <circle cx="24" cy="27" r="2.5" fill="#FF4D2D" />
            <circle cx="32" cy="27" r="2.5" fill="#141413" />
            <rect x="24" y="42" width="42" height="18" rx="4" fill="#141413" />
            <rect x="24" y="66" width="32" height="12" rx="4" fill="#FF4D2D" />
            <rect
              x="72"
              y="42"
              width="22"
              height="36"
              rx="6"
              fill="#C6FF00"
              stroke="#141413"
              strokeWidth="1.5"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className="relative flex flex-col items-center group perspective-1000 w-full"
      style={{ transform: `translateY(${Math.round(item.yOffset * 0.45)}px)` }}
    >
      {/* Connection Pin on the SVG Thread */}
      <div
        className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-300 mb-2.5 ${
          showBubble
            ? 'bg-[#FF4D2D] border-[#141413] dark:border-white scale-125'
            : 'bg-[#FAF8F5] dark:bg-[#1E1E24] border-[#141413] dark:border-white'
        }`}
      />

      {/* Interactive 3D Card & Sculpture (100% Opaque so Background Thread Never Bleeds Through) */}
      <motion.button
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => onSelect(item.id)}
        onMouseEnter={() => {
          setIsHovered(true);
          onSelect(item.id);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-expanded={showBubble}
        aria-label={`${item.index} ${item.title}: ${item.quote}`}
        className={`relative w-full max-w-[205px] rounded-2xl p-4 text-left transition-colors duration-200 cursor-pointer preserve-3d border overflow-hidden ${
          showBubble
            ? 'bg-[#FAF8F5] dark:bg-[#19191E] border-[#FF4D2D] dark:border-[#C6FF00] shadow-xl'
            : 'bg-[#FAF8F5] dark:bg-[#151519] border-[#141413]/15 dark:border-white/15 hover:border-[#FF4D2D]'
        }`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Dynamic Specular Light Glare on Hover */}
        {isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,77,45,0.35), transparent 65%)`,
            }}
          />
        )}

        {/* Top Index & Category Header */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60 mb-1.5">
          <span>
            {nodePrefix} {item.index}
          </span>
          <span className="text-[#FF4D2D] dark:text-[#C6FF00] font-semibold">3D · hover</span>
        </div>

        {/* 3D Floating Sculpture Stage */}
        <div
          className="relative z-10 h-24 w-full flex items-center justify-center my-1 transition-transform duration-300 group-hover:scale-110"
          style={{ transform: 'translateZ(26px)' }}
        >
          {render3DArtwork()}
        </div>

        {/* Caption & Handwritten/Mono Subtitle */}
        <div className="relative z-10 mt-1.5 pt-2 border-t border-[#141413]/10 dark:border-white/10">
          <div className="text-sm font-bold text-[#141413] dark:text-[#F4F2ED] leading-snug">
            {item.title}
          </div>
          <div className="text-[11px] font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60 mt-0.5 leading-tight">
            {item.subtitle}
          </div>
        </div>
      </motion.button>

      {/* First-Person Dialogue Cloud (Tooltip - 100% Solid Opaque) */}
      <div
        role="status"
        className={`mt-2.5 w-full max-w-[205px] rounded-xl p-3 border transition-all duration-200 ${
          showBubble
            ? 'opacity-100 translate-y-0 bg-[#141413] dark:bg-[#F4F2ED] text-[#F8F6F1] dark:text-[#141413] border-[#141413] dark:border-white shadow-lg'
            : 'opacity-100 translate-y-0.5 bg-[#FAF8F5] dark:bg-[#18181C] text-[#141413]/85 dark:text-[#F4F2ED]/85 border-[#141413]/12 dark:border-white/12'
        }`}
      >
        <p className="font-hand text-base sm:text-lg leading-snug font-semibold">
          {item.quote}
        </p>
        {showBubble && (
          <p className="text-[10px] font-mono opacity-80 mt-1 leading-relaxed">
            {item.details}
          </p>
        )}
      </div>
    </div>
  );
};
