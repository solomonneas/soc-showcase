import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { pipelineSteps } from '../../data/pipeline';
import type { PageProps } from '../../types';
import './styles.css';

/* ---- Particle system for the cinematic flow ---- */
interface Particle {
  id: number;
  progress: number;
  speed: number;
  size: number;
  opacity: number;
}

function usePipelineParticles(count: number, active: boolean) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    // Init particles at random positions
    const initial: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      progress: Math.random(),
      speed: 0.001 + Math.random() * 0.002,
      size: 2 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.6,
    }));
    setParticles(initial);

    let raf: number;
    const tick = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          progress: (p.progress + p.speed) % 1,
        }))
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, active]);

  return particles;
}

/* ---- SVG path helpers ---- */
function getPointOnPath(t: number, nodes: { x: number; y: number }[]): { x: number; y: number } {
  if (nodes.length < 2) return nodes[0] ?? { x: 0, y: 0 };

  const totalSegments = nodes.length - 1;
  const segment = Math.min(Math.floor(t * totalSegments), totalSegments - 1);
  const segmentT = (t * totalSegments) - segment;

  const a = nodes[segment]!;
  const b = nodes[segment + 1]!;

  // Smooth interpolation
  const eased = segmentT * segmentT * (3 - 2 * segmentT); // smoothstep
  return {
    x: a.x + (b.x - a.x) * eased,
    y: a.y + (b.y - a.y) * eased,
  };
}

