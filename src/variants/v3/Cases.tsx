import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Circle, TrendingDown, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/cases';
import type { PageProps, TimelineStep, Metric } from '@/types';

const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  pending: Circle,
};

function HoloMetric({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="v3-glass rounded-lg p-5 v3-hud-corners"
    >
      <div className="font-fira text-[10px] text-[#5B7A8A] uppercase tracking-wider mb-3">
        {metric.label}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1">
          <div className="font-fira text-[9px] text-[#5B7A8A] mb-1">BEFORE</div>
          <div className="font-audiowide text-lg text-[#5B7A8A]">
            {metric.before}
          </div>
        </div>
        <ArrowRight size={14} className="text-[rgba(0,240,255,0.3)] shrink-0" />
        <div className="flex-1">
          <div className="font-fira text-[9px] text-[#39FF14] mb-1">AFTER</div>
          <div
            className="font-audiowide text-lg"
            style={{ color: '#39FF14', textShadow: '0 0 15px rgba(57,255,20,0.4)' }}
          >
            {metric.after}
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-1.5 font-fira text-xs px-2.5 py-1 rounded-md w-fit"
        style={{
          color: '#00F0FF',
          background: 'rgba(0,240,255,0.08)',
          border: '1px solid rgba(0,240,255,0.15)',
        }}
      >
        <TrendingDown size={12} />
        <span>{metric.reduction}</span>
        {metric.unit && <span className="text-[#5B7A8A] text-[9px] ml-1">{metric.unit}</span>}
      </div>
    </motion.div>
  );
}

function BeamTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative pl-8">
      {/* Vertical beam of light */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] v3-beam">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.5), rgba(0,240,255,0.3), rgba(0,240,255,0.5), transparent)',
          }}
        />
        {/* Glow aura */}
        <div
          className="absolute inset-y-0 -left-[4px] w-[10px]"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.08), transparent)',
            filter: 'blur(3px)',
          }}
        />
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const StatusIcon = statusIcons[step.status];
          const isCompleted = step.status === 'completed';

          return (
            <motion.div
              key={step.id}
              className="relative flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {/* Node on beam */}
              <div className="absolute left-[-22px] top-1 z-10">
                <motion.div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    background: isCompleted ? 'rgba(0,240,255,0.2)' : 'rgba(91,122,138,0.2)',
                    border: `1px solid ${isCompleted ? '#00F0FF' : '#5B7A8A'}`,
                    boxShadow: isCompleted ? '0 0 8px rgba(0,240,255,0.4)' : 'none',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isCompleted ? '#00F0FF' : '#5B7A8A' }}
                  />
                </motion.div>
              </div>

              {/* Content panel */}
              <div className="v3-glass rounded-lg p-4 flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <StatusIcon
                    size={14}
                    style={{ color: isCompleted ? '#00F0FF' : '#5B7A8A' }}
                  />
                  <h4 className="font-audiowide text-xs text-[#E0F7FF]">{step.title}</h4>
                  {step.date && (
                    <span className="font-fira text-[9px] text-[#5B7A8A] ml-auto">{step.date}</span>
                  )}
                </div>
                <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed ml-6">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Cases({ theme: _ }: PageProps) {
  const [activeCase, setActiveCase] = useState(0);
  const study = caseStudies[activeCase]!;

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="v3-section-label mb-2">// Case Studies</div>
            <h1 className="font-audiowide text-3xl md:text-4xl text-[#E0F7FF] mb-3 v3-chromatic-subtle">
              Mission Reports
            </h1>
            <p className="font-rajdhani text-[#5B7A8A] max-w-2xl leading-relaxed">
              Real-world security operations demonstrating AI-assisted threat detection,
              vulnerability management, and incident response.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Case Selector */}
      <div className="border-b border-[rgba(0,240,255,0.05)]" style={{ background: 'rgba(0,240,255,0.02)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActiveCase(i)}
                className="font-fira text-[10px] tracking-wider px-3 py-1.5 rounded transition-all"
                style={{
                  color: activeCase === i ? '#00F0FF' : '#5B7A8A',
                  background: activeCase === i ? 'rgba(0,240,255,0.08)' : 'transparent',
                  border: `1px solid ${activeCase === i ? 'rgba(0,240,255,0.3)' : 'rgba(0,240,255,0.08)'}`,
                  textShadow: activeCase === i ? '0 0 8px rgba(0,240,255,0.3)' : 'none',
                }}
              >
                {cs.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title + Description */}
            <div className="mb-10">
              <h2 className="font-audiowide text-2xl text-[#E0F7FF] mb-2 v3-chromatic-subtle">
                {study.title}
              </h2>
              <p className="font-rajdhani text-sm text-[#00F0FF] mb-4">{study.subtitle}</p>
              <p className="font-rajdhani text-[#5B7A8A] leading-relaxed max-w-3xl">
                {study.description}
              </p>
            </div>

            {/* Metrics - Large holographic numbers */}
            <div className="mb-12">
              <div className="v3-section-label mb-4">// Performance Metrics</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {study.metrics.map((metric, i) => (
                  <HoloMetric key={metric.label} metric={metric} index={i} />
                ))}
              </div>
            </div>

            {/* Two column: Timeline + Details */}
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Timeline */}
              <div>
                <div className="v3-section-label mb-4">// Mission Timeline</div>
                <BeamTimeline steps={study.timeline} />
              </div>

              {/* Challenge / Solution / Outcome */}
              <div className="space-y-6">
                {[
                  { label: 'CHALLENGE', text: study.challenge, color: '#FF00FF' },
                  { label: 'SOLUTION', text: study.solution, color: '#00F0FF' },
                  { label: 'OUTCOME', text: study.outcome, color: '#39FF14' },
                ].map((block) => (
                  <motion.div
                    key={block.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="v3-glass rounded-lg p-5"
                  >
                    <div
                      className="font-fira text-[10px] tracking-wider uppercase mb-3 flex items-center gap-2"
                      style={{ color: block.color }}
                    >
                      <div className="w-6 h-px" style={{ background: block.color }} />
                      {block.label}
                    </div>
                    <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed">
                      {block.text}
                    </p>
                  </motion.div>
                ))}

                {/* Tools Used */}
                <div className="v3-glass rounded-lg p-5">
                  <div className="font-fira text-[10px] tracking-wider uppercase mb-3 text-[#00F0FF] flex items-center gap-2">
                    <div className="w-6 h-px bg-[#00F0FF]" />
                    TOOLS DEPLOYED
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-fira text-[10px] px-2.5 py-1 rounded"
                        style={{
                          color: '#00F0FF',
                          background: 'rgba(0,240,255,0.08)',
                          border: '1px solid rgba(0,240,255,0.15)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {study.tags.map((tag) => (
                      <span key={tag} className="font-fira text-[9px] text-[#5B7A8A]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
