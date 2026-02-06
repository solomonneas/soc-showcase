import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { pipelineSteps } from '@/data/pipeline';
import type { PageProps } from '@/types';

function ParticleStream() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      dur: `${6 + Math.random() * 8}s`,
      del: `${Math.random() * 6}s`,
      size: 1 + Math.random() * 2,
      color: Math.random() > 0.7 ? '#FF00FF' : '#00F0FF',
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="v3-particle"
          style={{
            '--x': p.x,
            '--dur': p.dur,
            '--del': p.del,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function Pipeline({ theme: _ }: PageProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative">
      {/* Particle stream background */}
      <ParticleStream />

      {/* Header */}
      <div className="relative z-10 border-b border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="v3-section-label mb-2">// Pipeline</div>
            <h1 className="font-audiowide text-3xl md:text-4xl text-[#E0F7FF] mb-3 v3-chromatic-subtle">
              Incident Response Pipeline
            </h1>
            <p className="font-rajdhani text-[#5B7A8A] max-w-2xl leading-relaxed">
              A ten-stage incident response pipeline from alert ingestion through detection
              tuning. Watch the threat packet traverse each stage.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pipeline Visualization - SVG */}
      <div className="relative z-10 border-b border-[rgba(0,240,255,0.05)]" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-audiowide text-xs tracking-wider text-[#00F0FF]">
              THREAT PACKET FLOW
            </span>
            <span className="font-fira text-[10px] text-[#39FF14] flex items-center gap-1.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              LIVE
            </span>
          </div>

          <div className="v3-glass rounded-xl p-4 md:p-6 overflow-x-auto">
            <svg viewBox="0 0 1000 220" className="w-full min-w-[700px] h-auto">
              <defs>
                <filter id="v3-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="v3-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.2" />
                </linearGradient>
                <radialGradient id="v3-orb-grad">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="1" />
                  <stop offset="40%" stopColor="#00F0FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Connection path */}
              {pipelineSteps.map((_, i) => {
                if (i === 0) return null;
                const x1 = 50 + ((i - 1) * 900) / (pipelineSteps.length - 1);
                const x2 = 50 + (i * 900) / (pipelineSteps.length - 1);
                const y = 110;
                const isPassed = i <= activeStep;

                return (
                  <g key={`line-${i}`}>
                    {/* Background line */}
                    <line
                      x1={x1} y1={y} x2={x2} y2={y}
                      stroke="rgba(0,240,255,0.1)"
                      strokeWidth="2"
                    />
                    {/* Active line with gradient */}
                    {isPassed && (
                      <motion.line
                        x1={x1} y1={y} x2={x2} y2={y}
                        stroke="url(#v3-path-grad)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    {/* Flowing dashes on active */}
                    {isPassed && (
                      <motion.line
                        x1={x1} y1={y} x2={x2} y2={y}
                        stroke="#00F0FF"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                        opacity="0.4"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {pipelineSteps.map((step, i) => {
                const x = 50 + (i * 900) / (pipelineSteps.length - 1);
                const y = 110;
                const isActive = i === activeStep;
                const isPassed = i < activeStep;
                const isHovered = hoveredStep === i;
                const nodeColor = isActive ? '#00F0FF' : isPassed ? '#39FF14' : '#5B7A8A';

                return (
                  <g
                    key={step.id}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => setActiveStep(i)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse ring for active */}
                    {isActive && (
                      <motion.circle
                        cx={x} cy={y} r={24}
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="1"
                        opacity="0.4"
                        animate={{ r: [20, 28, 20], opacity: [0.4, 0.1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Node circle */}
                    <motion.circle
                      cx={x} cy={y}
                      r={isActive ? 18 : 16}
                      fill={isActive ? 'rgba(0,240,255,0.1)' : 'rgba(10,10,26,0.8)'}
                      stroke={nodeColor}
                      strokeWidth={isActive || isHovered ? 2 : 1}
                      filter={isActive ? 'url(#v3-glow)' : undefined}
                      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    {/* Step number */}
                    <text
                      x={x} y={y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={nodeColor}
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="'Fira Code', monospace"
                    >
                      {String(step.order).padStart(2, '0')}
                    </text>

                    {/* Label */}
                    <text
                      x={x} y={y + 34}
                      textAnchor="middle"
                      fill={isActive ? '#E0F7FF' : '#5B7A8A'}
                      fontSize="8"
                      fontFamily="'Audiowide', sans-serif"
                    >
                      {step.name}
                    </text>
                  </g>
                );
              })}

              {/* Travelling orb */}
              <motion.circle
                cx={50 + (activeStep * 900) / (pipelineSteps.length - 1)}
                cy={110}
                r="8"
                fill="url(#v3-orb-grad)"
                filter="url(#v3-glow)"
                animate={{
                  cx: 50 + (activeStep * 900) / (pipelineSteps.length - 1),
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />

              {/* Trailing particles */}
              {[1, 2, 3].map((trail) => (
                <motion.circle
                  key={trail}
                  cx={50 + (activeStep * 900) / (pipelineSteps.length - 1)}
                  cy={110}
                  r={4 - trail}
                  fill="#00F0FF"
                  opacity={0.3 / trail}
                  animate={{
                    cx: 50 + (activeStep * 900) / (pipelineSteps.length - 1),
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut', delay: trail * 0.08 }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Current Stage Detail */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Active stage detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="v3-glass rounded-xl p-6 v3-hud-corners v3-panel-scan"
          >
            {(() => {
              const step = pipelineSteps[activeStep]!;
              const IconComponent = (
                Icons as Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>>
              )[step.icon] ?? Icons.Circle;

              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-lg"
                      style={{
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}33`,
                      }}
                    >
                      <IconComponent
                        size={20}
                        style={{ color: step.color, filter: `drop-shadow(0 0 4px ${step.color}60)` }}
                      />
                    </div>
                    <div>
                      <div className="font-fira text-[9px] text-[#5B7A8A] tracking-wider">
                        STAGE {String(step.order).padStart(2, '0')} / {String(pipelineSteps.length).padStart(2, '0')}
                      </div>
                      <h3 className="font-audiowide text-lg text-[#E0F7FF]">{step.name}</h3>
                    </div>
                  </div>

                  <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {step.inputs && step.inputs.length > 0 && (
                    <div className="mb-3">
                      <div className="font-fira text-[9px] text-[#00F0FF] tracking-wider uppercase mb-2">Inputs</div>
                      <div className="flex flex-wrap gap-2">
                        {step.inputs.map((input) => (
                          <span
                            key={input}
                            className="font-fira text-[10px] px-2 py-0.5 rounded"
                            style={{
                              color: '#00F0FF',
                              background: 'rgba(0,240,255,0.06)',
                              border: '1px solid rgba(0,240,255,0.12)',
                            }}
                          >
                            → {input}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.outputs && step.outputs.length > 0 && (
                    <div>
                      <div className="font-fira text-[9px] text-[#39FF14] tracking-wider uppercase mb-2">Outputs</div>
                      <div className="flex flex-wrap gap-2">
                        {step.outputs.map((output) => (
                          <span
                            key={output}
                            className="font-fira text-[10px] px-2 py-0.5 rounded"
                            style={{
                              color: '#39FF14',
                              background: 'rgba(57,255,20,0.06)',
                              border: '1px solid rgba(57,255,20,0.12)',
                            }}
                          >
                            ← {output}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </motion.div>

          {/* Right: Stage list */}
          <div className="space-y-2">
            <div className="v3-section-label mb-3">// All Stages</div>
            {pipelineSteps.map((step, i) => {
              const isActive = i === activeStep;
              const isPassed = i < activeStep;
              const IconComponent = (
                Icons as Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>>
              )[step.icon] ?? Icons.Circle;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    isActive ? 'v3-glass' : 'hover:bg-[rgba(0,240,255,0.02)]'
                  }`}
                  style={{
                    border: isActive ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded text-[10px] font-bold shrink-0"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: isActive ? step.color : isPassed ? '#39FF14' : '#5B7A8A',
                      background: isActive ? `${step.color}15` : 'transparent',
                      border: `1px solid ${isActive ? `${step.color}33` : 'rgba(0,240,255,0.08)'}`,
                    }}
                  >
                    {String(step.order).padStart(2, '0')}
                  </div>

                  <IconComponent
                    size={14}
                    style={{
                      color: isActive ? step.color : isPassed ? '#39FF14' : '#5B7A8A',
                      filter: isActive ? `drop-shadow(0 0 4px ${step.color}60)` : undefined,
                    }}
                  />

                  <span
                    className="font-audiowide text-[11px] tracking-wider flex-1"
                    style={{
                      color: isActive ? '#E0F7FF' : isPassed ? '#5B7A8A' : '#5B7A8A',
                    }}
                  >
                    {step.name}
                  </span>

                  {isPassed && (
                    <Icons.Check size={12} style={{ color: '#39FF14' }} />
                  )}
                  {isActive && (
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#00F0FF', boxShadow: '0 0 6px rgba(0,240,255,0.6)' }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="relative z-10 border-t border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-10 text-center"
          >
            {[
              { val: pipelineSteps.length, label: 'Total Stages', color: '#00F0FF' },
              { val: 4, label: 'Detection', color: '#FF00FF' },
              { val: 3, label: 'Response', color: '#39FF14' },
              { val: 3, label: 'Recovery', color: '#00F0FF' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-audiowide text-2xl mb-1"
                  style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}40` }}
                >
                  {stat.val}
                </div>
                <div className="font-fira text-[10px] text-[#5B7A8A] tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