export default function Pipeline(_props: PageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Auto-advance active step
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  // SVG dimensions
  const svgW = 1100;
  const svgH = 300;
  const pad = 60;

  // Compute node positions in a flowing wave
  const nodes = useMemo(() =>
    pipelineSteps.map((step, i) => ({
      x: pad + (i * (svgW - 2 * pad)) / (pipelineSteps.length - 1),
      y: svgH / 2 + Math.sin((i * Math.PI) / 4) * 40,
      step,
    })),
    []
  );

  // Build bezier path through nodes
  const pathD = useMemo(() => {
    return nodes.reduce((acc, node, i) => {
      if (i === 0) return `M ${node.x} ${node.y}`;
      const prev = nodes[i - 1]!;
      const cpx = (prev.x + node.x) / 2;
      return `${acc} C ${cpx} ${prev.y}, ${cpx} ${node.y}, ${node.x} ${node.y}`;
    }, '');
  }, [nodes]);

  const particles = usePipelineParticles(8, isInView);

  return (
    <section
      ref={containerRef}
      className="v5-mesh-bg min-h-screen py-24 px-6"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="v5-section-label justify-center mb-4">Data Flow</span>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-[#FAFAFA] mt-4 mb-4">
            Incident Response <span className="v5-gradient-text">Pipeline</span>
          </h2>
          <p className="font-dm-sans text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            From alert ingestion to detection tuning — a continuous loop of
            threat detection, analysis, and improvement.
          </p>
        </motion.div>

        {/* Cinematic Pipeline SVG */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="v5-glass rounded-2xl p-4 md:p-6 v5-glow-violet overflow-x-auto mb-12"
        >
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[700px]" style={{ maxHeight: 300 }}>
            <defs>
              {/* Gradient for main path */}
              <linearGradient id="v5-pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="v5-pipe-dim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
              </linearGradient>
              {/* Glow */}
              <filter id="v5-pipe-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Particle glow */}
              <radialGradient id="v5-particle-grad">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background path (dim) */}
            <path d={pathD} fill="none" stroke="url(#v5-pipe-dim)" strokeWidth="3" strokeLinecap="round" />

            {/* Active trail path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#v5-pipe-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: (activeStep + 1) / pipelineSteps.length }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              filter="url(#v5-pipe-glow)"
              opacity="0.9"
            />

            {/* Animated dash trail */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#v5-pipe-grad)"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-24"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>

            {/* Particles */}
            {particles.map((p) => {
              const pt = getPointOnPath(p.progress, nodes);
              return (
                <circle
                  key={p.id}
                  cx={pt.x}
                  cy={pt.y}
                  r={p.size}
                  fill="url(#v5-particle-grad)"
                  opacity={p.opacity * 0.7}
                  filter="url(#v5-pipe-glow)"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => {
              const isActive = i === activeStep;
              const isHovered = i === hoveredStep;
              const isPast = i < activeStep;
              const r = isActive || isHovered ? 22 : 18;

              return (
                <g
                  key={node.step.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setActiveStep(i)}
                >
                  {/* Pulse ring */}
                  {isActive && (
                    <>
                      <circle cx={node.x} cy={node.y} r={r + 12} fill="none" stroke="#7C3AED" strokeWidth="1" opacity="0.2">
                        <animate attributeName="r" values={`${r + 4};${r + 16};${r + 4}`} dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={node.x} cy={node.y} r={r + 6} fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.3">
                        <animate attributeName="r" values={`${r + 2};${r + 10};${r + 2}`} dur="2s" repeatCount="indefinite" begin="0.5s" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
                      </circle>
                    </>
                  )}

                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill={isActive ? 'rgba(124,58,237,0.12)' : isHovered ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.03)'}
                    stroke={isActive ? '#7C3AED' : isPast ? '#2563EB' : isHovered ? '#2563EB' : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isActive ? 2 : 1.5}
                    filter={isActive ? 'url(#v5-pipe-glow)' : undefined}
                  />

                  {/* Step number */}
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10"
                    fontWeight={isActive ? 700 : 500}
                    fill={isActive ? '#7C3AED' : isPast ? '#2563EB' : '#71717A'}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </text>

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + r + 16}
                    textAnchor="middle"
                    fontFamily="'DM Sans', sans-serif"
                    fontSize="10"
                    fontWeight={isActive ? 600 : 400}
                    fill={isActive ? '#FAFAFA' : '#71717A'}
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
              r="5"
              fill="#7C3AED"
              filter="url(#v5-pipe-glow)"
              animate={{
                cx: nodes[activeStep]?.x ?? 0,
                cy: nodes[activeStep]?.y ?? 0,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Detail card for active step */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="v5-glass-hover rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.08))' }}>
              {(() => {
                const step = pipelineSteps[activeStep]!;
                const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[step.icon] ?? Icons.Circle;
                return <Icon size={24} className="text-[#7C3AED]" />;
              })()}
            </div>
            <div>
              <div className="font-jetbrains text-[10px] uppercase tracking-wider text-[#7C3AED] mb-1">
                Stage {activeStep + 1} of {pipelineSteps.length}
              </div>
              <h3 className="font-space text-xl font-bold text-[#FAFAFA]">
                {pipelineSteps[activeStep]!.name}
              </h3>
            </div>
          </div>

          <p className="font-dm-sans text-[#A1A1AA] leading-relaxed mb-5">
            {pipelineSteps[activeStep]!.description}
          </p>

          {/* Inputs / Outputs */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pipelineSteps[activeStep]!.inputs && (
              <div>
                <div className="font-jetbrains text-[10px] uppercase tracking-wider text-[#71717A] mb-2">Inputs</div>
                <div className="flex flex-wrap gap-1.5">
                  {pipelineSteps[activeStep]!.inputs!.map((input) => (
                    <span key={input} className="text-xs font-jetbrains px-2.5 py-1 rounded-md bg-[#7C3AED]/[0.08] border border-[#7C3AED]/20 text-[#A1A1AA]">
                      {input}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {pipelineSteps[activeStep]!.outputs && (
              <div>
                <div className="font-jetbrains text-[10px] uppercase tracking-wider text-[#71717A] mb-2">Outputs</div>
                <div className="flex flex-wrap gap-1.5">
                  {pipelineSteps[activeStep]!.outputs!.map((output) => (
                    <span key={output} className="text-xs font-jetbrains px-2.5 py-1 rounded-md bg-[#10B981]/[0.08] border border-[#10B981]/20 text-[#A1A1AA]">
                      {output}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Step grid for quick navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pipelineSteps.map((step, i) => {
            const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[step.icon] ?? Icons.Circle;
            const isActive = i === activeStep;

            return (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveStep(i)}
                className={`relative text-left p-4 rounded-xl transition-all ${
                  isActive ? 'v5-glass-strong' : 'v5-glass hover:bg-white/[0.06]'
                }`}
                style={isActive ? { boxShadow: '0 0 20px rgba(124,58,237,0.1)' } : {}}
              >
                <Icon size={16} className={isActive ? 'text-[#7C3AED]' : 'text-[#52525B]'} />
                <div className={`font-space text-sm font-medium mt-2 ${isActive ? 'text-[#FAFAFA]' : 'text-[#71717A]'}`}>
                  {step.name}
                </div>
                <div className="font-jetbrains text-[10px] text-[#52525B] mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
