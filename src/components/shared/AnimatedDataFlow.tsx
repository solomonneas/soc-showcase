import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { pipelineSteps } from '@/data/pipeline';

interface AnimatedDataFlowProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  bgColor?: string;
  className?: string;
}

interface NodePosition {
  x: number;
  y: number;
  step: (typeof pipelineSteps)[number];
}

export default function AnimatedDataFlow({
  primaryColor = '#00f0ff',
  secondaryColor = '#0066ff',
  accentColor = '#ff00aa',
  className = '',
}: AnimatedDataFlowProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [_hoveredStep, setHoveredStep] = useState<number | null>(null);

  const width = 900;
  const height = 200;
  const padding = 50;
  const nodeRadius = 24;

  // Calculate node positions in a flowing line
  const nodes: NodePosition[] = pipelineSteps.map((step, i) => ({
    x: padding + (i * (width - 2 * padding)) / (pipelineSteps.length - 1),
    y: height / 2 + Math.sin((i * Math.PI) / 4.5) * 30,
    step,
  }));

  // Animate the active step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Build path string through all nodes
  const pathData = nodes.reduce((acc, node, i) => {
    if (i === 0) return `M ${node.x} ${node.y}`;
    const prev = nodes[i - 1]!;
    const cpx = (prev.x + node.x) / 2;
    return `${acc} C ${cpx} ${prev.y}, ${cpx} ${node.y}, ${node.x} ${node.y}`;
  }, '');

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ maxHeight: '200px' }}
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated gradient for the path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.3" />
          </linearGradient>

          {/* Radial gradient for the travelling dot */}
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor={accentColor} stopOpacity="1" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background path */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="2"
          strokeDasharray="6 4"
          opacity="0.4"
        />

        {/* Active path segment */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: (activeStep + 1) / pipelineSteps.length }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          opacity="0.8"
        />

        {/* Connection lines between nodes */}
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1]!;
          return (
            <line
              key={`line-${node.step.id}`}
              x1={prev.x}
              y1={prev.y}
              x2={node.x}
              y2={node.y}
              stroke={i <= activeStep ? primaryColor : '#334155'}
              strokeWidth="1"
              opacity={i <= activeStep ? 0.6 : 0.2}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          const nodeColor = isActive ? accentColor : isPast ? primaryColor : '#334155';

          return (
            <g
              key={node.step.id}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Node glow ring */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius + 8}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={isActive ? `${nodeColor}22` : 'transparent'}
                stroke={nodeColor}
                strokeWidth={isActive ? 2.5 : 1.5}
                filter={isActive ? 'url(#glow)' : undefined}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Node number */}
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={nodeColor}
                fontSize="11"
                fontWeight={isActive ? 700 : 500}
                fontFamily="monospace"
              >
                {i + 1}
              </text>

              {/* Node label */}
              <text
                x={node.x}
                y={node.y + nodeRadius + 16}
                textAnchor="middle"
                fill={isActive ? nodeColor : '#94a3b8'}
                fontSize="9"
                fontWeight={isActive ? 600 : 400}
              >
                {node.step.name}
              </text>
            </g>
          );
        })}

        {/* Travelling dot */}
        <motion.circle
          cx={nodes[activeStep]?.x ?? 0}
          cy={nodes[activeStep]?.y ?? 0}
          r="6"
          fill="url(#dotGlow)"
          filter="url(#glow)"
          animate={{
            cx: nodes[activeStep]?.x ?? 0,
            cy: nodes[activeStep]?.y ?? 0,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
