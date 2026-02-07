import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getLucideIcon } from '@/components/shared/getLucideIcon';
import { pipelineSteps } from '@/data/pipeline';
import AnimatedDataFlow from '@/components/shared/AnimatedDataFlow';
import type { PageProps } from '@/types';

export default function Pipeline({ theme: _ }: PageProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <section className="font-franklin">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="v2-section-label">Pipeline</div>
            <h1 className="font-space font-bold text-3xl md:text-4xl text-[#0F172A] mb-3">
              Incident Response Pipeline
            </h1>
            <p className="text-[#64748B] max-w-2xl leading-relaxed">
              A ten-stage incident response pipeline from alert ingestion through detection
              tuning. Each stage is AI-augmented for speed and accuracy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Data Flow */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-space text-sm font-medium text-[#1E293B]">
                Data Flow Visualization
              </span>
              <span className="font-fira text-[11px] text-[#2563EB] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                Live
              </span>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 md:p-6">
              <AnimatedDataFlow
                primaryColor="#1E293B"
                secondaryColor="#2563EB"
                accentColor="#2563EB"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pipeline Stages - Accordion */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="v2-section-label">Stages</div>
              <h2 className="font-space font-bold text-2xl text-[#0F172A]">
                Pipeline Stages
              </h2>
            </div>
            <span className="font-fira text-sm text-[#94A3B8]">
              {pipelineSteps.length} stages
            </span>
          </div>

          <div className="space-y-3">
            {pipelineSteps.map((step, i) => {
              const IconComponent = getLucideIcon(step.icon, Icons.Circle) as React.ComponentType<{ size?: number; className?: string }>;
              const isExpanded = expandedStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className={`v2-accordion-trigger w-full ${
                      isExpanded ? 'v2-accordion-trigger--open' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0]">
                        <span className="font-fira text-xs font-bold text-[#2563EB]">
                          {String(step.order).padStart(2, '0')}
                        </span>
                      </div>
                      <IconComponent size={16} className="text-[#2563EB]" />
                      <span className="font-space font-semibold text-sm text-[#0F172A]">
                        {step.name}
                      </span>
                    </div>
                    <Icons.ChevronDown
                      size={16}
                      className={`text-[#94A3B8] transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="v2-accordion-content">
                          <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                            {step.description}
                          </p>

                          {/* Inputs / Outputs */}
                          <div className="grid gap-4 sm:grid-cols-2">
                            {step.inputs && step.inputs.length > 0 && (
                              <div>
                                <h4 className="font-space text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                                  Inputs
                                </h4>
                                <div className="space-y-1">
                                  {step.inputs.map((input) => (
                                    <div
                                      key={input}
                                      className="flex items-center gap-2 text-sm text-[#1E293B]"
                                    >
                                      <Icons.ArrowRight size={10} className="text-[#CBD5E1]" />
                                      <span className="font-fira text-xs">{input}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {step.outputs && step.outputs.length > 0 && (
                              <div>
                                <h4 className="font-space text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                                  Outputs
                                </h4>
                                <div className="space-y-1">
                                  {step.outputs.map((output) => (
                                    <div
                                      key={output}
                                      className="flex items-center gap-2 text-sm text-[#2563EB]"
                                    >
                                      <Icons.ArrowRight size={10} className="text-[#2563EB]" />
                                      <span className="font-fira text-xs">{output}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-10 text-center"
          >
            {[
              { val: pipelineSteps.length, label: 'Total Stages' },
              { val: 4, label: 'Detection' },
              { val: 3, label: 'Response' },
              { val: 3, label: 'Recovery' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-space font-bold text-2xl text-[#0F172A]">
                  {stat.val}
                </div>
                <div className="font-fira text-xs text-[#64748B] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
