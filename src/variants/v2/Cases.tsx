import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Circle, FileText, TrendingDown } from 'lucide-react';
import { caseStudies } from '@/data/cases';
import { tools } from '@/data/tools';
import type { PageProps, TimelineStep } from '@/types';

const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  pending: Circle,
};

export default function Cases({ theme: _ }: PageProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const cs = caseStudies[activeIdx]!;

  const caseTools = cs.tools
    .map((tid) => tools.find((t) => t.id === tid))
    .filter(Boolean);

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
            <div className="v2-section-label">Case Studies</div>
            <h1 className="font-space font-bold text-3xl md:text-4xl text-[#0F172A] mb-3">
              Operations & Results
            </h1>
            <p className="text-[#64748B] max-w-2xl leading-relaxed">
              Real-world security operations demonstrating measurable impact through
              AI-assisted tooling and automated workflows.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Case Selector */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {caseStudies.map((c, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2 font-space text-sm font-medium px-4 py-2 rounded-md border transition-all ${
                    active
                      ? 'bg-[#DBEAFE] border-[#BFDBFE] text-[#2563EB]'
                      : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:border-[#CBD5E1]'
                  }`}
                >
                  <FileText size={14} />
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Content */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Case Title Block */}
              <div className="mb-8 pb-8 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-fira text-xs text-[#2563EB]">
                    Case #{String(activeIdx + 1).padStart(3, '0')}
                  </span>
                  <span className="v2-badge v2-badge--green">Resolved</span>
                </div>
                <h2 className="font-space font-bold text-2xl md:text-3xl text-[#0F172A] mb-2">
                  {cs.title}
                </h2>
                <p className="text-[#64748B] mb-4">{cs.subtitle}</p>

                {/* Tool badges */}
                <div className="flex flex-wrap gap-2">
                  {caseTools.map((tool) =>
                    tool ? (
                      <span key={tool.id} className="v2-badge v2-badge--blue">
                        {tool.name}
                      </span>
                    ) : null,
                  )}
                  {cs.tags.map((tag) => (
                    <span key={tag} className="v2-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Table */}
              <div className="mb-8">
                <h3 className="font-space font-semibold text-lg text-[#0F172A] mb-4">
                  Impact Metrics
                </h3>
                <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Before</th>
                        <th>After</th>
                        <th>Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cs.metrics.map((metric, mi) => (
                        <motion.tr
                          key={metric.label}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: mi * 0.06 }}
                        >
                          <td className="font-medium">{metric.label}</td>
                          <td>
                            <span className="font-fira text-[#64748B]">
                              {metric.before}
                            </span>
                          </td>
                          <td>
                            <span className="font-fira font-medium text-[#0F172A]">
                              {metric.after}
                            </span>
                          </td>
                          <td>
                            <span className="inline-flex items-center gap-1 font-fira text-sm font-medium text-[#2563EB]">
                              <TrendingDown size={12} />
                              {metric.reduction}
                              {metric.unit && (
                                <span className="text-xs text-[#94A3B8] font-normal ml-1">
                                  {metric.unit}
                                </span>
                              )}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Challenge / Solution / Outcome */}
              <div className="grid gap-6 md:grid-cols-3 mb-8">
                {[
                  { title: 'Challenge', text: cs.challenge, accent: '#DC2626' },
                  { title: 'Solution', text: cs.solution, accent: '#2563EB' },
                  { title: 'Outcome', text: cs.outcome, accent: '#16A34A' },
                ].map((block) => (
                  <div key={block.title} className="v2-card">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-1.5 h-6 rounded-full"
                        style={{ backgroundColor: block.accent }}
                      />
                      <h4 className="font-space font-semibold text-sm text-[#0F172A]">
                        {block.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="font-space font-semibold text-lg text-[#0F172A] mb-6">
                  Operation Timeline
                </h3>

                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[15px] top-3 bottom-3 w-px bg-[#E2E8F0]" />

                  <div className="space-y-5">
                    {cs.timeline.map((step: TimelineStep, si: number) => {
                      const StatusIcon = statusIcons[step.status];
                      const isCompleted = step.status === 'completed';
                      const isActive = step.status === 'in-progress';

                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: si * 0.06 }}
                          className="flex gap-4"
                        >
                          <div className="relative z-10 flex-shrink-0 w-[30px] flex justify-center">
                            <div
                              className={`p-0.5 rounded-full ${
                                isActive ? 'bg-[#DBEAFE]' : 'bg-white'
                              }`}
                            >
                              <StatusIcon
                                size={18}
                                className={
                                  isCompleted
                                    ? 'text-[#2563EB]'
                                    : isActive
                                      ? 'text-[#2563EB]'
                                      : 'text-[#CBD5E1]'
                                }
                                strokeWidth={isActive ? 2.5 : 2}
                              />
                            </div>
                          </div>

                          <div className="flex-1 pb-1">
                            <div className="flex items-baseline gap-3 flex-wrap">
                              <h5 className="font-space text-sm font-semibold text-[#0F172A]">
                                <span className="font-fira text-[#2563EB] mr-2">
                                  {String(si + 1).padStart(2, '0')}
                                </span>
                                {step.title}
                              </h5>
                              {step.date && (
                                <span className="font-fira text-[11px] text-[#94A3B8]">
                                  {step.date}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Technical Detail Code Block */}
              <div>
                <h3 className="font-space font-semibold text-lg text-[#0F172A] mb-4">
                  Technical Summary
                </h3>
                <div className="v2-code-block">
                  <pre className="whitespace-pre-wrap">
{`# Case: ${cs.title}
# Status: Resolved
# Tools: ${caseTools.map((t) => t?.name).join(', ')}

summary:
  description: "${cs.subtitle}"
  metrics:
${cs.metrics.map((m) => `    - ${m.label}: ${m.before} → ${m.after} (${m.reduction})`).join('\n')}
  timeline_steps: ${cs.timeline.length}
  tags: [${cs.tags.join(', ')}]`}
                  </pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
