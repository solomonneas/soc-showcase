import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pipelineSteps } from '@/data/pipeline';
import type { PageProps } from '@/types';
import './styles.css';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Pipeline(_props: PageProps) {
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  // Slow, deliberate animation — 3 seconds per step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="paper-wrapper paper-body">
      {/* Section heading */}
      <motion.h2 className="paper-heading section-heading" {...fade}>
        5. Threat Pipeline Visualization
      </motion.h2>

      <motion.p {...fade} transition={{ delay: 0.05, duration: 0.5 }}>
        The SOC Stack processes security events through a ten-stage pipeline spanning
        alert ingestion, enrichment, triage, investigation, containment, eradication,
        recovery, lessons learned, intelligence updates, and detection tuning. This
        section presents the pipeline as both a visual figure and a structured
        walkthrough of each stage. The pipeline implements a closed-loop design: outputs
        from the final stages (intelligence updates and detection tuning) feed back into
        the initial stages, enabling continuous improvement of detection efficacy.
      </motion.p>

      {/* Figure: Pipeline animation */}
      <motion.div className="figure-block" {...fade} transition={{ delay: 0.1, duration: 0.5 }}>
        <div className="figure-content" style={{ padding: '1.5rem 1rem' }}>
          <svg viewBox="0 0 680 120" className="w-full" style={{ maxHeight: 120 }}>
            <defs>
              <marker
                id="v4-pipe-arrow"
                markerWidth="6"
                markerHeight="4"
                refX="6"
                refY="2"
                orient="auto"
              >
                <polygon points="0 0, 6 2, 0 4" fill="#D6D3D1" />
              </marker>
            </defs>

            {/* Connection lines */}
            {pipelineSteps.map((_, i) => {
              if (i === 0) return null;
              const prevX = 34 + (i - 1) * 65;
              const currX = 34 + i * 65;
              const isPast = i <= activeStep;
              return (
                <line
                  key={`line-${i}`}
                  x1={prevX + 14}
                  y1={45}
                  x2={currX - 14}
                  y2={45}
                  stroke={isPast ? '#1C1917' : '#D6D3D1'}
                  strokeWidth={isPast ? 1.25 : 0.75}
                  markerEnd="url(#v4-pipe-arrow)"
                />
              );
            })}

            {/* Step circles */}
            {pipelineSteps.map((step, i) => {
              const cx = 34 + i * 65;
              const isActive = i === activeStep;
              const isPast = i < activeStep;

              return (
                <g key={step.id}>
                  {/* Active glow ring */}
                  {isActive && (
                    <motion.circle
                      cx={cx}
                      cy={45}
                      r={18}
                      fill="none"
                      stroke="#1C1917"
                      strokeWidth={0.75}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: prefersReduced ? 0 : Infinity }}
                    />
                  )}

                  {/* Circle */}
                  <circle
                    cx={cx}
                    cy={45}
                    r={13}
                    fill={isActive ? '#1C1917' : isPast ? '#F5F5F4' : '#FFFFFF'}
                    stroke={isActive || isPast ? '#1C1917' : '#D6D3D1'}
                    strokeWidth={isActive ? 1.5 : 1}
                  />

                  {/* Step number */}
                  <text
                    x={cx}
                    y={46}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'IBM Plex Mono', monospace"
                    fontSize={8}
                    fontWeight={isActive ? 700 : 500}
                    fill={isActive ? '#FFFFFF' : '#1C1917'}
                  >
                    {step.order}
                  </text>

                  {/* Label */}
                  <text
                    x={cx}
                    y={75}
                    textAnchor="middle"
                    fontFamily="'Crimson Pro', serif"
                    fontSize={7}
                    fill={isActive ? '#1C1917' : '#57534E'}
                    fontWeight={isActive ? 600 : 400}
                  >
                    {step.name.length > 12
                      ? step.name.slice(0, 11) + '…'
                      : step.name}
                  </text>
                </g>
              );
            })}

            {/* Feedback loop arrow from step 10 back to step 1 */}
            <path
              d="M 620 55 C 620 100, 34 100, 34 55"
              fill="none"
              stroke="#D6D3D1"
              strokeWidth={0.75}
              strokeDasharray="4 3"
              markerEnd="url(#v4-pipe-arrow)"
            />
            <text
              x={327}
              y={108}
              textAnchor="middle"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize={6.5}
              fill="#57534E"
            >
              feedback loop
            </text>
          </svg>
        </div>
        <div className="figure-caption">
          <strong>Figure 6.</strong> Ten-stage threat processing pipeline with closed-loop
          feedback. The currently active stage is highlighted. Stage progression advances
          every three seconds for illustrative purposes.
        </div>
      </motion.div>

      {/* Numbered step descriptions */}
      <motion.h3
        className="paper-heading subsection-heading"
        {...fade}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        5.1 Stage Descriptions
      </motion.h3>

      {pipelineSteps.map((step, i) => (
        <motion.div
          key={step.id}
          {...fade}
          transition={{ delay: 0.18 + i * 0.02, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            alignItems: 'flex-start',
          }}
        >
          <span className="pipeline-step-num">{step.order}</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#1C1917',
                marginBottom: '0.25rem',
              }}
            >
              {step.name}
            </div>
            <p style={{ marginBottom: '0.375rem' }}>{step.description}</p>

            {/* Inputs / Outputs */}
            {(step.inputs || step.outputs) && (
              <div
                style={{
                  fontSize: '0.825rem',
                  color: '#57534E',
                  lineHeight: 1.5,
                }}
              >
                {step.inputs && step.inputs.length > 0 && (
                  <div>
                    <strong style={{ fontFamily: "'Source Serif 4', serif", color: '#1C1917' }}>
                      Inputs:{' '}
                    </strong>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.775rem' }}>
                      {step.inputs.join(', ')}
                    </span>
                  </div>
                )}
                {step.outputs && step.outputs.length > 0 && (
                  <div>
                    <strong style={{ fontFamily: "'Source Serif 4', serif", color: '#1C1917' }}>
                      Outputs:{' '}
                    </strong>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.775rem' }}>
                      {step.outputs.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Summary */}
      <hr className="section-rule" />
      <motion.p {...fade} transition={{ delay: 0.4, duration: 0.5 }}>
        The closed-loop nature of this pipeline distinguishes the SOC Stack from
        linear incident response models. Intelligence gathered during post-incident
        review feeds directly into detection tuning, which in turn improves the
        quality of alert ingestion in subsequent cycles. This continuous improvement
        mechanism is central to the architecture's long-term value proposition.
      </motion.p>
      <p className="cross-ref">
        For author information and a complete list of references, see Section 6.
      </p>
    </div>
  );
}
