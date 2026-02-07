import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getLucideIcon } from '@/components/shared/getLucideIcon';
import { pipelineSteps } from '@/data/pipeline';
import AnimatedDataFlow from '@/components/shared/AnimatedDataFlow';
import type { PageProps } from '@/types';

export default function Pipeline({ theme: _ }: PageProps) {
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [autoStep, setAutoStep] = useState(0);

  // Auto-cycle through steps for ambient animation
  useEffect(() => {
    if (activeStep !== null) return; // pause auto when user selects
    const interval = setInterval(() => {
      setAutoStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [activeStep]);

  const highlighted = activeStep ?? autoStep;

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan-500/50" />
            <span className="font-jetbrains text-[11px] tracking-[0.3em] uppercase text-cyan-500/70">
              Incident Response Pipeline
            </span>
          </div>
          <h2 className="font-chakra font-bold text-3xl md:text-4xl uppercase tracking-wider text-slate-100 mb-3">
            Threat{' '}
            <span className="text-cyan-400">Processing Pipeline</span>
          </h2>
          <p className="font-exo text-slate-400 max-w-2xl">
            Ten-stage incident response pipeline from alert ingestion through
            detection tuning. Each stage is AI-augmented for speed and accuracy.
          </p>
        </motion.div>

        {/* Animated data flow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="v1-panel p-4 md:p-6 mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-chakra text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Live Data Flow
            </span>
            <div className="flex-1 h-px bg-slate-700/40" />
            <motion.span
              className="font-jetbrains text-[10px] text-cyan-500"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: prefersReduced ? 0 : Infinity }}
            >
              ● STREAMING
            </motion.span>
          </div>
          <AnimatedDataFlow
            primaryColor="#06B6D4"
            secondaryColor="#0066ff"
            accentColor="#22C55E"
          />
        </motion.div>

        {/* Pipeline stages */}
        <div className="grid gap-3 md:grid-cols-2">
          {pipelineSteps.map((step, i) => {
            const IconComponent = getLucideIcon(step.icon, Icons.Circle) as React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
            const isHighlighted = i === highlighted;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`v1-panel p-4 cursor-pointer transition-all ${
                  isHighlighted ? 'ring-1 ring-cyan-500/30' : ''
                }`}
                style={{
                  borderColor: isHighlighted
                    ? `${step.color}40`
                    : undefined,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* Step number */}
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded text-xs font-bold font-jetbrains"
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                      border: `1px solid ${step.color}30`,
                      boxShadow: isHighlighted ? `0 0 12px ${step.color}25` : 'none',
                    }}
                  >
                    {step.order.toString().padStart(2, '0')}
                  </div>

                  <IconComponent
                    size={16}
                    style={{ color: step.color }}
                  />

                  <h4 className="font-chakra text-sm font-semibold uppercase tracking-wider text-slate-200 flex-1">
                    {step.name}
                  </h4>

                  {/* Status light */}
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isHighlighted ? step.color : '#334155',
                      boxShadow: isHighlighted ? `0 0 8px ${step.color}60` : 'none',
                    }}
                    animate={
                      isHighlighted
                        ? { opacity: [1, 0.4, 1] }
                        : { opacity: 0.5 }
                    }
                    transition={{ duration: 1.5, repeat: prefersReduced ? 0 : Infinity }}
                  />
                </div>

                <p className="font-jetbrains text-[11px] text-slate-500 leading-relaxed ml-11">
                  {step.description}
                </p>

                {/* Inputs/Outputs */}
                {(step.inputs || step.outputs) && (
                  <div className="mt-3 ml-11 flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-jetbrains">
                    {step.inputs && step.inputs.length > 0 && (
                      <div>
                        <span className="text-slate-600 font-semibold">IN → </span>
                        <span className="text-slate-500">{step.inputs.join(' | ')}</span>
                      </div>
                    )}
                    {step.outputs && step.outputs.length > 0 && (
                      <div>
                        <span className="text-slate-600 font-semibold">OUT → </span>
                        <span className="text-cyan-500/60">{step.outputs.join(' | ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { val: pipelineSteps.length, label: 'Total Stages', color: '#06B6D4' },
            { val: 4, label: 'Detection Stages', color: '#22C55E' },
            { val: 3, label: 'Response Stages', color: '#F59E0B' },
            { val: 3, label: 'Recovery Stages', color: '#8B5CF6' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-jetbrains font-bold text-xl" style={{ color: stat.color }}>
                {stat.val}
              </div>
              <div className="font-chakra text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
